"""
Data Processing Engine
Core module for processing RVTools Excel files and consolidating data.
Replicates the main data processing logic from the VBA macro.
"""

import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
import logging
import traceback
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """Result of data processing operation."""
    success: bool
    message: str
    files_processed: int = 0
    vms_processed: int = 0
    hosts_processed: int = 0
    errors: Optional[List[str]] = None
    
    def __post_init__(self):
        if self.errors is None:
            self.errors = []

class RVToolsDataProcessor:
    """Main data processing engine for RVTools files."""
    
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
        # Consolidated data storage
        self.consolidated_vinfo = pd.DataFrame()
        self.consolidated_vhost = pd.DataFrame()
        self.consolidated_metadata = pd.DataFrame()
        
        # Processing statistics
        self.stats = {
            'files_processed': 0,
            'vms_processed': 0,
            'hosts_processed': 0,
            'errors': []
        }
    
    def process_folder(self, folder_path: Path, progress_callback=None) -> ProcessingResult:
        """
        Process all RVTools Excel files in the specified folder.
        Replicates the main ProcessRVToolsDataFromFolder VBA function.
        """
        try:
            self.logger.info(f"Starting folder processing: {folder_path}")
            
            if not folder_path.exists():
                raise FileNotFoundError(f"Folder not found: {folder_path}")
            
            # Initialize consolidated data structures
            self._initialize_consolidated_data()
            
            # Find all Excel files
            excel_files = self._find_excel_files(folder_path)
            self.logger.info(f"Found {len(excel_files)} Excel files")
            
            if not excel_files:
                return ProcessingResult(
                    success=False,
                    message="No Excel files found in the specified folder"
                )
            
            # Process each file
            for i, file_path in enumerate(excel_files):
                try:
                    if progress_callback:
                        progress = int((i / len(excel_files)) * 100)
                        progress_callback(progress, f"Processing {file_path.name}")
                    
                    self._process_single_file(file_path)
                    self.stats['files_processed'] += 1
                    
                except Exception as e:
                    error_msg = f"Error processing {file_path.name}: {str(e)}"
                    self.logger.error(error_msg)
                    self.stats['errors'].append(error_msg)
            
            # Post-processing
            self._post_process_data()
            
            if progress_callback:
                progress_callback(100, "Processing complete")
            
            return ProcessingResult(
                success=True,
                message=f"Successfully processed {self.stats['files_processed']} files",
                files_processed=self.stats['files_processed'],
                vms_processed=self.stats['vms_processed'],
                hosts_processed=self.stats['hosts_processed'],
                errors=self.stats['errors']
            )
            
        except Exception as e:
            self.logger.error(f"Critical error in process_folder: {str(e)}")
            self.logger.error(traceback.format_exc())
            return ProcessingResult(
                success=False,
                message=f"Critical error: {str(e)}",
                errors=[str(e)]
            )
    
    def _initialize_consolidated_data(self):
        """Initialize empty DataFrames for consolidated data."""
        # Initialize vInfo DataFrame
        vinfo_columns = self.config.required_vinfo_cols + ['SourceFile']
        self.consolidated_vinfo = pd.DataFrame(columns=vinfo_columns)
        
        # Initialize vHost DataFrame  
        vhost_columns = self.config.required_vhost_cols + ['SourceFile']
        self.consolidated_vhost = pd.DataFrame(columns=vhost_columns)
        
        # Initialize metadata DataFrame
        self.consolidated_metadata = pd.DataFrame(columns=['SourceFile_Meta'])
        
        self.logger.info("Initialized consolidated data structures")
    
    def _find_excel_files(self, folder_path: Path) -> List[Path]:
        """Find all Excel files in the folder."""
        excel_files = []
        for ext in self.config.supported_file_extensions:
            excel_files.extend(folder_path.glob(f"*{ext}"))
        return sorted(excel_files)
    
    def _process_single_file(self, file_path: Path):
        """
        Process a single RVTools Excel file.
        Replicates the ExtractDataFromExcel VBA function.
        """
        self.logger.info(f"Processing file: {file_path.name}")
        
        try:
            # Read all sheets from the Excel file
            xl_file = pd.ExcelFile(file_path)
            
            # Process vInfo sheet
            if 'vInfo' in xl_file.sheet_names:
                self._process_vinfo_sheet(xl_file, file_path.name)
            else:
                self.logger.warning(f"vInfo sheet not found in {file_path.name}")
            
            # Process vHost sheet
            if 'vHost' in xl_file.sheet_names:
                self._process_vhost_sheet(xl_file, file_path.name)
            else:
                self.logger.warning(f"vHost sheet not found in {file_path.name}")
            
            # Process vMetaData sheet
            if 'vMetaData' in xl_file.sheet_names:
                self._process_metadata_sheet(xl_file, file_path.name)
            else:
                self.logger.warning(f"vMetaData sheet not found in {file_path.name}")
                
        except Exception as e:
            raise Exception(f"Error reading Excel file: {str(e)}")
    
    def _process_vinfo_sheet(self, xl_file: pd.ExcelFile, source_filename: str):
        """Process vInfo sheet data."""
        try:
            df = pd.read_excel(xl_file, sheet_name='vInfo')
            
            if df.empty:
                return
            
            # Find header row (look for first required column)
            header_row = 0
            first_col = self.config.required_vinfo_cols[0]
            
            for i, row in df.iterrows():
                if first_col in row.values:
                    header_row = i if isinstance(i, int) else 0
                    break
            
            # Re-read with correct header
            if header_row > 0:
                df = pd.read_excel(xl_file, sheet_name='vInfo', header=header_row)
            
            # Extract required columns
            extracted_data = {}
            for col in self.config.required_vinfo_cols:
                if col == 'OS Classification':
                    # Calculate OS Classification
                    os_config = df.get('OS according to the configuration file', pd.Series(dtype=str))
                    os_tools = df.get('OS according to the VMware Tools', pd.Series(dtype=str))
                    
                    extracted_data[col] = [
                        self.config.classify_os(config_val, tools_val)
                        for config_val, tools_val in zip(os_config.fillna(''), os_tools.fillna(''))
                    ]
                else:
                    extracted_data[col] = df.get(col, pd.Series(dtype=object)).values
            
            # Add source file column
            extracted_data['SourceFile'] = [source_filename] * len(df)
            
            # Create DataFrame and append to consolidated data
            new_data = pd.DataFrame(extracted_data)
            self.consolidated_vinfo = pd.concat([self.consolidated_vinfo, new_data], ignore_index=True)
            
            self.stats['vms_processed'] += len(new_data)
            self.logger.info(f"Processed {len(new_data)} VMs from vInfo sheet")
            
        except Exception as e:
            raise Exception(f"Error processing vInfo sheet: {str(e)}")
    
    def _process_vhost_sheet(self, xl_file: pd.ExcelFile, source_filename: str):
        """Process vHost sheet data."""
        try:
            df = pd.read_excel(xl_file, sheet_name='vHost')
            
            if df.empty:
                return
            
            # Find header row
            header_row = 0
            first_col = self.config.required_vhost_cols[0]
            
            for i, row in df.iterrows():
                if first_col in row.values:
                    header_row = i if isinstance(i, int) else 0
                    break
            
            # Re-read with correct header
            if header_row > 0:
                df = pd.read_excel(xl_file, sheet_name='vHost', header=header_row)
            
            # Extract required columns
            extracted_data = {}
            for col in self.config.required_vhost_cols:
                if col in ['CPU usage %', 'Memory usage %']:
                    # Handle percentage columns (replicate VBA logic)
                    series = df.get(col, pd.Series(dtype=object))
                    processed_values = []
                    
                    for val in series:
                        try:
                            if pd.isna(val):
                                processed_values.append(np.nan)
                                continue
                            
                            # Remove % symbol and convert
                            val_str = str(val).replace('%', '').strip()
                            if val_str and val_str.replace('.', '').replace('-', '').isdigit():
                                num_val = float(val_str)
                                # Convert to decimal if needed
                                if num_val > 1:
                                    num_val = num_val / 100
                                # Ensure between 0 and 1
                                num_val = max(0, min(1, num_val))
                                processed_values.append(num_val)
                            else:
                                processed_values.append(np.nan)
                        except:
                            processed_values.append(np.nan)
                    
                    extracted_data[col] = processed_values
                else:
                    extracted_data[col] = df.get(col, pd.Series(dtype=object)).values
            
            # Add source file column
            extracted_data['SourceFile'] = [source_filename] * len(df)
            
            # Create DataFrame and append to consolidated data
            new_data = pd.DataFrame(extracted_data)
            self.consolidated_vhost = pd.concat([self.consolidated_vhost, new_data], ignore_index=True)
            
            self.stats['hosts_processed'] += len(new_data)
            self.logger.info(f"Processed {len(new_data)} hosts from vHost sheet")
            
        except Exception as e:
            raise Exception(f"Error processing vHost sheet: {str(e)}")
    
    def _process_metadata_sheet(self, xl_file: pd.ExcelFile, source_filename: str):
        """Process vMetaData sheet."""
        try:
            df = pd.read_excel(xl_file, sheet_name='vMetaData')
            
            if df.empty:
                return
            
            # Add source file column as first column
            df.insert(0, 'SourceFile_Meta', source_filename)
            
            # Append to consolidated metadata
            self.consolidated_metadata = pd.concat([self.consolidated_metadata, df], ignore_index=True)
            
            self.logger.info(f"Processed metadata with {len(df)} rows")
            
        except Exception as e:
            raise Exception(f"Error processing vMetaData sheet: {str(e)}")
    
    def _post_process_data(self):
        """Post-process consolidated data (add utilization buckets, etc.)."""
        try:
            # Add utilization buckets to vHost data
            if not self.consolidated_vhost.empty:
                self._add_utilization_buckets()
            
            self.logger.info("Post-processing completed")
            
        except Exception as e:
            self.logger.error(f"Error in post-processing: {str(e)}")
    
    def _add_utilization_buckets(self):
        """Add CPU and RAM utilization buckets to vHost data."""
        # CPU utilization buckets
        if 'CPU usage %' in self.consolidated_vhost.columns:
            self.consolidated_vhost['CPU Utilization Bucket'] = self.consolidated_vhost['CPU usage %'].apply(
                lambda x: self.config.get_cpu_bucket(x) if pd.notna(x) else 'N/A'
            )
        
        # RAM utilization buckets
        if 'Memory usage %' in self.consolidated_vhost.columns:
            self.consolidated_vhost['RAM Utilization Bucket'] = self.consolidated_vhost['Memory usage %'].apply(
                lambda x: self.config.get_ram_bucket(x) if pd.notna(x) else 'N/A'
            )
    
    def get_consolidated_data(self) -> Dict[str, pd.DataFrame]:
        """Return all consolidated data."""
        return {
            'vinfo': self.consolidated_vinfo,
            'vhost': self.consolidated_vhost,
            'metadata': self.consolidated_metadata
        }
    
    def export_to_excel(self, output_path: Path) -> bool:
        """Export consolidated data to Excel file."""
        try:
            with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
                # Write consolidated data to separate sheets
                if not self.consolidated_vinfo.empty:
                    self.consolidated_vinfo.to_excel(
                        writer, 
                        sheet_name=self.config.output_sheets['consolidated_vinfo'],
                        index=False
                    )
                
                if not self.consolidated_vhost.empty:
                    self.consolidated_vhost.to_excel(
                        writer,
                        sheet_name=self.config.output_sheets['consolidated_vhost'], 
                        index=False
                    )
                
                if not self.consolidated_metadata.empty:
                    self.consolidated_metadata.to_excel(
                        writer,
                        sheet_name=self.config.output_sheets['consolidated_metadata'],
                        index=False
                    )
            
            self.logger.info(f"Data exported to: {output_path}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error exporting to Excel: {str(e)}")
            return False
