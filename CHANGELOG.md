# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-11-24

### Added
- RAG Chatbot integration with Ollama backend
- Complete responsive design for mobile and desktop
- Mobile card view patterns for all data tables
- Touch-optimized inputs (44px minimum touch targets)
- Full-screen modal on mobile devices
- Collapsible Business Guide accordion on mobile
- Backend RAG service (`rag_service/` folder)
- PDF ingestion script for 8,171-page VCF documentation
- ChatWidget component with error handling
- Comprehensive setup documentation
- Version history tracking

### Changed
- All page containers now use responsive padding (`p-4 md:p-8`)
- Tables converted to card views on mobile
- Business Guide sections collapsible on mobile
- Customer Selection Modal full-screen on mobile
- Input fields optimized for touch (min-h-[44px])

### Fixed
- Build errors in ValueModel.jsx (duplicate exports)
- JSX structure issues in table components
- Mobile layout overflow issues

## [1.5.0] - 2024-11-24

### Added
- Responsive container system (`max-w-7xl mx-auto`)
- Mobile-specific layouts for all pages
- Card view patterns for tables
- Touch optimization for all interactive elements

### Changed
- ValueModel.jsx: Added mobile card view for Value Report Summary
- Competitive.jsx: Added mobile card view for comparison grid
- PastValue.jsx: Added mobile card views for component usage and metrics tables
- Proposal.jsx: Added mobile card view for financial impact table
- BusinessGuide.jsx: Mobile accordion functionality
- CustomerSelectionModal.jsx: Full-screen on mobile

## [1.4.0] - 2024-11-23

### Added
- BusinessGuide component with Context/Action/Assumptions sections
- SmartInput component with dirty state tracking
- SmartSelect component with dirty state tracking
- Citation system for assumptions
- Reset to default functionality
- DisclaimerFooter component

### Changed
- All hardcoded assumptions now have citation support
- Input fields track modification state
- Visual indicators for modified values (yellow background)

## [1.3.0] - 2024-11-22

### Added
- CustomerSelectionModal with advanced search
- CustomerDetailsCard for displaying selected customer
- Dummy data generation (50-100 customers)
- Faceted filtering (Region, Parent, Sales Org)
- Debounced search (300ms)

### Changed
- GlobalConfiguration now uses modal for customer selection
- Customer data structure standardized

## [1.2.0] - 2024-11-21

### Added
- Competitive TCO comparison engine
- Editable assumptions with reset capability
- Solution selection (VCF, AWS, Azure, GCP, etc.)
- TCO calculation with refactoring and egress costs
- Waterfall charts for cost breakdown

### Changed
- Competitive.jsx completely rewritten
- TCO calculation logic enhanced

## [1.1.0] - 2024-11-20

### Added
- Enhanced TCO calculations
- Cashflow analysis
- Detailed breakdown tables
- Chart visualizations with Recharts

## [1.0.0] - 2024-11-19

### Added
- Initial release
- Dashboard page
- Value Model page
- Past Value analysis
- Maturity assessment
- Readiness assessment
- Proposal generation
- React + Vite frontend
- Tailwind CSS styling
- React Router navigation

---

## Version Legend

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security updates

---

For detailed version information, see [VERSION_HISTORY.md](./VERSION_HISTORY.md)

