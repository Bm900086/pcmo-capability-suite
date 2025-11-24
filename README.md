# PCMO Capability Suite

**Version:** v2.0.0  
**Last Updated:** 2024-11-24

**Private Cloud Maturity & Optimization Capability Suite** - A comprehensive React application for assessing and optimizing private cloud infrastructure.

> 📚 **New to the project?** Start with [START_HERE.md](./START_HERE.md)  
> 🔄 **Need to rollback?** See [BACKUP_AND_ROLLBACK.md](./BACKUP_AND_ROLLBACK.md)  
> 📖 **Complete Documentation:** See [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)

## Overview

The PCMO Capability Suite is a full-featured web application that provides organizations with tools to assess, analyze, and optimize their private cloud environments. The suite includes five core assessment modules and a professional proposal generation system.

## Features

### 📊 Five Core Assessment Modules

1. **Past Value Analysis** - Calculate and analyze past value realized from VCF implementation
2. **Value Model (TCO/ROI)** - Compare current spend vs projected VCF spend with 3-year TCO analysis
3. **Competitive TCO** - Compare VCF costs against public cloud competitors
4. **Maturity Assessment** - Evaluate organizational maturity across 5 key domains with radar chart visualization
5. **VCF 9.0 Readiness** - Assess infrastructure readiness for VCF 9.0 upgrade with checklist-based evaluation

### 📈 Executive Dashboard

- Real-time summary of all assessment modules
- Key metrics and insights at a glance
- Dynamic data integration from all modules

### 📄 Proposal Generation

- Professional, print-ready assessment documents
- Dynamic executive summaries based on assessment results
- Financial impact tables and strategic analysis
- Context-aware recommendations

## Technology Stack

- **React 18** - Modern UI framework
- **Vite 5** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **Context API** - State management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bm900086/pcmo-capability-suite.git
cd pcmo-capability-suite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Default Login Credentials

- Username: `admin`
- Password: `password123`

## Project Structure

```
pcmo-capability-suite/
├── src/
│   ├── components/      # Reusable components (Layout, Sidebar)
│   ├── contexts/        # Context providers (AuthContext)
│   ├── pages/           # Page components (Dashboard, Modules, Proposal)
│   ├── App.jsx          # Main application component
│   ├── PCMOContext.jsx  # Global state management
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── BUILD_LOG.md         # Detailed build and implementation log
└── package.json         # Project dependencies
```

## Key Features

### State Management
- Centralized state management using React Context API
- Real-time data synchronization across all modules
- Persistent state for seamless user experience

### Data Visualization
- Bar charts for TCO comparisons
- Radar charts for maturity assessment
- Responsive and interactive charts using Recharts

### Print Functionality
- Professional print-ready proposal documents
- A4 page layout with proper formatting
- Print-optimized CSS to hide UI elements

## Usage

1. **Login** - Use the default credentials to access the application
2. **Navigate Modules** - Use the sidebar to access different assessment modules
3. **Enter Data** - Input your organization's data in each module
4. **View Dashboard** - See real-time summaries on the executive dashboard
5. **Generate Proposal** - Create a professional assessment document

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Documentation

### 📚 Complete Documentation Index
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation index and navigation

### 🚀 Getting Started
- **[START_HERE.md](./START_HERE.md)** - Quick start guide (especially for RAG chatbot)
- **[HOW_TO_START_BACKEND.md](./HOW_TO_START_BACKEND.md)** - Backend startup guide

### 📖 Version Control & Rollback
- **[VERSION_HISTORY.md](./VERSION_HISTORY.md)** - Complete version history and changelog
- **[CHANGELOG.md](./CHANGELOG.md)** - Detailed changelog by version
- **[BACKUP_AND_ROLLBACK.md](./BACKUP_AND_ROLLBACK.md)** - Backup and rollback procedures

### 🔧 Setup & Configuration
- **[rag_service/README_LOCAL.md](./rag_service/README_LOCAL.md)** - RAG backend setup guide
- **[rag_service/SETUP_CHECKLIST.md](./rag_service/SETUP_CHECKLIST.md)** - Setup verification checklist

### 📊 Project Details
- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - Complete project documentation
- **[BUILD_LOG.md](./BUILD_LOG.md)** - Detailed implementation documentation and development history

### Current Version
- **Version:** v2.0.0 (see [VERSION.txt](./VERSION.txt))
- **Last Updated:** 2024-11-24

## License

This project is proprietary software. All rights reserved.

## Author

**Bm900086**

## Repository

https://github.com/Bm900086/pcmo-capability-suite

