# Falcon PBL Project Hub — Version 4.1.0

Falcon PBL Project Hub is a Next.js + PostgreSQL PBL project publishing, team allocation, review-submission, rubric-assessment and verification system for GM University, Davanagere.

**Falcon Bakes credits:** Varsha A and Nikhil G K.

## V4 functionality retained

V4.1 keeps all V4 functionality: full team details for faculty applications, global Back navigation, Student My Team, Coordinator review/rubric configuration, dynamic review submission requirements, team-based file submission, faculty evaluation lock until mandatory evidence is submitted, team-level rubric evaluation, per-student Contribution Indicator, system-derived individual marks, HoD verification/return workflow, and the verified two-page rubric PDF with student/Guide/HoD physical signature areas.

## V4.1 production-data update

- Fresh student master: **246 students** from `source-data/PBL_Hub_Production_Students.xlsx`.
- Semester 5: **159**; Semester 7: **87**.
- Semester 5 uses CS3A/CS3B/CS3C.
- Semester 7 uses CS4A/CS4B. Four Semester-7 source rows carrying CS3A/CS3B are normalized to CS4A/CS4B.
- Faculty master (23 faculty) is retained.
- Testing PBL Coordinator assignments, Guide allocations, teams, projects, submissions, rubrics/evaluations and other student-linked testing workflow data are reset for production onboarding.

## Student first-login rule

Username = **USN**.

Initial password = `m + MMDD + first meaningful mother name`, lowercase.

Examples:

- `BHARATHI B` -> `mMMDDbharathi`
- `S MEENAKSHI` -> `mMMDDmeenakshi` (single-letter initials are skipped)
- `NO DATA` -> `mMMDDindia`

The student must change the initial password after first login.

18 supplied student rows have DOB `#N/A`. Those students are enrolled, but their login accounts are inactive until DOB is supplied; V4.1 does not invent a different password. See `seed-data/production_student_exceptions_v4_1.csv`.

## Upgrade the V4 testing database into the V4.1 production baseline

The reset is intentionally guarded. **Run it only on the disposable V4 testing database.**

```bash
npm install
npm run db:upgrade-v4.1
CONFIRM_PRODUCTION_RESET=YES npm run db:prepare-production-v4.1
npm run build
npm start
```

PowerShell:

```powershell
npm install
npm run db:upgrade-v4.1
$env:CONFIRM_PRODUCTION_RESET="YES"
npm run db:prepare-production-v4.1
npm run build
npm start
```

## New empty database

```bash
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

## Deployment

The codebase remains portable to Vercel, Render, Railway, Docker, or a GMU Linux/Node.js/PostgreSQL server. Review-upload storage must be persistent in production.

## Documentation

- `docs/V4_1_PRODUCTION_ONBOARDING.md`
- `docs/CHANGELOG_V4_1.md`
- `docs/V4_UPGRADE.md`
- `docs/DEPLOYMENT.md`
- `docs/DATABASE.md`
- `docs/MAINTENANCE.md`
- `docs/PASSWORDS.md`
- `docs/RUBRIC_ENGINE.md`
