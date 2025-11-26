#!/usr/bin/env python3
"""
PCMO RVTool Analyzer - Python Application
Main entry point for the PCMO RVTool data processing application.
Replicates Excel VBA macro functionality for consolidating RVTools data.
"""

import sys
import os
import logging
from pathlib import Path
from src.gui.main_window import RVToolsMainWindow
from src.core.config import AppConfig
from src.utils.logger import setup_logger

def main():
    """Main entry point for the application."""
    try:
        # Setup logging
        setup_logger()
        logger = logging.getLogger(__name__)
        logger.info("Starting PCMO RVTool Analyzer")
        
        # Initialize configuration
        config = AppConfig()
        
        # Start GUI application
        app = RVToolsMainWindow(config)
        app.run()
        
    except Exception as e:
        print(f"Critical error starting application: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
