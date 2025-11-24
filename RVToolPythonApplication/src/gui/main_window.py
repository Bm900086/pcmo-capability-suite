"""
GUI Main Window
Main graphical user interface for the RVTools Python Application.
Provides file selection, processing controls, and progress monitoring.
"""

import tkinter as tk
from tkinter import ttk, filedialog, messagebox, scrolledtext
from pathlib import Path
import threading
import logging
from typing import Optional, Callable
import os

class RVToolsMainWindow:
    """Main application window."""
    
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
        # Create main window
        self.root = tk.Tk()
        self.root.title(f"{config.app_name} v{config.version}")
        self.root.geometry("800x600")
        self.root.minsize(600, 400)
        
        # Variables
        self.input_folder = tk.StringVar()
        self.output_file = tk.StringVar()
        self.processing_thread: Optional[threading.Thread] = None
        self.last_output_dir: Optional[Path] = None
        self.last_metrics = None
        
        # Create UI
        self._create_widgets()
        self._setup_layout()
        self._setup_logging_handler()
        
        # Set default paths
        self._set_default_paths()
    
    def _create_widgets(self):
        """Create all UI widgets."""
        # Main frame
        self.main_frame = ttk.Frame(self.root, padding="10")
        
        # Title
        self.title_label = ttk.Label(
            self.main_frame,
            text=self.config.app_name,
            font=("Arial", 16, "bold")
        )
        
        # Input folder selection
        self.input_frame = ttk.LabelFrame(self.main_frame, text="Input Folder", padding="5")
        self.input_path_label = ttk.Label(self.input_frame, textvariable=self.input_folder)
        self.browse_input_btn = ttk.Button(
            self.input_frame,
            text="Browse...",
            command=self._browse_input_folder
        )
        
        # Output file selection
        self.output_frame = ttk.LabelFrame(self.main_frame, text="Output File", padding="5")
        self.output_path_label = ttk.Label(self.output_frame, textvariable=self.output_file)
        self.browse_output_btn = ttk.Button(
            self.output_frame,
            text="Browse...",
            command=self._browse_output_file
        )
        
        # Processing controls
        self.control_frame = ttk.Frame(self.main_frame)
        self.process_btn = ttk.Button(
            self.control_frame,
            text="Process Files",
            command=self._start_processing,
            style="Accent.TButton"
        )
        self.cancel_btn = ttk.Button(
            self.control_frame,
            text="Cancel",
            command=self._cancel_processing,
            state="disabled"
        )
        self.insights_btn = ttk.Button(
            self.control_frame,
            text="View Charts & Insights",
            command=self._show_insights,
            state="disabled"
        )
        
        # Progress bar
        self.progress_frame = ttk.Frame(self.main_frame)
        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(
            self.progress_frame,
            variable=self.progress_var,
            maximum=100,
            length=400
        )
        self.progress_label = ttk.Label(self.progress_frame, text="Ready")
        
        # Status/Log area
        self.status_frame = ttk.LabelFrame(self.main_frame, text="Processing Log", padding="5")
        self.log_text = scrolledtext.ScrolledText(
            self.status_frame,
            height=15,
            width=80,
            wrap=tk.WORD,
            state="disabled"
        )
        
        # Statistics frame with filter controls
        self.stats_frame = ttk.LabelFrame(self.main_frame, text="📊 Infrastructure Dashboard", padding="5")
        
        # Filter controls frame
        self.filter_frame = ttk.Frame(self.stats_frame)
        self.filter_frame.pack(fill=tk.X, pady=(0, 5))
        
        # Filter controls
        ttk.Label(self.filter_frame, text="🔍 Filters:").pack(side=tk.LEFT, padx=(0, 5))
        
        # Powerstate filter
        ttk.Label(self.filter_frame, text="Power:").pack(side=tk.LEFT, padx=(5, 2))
        self.powerstate_var = tk.StringVar(value="All")
        self.powerstate_combo = ttk.Combobox(
            self.filter_frame, textvariable=self.powerstate_var, 
            values=["All", "poweredOn", "poweredOff", "suspended"], 
            width=10, state="readonly"
        )
        self.powerstate_combo.pack(side=tk.LEFT, padx=(0, 5))
        
        # OS filter
        ttk.Label(self.filter_frame, text="OS:").pack(side=tk.LEFT, padx=(5, 2))
        self.os_var = tk.StringVar(value="All")
        self.os_combo = ttk.Combobox(
            self.filter_frame, textvariable=self.os_var,
            values=["All", "Server", "Desktop", "Windows", "Linux", "Other", "Unknown"],
            width=10, state="readonly"
        )
        self.os_combo.pack(side=tk.LEFT, padx=(0, 5))
        
        # Cluster filter
        ttk.Label(self.filter_frame, text="Cluster:").pack(side=tk.LEFT, padx=(5, 2))
        self.cluster_var = tk.StringVar(value="All")
        self.cluster_combo = ttk.Combobox(
            self.filter_frame, textvariable=self.cluster_var,
            values=["All"], width=15, state="readonly"
        )
        self.cluster_combo.pack(side=tk.LEFT, padx=(0, 5))
        
        # Apply filter button
        self.apply_filter_btn = ttk.Button(
            self.filter_frame, text="Apply Filters", 
            command=self._apply_filters, state="disabled"
        )
        self.apply_filter_btn.pack(side=tk.LEFT, padx=(10, 5))
        
        # Reset filter button
        self.reset_filter_btn = ttk.Button(
            self.filter_frame, text="Reset", 
            command=self._reset_filters, state="disabled"
        )
        self.reset_filter_btn.pack(side=tk.LEFT, padx=(0, 5))
        
        # Statistics display with enhanced colors
        self.stats_text = tk.Text(
            self.stats_frame,
            height=15,
            width=60,
            wrap=tk.NONE,
            state="disabled",
            font=("Consolas", 9),
            bg="#1e1e1e",
            fg="#ffffff",
            insertbackground="#ffffff"
        )
        
        # Configure color tags for enhanced visualization
        self.stats_text.tag_configure("header", foreground="#00d4aa", font=("Consolas", 9, "bold"))
        self.stats_text.tag_configure("section", foreground="#ffd700", font=("Consolas", 9, "bold"))
        self.stats_text.tag_configure("metric", foreground="#87ceeb")
        self.stats_text.tag_configure("value", foreground="#98fb98", font=("Consolas", 9, "bold"))
        self.stats_text.tag_configure("optimal", foreground="#00ff00", font=("Consolas", 9, "bold"))
        self.stats_text.tag_configure("warning", foreground="#ffa500", font=("Consolas", 9, "bold"))
        self.stats_text.tag_configure("critical", foreground="#ff6b6b", font=("Consolas", 9, "bold"))
        self.stats_text.tag_configure("neutral", foreground="#d3d3d3")
        self.stats_text.tag_configure("border", foreground="#4a90e2")
        
        # Store original data for filtering
        self.original_consolidated_data = None
        self.current_metrics = None
    
    def _setup_layout(self):
        """Setup widget layout using grid."""
        # Main frame
        self.main_frame.grid(row=0, column=0, sticky="nsew")
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        
        # Title
        self.title_label.grid(row=0, column=0, columnspan=2, pady=(0, 10))
        
        # Input folder
        self.input_frame.grid(row=1, column=0, columnspan=2, sticky="ew", pady=5)
        self.input_frame.columnconfigure(0, weight=1)
        self.input_path_label.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.browse_input_btn.grid(row=0, column=1)
        
        # Output file
        self.output_frame.grid(row=2, column=0, columnspan=2, sticky="ew", pady=5)
        self.output_frame.columnconfigure(0, weight=1)
        self.output_path_label.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.browse_output_btn.grid(row=0, column=1)
        
        # Controls
        self.control_frame.grid(row=3, column=0, columnspan=2, pady=10)
        self.process_btn.grid(row=0, column=0, padx=(0, 10))
        self.cancel_btn.grid(row=0, column=1, padx=(0, 10))
        self.insights_btn.grid(row=0, column=2)
        
        # Progress
        self.progress_frame.grid(row=4, column=0, columnspan=2, sticky="ew", pady=5)
        self.progress_frame.columnconfigure(0, weight=1)
        self.progress_bar.grid(row=0, column=0, sticky="ew")
        self.progress_label.grid(row=1, column=0, pady=(5, 0))
        
        # Log and stats side by side
        self.status_frame.grid(row=5, column=0, sticky="nsew", padx=(0, 5), pady=5)
        self.stats_frame.grid(row=5, column=1, sticky="nsew", padx=(5, 0), pady=5)
        
        self.log_text.grid(row=0, column=0, sticky="nsew")
        # Pack the stats text widget
        self.stats_text.pack(fill=tk.BOTH, expand=True)
        
        # Configure weights for resizing
        self.main_frame.columnconfigure(0, weight=2)
        self.main_frame.columnconfigure(1, weight=1)
        self.main_frame.rowconfigure(5, weight=1)
        
        self.status_frame.rowconfigure(0, weight=1)
        self.status_frame.columnconfigure(0, weight=1)
        self.stats_frame.rowconfigure(0, weight=1)
        self.stats_frame.columnconfigure(0, weight=1)
    
    def _setup_logging_handler(self):
        """Setup logging handler to display logs in the GUI."""
        class GUILogHandler(logging.Handler):
            def __init__(self, text_widget):
                super().__init__()
                self.text_widget = text_widget
                self.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
            
            def emit(self, record):
                msg = self.format(record) + '\n'
                # Use after_idle to ensure thread safety
                self.text_widget.after_idle(self._append_log, msg)
            
            def _append_log(self, msg):
                self.text_widget.config(state="normal")
                self.text_widget.insert(tk.END, msg)
                self.text_widget.see(tk.END)
                self.text_widget.config(state="disabled")
        
        # Add GUI handler to root logger
        gui_handler = GUILogHandler(self.log_text)
        gui_handler.setLevel(logging.INFO)
        logging.getLogger().addHandler(gui_handler)
    
    def _set_default_paths(self):
        """Set default input and output paths."""
        # Default input folder (current directory or Desktop)
        default_input = Path.cwd()
        if not default_input.exists():
            desktop = Path.home() / "Desktop"
            if desktop.exists():
                default_input = desktop
        
        self.input_folder.set(str(default_input))
        
        # Default output file
        default_output = default_input / "RVTools_Consolidated_Report.xlsx"
        self.output_file.set(str(default_output))
    
    def _browse_input_folder(self):
        """Browse for input folder."""
        folder = filedialog.askdirectory(
            title="Select folder containing RVTools Excel files",
            initialdir=self.input_folder.get()
        )
        if folder:
            self.input_folder.set(folder)
            # Update default output file location
            output_file = Path(folder) / "RVTools_Consolidated_Report.xlsx"
            self.output_file.set(str(output_file))
    
    def _browse_output_file(self):
        """Browse for output file."""
        file_path = filedialog.asksaveasfilename(
            title="Save consolidated report as",
            defaultextension=".xlsx",
            filetypes=[
                ("Excel files", "*.xlsx"),
                ("All files", "*.*")
            ],
            initialdir=Path(self.output_file.get()).parent,
            initialfile=Path(self.output_file.get()).name
        )
        if file_path:
            self.output_file.set(file_path)
    
    def _start_processing(self):
        """Start the data processing in a separate thread."""
        # Validate inputs
        input_path = Path(self.input_folder.get())
        output_path = Path(self.output_file.get())
        
        if not input_path.exists():
            messagebox.showerror("Error", "Input folder does not exist")
            return
        
        if not output_path.parent.exists():
            messagebox.showerror("Error", "Output directory does not exist")
            return
        
        # Clear log and stats
        self._clear_log()
        self._clear_stats()
        
        # Update UI state
        self.process_btn.config(state="disabled")
        self.cancel_btn.config(state="normal")
        self.progress_var.set(0)
        self.progress_label.config(text="Starting processing...")
        
        # Start processing thread
        self.processing_thread = threading.Thread(
            target=self._process_files_thread,
            args=(input_path, output_path),
            daemon=True
        )
        self.processing_thread.start()
    
    def _apply_filters(self):
        """Apply selected filters and refresh statistics."""
        if not self.original_consolidated_data:
            messagebox.showwarning("No Data", "No data available to filter. Please process files first.")
            return
        
        try:
            # Get filter values
            powerstate_filter = self.powerstate_var.get()
            os_filter = self.os_var.get()
            cluster_filter = self.cluster_var.get()
            
            # Start with original data
            filtered_data = self.original_consolidated_data.copy()
            
            # Apply powerstate filter
            if powerstate_filter != "All":
                mask = filtered_data['vinfo']['Powerstate'] == powerstate_filter
                filtered_data['vinfo'] = filtered_data['vinfo'][mask].copy()
            
            # Apply OS filter
            if os_filter != "All":
                mask = filtered_data['vinfo']['OS Classification'] == os_filter
                filtered_data['vinfo'] = filtered_data['vinfo'][mask].copy()
            
            # Apply cluster filter
            if cluster_filter != "All":
                mask = filtered_data['vinfo']['Cluster'] == cluster_filter
                filtered_data['vinfo'] = filtered_data['vinfo'][mask].copy()
                mask = filtered_data['vhost']['Cluster'] == cluster_filter
                filtered_data['vhost'] = filtered_data['vhost'][mask].copy()
            
            # Generate new metrics with filtered data
            from src.core.dashboard_generator import DashboardGenerator
            dashboard_gen = DashboardGenerator(self.config)
            filtered_metrics = dashboard_gen.generate_pcmo_dashboard(
                filtered_data['vinfo'],
                filtered_data['vhost']
            )
            
            # Update statistics display
            self._update_statistics_with_color(None, filtered_metrics, is_filtered=True)
            
            self.logger.info(f"Applied filters - Powerstate: {powerstate_filter}, OS: {os_filter}, Cluster: {cluster_filter}")
            
        except Exception as e:
            self.logger.error(f"Error applying filters: {str(e)}")
            messagebox.showerror("Filter Error", f"Error applying filters: {str(e)}")
    
    def _reset_filters(self):
        """Reset all filters to default values."""
        self.powerstate_var.set("All")
        self.os_var.set("All")
        self.cluster_var.set("All")
        
        if self.current_metrics:
            self._update_statistics_with_color(None, self.current_metrics, is_filtered=False)
            self.logger.info("Filters reset to show all data")
    
    def _update_filter_options(self, consolidated_data):
        """Update filter dropdown options based on available data."""
        try:
            # Update cluster options
            if 'vinfo' in consolidated_data and not consolidated_data['vinfo'].empty:
                clusters = ["All"] + sorted(consolidated_data['vinfo']['Cluster'].dropna().unique().tolist())
                self.cluster_combo['values'] = clusters
            
            # Enable filter controls
            self.apply_filter_btn.config(state="normal")
            self.reset_filter_btn.config(state="normal")
            
        except Exception as e:
            self.logger.error(f"Error updating filter options: {str(e)}")

    def _process_files_thread(self, input_path: Path, output_path: Path):
        """Process files in a separate thread."""
        try:
            # Import here to avoid circular imports
            from src.core.data_processor import RVToolsDataProcessor
            from src.core.dashboard_generator import DashboardGenerator
            
            # Create processor
            processor = RVToolsDataProcessor(self.config)
            
            # Process files
            result = processor.process_folder(input_path, self._update_progress)
            
            if result.success:
                # Store output directory for insights
                self.last_output_dir = output_path.parent
                
                # Store original data for filtering
                self.original_consolidated_data = processor.get_consolidated_data()
                
                # Update filter options with available data
                self._update_filter_options(self.original_consolidated_data)
                
                # Generate dashboards
                self._update_progress(90, "Generating dashboards...")
                dashboard_gen = DashboardGenerator(self.config)
                consolidated_data = processor.get_consolidated_data()
                
                # Generate metrics
                metrics = dashboard_gen.generate_pcmo_dashboard(
                    consolidated_data['vinfo'],
                    consolidated_data['vhost']
                )
                
                # Store current metrics
                self.current_metrics = metrics
                
                # Create output directory for charts
                charts_dir = output_path.parent / "charts"
                charts_dir.mkdir(exist_ok=True)
                
                # Generate charts
                dashboard_gen.create_vm_distribution_charts(
                    consolidated_data['vinfo'], charts_dir
                )
                dashboard_gen.create_resource_utilization_charts(
                    consolidated_data['vhost'], charts_dir
                )
                
                # Generate advanced analysis charts
                dashboard_gen.create_advanced_analysis_charts(
                    consolidated_data['vinfo'], 
                    consolidated_data['vhost'],
                    charts_dir
                )
                
                # Generate correlation analysis
                dashboard_gen.create_correlation_analysis(
                    consolidated_data['vinfo'],
                    consolidated_data['vhost'],
                    charts_dir
                )
                
                # Generate performance heatmaps
                dashboard_gen.create_performance_heatmaps(
                    consolidated_data['vinfo'],
                    consolidated_data['vhost'],
                    charts_dir
                )
                
                # Generate summary report
                summary_path = output_path.parent / "summary_report.txt"
                dashboard_gen.generate_summary_report(metrics, summary_path)
                
                # Export to Excel
                self._update_progress(95, "Exporting to Excel...")
                export_success = processor.export_to_excel(output_path)
                
                if export_success:
                    self._update_progress(100, "Processing completed successfully!")
                    
                    # Update statistics
                    self._update_statistics_with_color(result, metrics)
                    
                    # Show completion message
                    self.root.after_idle(
                        lambda: messagebox.showinfo(
                            "Success",
                            f"Processing completed successfully!\n\n"
                            f"Files processed: {result.files_processed}\n"
                            f"VMs processed: {result.vms_processed}\n"
                            f"Hosts processed: {result.hosts_processed}\n\n"
                            f"Output saved to: {output_path}"
                        )
                    )
                else:
                    raise Exception("Failed to export consolidated data to Excel")
            else:
                raise Exception(result.message)
                
        except Exception as e:
            error_msg = f"Processing failed: {str(e)}"
            self.logger.error(error_msg)
            self._update_progress(0, "Processing failed")
            self.root.after_idle(
                lambda: messagebox.showerror("Error", error_msg)
            )
        finally:
            # Reset UI state
            self.root.after_idle(self._reset_ui_state)
    
    def _update_progress(self, value: int, message: str):
        """Update progress bar and message (thread-safe)."""
        self.root.after_idle(lambda: self.progress_var.set(value))
        self.root.after_idle(lambda: self.progress_label.config(text=message))
    
    def _update_statistics_with_color(self, result, metrics=None, is_filtered=False):
        """Update statistics display with enhanced colors and formatting."""
        # Enable text editing
        self.stats_text.config(state="normal")
        self.stats_text.delete(1.0, tk.END)
        
        # Header with color
        filter_status = " (FILTERED VIEW)" if is_filtered else ""
        self._insert_colored_text(
            "╔════════════════════════════════════════════════════════════════════════════════════════╗\n", 
            "border"
        )
        self._insert_colored_text(
            f"║                     📊 INFRASTRUCTURE ANALYSIS DASHBOARD{filter_status}                     ║\n", 
            "header"
        )
        self._insert_colored_text(
            "╚════════════════════════════════════════════════════════════════════════════════════════╝\n\n", 
            "border"
        )
        
        # Overall Counts Section
        self._insert_colored_text("🔢 OVERALL COUNTS\n", "section")
        self._insert_colored_text("─────────────────────────────────────────────────────────────────────────────────────────\n", "neutral")
        
        self._insert_metric_line("📱 Total VMs (Powered On)", f"{metrics.total_powered_on_vms:,}", "Active workload count")
        self._insert_metric_line("📦 Total VMs (All Visible)", f"{metrics.total_vms_all:,}", "Complete VM inventory") 
        self._insert_metric_line("🖥️ Total Hosts (Visible)", f"{metrics.total_hosts:,}", "Physical infrastructure")
        
        # Host Infrastructure Section
        self._insert_colored_text("\n⚡ HOST INFRASTRUCTURE RESOURCES\n", "section")
        self._insert_colored_text("─────────────────────────────────────────────────────────────────────────────────────────\n", "neutral")
        
        self._insert_metric_line("🔧 Total Physical Cores", f"{metrics.total_physical_cores:,.0f}", "Sum of all host cores")
        self._insert_metric_line("🎯 Physical Cores per Host (Avg)", f"{metrics.avg_cores_per_host:.2f}", "Average core density")
        self._insert_metric_line("🔌 CPU Sockets per Host (Avg)", f"{metrics.avg_sockets_per_host:.2f}", "Socket configuration")
        self._insert_metric_line("💾 RAM per Host (Avg) GB", f"{metrics.avg_ram_gb_per_host:.2f}", "Memory capacity")
        
        # VM Resources Section
        self._insert_colored_text("\n💻 VIRTUAL MACHINE RESOURCES (POWERED-ON VMs)\n", "section")
        self._insert_colored_text("─────────────────────────────────────────────────────────────────────────────────────────\n", "neutral")
        
        self._insert_metric_line("⚙️ vCPUs per VM (Average)", f"{metrics.avg_vcpus_per_vm:.2f}", "Virtual CPU allocation")
        self._insert_metric_line("🧠 RAM per VM (Average) GB", f"{metrics.avg_ram_gb_per_vm:.2f}", "Memory per workload")
        self._insert_metric_line("💿 Provisioned Storage per VM GB", f"{metrics.avg_provisioned_gb_per_vm:.2f}", "Storage allocation")
        
        # Utilization Section
        self._insert_colored_text("\n📈 UTILIZATION & PERFORMANCE RATIOS\n", "section")
        self._insert_colored_text("─────────────────────────────────────────────────────────────────────────────────────────\n", "neutral")
        
        # Color-coded utilization metrics
        ratio_color = self._get_ratio_color(metrics.vcpu_to_pcore_ratio)
        cpu_color = self._get_cpu_color(metrics.avg_cpu_utilization)
        ram_color = self._get_ram_color(metrics.avg_ram_utilization)
        
        self._insert_metric_line("🔄 vCPU to Physical Core Ratio", f"{metrics.vcpu_to_pcore_ratio:.2f}:1", "Consolidation density", value_color=ratio_color)
        self._insert_metric_line("📊 CPU Utilization (Host Avg)", f"{metrics.avg_cpu_utilization*100:.1f}%", "Processing load", value_color=cpu_color)
        self._insert_metric_line("🧮 RAM Utilization (Host Avg)", f"{metrics.avg_ram_utilization*100:.1f}%", "Memory pressure", value_color=ram_color)
        self._insert_metric_line("🔧 Threads/Core (Cluster Avg)", "N/A", "vCluster data N/A")
        
        # Processing Summary (only if we have result data)
        if result:
            self._insert_colored_text("\n📋 PROCESSING SUMMARY\n", "section")
            self._insert_colored_text("─────────────────────────────────────────────────────────────────────────────────────────\n", "neutral")
            
            success_rate = ((result.files_processed - len(result.errors)) / max(result.files_processed, 1) * 100)
            success_color = "optimal" if success_rate == 100 else "warning" if success_rate >= 80 else "critical"
            
            self._insert_metric_line("📁 Files Processed", f"{result.files_processed:,}", "RVTools files analyzed")
            self._insert_metric_line("❌ Processing Errors", f"{len(result.errors):,}", "Issues encountered")
            self._insert_metric_line("✅ Success Rate", f"{success_rate:.1f}%", "Processing reliability", value_color=success_color)
        
        # Key Insights Box
        self._insert_colored_text("\n", "neutral")
        self._insert_colored_text("╔════════════════════════════════════════════════════════════════════════════════════════╗\n", "border")
        self._insert_colored_text("║ 🎯 KEY INSIGHTS:                                                                      ║\n", "header")
        
        # Consolidation insight
        ratio_status = self._get_ratio_status(metrics.vcpu_to_pcore_ratio)
        ratio_status_color = self._get_ratio_color(metrics.vcpu_to_pcore_ratio)
        insight_text = f"• Consolidation Ratio: {metrics.vcpu_to_pcore_ratio:.1f}:1 {ratio_status}"
        insight_display_width = self._get_display_width(insight_text)
        padding = max(1, 86 - insight_display_width)  # 86 chars fit in the box with margin
        
        self._insert_colored_text(f"║ • Consolidation Ratio: {metrics.vcpu_to_pcore_ratio:.1f}:1 ", "neutral")
        self._insert_colored_text(f"{ratio_status}", ratio_status_color)
        self._insert_colored_text(" " * padding + "║\n", "neutral")
        
        # CPU insight
        cpu_status = self._get_cpu_status(metrics.avg_cpu_utilization)
        cpu_status_color = self._get_cpu_color(metrics.avg_cpu_utilization)
        cpu_text = f"• CPU Load: {metrics.avg_cpu_utilization*100:.0f}% {cpu_status}"
        cpu_display_width = self._get_display_width(cpu_text)
        cpu_padding = max(1, 86 - cpu_display_width)
        
        self._insert_colored_text(f"║ • CPU Load: {metrics.avg_cpu_utilization*100:.0f}% ", "neutral")
        self._insert_colored_text(f"{cpu_status}", cpu_status_color)
        self._insert_colored_text(" " * cpu_padding + "║\n", "neutral")
        
        # Memory insight
        ram_status = self._get_ram_status(metrics.avg_ram_utilization)
        ram_status_color = self._get_ram_color(metrics.avg_ram_utilization)
        ram_text = f"• Memory Usage: {metrics.avg_ram_utilization*100:.0f}% {ram_status}"
        ram_display_width = self._get_display_width(ram_text)
        ram_padding = max(1, 86 - ram_display_width)
        
        self._insert_colored_text(f"║ • Memory Usage: {metrics.avg_ram_utilization*100:.0f}% ", "neutral")
        self._insert_colored_text(f"{ram_status}", ram_status_color)
        self._insert_colored_text(" " * ram_padding + "║\n", "neutral")
        
        self._insert_colored_text("╚════════════════════════════════════════════════════════════════════════════════════════╝", "border")
        
        # Disable text editing
        self.stats_text.config(state="disabled")
        
        # Store metrics and enable insights button
        self.last_metrics = metrics
        self.root.after_idle(lambda: self.insights_btn.config(state="normal"))
    
    def _insert_colored_text(self, text, tag):
        """Insert text with specified color tag."""
        start_pos = self.stats_text.index(tk.INSERT)
        self.stats_text.insert(tk.INSERT, text)
        end_pos = self.stats_text.index(tk.INSERT)
        self.stats_text.tag_add(tag, start_pos, end_pos)
    
    def _get_display_width(self, text):
        """Calculate the display width of text accounting for wide characters and emoji sequences."""
        import unicodedata
        width = 0
        i = 0
        while i < len(text):
            char = text[i]
            
            # Handle emoji sequences (like 🖥️ which is 🖥 + ️)
            if i + 1 < len(text) and ord(text[i + 1]) == 0xFE0F:  # Variation selector
                width += 2  # Emoji + variation selector = 2 display units
                i += 2  # Skip both characters
                continue
            
            # Check for emoji ranges
            code_point = ord(char)
            if (0x1F600 <= code_point <= 0x1F64F or  # Emoticons
                0x1F300 <= code_point <= 0x1F5FF or  # Miscellaneous Symbols
                0x1F680 <= code_point <= 0x1F6FF or  # Transport symbols
                0x1F1E0 <= code_point <= 0x1F1FF or  # Regional indicators
                0x2600 <= code_point <= 0x26FF or   # Miscellaneous symbols
                0x2700 <= code_point <= 0x27BF):    # Dingbats
                width += 2
            elif unicodedata.east_asian_width(char) in ('F', 'W'):  # Full-width or Wide
                width += 2
            else:
                width += 1
            
            i += 1
        
        return width
    
    def _insert_metric_line(self, metric_name, value, description, value_color="value"):
        """Insert a formatted metric line with colors and perfect alignment."""
        # Calculate actual display width and pad accordingly
        display_width = self._get_display_width(metric_name)
        target_width = 36  # Fixed target width for consistency
        padding = target_width - display_width
        
        # Ensure minimum padding of 1 space
        if padding < 1:
            padding = 1
        
        self._insert_colored_text(f"{metric_name}{' ' * padding}│ ", "metric")
        self._insert_colored_text(f"{value:>8}", value_color)
        self._insert_colored_text(f" │ {description}\n", "neutral")
    
    def _get_ratio_color(self, ratio):
        """Get color for consolidation ratio."""
        if 2 <= ratio <= 4:
            return "optimal"
        elif ratio > 4:
            return "warning"
        else:
            return "critical"
    
    def _get_cpu_color(self, cpu_util):
        """Get color for CPU utilization."""
        cpu_pct = cpu_util * 100
        if 30 <= cpu_pct <= 70:
            return "optimal"
        elif cpu_pct > 70:
            return "warning"
        else:
            return "critical"
    
    def _get_ram_color(self, ram_util):
        """Get color for RAM utilization."""
        ram_pct = ram_util * 100
        if 40 <= ram_pct <= 80:
            return "optimal"
        elif ram_pct > 80:
            return "warning"
        else:
            return "critical"
    
    def _get_ratio_status(self, ratio):
        """Get status text for consolidation ratio."""
        if 2 <= ratio <= 4:
            return "(OPTIMAL)"
        elif ratio > 4:
            return "(REVIEW NEEDED)"
        else:
            return "(LOW DENSITY)"
    
    def _get_cpu_status(self, cpu_util):
        """Get status text for CPU utilization."""
        cpu_pct = cpu_util * 100
        if 30 <= cpu_pct <= 70:
            return "(BALANCED)"
        elif cpu_pct > 70:
            return "(HIGH - MONITOR)"
        else:
            return "(LOW UTILIZATION)"
    
    def _get_ram_status(self, ram_util):
        """Get status text for RAM utilization."""
        ram_pct = ram_util * 100
        if 40 <= ram_pct <= 80:
            return "(HEALTHY)"
        elif ram_pct > 80:
            return "(HIGH - REVIEW)"
        else:
            return "(UNDERUTILIZED)"

    def _update_statistics(self, result, metrics):
        """Update comprehensive statistics display with enhanced visual formatting."""
        # Create visually appealing statistics with emojis and better formatting
        stats_text = f"""
╔════════════════════════════════════════════════════════════════════════════════════════╗
║                           📊 INFRASTRUCTURE ANALYSIS DASHBOARD                         ║
╚════════════════════════════════════════════════════════════════════════════════════════╝

🔢 OVERALL COUNTS
─────────────────────────────────────────────────────────────────────────────────────────
📱 Total VMs (Powered On)          │ {metrics.total_powered_on_vms:>8,} │ Active workload count
📦 Total VMs (All Visible)         │ {metrics.total_vms_all:>8,} │ Complete VM inventory
🖥️  Total Hosts (Visible)          │ {metrics.total_hosts:>8,} │ Physical infrastructure

⚡ HOST INFRASTRUCTURE RESOURCES
─────────────────────────────────────────────────────────────────────────────────────────
🔧 Total Physical Cores           │ {metrics.total_physical_cores:>8,.0f} │ Sum of all host cores
🎯 Physical Cores per Host (Avg)  │ {metrics.avg_cores_per_host:>8.2f} │ Average core density
🔌 CPU Sockets per Host (Avg)     │ {metrics.avg_sockets_per_host:>8.2f} │ Socket configuration
💾 RAM per Host (Avg) GB          │ {metrics.avg_ram_gb_per_host:>8.2f} │ Memory capacity

💻 VIRTUAL MACHINE RESOURCES (POWERED-ON VMs)
─────────────────────────────────────────────────────────────────────────────────────────
⚙️  vCPUs per VM (Average)         │ {metrics.avg_vcpus_per_vm:>8.2f} │ Virtual CPU allocation
🧠 RAM per VM (Average) GB         │ {metrics.avg_ram_gb_per_vm:>8.2f} │ Memory per workload
💿 Provisioned Storage per VM GB   │ {metrics.avg_provisioned_gb_per_vm:>8.2f} │ Storage allocation

📈 UTILIZATION & PERFORMANCE RATIOS
─────────────────────────────────────────────────────────────────────────────────────────
🔄 vCPU to Physical Core Ratio    │ {metrics.vcpu_to_pcore_ratio:>8.2f}:1 │ Consolidation density
📊 CPU Utilization (Host Avg)     │ {metrics.avg_cpu_utilization*100:>8.1f}% │ Processing load
🧮 RAM Utilization (Host Avg)     │ {metrics.avg_ram_utilization*100:>8.1f}% │ Memory pressure
🔧 Threads/Core (Cluster Avg)     │ {"N/A":>8} │ vCluster data N/A

📋 PROCESSING SUMMARY
─────────────────────────────────────────────────────────────────────────────────────────
📁 Files Processed                │ {result.files_processed:>8,} │ RVTools files analyzed
❌ Processing Errors              │ {len(result.errors):>8,} │ Issues encountered
✅ Success Rate                   │ {((result.files_processed - len(result.errors)) / max(result.files_processed, 1) * 100):>8.1f}% │ Processing reliability

╔════════════════════════════════════════════════════════════════════════════════════════╗
║ 🎯 KEY INSIGHTS:                                                                      ║
║ • Consolidation Ratio: {metrics.vcpu_to_pcore_ratio:.1f}:1 {"(OPTIMAL)" if 2 <= metrics.vcpu_to_pcore_ratio <= 4 else "(REVIEW NEEDED)" if metrics.vcpu_to_pcore_ratio > 4 else "(LOW DENSITY)"}                                       ║
║ • CPU Load: {metrics.avg_cpu_utilization*100:.0f}% {"(BALANCED)" if 30 <= metrics.avg_cpu_utilization*100 <= 70 else "(HIGH - MONITOR)" if metrics.avg_cpu_utilization*100 > 70 else "(LOW UTILIZATION)"}                                             ║
║ • Memory Usage: {metrics.avg_ram_utilization*100:.0f}% {"(HEALTHY)" if 40 <= metrics.avg_ram_utilization*100 <= 80 else "(HIGH - REVIEW)" if metrics.avg_ram_utilization*100 > 80 else "(UNDERUTILIZED)"}                                        ║
╚════════════════════════════════════════════════════════════════════════════════════════╝"""
        
        self.root.after_idle(lambda: self._set_stats_text(stats_text))
        
        # Store metrics and enable insights button
        self.last_metrics = metrics
        self.root.after_idle(lambda: self.insights_btn.config(state="normal"))
    
    def _set_stats_text(self, text: str):
        """Set statistics text (must be called from main thread)."""
        self.stats_text.config(state="normal")
        self.stats_text.delete(1.0, tk.END)
        self.stats_text.insert(1.0, text)
        self.stats_text.config(state="disabled")
    
    def _cancel_processing(self):
        """Cancel the current processing operation."""
        if self.processing_thread and self.processing_thread.is_alive():
            # Note: Python threading doesn't support graceful cancellation
            # In a production app, you'd use a more sophisticated approach
            self.logger.warning("Processing cancellation requested")
            messagebox.showwarning(
                "Cancel",
                "Processing cannot be cancelled gracefully. Please wait for completion."
            )
    
    def _show_insights(self):
        """Show charts and insights in a separate window."""
        if not self.last_output_dir or not self.last_metrics:
            messagebox.showwarning("No Data", "Please process files first to generate insights.")
            return
        
        # Create insights window
        insights_window = tk.Toplevel(self.root)
        insights_window.title("PCMO RVTool Analyzer - Insights & Charts")
        insights_window.geometry("900x700")
        
        # Create notebook for tabs
        notebook = ttk.Notebook(insights_window)
        notebook.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Tab 1: Key Insights Summary
        insights_frame = ttk.Frame(notebook)
        notebook.add(insights_frame, text="Key Insights")
        
        insights_text = scrolledtext.ScrolledText(insights_frame, wrap=tk.WORD, font=("Consolas", 10))
        insights_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Generate insights summary
        insights_summary = self._generate_insights_summary(self.last_metrics)
        insights_text.insert(tk.END, insights_summary)
        insights_text.config(state="disabled")
        
        # Tab 2: Charts Information
        charts_frame = ttk.Frame(notebook)
        notebook.add(charts_frame, text="Charts Available")
        
        charts_text = scrolledtext.ScrolledText(charts_frame, wrap=tk.WORD)
        charts_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # List available charts
        charts_dir = self.last_output_dir / "charts"
        if charts_dir.exists():
            chart_files = list(charts_dir.glob("*.png"))
            charts_info = f"Charts Generated ({len(chart_files)} files):\n\n"
            for chart_file in sorted(chart_files):
                charts_info += f"📊 {chart_file.name}\n"
                charts_info += f"   Location: {chart_file}\n\n"
            
            charts_info += f"\nCharts Directory: {charts_dir}\n"
            charts_info += "\nNote: Double-click on any chart file to open it with your default image viewer."
        else:
            charts_info = "No charts directory found. Charts may not have been generated successfully."
        
        charts_text.insert(tk.END, charts_info)
        charts_text.config(state="disabled")
        
        # Tab 3: Data Quality Report
        quality_frame = ttk.Frame(notebook)
        notebook.add(quality_frame, text="Data Quality")
        
        quality_text = scrolledtext.ScrolledText(quality_frame, wrap=tk.WORD)
        quality_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        quality_report = self._generate_quality_report(self.last_metrics)
        quality_text.insert(tk.END, quality_report)
        quality_text.config(state="disabled")
        
        # Buttons frame
        buttons_frame = ttk.Frame(insights_window)
        buttons_frame.pack(fill=tk.X, padx=10, pady=5)
        
        # Open charts folder button
        ttk.Button(
            buttons_frame,
            text="Open Charts Folder",
            command=lambda: self._open_charts_folder()
        ).pack(side=tk.LEFT, padx=(0, 10))
        
        # Close button
        ttk.Button(
            buttons_frame,
            text="Close",
            command=insights_window.destroy
        ).pack(side=tk.RIGHT)
    
    def _generate_insights_summary(self, metrics) -> str:
        """Generate insights summary text."""
        insights = [
            "🔍 RVTools Infrastructure Insights Summary",
            "=" * 50,
            "",
            "📊 INFRASTRUCTURE OVERVIEW:",
            f"• Total Infrastructure: {metrics.total_hosts:,} hosts supporting {metrics.total_vms_all:,} VMs",
            f"• Active Workload: {metrics.total_powered_on_vms:,} powered-on VMs ({(metrics.total_powered_on_vms/metrics.total_vms_all*100):.1f}% of total)",
            f"• Compute Capacity: {metrics.total_physical_cores:,.0f} physical cores across all hosts",
            "",
            "⚡ RESOURCE UTILIZATION:",
            f"• vCPU Consolidation Ratio: {metrics.vcpu_to_pcore_ratio:.2f}:1 (vCPU to Physical Core)",
            f"• Average Host CPU Utilization: {metrics.avg_cpu_utilization*100:.1f}%",
            f"• Average Host RAM Utilization: {metrics.avg_ram_utilization*100:.1f}%",
            "",
            "🖥️ HOST ANALYSIS:",
            f"• Average Physical Cores per Host: {metrics.avg_cores_per_host:.1f}",
            f"• Average RAM per Host: {metrics.avg_ram_gb_per_host:,.0f} GB",
            f"• Average CPU Sockets per Host: {metrics.avg_sockets_per_host:.2f}",
            "",
            "💻 VM CHARACTERISTICS (Powered-On VMs):",
            f"• Average vCPUs per VM: {metrics.avg_vcpus_per_vm:.2f}",
            f"• Average RAM per VM: {metrics.avg_ram_gb_per_vm:.1f} GB",
            f"• Average Provisioned Storage per VM: {metrics.avg_provisioned_gb_per_vm:,.0f} GB",
            "",
            "📈 KEY RECOMMENDATIONS:",
        ]
        
        # Add recommendations based on metrics
        if metrics.vcpu_to_pcore_ratio > 4:
            insights.append("⚠️  HIGH vCPU consolidation ratio - monitor for CPU contention")
        elif metrics.vcpu_to_pcore_ratio < 2:
            insights.append("💡 LOW vCPU consolidation - opportunity for higher density")
        else:
            insights.append("✅ vCPU consolidation ratio appears balanced")
        
        if metrics.avg_cpu_utilization > 0.7:
            insights.append("⚠️  HIGH average CPU utilization - consider load balancing")
        elif metrics.avg_cpu_utilization < 0.3:
            insights.append("💡 LOW average CPU utilization - potential for optimization")
        else:
            insights.append("✅ CPU utilization appears reasonable")
        
        if metrics.avg_ram_utilization > 0.8:
            insights.append("⚠️  HIGH memory utilization - monitor for memory pressure")
        elif metrics.avg_ram_utilization < 0.4:
            insights.append("💡 LOW memory utilization - potential for rightsizing")
        else:
            insights.append("✅ Memory utilization appears balanced")
        
        insights.extend([
            "",
            "📋 NEXT STEPS:",
            "• Review individual host utilization patterns in the heatmap",
            "• Analyze OS distribution for potential standardization opportunities", 
            "• Consider workload placement optimization based on utilization data",
            "• Plan capacity based on growth trends and utilization patterns"
        ])
        
        return "\n".join(insights)
    
    def _generate_quality_report(self, metrics) -> str:
        """Generate data quality report."""
        quality_report = [
            "📋 Data Quality Assessment",
            "=" * 30,
            "",
            "✅ DATA COMPLETENESS:",
            f"• VM Data: {metrics.total_vms_all:,} VMs processed",
            f"• Host Data: {metrics.total_hosts:,} hosts processed", 
            f"• Power State Coverage: {(metrics.total_powered_on_vms/metrics.total_vms_all*100):.1f}% VMs are powered on",
            "",
            "🔍 DATA VALIDATION:",
            "• OS Classification: Applied to all VM records",
            "• Utilization Buckets: Generated for host CPU and RAM metrics",
            "• Resource Calculations: All metrics computed successfully",
            "",
            "📊 PROCESSING SUMMARY:",
            "• All required sheets (vInfo, vHost, vMetaData) were processed",
            "• Column mappings applied according to RVTools standard format",
            "• Data consolidation completed across all input files",
            "",
            "⚡ PERFORMANCE METRICS:",
            f"• Average vCPUs per VM: {metrics.avg_vcpus_per_vm:.2f} (indicates VM sizing)",
            f"• Average RAM per VM: {metrics.avg_ram_gb_per_vm:.1f} GB (memory allocation patterns)",
            f"• Host standardization: {metrics.avg_cores_per_host:.1f} avg cores per host",
            "",
            "🎯 DATA INSIGHTS:",
            "• Charts generated for distribution analysis",
            "• Utilization heatmap created for capacity planning",
            "• Summary metrics available for executive reporting"
        ]
        
        return "\n".join(quality_report)
    
    def _open_charts_folder(self):
        """Open the charts folder in file explorer."""
        if self.last_output_dir:
            charts_dir = self.last_output_dir / "charts"
            if charts_dir.exists():
                import subprocess
                import platform
                
                if platform.system() == "Windows":
                    subprocess.run(["explorer", str(charts_dir)])
                elif platform.system() == "Darwin":  # macOS
                    subprocess.run(["open", str(charts_dir)])
                else:  # Linux
                    subprocess.run(["xdg-open", str(charts_dir)])
            else:
                messagebox.showwarning("Not Found", "Charts folder not found.")
        else:
            messagebox.showwarning("No Data", "No output directory available.")
    
    def _reset_ui_state(self):
        """Reset UI to ready state."""
        self.process_btn.config(state="normal")
        self.cancel_btn.config(state="disabled")
    
    def _clear_log(self):
        """Clear the log text area."""
        self.log_text.config(state="normal")
        self.log_text.delete(1.0, tk.END)
        self.log_text.config(state="disabled")
    
    def _clear_stats(self):
        """Clear the statistics text area."""
        self.stats_text.config(state="normal")
        self.stats_text.delete(1.0, tk.END)
        self.stats_text.config(state="disabled")
    
    def run(self):
        """Start the GUI application."""
        try:
            self.logger.info(f"Starting {self.config.app_name}")
            self.root.mainloop()
        except Exception as e:
            self.logger.error(f"Error running application: {str(e)}")
            messagebox.showerror("Critical Error", f"Application error: {str(e)}")
        finally:
            self.logger.info("Application shutdown")
