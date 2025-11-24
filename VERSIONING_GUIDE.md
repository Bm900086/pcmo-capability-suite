# Versioning Guide

**Version:** v2.0.0  
**Last Updated:** 2024-11-24

---

## Version Number Format

We use **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR** (2.0.0): Breaking changes, major feature additions
- **MINOR** (2.1.0): New features, enhancements (backward compatible)
- **PATCH** (2.0.1): Bug fixes, minor improvements

---

## Where Versions Are Tracked

### 1. VERSION.txt
Simple text file with current version:
```
2.0.0
```

### 2. package.json
```json
{
  "version": "2.0.0"
}
```

### 3. VERSION_HISTORY.md
Complete version history with details

### 4. CHANGELOG.md
Detailed changelog following Keep a Changelog format

### 5. File Headers
Key files include version headers:
```javascript
/**
 * Component Name
 * Version: 2.0.0
 * Last Updated: 2024-11-24
 */
```

### 6. Git Tags
```bash
git tag -a v2.0.0 -m "Description"
```

---

## Version Update Process

### Step 1: Determine Version Type

**PATCH (2.0.0 → 2.0.1):**
- Bug fixes
- Minor improvements
- Documentation updates
- No new features
- No breaking changes

**MINOR (2.0.0 → 2.1.0):**
- New features
- Enhancements
- Backward compatible
- No breaking changes

**MAJOR (2.0.0 → 3.0.0):**
- Breaking changes
- Major feature additions
- API changes
- Architecture changes

### Step 2: Update Version Files

1. **Update VERSION.txt:**
   ```bash
   echo "2.1.0" > VERSION.txt
   ```

2. **Update package.json:**
   ```json
   {
     "version": "2.1.0"
   }
   ```

3. **Update VERSION_HISTORY.md:**
   - Add new version entry
   - Document changes
   - Note breaking changes
   - Add rollback instructions

4. **Update CHANGELOG.md:**
   - Add new version section
   - Categorize changes (Added/Changed/Fixed/etc.)

5. **Update file headers:**
   - Add version header to new files
   - Update version in modified files

### Step 3: Create Git Tag

```bash
# Create annotated tag
git tag -a v2.1.0 -m "New features: X, Y, Z"

# Push tag to remote
git push origin v2.1.0
```

### Step 4: Document

- Update PROJECT_DOCUMENTATION.md if architecture changed
- Update relevant setup guides if needed
- Update DOCUMENTATION_INDEX.md if new docs added

---

## Version Header Format

### JavaScript/JSX Files
```javascript
/**
 * Component/File Name
 * Version: 2.0.0
 * Last Updated: 2024-11-24
 * 
 * Description of what this file does
 */
```

### Python Files
```python
"""
Module/File Name
Version: 1.0.0
Last Updated: 2024-11-24

Description of what this file does
"""
```

### Markdown Files
```markdown
# Document Title

**Version:** v2.0.0  
**Last Updated:** 2024-11-24
```

---

## Version Naming Conventions

### Release Versions
- `v2.0.0` - Stable release
- `v2.1.0` - Feature release
- `v2.0.1` - Patch release

### Pre-release Versions
- `v2.1.0-alpha.1` - Alpha release
- `v2.1.0-beta.1` - Beta release
- `v2.1.0-rc.1` - Release candidate

### Development Versions
- `v2.1.0-dev` - Development version
- `v2.1.0-snapshot` - Snapshot version

---

## Version Comparison

### Comparing Versions

```bash
# See what changed between versions
git diff v2.0.0 v2.1.0

# See file list
git diff --name-only v2.0.0 v2.1.0

# See statistics
git diff --stat v2.0.0 v2.1.0
```

### Viewing Version History

```bash
# List all tags
git tag -l

# View tag details
git show v2.0.0

# View commit history
git log --oneline
```

---

## Version Compatibility

### Frontend/Backend Compatibility

| Frontend Version | Backend Version | Status |
|-----------------|----------------|--------|
| v2.0.0          | rag_service v1.0.0 | ✅ Compatible |
| v1.5.0          | N/A            | ✅ Standalone |
| v1.4.0          | N/A            | ✅ Standalone |

### Dependency Versions

Tracked in:
- `package.json` - Frontend dependencies
- `rag_service/requirements.txt` - Backend dependencies

---

## Version Rollback

See [BACKUP_AND_ROLLBACK.md](./BACKUP_AND_ROLLBACK.md) for detailed rollback procedures.

### Quick Rollback

```bash
# Rollback to specific version
git checkout v2.0.0

# Update version files
echo "2.0.0" > VERSION.txt
# Update package.json
```

---

## Best Practices

1. **Always update version after significant changes**
2. **Create Git tag for each release**
3. **Document breaking changes clearly**
4. **Keep VERSION_HISTORY.md updated**
5. **Update file headers when modifying files**
6. **Test before tagging a version**
7. **Follow semantic versioning strictly**

---

## Version Checklist

Before releasing a new version:

- [ ] All tests pass
- [ ] Documentation updated
- [ ] VERSION.txt updated
- [ ] package.json version updated
- [ ] VERSION_HISTORY.md updated
- [ ] CHANGELOG.md updated
- [ ] File headers updated
- [ ] Git tag created
- [ ] Tag pushed to remote
- [ ] Release notes prepared (if applicable)

---

## Examples

### Example: Patch Release (2.0.0 → 2.0.1)

**Changes:**
- Fixed bug in ValueModel.jsx
- Updated error messages

**Steps:**
1. Fix bug
2. Update `VERSION.txt` to `2.0.1`
3. Update `package.json` version
4. Add entry to `CHANGELOG.md` under [2.0.1]
5. Update `VERSION_HISTORY.md`
6. Create tag: `git tag -a v2.0.1 -m "Bug fixes"`

### Example: Minor Release (2.0.0 → 2.1.0)

**Changes:**
- Added new feature: Export functionality
- Enhanced dashboard

**Steps:**
1. Implement feature
2. Update `VERSION.txt` to `2.1.0`
3. Update `package.json` version
4. Add entry to `CHANGELOG.md` under [2.1.0]
5. Update `VERSION_HISTORY.md` with new features
6. Update file headers in new/modified files
7. Create tag: `git tag -a v2.1.0 -m "New export feature"`

### Example: Major Release (2.0.0 → 3.0.0)

**Changes:**
- Complete architecture rewrite
- Breaking API changes

**Steps:**
1. Implement changes
2. Update `VERSION.txt` to `3.0.0`
3. Update `package.json` version
4. Add entry to `CHANGELOG.md` under [3.0.0]
5. Update `VERSION_HISTORY.md` with breaking changes
6. Create migration guide
7. Update all file headers
8. Create tag: `git tag -a v3.0.0 -m "Major architecture update"`

---

**Last Updated:** 2024-11-24  
**Next Review:** 2024-12-01

