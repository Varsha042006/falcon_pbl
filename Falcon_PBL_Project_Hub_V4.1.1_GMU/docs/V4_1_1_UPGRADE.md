# V4.1 -> V4.1.1 GMU Upgrade

This is a targeted upgrade. It does not require reseeding and must not use the old V4.1 testing reset on a database that now contains real data.

## 1. Back up PostgreSQL

Take a database backup/snapshot before any production update.

## 2. Install the V4.1.1 code dependencies

```bash
npm ci
```

Keep the same production `DATABASE_URL` and `SESSION_SECRET`.

## 3. Run the explicitly requested faculty-project cleanup

Run this **before** the V4.1.1 migration. It removes only faculty projects plus their applications/allocations and returns affected allocated teams to ACTIVE. Student/faculty/login/password/team-member data are not deleted.

```bash
CONFIRM_FACULTY_PROJECT_CLEANUP=YES npm run db:cleanup-faculty-projects-v4.1.1
```

PowerShell:

```powershell
$env:CONFIRM_FACULTY_PROJECT_CLEANUP="YES"
npm run db:cleanup-faculty-projects-v4.1.1
```

Student-created projects are preserved.

## 4. Apply the additive V4.1.1 migration

```bash
npm run db:upgrade-v4.1.1
```

Migration `005_v4_1_1_minor_fixes.sql` changes only:

- `projects_v2.short_description` -> `TEXT`
- PBL cycle team-size rule -> minimum 4, maximum 6

It does not delete student/faculty/password/team/review records.

## 5. Build and start

```bash
npm run build
npm start
```

## 6. Smoke test

Verify the four corrected workflows: create a review with date-only start/last dates; submit one file and one Google Drive/YouTube URL as a team; search/select 4–6 students in team creation; publish a faculty project with a long problem statement/description.

## Important

Do **not** run `npm run db:prepare-production-v4.1` on this existing database. That command was designed for the earlier one-time replacement of testing student/workflow data and is intentionally destructive.
