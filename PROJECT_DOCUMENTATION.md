# PCMO Capability Suite - Complete Documentation Index

**Version:** v2.0.0  
**Last Updated:** 2024-11-24

---

## 📚 Documentation Index

### Getting Started
- **[START_HERE.md](./START_HERE.md)** - Quick start guide for RAG chatbot setup
- **[HOW_TO_START_BACKEND.md](./HOW_TO_START_BACKEND.md)** - Step-by-step backend startup
- **[RAG_CHATBOT_QUICKSTART.md](./RAG_CHATBOT_QUICKSTART.md)** - Quick reference for chatbot

### Version Control
- **[VERSION_HISTORY.md](./VERSION_HISTORY.md)** - Complete version history and changelog
- **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - This file (documentation index)

### RAG Chatbot (Backend)
- **[rag_service/README_LOCAL.md](./rag_service/README_LOCAL.md)** - Complete RAG setup guide
- **[rag_service/SETUP_CHECKLIST.md](./rag_service/SETUP_CHECKLIST.md)** - Setup checklist
- **[rag_service/requirements.txt](./rag_service/requirements.txt)** - Python dependencies

### Project Structure
- **[README.md](./README.md)** - Main project README
- **[VALIDATION_REPORT.md](./VALIDATION_REPORT.md)** - Validation and testing report

---

## 🏗️ Project Architecture

### Frontend Structure
```
src/
├── components/          # Reusable UI components
│   ├── BusinessGuide.jsx
│   ├── ChatWidget.jsx
│   ├── CustomerSelectionModal.jsx
│   ├── SmartInput.jsx
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.jsx
│   ├── ValueModel.jsx
│   ├── Competitive.jsx
│   └── ...
├── contexts/           # React contexts
├── data/               # Static data
└── main.jsx           # Entry point
```

### Backend Structure
```
rag_service/
├── main.py            # FastAPI server
├── ingest.py          # PDF processing script
├── requirements.txt   # Python dependencies
├── faiss_index_local/ # Vector index (generated)
└── README_LOCAL.md    # Setup documentation
```

---

## 🔧 Component Documentation

### Core Components

#### ChatWidget.jsx (v2.0.0)
- **Purpose:** RAG chatbot interface
- **Dependencies:** Backend API (http://localhost:8000)
- **Features:**
  - Floating chat button
  - Message history
  - Source citations
  - Error handling
- **Documentation:** See inline comments

#### BusinessGuide.jsx (v1.4.0)
- **Purpose:** Contextual help banner
- **Features:**
  - Collapsible sections
  - Mobile accordion
  - Context/Action/Assumptions
- **Usage:** Import and add to any page

#### SmartInput.jsx (v1.4.0)
- **Purpose:** Enhanced input with state tracking
- **Features:**
  - Dirty state detection
  - Reset to default
  - Citation tooltips
- **Props:** `value`, `onChange`, `defaultValue`, `citation`

#### CustomerSelectionModal.jsx (v1.3.0)
- **Purpose:** Customer search and selection
- **Features:**
  - Debounced search
  - Faceted filtering
  - Mobile full-screen
- **API:** Uses `dummyData.js` (can be replaced with API)

---

## 📦 Dependencies

### Frontend (package.json)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "recharts": "^2.10.3",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.6",
  "vite": "^5.0.8"
}
```

### Backend (rag_service/requirements.txt)
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
langchain==0.1.0
langchain-ollama==0.1.0
faiss-cpu==1.7.4
sentence-transformers==2.2.2
pypdf==3.17.0
```

---

## 🚀 Deployment Guide

### Development
```bash
# Frontend
npm run dev

# Backend (separate terminal)
cd rag_service
venv\Scripts\activate
uvicorn main:app --reload
```

### Production Build
```bash
# Frontend
npm run build

# Backend
# Use production WSGI server (gunicorn, etc.)
```

---

## 🔄 Version Control Workflow

### Creating a New Version
1. Update `VERSION_HISTORY.md` with new version
2. Update version in this file
3. Create Git tag:
   ```bash
   git tag -a v2.1.0 -m "Description"
   git push origin v2.1.0
   ```
4. Update CHANGELOG if maintained separately

### Rollback Process
1. Identify target version from `VERSION_HISTORY.md`
2. Checkout version:
   ```bash
   git checkout v1.5.0
   ```
3. Or revert specific commits:
   ```bash
   git revert <commit-hash>
   ```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Responsive design works on mobile
- [ ] Chatbot connects to backend
- [ ] Customer selection modal works
- [ ] All forms submit correctly
- [ ] Charts render properly

### Automated Testing
- Currently manual testing only
- Future: Add Jest/Vitest for unit tests
- Future: Add Playwright for E2E tests

---

## 🐛 Troubleshooting

### Common Issues

#### Chatbot Connection Errors
- **Symptom:** "Cannot connect to backend"
- **Solution:** See `HOW_TO_START_BACKEND.md`

#### Build Errors
- **Symptom:** Build fails with syntax errors
- **Solution:** Check `VERSION_HISTORY.md` for recent changes, rollback if needed

#### Mobile Layout Issues
- **Symptom:** Layout broken on mobile
- **Solution:** Check Tailwind responsive classes, see v1.5.0 changes

---

## 📝 Code Style Guide

### React Components
- Use functional components with hooks
- Props destructuring
- Consistent naming (PascalCase for components)

### File Naming
- Components: `PascalCase.jsx`
- Utilities: `camelCase.js`
- Pages: `PascalCase.jsx`

### Comments
- Document complex logic
- Add version notes for major changes
- Include TODO for future improvements

---

## 🔐 Security Notes

### Current Implementation
- No authentication (development)
- No API keys (local Ollama)
- CORS configured for localhost only

### Production Considerations
- Add authentication
- Secure API endpoints
- Environment variables for config
- Rate limiting for chatbot

---

## 📊 Performance

### Frontend
- Vite for fast builds
- Code splitting (future)
- Lazy loading (future)

### Backend
- FAISS for fast vector search
- Ollama for local LLM
- First response: 10-30s (model loading)
- Subsequent: 3-10s

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Make changes
3. Update documentation
4. Test thoroughly
5. Create pull request
6. Update version if needed

### Documentation Updates
- Update relevant docs when making changes
- Add to `VERSION_HISTORY.md` for releases
- Keep this index updated

---

## 📞 Support

### Getting Help
1. Check relevant documentation file
2. Review `VERSION_HISTORY.md` for known issues
3. Check troubleshooting sections
4. Review code comments

### Reporting Issues
- Document version number
- Include error messages
- Describe steps to reproduce
- Check if issue is version-specific

---

## 📅 Maintenance Schedule

- **Weekly:** Review and update documentation
- **Monthly:** Version review and planning
- **Quarterly:** Major version planning

---

**Documentation Version:** v2.0.0  
**Last Reviewed:** 2024-11-24  
**Next Review:** 2024-12-01

