# Build Verification — V4.1.1 GMU

Verified for this package:

- Version: 4.1.1
- GMU-only source tree; no GMIT application branch copied into this package.
- Faculty seed: 23 records, unchanged from the GMU V4 baseline.
- Student seed: 246 records, unchanged from the recovered GMU V4.1 production student baseline.
- Semester counts: 159 Semester 5; 87 Semester 7.
- Section counts: CS3A 58, CS3B 52, CS3C 49, CS4A 44, CS4B 43.
- Missing-DOB status: 18 students remain DOB REQUIRED.
- Team defaults: minimum 4, maximum 6.
- TypeScript/TSX syntax transpilation check: 78 files, 0 syntax errors.
- Final ZIP archive integrity checked after packaging.

A complete `npm ci && npm run build` could not be completed in the artifact environment because dependency installation exceeded the environment execution window. Run `npm ci && npm run build` in the deployment environment before production release.
