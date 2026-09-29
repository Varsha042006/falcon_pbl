-- Falcon PBL Project Hub V4.1.1 — GMU minor corrective update.
-- Non-destructive schema/rule changes only. Student/faculty/login data are untouched.

-- Faculty project descriptions may contain detailed content.
ALTER TABLE projects_v2 ALTER COLUMN short_description TYPE TEXT;

-- Approved team-size rule for current and future PBL cycles.
ALTER TABLE pbl_cycles_v2 ALTER COLUMN team_min_size SET DEFAULT 4;
ALTER TABLE pbl_cycles_v2 ALTER COLUMN team_max_size SET DEFAULT 6;

UPDATE pbl_cycles_v2
SET team_min_size=4,
    team_max_size=6
WHERE team_min_size IS DISTINCT FROM 4 OR team_max_size IS DISTINCT FROM 6;
