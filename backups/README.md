# Backups Directory

This directory contains backup copies of critical files.

## Backup Files

Backups are created with timestamp format: `filename.YYYYMMDD_HHMMSS.backup`

## Restoring from Backup

```bash
# View available backups
ls backups/

# Restore a file
cp backups/package.json.20241124_120000.backup package.json
```

## Automatic Backups

Backups are created:
- Before major version updates
- Before significant changes
- Manually when needed

## Backup Policy

- Keep backups for 30 days
- Store critical backups in version control
- Document backup purpose in commit messages

---

**Last Backup:** 2024-11-24

