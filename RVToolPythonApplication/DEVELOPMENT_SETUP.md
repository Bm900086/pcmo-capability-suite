# Development Setup Guide

## For AI Assistant Context
When working on this project in future sessions, please:

1. **Read the Project Context**: Start by reading `PROJECT_CONTEXT.md`
2. **Check Current Architecture**: Review the modular structure in `src/`
3. **Understand Dependencies**: Review `requirements.txt` for current packages
4. **Check Recent Changes**: Look at log files in `logs/` for recent activity

## Quick Start Commands

### Install Dependencies
```bash
python -m pip install -r requirements.txt
```

### Run Application
```bash
python main.py
```

### Build Executable
```bash
python -m PyInstaller --onefile --windowed --name "PCMO_RVTool_Analyzer" main.py
```

### Test Alignment (if needed)
```bash
python final_alignment_test.py
```

## Key Development Files

### Core Logic
- `src/core/data_processor.py` - Main data processing logic
- `src/core/dashboard_generator.py` - Chart generation and analytics
- `src/core/config.py` - Application settings

### User Interface
- `src/gui/main_window.py` - Main GUI implementation
- Dark theme with emoji alignment handling

### Utilities
- `src/utils/logger.py` - Logging configuration

## Current State
- Application: **Production Ready**
- Executable: **Available in dist/**
- Alignment: **Perfect (36-character column width)**
- Branding: **PCMO RVTool Analyzer**

## Important Notes
- All emoji strings use single spaces (not double)
- Unicode width calculation handles variation selectors
- Log files use "pcmo_rvtool_analyzer" prefix
- Application name is "PCMO RVTool Analyzer" throughout

## Testing Data
Sample files available in `test_data/` folder for development testing.
