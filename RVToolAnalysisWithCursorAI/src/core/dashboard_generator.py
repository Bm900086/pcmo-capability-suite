"""
Dashboard Generator
Creates analytical dashboards replicating the VBA macro functionality.
Generates PCMO dashboards, heatmaps, and master dashboards.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from typing import Dict, List, Tuple, Optional, Any
import logging
from dataclasses import dataclass

try:
    from scipy import stats
except ImportError:
    stats = None

@dataclass
class DashboardMetrics:
    """Container for comprehensive dashboard metrics matching VBA macro output."""
    # Overall Counts
    total_powered_on_vms: int = 0
    total_vms_all: int = 0
    total_hosts: int = 0
    
    # Host Resources (Aggregates & Averages)
    total_physical_cores: float = 0
    avg_cores_per_host: float = 0
    avg_sockets_per_host: float = 0
    avg_ram_gb_per_host: float = 0
    
    # VM Resources (PoweredOn VM Averages)
    avg_vcpus_per_vm: float = 0
    avg_ram_gb_per_vm: float = 0
    avg_provisioned_gb_per_vm: float = 0
    
    # Utilization & Ratios
    vcpu_to_pcore_ratio: float = 0
    avg_cpu_utilization: float = 0
    avg_ram_utilization: float = 0
    
    # Additional calculated metrics
    total_vcpus: int = 0
    total_ram_gb_vms: float = 0
    total_provisioned_gb: float = 0
    total_host_ram_gb: float = 0

class DashboardGenerator:
    """Generates various dashboards from consolidated RVTools data."""
    
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
        # Set matplotlib style
        plt.style.use('default')
        sns.set_palette("husl")
    
    def generate_pcmo_dashboard(self, vinfo_data: pd.DataFrame, vhost_data: pd.DataFrame) -> DashboardMetrics:
        """
        Generate comprehensive PCMO dashboard metrics matching the VBA macro output.
        Replicates the CalculateAndDisplayPCMODashboard VBA function with enhanced metrics.
        """
        try:
            self.logger.info("Generating comprehensive PCMO dashboard metrics")
            
            metrics = DashboardMetrics()
            
            if vinfo_data.empty and vhost_data.empty:
                self.logger.warning("No data available for PCMO dashboard")
                return metrics
            
            # VM Metrics - Overall Counts
            if not vinfo_data.empty:
                # Filter powered on VMs
                powered_on_vms = vinfo_data[
                    vinfo_data['Powerstate'].str.lower() == 'poweredon'
                ] if 'Powerstate' in vinfo_data.columns else pd.DataFrame()
                
                metrics.total_powered_on_vms = len(powered_on_vms)
                metrics.total_vms_all = len(vinfo_data)
                
                # VM Resources (PoweredOn VM Averages)
                if not powered_on_vms.empty:
                    # Total and average vCPUs per VM
                    if 'CPUs' in powered_on_vms.columns:
                        vcpus_series = pd.to_numeric(powered_on_vms['CPUs'], errors='coerce')
                        metrics.total_vcpus = int(vcpus_series.sum())
                        metrics.avg_vcpus_per_vm = vcpus_series.mean()
                    
                    # Total and average RAM per VM (convert MiB to GB)
                    if 'Memory' in powered_on_vms.columns:
                        memory_mib_series = pd.to_numeric(powered_on_vms['Memory'], errors='coerce')
                        metrics.total_ram_gb_vms = (memory_mib_series.sum() / 1024)
                        metrics.avg_ram_gb_per_vm = (memory_mib_series / 1024).mean()
                    
                    # Total and average provisioned storage per VM (convert MiB to GB)
                    if 'Provisioned MiB' in powered_on_vms.columns:
                        prov_mib_series = pd.to_numeric(powered_on_vms['Provisioned MiB'], errors='coerce')
                        metrics.total_provisioned_gb = (prov_mib_series.sum() / 1024)
                        metrics.avg_provisioned_gb_per_vm = (prov_mib_series / 1024).mean()
            
            # Host Metrics - Host Resources (Aggregates & Averages)
            if not vhost_data.empty:
                metrics.total_hosts = len(vhost_data)
                
                # Physical cores
                if '# Cores' in vhost_data.columns:
                    cores_series = pd.to_numeric(vhost_data['# Cores'], errors='coerce')
                    metrics.total_physical_cores = cores_series.sum()
                    metrics.avg_cores_per_host = cores_series.mean()
                
                # CPU sockets
                if '# CPU' in vhost_data.columns:
                    sockets_series = pd.to_numeric(vhost_data['# CPU'], errors='coerce')
                    metrics.avg_sockets_per_host = sockets_series.mean()
                
                # Host RAM (convert MB to GB)
                if '# Memory' in vhost_data.columns:
                    memory_mb_series = pd.to_numeric(vhost_data['# Memory'], errors='coerce')
                    metrics.total_host_ram_gb = (memory_mb_series.sum() / 1024)
                    metrics.avg_ram_gb_per_host = (memory_mb_series / 1024).mean()
                
                # CPU Utilization
                if 'CPU usage %' in vhost_data.columns:
                    cpu_usage_series = pd.to_numeric(vhost_data['CPU usage %'], errors='coerce')
                    metrics.avg_cpu_utilization = cpu_usage_series.mean()
                
                # RAM Utilization
                if 'Memory usage %' in vhost_data.columns:
                    ram_usage_series = pd.to_numeric(vhost_data['Memory usage %'], errors='coerce')
                    metrics.avg_ram_utilization = ram_usage_series.mean()
            
            # Calculate ratios - Utilization & Ratios
            if metrics.total_physical_cores > 0 and metrics.total_vcpus > 0:
                metrics.vcpu_to_pcore_ratio = metrics.total_vcpus / metrics.total_physical_cores
            
            self.logger.info("Comprehensive PCMO dashboard metrics generated successfully")
            return metrics
            
        except Exception as e:
            self.logger.error(f"Error generating PCMO dashboard: {str(e)}")
            return DashboardMetrics()
    
    def create_host_heatmap(self, vhost_data: pd.DataFrame, output_path: Optional[Path] = None) -> bool:
        """
        Create host utilization heatmap.
        Replicates the UpdateHostHeatmapPivot VBA function.
        """
        try:
            self.logger.info("Creating host utilization heatmap")
            
            if vhost_data.empty:
                self.logger.warning("No vHost data available for heatmap")
                return False
            
            # Check if utilization buckets exist
            if 'CPU Utilization Bucket' not in vhost_data.columns or 'RAM Utilization Bucket' not in vhost_data.columns:
                self.logger.error("Utilization buckets not found in vHost data")
                return False
            
            # Create pivot table for heatmap
            pivot_data = pd.crosstab(
                vhost_data['RAM Utilization Bucket'],
                vhost_data['CPU Utilization Bucket'],
                values=vhost_data['Host'],
                aggfunc='count',
                fill_value=0
            )
            
            # Create heatmap
            plt.figure(figsize=(12, 8))
            sns.heatmap(
                pivot_data,
                annot=True,
                fmt='d',
                cmap='Blues',
                cbar_kws={'label': 'Host Count'}
            )
            
            plt.title('Host Utilization Heatmap', fontsize=16, fontweight='bold')
            plt.xlabel('CPU Utilization Bucket', fontsize=12)
            plt.ylabel('RAM Utilization Bucket', fontsize=12)
            plt.tight_layout()
            
            if output_path:
                plt.savefig(output_path, dpi=300, bbox_inches='tight')
                self.logger.info(f"Heatmap saved to: {output_path}")
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error creating host heatmap: {str(e)}")
            return False
    
    def create_vm_distribution_charts(self, vinfo_data: pd.DataFrame, output_dir: Path) -> bool:
        """Create VM distribution charts."""
        try:
            if vinfo_data.empty:
                return False
            
            # VM Power State Distribution
            if 'Powerstate' in vinfo_data.columns:
                plt.figure(figsize=(10, 6))
                powerstate_counts = vinfo_data['Powerstate'].value_counts()
                plt.pie(powerstate_counts.values, labels=powerstate_counts.index, autopct='%1.1f%%')
                plt.title('VM Power State Distribution')
                plt.savefig(output_dir / 'vm_powerstate_distribution.png', dpi=300, bbox_inches='tight')
                plt.close()
            
            # OS Classification Distribution
            if 'OS Classification' in vinfo_data.columns:
                plt.figure(figsize=(12, 6))
                os_counts = vinfo_data['OS Classification'].value_counts()
                plt.bar(range(len(os_counts)), os_counts.values)
                plt.xticks(range(len(os_counts)), os_counts.index, rotation=45, ha='right')
                plt.title('OS Classification Distribution')
                plt.ylabel('Count')
                plt.tight_layout()
                plt.savefig(output_dir / 'os_classification_distribution.png', dpi=300, bbox_inches='tight')
                plt.close()
            
            # VM per Cluster Distribution
            if 'Cluster' in vinfo_data.columns:
                plt.figure(figsize=(12, 6))
                cluster_counts = vinfo_data['Cluster'].value_counts().head(10)  # Top 10 clusters
                plt.bar(range(len(cluster_counts)), cluster_counts.values)
                plt.xticks(range(len(cluster_counts)), cluster_counts.index, rotation=45, ha='right')
                plt.title('Top 10 Clusters by VM Count')
                plt.ylabel('VM Count')
                plt.tight_layout()
                plt.savefig(output_dir / 'vm_per_cluster_distribution.png', dpi=300, bbox_inches='tight')
                plt.close()
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error creating VM distribution charts: {str(e)}")
            return False
    
    def create_resource_utilization_charts(self, vhost_data: pd.DataFrame, output_dir: Path) -> bool:
        """Create host resource utilization charts."""
        try:
            if vhost_data.empty:
                return False
            
            # CPU Utilization Distribution
            if 'CPU usage %' in vhost_data.columns:
                plt.figure(figsize=(10, 6))
                cpu_usage = pd.to_numeric(vhost_data['CPU usage %'], errors='coerce') * 100
                plt.hist(cpu_usage.dropna(), bins=20, alpha=0.7, edgecolor='black')
                plt.title('CPU Utilization Distribution')
                plt.xlabel('CPU Usage (%)')
                plt.ylabel('Host Count')
                plt.axvline(cpu_usage.mean(), color='red', linestyle='--', label=f'Mean: {cpu_usage.mean():.1f}%')
                plt.legend()
                plt.savefig(output_dir / 'cpu_utilization_distribution.png', dpi=300, bbox_inches='tight')
                plt.close()
            
            # Memory Utilization Distribution
            if 'Memory usage %' in vhost_data.columns:
                plt.figure(figsize=(10, 6))
                mem_usage = pd.to_numeric(vhost_data['Memory usage %'], errors='coerce') * 100
                plt.hist(mem_usage.dropna(), bins=20, alpha=0.7, edgecolor='black')
                plt.title('Memory Utilization Distribution')
                plt.xlabel('Memory Usage (%)')
                plt.ylabel('Host Count')
                plt.axvline(mem_usage.mean(), color='red', linestyle='--', label=f'Mean: {mem_usage.mean():.1f}%')
                plt.legend()
                plt.savefig(output_dir / 'memory_utilization_distribution.png', dpi=300, bbox_inches='tight')
                plt.close()
            
            # Utilization Bucket Heatmap (if buckets exist)
            if 'CPU Utilization Bucket' in vhost_data.columns and 'RAM Utilization Bucket' in vhost_data.columns:
                self.create_host_heatmap(vhost_data, output_dir / 'host_utilization_heatmap.png')
            
            return True
            
        except Exception as e:
            self.logger.error(f"Error creating resource utilization charts: {str(e)}")
            return False
    
    def generate_summary_report(self, metrics: DashboardMetrics, output_path: Path) -> bool:
        """Generate a comprehensive summary report with key metrics matching VBA macro output."""
        try:
            report_lines = [
                "RVTools Infrastructure Summary Report",
                "=" * 50,
                "",
                "Category / Metric | Value | Calculation Logic / Notes",
                "-" * 70,
                "",
                "Overall Counts:",
                f"Total VMs (Powered On) | {metrics.total_powered_on_vms:,} | Count of VMs from 'Table_vInfo' where 'Powerstate' is 'poweredOn'",
                f"Total VMs (All Visible) | {metrics.total_vms_all:,} | Total count of visible VMs from 'Table_vInfo'",
                f"Total Hosts (Visible) | {metrics.total_hosts:,} | Total count of visible Hosts from 'Table_vHost'",
                "",
                "Host Resources (Aggregates & Averages):",
                f"Total Physical Cores (Visible Hosts) | {metrics.total_physical_cores:,.0f} | Sum of '# Cores' from visible 'Table_vHost' rows",
                f"Physical Cores per Host (Avg) | {metrics.avg_cores_per_host:.2f} | Total Physical Cores / Total Visible Hosts",
                f"CPUs (Sockets) per Host (Avg) | {metrics.avg_sockets_per_host:.2f} | Average of '# CPU' (sockets) from visible Hosts",
                f"RAM (GB) per Host (Avg) | {metrics.avg_ram_gb_per_host:.2f} | (Sum '# Memory' MB / 1024) / Total Visible Hosts",
                "",
                "VM Resources (PoweredOn VM Averages):",
                f"vCPUs per VM (Avg) | {metrics.avg_vcpus_per_vm:.2f} | Total vCPUs / Total Powered On VMs",
                f"GB RAM per VM (Avg) | {metrics.avg_ram_gb_per_vm:.2f} | (Sum 'Memory' MiB / 1024) / Total Powered On VMs",
                f"Avg Provisioned Storage (GB) per VM | {metrics.avg_provisioned_gb_per_vm:.2f} | (Sum 'Provisioned MiB' / 1024) / Total Powered On VMs",
                "",
                "Utilization & Ratios:",
                f"vCPU to pCore ratio | {metrics.vcpu_to_pcore_ratio:.2f} | Total vCPUs (Powered On VMs) / Total Physical Cores (Visible Hosts)",
                f"CPU Utilization % (Host Avg) | {metrics.avg_cpu_utilization*100:.1f}% | Average of 'CPU usage %' from visible Hosts",
                f"RAM Utilization % (Host Avg) | {metrics.avg_ram_utilization*100:.1f}% | Average of 'Memory usage %' from visible Hosts",
                f"Threads/Core (Cluster Avg) | N/A (Requires vCluster data) | vCluster data not processed by this application",
                "",
                "Additional Calculated Totals:",
                f"Total vCPUs (Powered On VMs) | {metrics.total_vcpus:,} | Sum of vCPUs from all powered-on VMs",
                f"Total VM RAM (GB) | {metrics.total_ram_gb_vms:,.2f} | Total memory allocated to all powered-on VMs",
                f"Total Provisioned Storage (GB) | {metrics.total_provisioned_gb:,.2f} | Total storage provisioned for all powered-on VMs",
                f"Total Host RAM (GB) | {metrics.total_host_ram_gb:,.2f} | Total physical memory across all hosts",
                "",
                f"Report generated on: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}",
                "",
                "Note: This report replicates the PCMO Dashboard metrics from the original VBA macro.",
                "All calculations follow the same logic and formulas as the Excel-based solution."
            ]
            
            with open(output_path, 'w') as f:
                f.write('\n'.join(report_lines))
            
            self.logger.info(f"Comprehensive summary report saved to: {output_path}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error generating summary report: {str(e)}")
            return False
    
    def create_advanced_analysis_charts(self, vinfo_data: pd.DataFrame, vhost_data: pd.DataFrame, charts_dir: Path):
        """Create advanced scatter plots and analysis charts."""
        
        # 1. VM Resource Allocation Scatter Plot
        try:
            plt.figure(figsize=(12, 8))
            
            # Filter powered-on VMs for analysis
            powered_on_vms = vinfo_data[vinfo_data['Powerstate'] == 'poweredOn'].copy()
            
            if not powered_on_vms.empty:
                # Create scatter plot of CPU vs Memory allocation
                scatter = plt.scatter(
                    powered_on_vms['CPUs'], 
                    powered_on_vms['Memory'] / 1024,  # Convert MiB to GiB
                    c=powered_on_vms['Provisioned MiB'] / 1024,  # Color by storage
                    alpha=0.6,
                    s=60,
                    cmap='viridis'
                )
                
                plt.colorbar(scatter, label='Provisioned Storage (GB)')
                plt.xlabel('vCPUs')
                plt.ylabel('Memory (GB)')
                plt.title('VM Resource Allocation Analysis\n(Color indicates Provisioned Storage)')
                plt.grid(True, alpha=0.3)
                
                # Add trend line
                z = np.polyfit(powered_on_vms['CPUs'], powered_on_vms['Memory'] / 1024, 1)
                p = np.poly1d(z)
                plt.plot(powered_on_vms['CPUs'], p(powered_on_vms['CPUs']), "r--", alpha=0.8, label='Trend Line')
                plt.legend()
                
                plt.tight_layout()
                plt.savefig(charts_dir / 'vm_resource_allocation_scatter.png', dpi=300, bbox_inches='tight')
                plt.close()
                
                self.logger.info("VM resource allocation scatter plot created")
            
        except Exception as e:
            self.logger.error(f"Error creating VM resource scatter plot: {str(e)}")
            plt.close()
    
        # 2. Host Performance Efficiency Scatter Plot
        try:
            plt.figure(figsize=(12, 8))
            
            if not vhost_data.empty:
                # Calculate efficiency metrics
                vhost_analysis = vhost_data.copy()
                vhost_analysis['CPU Efficiency'] = vhost_analysis['CPU usage %'] / 100
                vhost_analysis['Memory Efficiency'] = vhost_analysis['Memory usage %'] / 100
                
                # Create scatter plot
                scatter = plt.scatter(
                    vhost_analysis['CPU Efficiency'],
                    vhost_analysis['Memory Efficiency'],
                    c=vhost_analysis['# Cores'],
                    alpha=0.7,
                    s=80,
                    cmap='plasma'
                )
                
                plt.colorbar(scatter, label='Physical Cores')
                plt.xlabel('CPU Utilization (0-1)')
                plt.ylabel('Memory Utilization (0-1)')
                plt.title('Host Performance Efficiency Analysis\n(Color indicates Physical Core Count)')
                
                # Add quadrant lines
                plt.axhline(y=0.5, color='gray', linestyle='--', alpha=0.5)
                plt.axvline(x=0.5, color='gray', linestyle='--', alpha=0.5)
                
                # Add quadrant labels
                plt.text(0.25, 0.75, 'High Memory\nLow CPU', ha='center', va='center', 
                        bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.7))
                plt.text(0.75, 0.75, 'High Memory\nHigh CPU', ha='center', va='center',
                        bbox=dict(boxstyle='round', facecolor='lightcoral', alpha=0.7))
                plt.text(0.25, 0.25, 'Low Memory\nLow CPU', ha='center', va='center',
                        bbox=dict(boxstyle='round', facecolor='lightgreen', alpha=0.7))
                plt.text(0.75, 0.25, 'High CPU\nLow Memory', ha='center', va='center',
                        bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.7))
                
                plt.grid(True, alpha=0.3)
                plt.xlim(0, 1)
                plt.ylim(0, 1)
                
                plt.tight_layout()
                plt.savefig(charts_dir / 'host_efficiency_scatter.png', dpi=300, bbox_inches='tight')
                plt.close()
                
                self.logger.info("Host efficiency scatter plot created")
                
        except Exception as e:
            self.logger.error(f"Error creating host efficiency scatter plot: {str(e)}")
            plt.close()
    
    def create_correlation_analysis(self, vinfo_data: pd.DataFrame, vhost_data: pd.DataFrame, charts_dir: Path):
        """Create correlation analysis charts."""
        
        # 1. VM Resource Correlation Heatmap
        try:
            powered_on_vms = vinfo_data[vinfo_data['Powerstate'] == 'poweredOn'].copy()
            
            if not powered_on_vms.empty:
                # Select numeric columns for correlation
                correlation_columns = ['CPUs', 'Memory', 'Provisioned MiB']
                vm_corr_data = powered_on_vms[correlation_columns].copy()
                vm_corr_data.columns = ['vCPUs', 'Memory (MiB)', 'Provisioned (MiB)']
                
                # Calculate correlation matrix
                correlation_matrix = vm_corr_data.corr(method='pearson', numeric_only=True)
                
                # Create heatmap
                plt.figure(figsize=(10, 8))
                sns.heatmap(correlation_matrix, 
                           annot=True, 
                           cmap='RdYlBu_r', 
                           center=0,
                           square=True,
                           fmt='.3f',
                           cbar_kws={'label': 'Correlation Coefficient'})
                
                plt.title('VM Resource Allocation Correlation Matrix\n(Powered-On VMs Only)')
                plt.tight_layout()
                plt.savefig(charts_dir / 'vm_resource_correlation_heatmap.png', dpi=300, bbox_inches='tight')
                plt.close()
                
                self.logger.info("VM resource correlation heatmap created")
                
        except Exception as e:
            self.logger.error(f"Error creating VM correlation heatmap: {str(e)}")
            plt.close()
        
        # 2. Host Infrastructure Correlation Heatmap
        try:
            if not vhost_data.empty:
                # Select numeric columns for correlation
                host_columns = ['# CPU', '# Cores', '# Memory', 'CPU usage %', 'Memory usage %']
                host_corr_data = vhost_data[host_columns].copy()
                host_corr_data.columns = ['Sockets', 'Cores', 'Memory (MB)', 'CPU Usage %', 'Memory Usage %']
                
                # Calculate correlation matrix
                correlation_matrix = host_corr_data.corr()
                
                # Create heatmap
                plt.figure(figsize=(10, 8))
                sns.heatmap(correlation_matrix, 
                           annot=True, 
                           cmap='RdYlBu_r', 
                           center=0,
                           square=True,
                           fmt='.3f',
                           cbar_kws={'label': 'Correlation Coefficient'})
                
                plt.title('Host Infrastructure Correlation Matrix')
                plt.tight_layout()
                plt.savefig(charts_dir / 'host_infrastructure_correlation_heatmap.png', dpi=300, bbox_inches='tight')
                plt.close()
                
                self.logger.info("Host infrastructure correlation heatmap created")
                
        except Exception as e:
            self.logger.error(f"Error creating host correlation heatmap: {str(e)}")
            plt.close()
    
    def create_performance_heatmaps(self, vinfo_data: pd.DataFrame, vhost_data: pd.DataFrame, charts_dir: Path):
        """Create performance and utilization heatmaps."""
        
        # 1. Enhanced Host Utilization Heatmap with Clustering
        try:
            if not vhost_data.empty:
                # Prepare data for heatmap
                heatmap_data = vhost_data.copy()
                
                # Create utilization matrix
                utilization_matrix = heatmap_data[['Host', 'CPU usage %', 'Memory usage %']].set_index('Host')
                
                # Sort by CPU usage for better visualization
                utilization_matrix = utilization_matrix.sort_values('CPU usage %', ascending=False)
                
                # Create enhanced heatmap
                plt.figure(figsize=(14, max(8, len(utilization_matrix) * 0.3)))
                
                # Create custom colormap
                colors = ['#2E8B57', '#FFD700', '#FF6347']  # Green, Yellow, Red
                n_bins = 100
                cmap = sns.blend_palette(colors, n_colors=n_bins, as_cmap=True)
                
                ax = sns.heatmap(utilization_matrix.T, 
                               annot=True, 
                               fmt='.1f',
                               cmap=cmap,
                               cbar_kws={'label': 'Utilization %'},
                               xticklabels=True,
                               yticklabels=['CPU Usage %', 'Memory Usage %'])
                
                plt.title('Host Utilization Heatmap\n(Sorted by CPU Usage)')
                plt.xlabel('ESX Hosts')
                plt.ylabel('Utilization Metrics')
                
                # Rotate x-axis labels for better readability
                plt.xticks(rotation=45, ha='right')
                
                plt.tight_layout()
                plt.savefig(charts_dir / 'enhanced_host_utilization_heatmap.png', dpi=300, bbox_inches='tight')
                plt.close()
                
                self.logger.info("Enhanced host utilization heatmap created")
                
        except Exception as e:
            self.logger.error(f"Error creating enhanced utilization heatmap: {str(e)}")
            plt.close()
        
        # 2. VM Density by Cluster Heatmap
        try:
            if not vinfo_data.empty:
                # Create VM density analysis by cluster and power state
                cluster_analysis = pd.crosstab(
                    vinfo_data['Cluster'],
                    vinfo_data['Powerstate'],
                    normalize='index'
                ) * 100  # Convert to percentage
                
                if not cluster_analysis.empty:
                    plt.figure(figsize=(12, max(6, len(cluster_analysis) * 0.4)))
                    
                    # Create heatmap
                    sns.heatmap(cluster_analysis,
                               annot=True,
                               fmt='.1f',
                               cmap='YlOrRd',
                               cbar_kws={'label': 'Percentage of VMs'})
                    
                    plt.title('VM Power State Distribution by Cluster\n(Percentage within each Cluster)')
                    plt.xlabel('Power State')
                    plt.ylabel('Cluster')
                    plt.tight_layout()
                    plt.savefig(charts_dir / 'vm_density_by_cluster_heatmap.png', dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    self.logger.info("VM density by cluster heatmap created")
                    
        except Exception as e:
            self.logger.error(f"Error creating VM density heatmap: {str(e)}")
            plt.close()
        
        # 3. Resource Allocation Heatmap by OS Type
        try:
            powered_on_vms = vinfo_data[vinfo_data['Powerstate'] == 'poweredOn'].copy()
            
            if not powered_on_vms.empty and 'OS Classification' in powered_on_vms.columns:
                # Group by OS Classification and calculate averages
                os_analysis = powered_on_vms.groupby('OS Classification').agg({
                    'CPUs': 'mean',
                    'Memory': 'mean',
                    'Provisioned MiB': 'mean'
                }).round(2)
                
                # Convert Memory from MiB to GiB for better readability
                os_analysis['Memory'] = os_analysis['Memory'] / 1024
                os_analysis['Provisioned MiB'] = os_analysis['Provisioned MiB'] / 1024
                
                # Rename columns for display
                os_analysis.columns = ['Avg vCPUs', 'Avg Memory (GB)', 'Avg Provisioned (GB)']
                
                if not os_analysis.empty:
                    plt.figure(figsize=(10, max(6, len(os_analysis) * 0.5)))
                    
                    # Normalize data for heatmap (z-score normalization)
                    from scipy.stats import zscore
                    normalized_data = os_analysis.apply(zscore)
                    
                    sns.heatmap(normalized_data,
                               annot=os_analysis,  # Show actual values
                               fmt='.2f',
                               cmap='RdBu_r',
                               center=0,
                               cbar_kws={'label': 'Normalized Score (z-score)'})
                    
                    plt.title('Resource Allocation by OS Classification\n(Normalized Heatmap with Actual Values)')
                    plt.xlabel('Resource Metrics')
                    plt.ylabel('OS Classification')
                    plt.tight_layout()
                    plt.savefig(charts_dir / 'resource_allocation_by_os_heatmap.png', dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    self.logger.info("Resource allocation by OS heatmap created")
                    
        except Exception as e:
            self.logger.error(f"Error creating OS resource allocation heatmap: {str(e)}")
            plt.close()
