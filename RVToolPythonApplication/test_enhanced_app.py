#!/usr/bin/env python3
"""
Quick test script to verify the enhanced RVTools application works.
"""

import sys
import os
from pathlib import Path

# Add src directory to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

def test_color_formatting():
    """Test the color formatting functionality."""
    print("🧪 Testing Enhanced RVTools Application...")
    
    try:
        # Test import
        from src.gui.main_window import RVToolsMainWindow
        from src.core.config import AppConfig
        
        print("✅ All imports successful")
        
        # Test config
        config = AppConfig()
        print(f"✅ Configuration loaded: {config.app_name}")
        
        # Test GUI creation (without running mainloop)
        print("🔧 Testing GUI creation...")
        import tkinter as tk
        root = tk.Tk()
        app = RVToolsMainWindow(config)
        
        print("✅ GUI created successfully")
        
        # Test color tags
        if hasattr(app.stats_text, 'tag_names'):
            tags = app.stats_text.tag_names()
            expected_tags = ['header', 'section', 'metric', 'value', 'optimal', 'warning', 'critical']
            for tag in expected_tags:
                if tag in tags:
                    print(f"✅ Color tag '{tag}' configured")
                else:
                    print(f"⚠️  Color tag '{tag}' missing")
        
        # Test filter controls
        filter_controls = ['powerstate_var', 'os_var', 'cluster_var']
        for control in filter_controls:
            if hasattr(app, control):
                print(f"✅ Filter control '{control}' present")
            else:
                print(f"⚠️  Filter control '{control}' missing")
        
        root.destroy()
        print("🎉 Enhanced application test completed successfully!")
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_color_formatting()
    sys.exit(0 if success else 1)
