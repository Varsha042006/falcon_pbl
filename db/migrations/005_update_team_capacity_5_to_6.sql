-- Migration 005: Update PBL cycle team member capacity to 5-6 members
ALTER TABLE pbl_cycles_v2 ALTER COLUMN team_min_size SET DEFAULT 5;
ALTER TABLE pbl_cycles_v2 ALTER COLUMN team_max_size SET DEFAULT 6;

UPDATE pbl_cycles_v2
SET team_min_size = 5,
    team_max_size = 6
WHERE team_min_size = 3 AND team_max_size = 4;
