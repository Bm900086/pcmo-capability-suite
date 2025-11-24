# PCMO RVTool Analyzer - Project Context

## Project Overview
Complete Windows application that replicates Excel VBA macro functionality for RVTools data processing with advanced analytics and visualization capabilities.

## Application Name
**PCMO RVTool Analyzer** - Professional infrastructure analysis tool

## Core Functionality
- **Data Processing**: Processes RVTools Excel exports (vInfo, vHost, vCluster, vDatastore sheets)
- **Dashboard Generation**: Creates comprehensive text-based dashboards with metrics and insights
- **Advanced Analytics**: Generates scatter plots, heatmaps, correlation analysis
- **GUI Interface**: Dark-themed tkinter interface with color-coded statistics and filtering
- **Logging**: Comprehensive logging system with file rotation

## Architecture

### Main Entry Point
- `main.py` - Application launcher with "PCMO RVTool Analyzer" branding

### Core Modules (`src/core/`)
- `config.py` - Application configuration and constants
- `data_processor.py` - RVTools data processing engine
- `dashboard_generator.py` - Text dashboard and advanced chart generation

### GUI Module (`src/gui/`)
- `main_window.py` - Main application window with dark theme and emoji alignment

### Utilities (`src/utils/`)
- `logger.py` - Logging setup with "pcmo_rvtool_analyzer" naming

## Key Features Implemented
- ✅ Complete RVTools data processing
- ✅ Advanced visualizations (scatter plots, heatmaps)
- ✅ Professional GUI with color coding
- ✅ Dashboard text alignment (emoji/Unicode handling)
- ✅ Standalone executable generation
- ✅ Comprehensive logging
- ✅ Interactive filtering and analysis

## Distribution
- **Executable**: `dist/PCMO_RVTool_Analyzer.exe` (81MB standalone)
- **Build Command**: `python -m PyInstaller --onefile --windowed --name "PCMO_RVTool_Analyzer" main.py`
- **Dependencies**: All listed in `requirements.txt`

## Recent Enhancements
- Dashboard alignment perfected with emoji width calculation
- Application rebranded to "PCMO RVTool Analyzer"
- Advanced chart generation with correlation analysis
- Professional dark theme GUI implementation

## Development Status
- **Phase**: Production ready
- **Last Major Update**: Dashboard alignment fixes and emoji handling
- **Current State**: Complete, tested, and distributed

## Future Development Areas
- Additional chart types
- Export functionality enhancements
- Performance optimizations
- UI/UX improvements

## Key Files for Understanding
1. `main.py` - Entry point
2. `src/core/data_processor.py` - Core data logic
3. `src/gui/main_window.py` - UI implementation
4. `src/core/dashboard_generator.py` - Analytics engine
5. `requirements.txt` - Dependencies
