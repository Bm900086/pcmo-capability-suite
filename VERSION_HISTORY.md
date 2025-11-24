# Version History & Changelog

This document tracks all major versions and changes to the PCMO Capability Suite project.

## Version Format
- **Major.Minor.Patch** (e.g., v1.2.3)
- **Major**: Breaking changes, major feature additions
- **Minor**: New features, enhancements (backward compatible)
- **Patch**: Bug fixes, minor improvements

---

## Current Version: v2.0.0

**Release Date:** 2024-11-24  
**Status:** Active Development

### What's New in v2.0.0
- ✅ **RAG Chatbot Integration** - Local AI chatbot using Ollama
- ✅ **Complete Responsive Design** - Mobile and desktop adaptive layouts
- ✅ **Business Guide Component** - Contextual help on all pages
- ✅ **Customer Selection Modal** - Advanced search and filtering
- ✅ **Smart Input Components** - Editable assumptions with reset capability
- ✅ **Citation System** - Source tracking for all assumptions

### Components Added
- `src/components/ChatWidget.jsx` - RAG chatbot interface
- `rag_service/` - Backend RAG service (FastAPI + Ollama)
- `src/components/BusinessGuide.jsx` - Contextual guidance
- `src/components/CustomerSelectionModal.jsx` - Customer search
- `src/components/SmartInput.jsx` - Enhanced input with state tracking
- `src/components/SmartSelect.jsx` - Enhanced select with state tracking

### Breaking Changes
- None (this is a feature addition release)

### Dependencies Added
- Frontend: No new dependencies
- Backend: See `rag_service/requirements.txt`

---

## v1.5.0 - Responsive Design Release

**Release Date:** 2024-11-24  
**Status:** Stable

### Features
- ✅ Mobile-responsive layouts for all pages
- ✅ Card view patterns for tables on mobile
- ✅ Touch-optimized inputs (44px minimum)
- ✅ Full-screen modal on mobile
- ✅ Collapsible Business Guide on mobile

### Files Modified
- `src/pages/ValueModel.jsx` - Mobile card view for tables
- `src/pages/Competitive.jsx` - Mobile card view for comparison grid
- `src/pages/PastValue.jsx` - Mobile card view for tables
- `src/pages/Proposal.jsx` - Mobile card view for financial impact
- `src/components/BusinessGuide.jsx` - Mobile accordion
- `src/components/CustomerSelectionModal.jsx` - Full-screen mobile
- `src/components/SmartInput.jsx` - Touch optimization
- `src/components/SmartSelect.jsx` - Touch optimization
- `src/components/GlobalConfiguration.jsx` - Responsive grid
- All page containers: Added `max-w-7xl mx-auto` responsive containers

### Rollback Instructions
To rollback to v1.4.0 (pre-responsive):
```bash
git checkout v1.4.0
# or
git revert <commit-hash>
```

---

## v1.4.0 - Business Guide & Smart Components

**Release Date:** 2024-11-23  
**Status:** Stable

### Features
- ✅ Business Guide component with Context/Action/Assumptions
- ✅ Smart Input/Select components with dirty state tracking
- ✅ Citation system for assumptions
- ✅ Reset to default functionality
- ✅ Disclaimer footer

### Files Added
- `src/components/BusinessGuide.jsx`
- `src/components/SmartInput.jsx`
- `src/components/SmartSelect.jsx`
- `src/components/DisclaimerFooter.jsx`
- `src/data/citations.js`

---

## v1.3.0 - Customer Selection Module

**Release Date:** 2024-11-22  
**Status:** Stable

### Features
- ✅ Customer selection modal with search
- ✅ Faceted filtering (Region, Parent, Sales Org)
- ✅ Debounced search (300ms)
- ✅ Customer details card
- ✅ Dummy data generation (50-100 customers)

### Files Added
- `src/components/CustomerSelectionModal.jsx`
- `src/components/CustomerDetailsCard.jsx`
- `src/data/dummyData.js`

---

## v1.2.0 - Competitive TCO Module

**Release Date:** 2024-11-21  
**Status:** Stable

### Features
- ✅ Competitive TCO comparison engine
- ✅ Editable assumptions with reset
- ✅ Solution selection (VCF, AWS, Azure, GCP, etc.)
- ✅ TCO calculation with refactoring/egress costs
- ✅ Waterfall charts for cost breakdown

### Files Modified
- `src/pages/Competitive.jsx` - Complete rewrite

---

## v1.1.0 - Value Model Enhancements

**Release Date:** 2024-11-20  
**Status:** Stable

### Features
- ✅ Enhanced TCO calculations
- ✅ Cashflow analysis
- ✅ Detailed breakdown tables
- ✅ Chart visualizations

---

## v1.0.0 - Initial Release

**Release Date:** 2024-11-19  
**Status:** Stable

### Features
- ✅ Basic dashboard
- ✅ Value Model page
- ✅ Past Value analysis
- ✅ Maturity assessment
- ✅ Readiness assessment
- ✅ Proposal generation

### Core Structure
- React + Vite frontend
- Tailwind CSS styling
- React Router navigation
- Recharts for visualizations

---

## Version Tags

To create a version tag:
```bash
git tag -a v2.0.0 -m "RAG Chatbot and Responsive Design"
git push origin v2.0.0
```

To view all tags:
```bash
git tag -l
```

To checkout a specific version:
```bash
git checkout v1.5.0
```

---

## Migration Guides

### Migrating from v1.5.0 to v2.0.0

1. **Install Ollama** (if using chatbot):
   ```bash
   # Download from ollama.com
   ollama pull llama3.2
   ```

2. **Set up RAG backend** (optional):
   ```bash
   cd rag_service
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python ingest.py
   ```

3. **No frontend changes needed** - All new features are additive

### Migrating from v1.4.0 to v1.5.0

1. **Update page containers** - Add responsive classes:
   ```jsx
   // Old
   <div className="p-8">
   
   // New
   <div className="p-4 md:p-8 max-w-7xl mx-auto">
   ```

2. **Update tables** - Add mobile card views (see examples in ValueModel.jsx)

3. **Update BusinessGuide** - Already responsive, no changes needed

---

## Rollback Procedures

### Quick Rollback (Git)
```bash
# View commit history
git log --oneline

# Rollback to specific commit
git reset --hard <commit-hash>

# Rollback to specific tag
git checkout v1.4.0
```

### Manual Rollback (File-by-File)

1. Check `VERSION_HISTORY.md` for file changes
2. Use Git to view diffs:
   ```bash
   git diff v1.4.0 v1.5.0 -- src/pages/ValueModel.jsx
   ```
3. Manually revert changes or restore from backup

### Database/State Rollback
- No database in this project
- State is managed in React context
- Clearing browser cache resets all state

---

## Known Issues by Version

### v2.0.0
- ⚠️ RAG backend requires Ollama setup (documented)
- ⚠️ PDF ingestion takes 20-30 minutes (expected)
- ⚠️ First chatbot response may take 10-30 seconds (Ollama model loading)

### v1.5.0
- ✅ All issues resolved

### v1.4.0
- ✅ All issues resolved

---

## Future Roadmap

### v2.1.0 (Planned)
- [ ] Chat history persistence
- [ ] Streaming responses for chatbot
- [ ] Export chat conversations
- [ ] Multiple PDF support

### v2.2.0 (Planned)
- [ ] User authentication improvements
- [ ] Saved assessments
- [ ] Report templates
- [ ] API integration

---

## Support & Maintenance

- **Current Maintainer:** Development Team
- **Documentation:** See `README.md` and component-specific docs
- **Issues:** Track in project management system
- **Backup:** Regular Git commits recommended

---

## Version Compatibility Matrix

| Frontend Version | Backend Version | Status |
|-----------------|----------------|--------|
| v2.0.0          | rag_service v1.0.0 | ✅ Compatible |
| v1.5.0          | N/A            | ✅ Standalone |
| v1.4.0          | N/A            | ✅ Standalone |
| v1.3.0          | N/A            | ✅ Standalone |

---

**Last Updated:** 2024-11-24  
**Next Review:** 2024-12-01

