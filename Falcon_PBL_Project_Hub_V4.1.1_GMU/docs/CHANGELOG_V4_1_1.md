# Changelog — Falcon PBL Project Hub V4.1.1 (GMU)

V4.1.1 is intentionally limited to the minor corrections approved after V4.1 testing. No GMIT branch/features are included.

## Corrected

- Coordinator review creation now asks only for **Submission Start Date** and **Submission Last Date**. The legacy `review_date` database column is retained only for backward compatibility and is not required for newly created reviews.
- Team review submission no longer reuses one PostgreSQL parameter as incompatible inferred types; this fixes `inconsistent types deduced for parameter $1` for URL and file submissions.
- Generic URL requirements accept valid HTTP/HTTPS URLs such as YouTube, Google Drive, Google Docs, GitHub and other web links. `YOUTUBE` validation remains available when the coordinator specifically requires YouTube.
- Team creation uses a searchable/filterable structured student selector with a selected-student summary and leader selection.
- Team-size rule is minimum **4** and maximum **6**.
- Faculty project `short_description` is upgraded from `VARCHAR(600)` to `TEXT`, allowing detailed content. Other long project content fields remain `TEXT`.
- Project publication validation now returns a readable form error rather than exposing an unhandled database error page.

## Requested cleanup utility

Added `db:cleanup-faculty-projects-v4.1.1`. With explicit confirmation it removes faculty projects/applications/allocations and returns affected allocated teams to ACTIVE. It preserves student/faculty masters, login/password data, team membership, student-created projects and review data.

## Preserved

- 246-student GMU production master and enrollments.
- 23-faculty GMU master.
- Existing student password-generation/change workflow.
- V4 review evidence, rubric, contribution-indicator, derived-marks, HoD verification and verified-PDF workflows.
- Existing teams/memberships and all other V4.1 functionality except the specifically approved changes above.
