# Backup and Rollback Guide

**Version:** v2.0.0  
**Last Updated:** 2024-11-24

---

## 🔄 Quick Rollback Commands

### Using Git Tags

```bash
# View all versions
git tag -l

# Rollback to specific version
git checkout v1.5.0

# Rollback to specific version (create new branch)
git checkout -b rollback-v1.5.0 v1.5.0

# Return to latest
git checkout main
```

### Using Git Commits

```bash
# View commit history
git log --oneline

# Rollback to specific commit
git reset --hard <commit-hash>

# Rollback but keep changes (soft reset)
git reset --soft <commit-hash>
```

---

## 📦 Manual Backup Procedure

### Before Making Changes

1. **Create a backup branch:**
   ```bash
   git checkout -b backup-$(date +%Y%m%d)
   git push origin backup-$(date +%Y%m%d)
   ```

2. **Export current state:**
   ```bash
   # Create backup directory
   mkdir backups/backup-$(date +%Y%m%d)
   
   # Copy key files
   cp -r src/ backups/backup-$(date +%Y%m%d)/src/
   cp package.json backups/backup-$(date +%Y%m%d)/
   cp VERSION.txt backups/backup-$(date +%Y%m%d)/
   ```

3. **Document current state:**
   - Note current version in `VERSION.txt`
   - Document what's working
   - List any known issues

### After Making Changes

1. **Test thoroughly**
2. **Update version if needed**
3. **Create new backup if stable**

---

## 🔙 Rollback Scenarios

### Scenario 1: Rollback Frontend Only

**If:** Frontend changes broke the UI

**Steps:**
```bash
# 1. Identify the problematic commit
git log --oneline src/

# 2. Revert specific files
git checkout v1.5.0 -- src/pages/ValueModel.jsx

# 3. Commit the revert
git commit -m "Rollback: Revert ValueModel.jsx to v1.5.0"
```

### Scenario 2: Rollback Backend Only

**If:** Backend changes broke the API

**Steps:**
```bash
# 1. Navigate to backend
cd rag_service

# 2. Checkout previous version
git checkout v1.5.0 -- rag_service/main.py

# 3. Restart backend
uvicorn main:app --reload
```

### Scenario 3: Complete Rollback

**If:** Major issues require full rollback

**Steps:**
```bash
# 1. Create backup of current state
git branch backup-before-rollback

# 2. Rollback to stable version
git checkout v1.5.0

# 3. Create new branch from rollback
git checkout -b rollback-v1.5.0

# 4. Test thoroughly
npm run build
npm run dev

# 5. If stable, merge or continue on this branch
```

---

## 📋 Version-Specific Rollback Guides

### Rollback from v2.0.0 to v1.5.0

**What gets removed:**
- RAG chatbot (ChatWidget.jsx)
- Backend service (rag_service/)
- Chat-related documentation

**Steps:**
```bash
# 1. Remove chatbot component
git checkout v1.5.0 -- src/components/Layout.jsx
# (Remove ChatWidget import and usage)

# 2. Remove backend (optional - can keep for future)
# Just don't start it

# 3. Update version
echo "1.5.0" > VERSION.txt

# 4. Test
npm run build
```

### Rollback from v1.5.0 to v1.4.0

**What gets removed:**
- Responsive design changes
- Mobile card views
- Touch optimizations

**Steps:**
```bash
# 1. Rollback all page files
git checkout v1.4.0 -- src/pages/

# 2. Rollback components
git checkout v1.4.0 -- src/components/

# 3. Update version
echo "1.4.0" > VERSION.txt

# 4. Test
npm run build
```

---

## 🗂️ File-Level Rollback

### Rollback Specific Component

```bash
# View file history
git log --oneline src/components/ChatWidget.jsx

# Rollback to specific commit
git checkout <commit-hash> -- src/components/ChatWidget.jsx

# Or rollback to version tag
git checkout v1.5.0 -- src/components/ChatWidget.jsx
```

### Rollback Configuration Files

```bash
# package.json
git checkout v1.5.0 -- package.json
npm install

# tailwind.config.js
git checkout v1.5.0 -- tailwind.config.js

# vite.config.js
git checkout v1.5.0 -- vite.config.js
```

---

## 🔍 Identifying What to Rollback

### Check Recent Changes

```bash
# See what changed in last commit
git show HEAD

# See what changed between versions
git diff v1.5.0 v2.0.0

# See what changed in specific file
git diff v1.5.0 v2.0.0 -- src/pages/ValueModel.jsx
```

### Check File Modifications

```bash
# List modified files
git status

# See detailed changes
git diff

# See changes in specific directory
git diff src/pages/
```

---

## 💾 Backup Strategies

### Daily Backups (Development)

```bash
# Create daily backup script
cat > backup-daily.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d)
git tag backup-$DATE
git push origin backup-$DATE
EOF

chmod +x backup-daily.sh
```

### Before Major Changes

1. **Create feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Work on feature branch**
3. **Test thoroughly**
4. **Merge when stable:**
   ```bash
   git checkout main
   git merge feature/new-feature
   ```

### Version Releases

1. **Tag the release:**
   ```bash
   git tag -a v2.0.0 -m "RAG Chatbot and Responsive Design"
   git push origin v2.0.0
   ```

2. **Create release branch:**
   ```bash
   git checkout -b release/v2.0.0
   ```

---

## 🚨 Emergency Rollback

### Quick Emergency Rollback

```bash
# 1. Stop all services
# (Ctrl+C in all terminals)

# 2. Rollback to last known good version
git checkout v1.5.0

# 3. Rebuild
npm install
npm run build

# 4. Restart services
npm run dev
```

### Partial Emergency Rollback

```bash
# Rollback only broken files
git checkout HEAD~1 -- src/pages/BrokenPage.jsx

# Rebuild
npm run build
```

---

## 📝 Rollback Checklist

Before rolling back:

- [ ] Identify the issue clearly
- [ ] Determine which version was stable
- [ ] Check what files changed
- [ ] Create backup of current state
- [ ] Document why rollback is needed
- [ ] Test after rollback
- [ ] Update documentation if needed

After rolling back:

- [ ] Verify functionality works
- [ ] Update VERSION.txt
- [ ] Document rollback in VERSION_HISTORY.md
- [ ] Create issue/ticket for the problem
- [ ] Plan fix for next version

---

## 🔧 Restoring from Backup

### From Git Tag

```bash
# List backup tags
git tag -l "backup-*"

# Restore from backup
git checkout backup-20241124

# Create new branch from backup
git checkout -b restore-from-backup backup-20241124
```

### From Manual Backup

```bash
# Restore files from backup directory
cp -r backups/backup-20241124/src/ src/
cp backups/backup-20241124/package.json package.json

# Reinstall dependencies if package.json changed
npm install
```

---

## 📊 Version Comparison

### Compare Two Versions

```bash
# See all differences
git diff v1.5.0 v2.0.0

# See only file list
git diff --name-only v1.5.0 v2.0.0

# See statistics
git diff --stat v1.5.0 v2.0.0
```

### Find When File Changed

```bash
# See commit history for file
git log --oneline src/components/ChatWidget.jsx

# See when specific line changed
git blame src/components/ChatWidget.jsx
```

---

## 🎯 Best Practices

1. **Always create a branch for major changes**
2. **Tag releases immediately after testing**
3. **Keep VERSION.txt updated**
4. **Document rollbacks in VERSION_HISTORY.md**
5. **Test rollback procedure periodically**
6. **Keep backups for at least 30 days**

---

## 📞 Need Help?

- Check `VERSION_HISTORY.md` for version details
- Review `PROJECT_DOCUMENTATION.md` for architecture
- See `CHANGELOG.md` for what changed

---

**Last Updated:** 2024-11-24  
**Next Review:** 2024-12-01

