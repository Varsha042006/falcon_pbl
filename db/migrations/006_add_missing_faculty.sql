-- Migration 006: Add missing faculty members
-- EC26030 - HARSHITHA H V
-- EC26031 - TEJAS R HASBAVI
-- EC26052 - SUSHAMA P M
-- EC26056 - BHAVANA K Y
-- EC26063 - BABU SAB

DO $$
DECLARE
  fac_role_id INT;
  default_pw_hash VARCHAR(255) := '$2a$10$0zHkW2y54m0gXjI0a91J8.C8Xz7U6A/t95p5W6U0Dpe65Z87KeqK7';
  u_id BIGINT;
BEGIN
  SELECT id INTO fac_role_id FROM roles_v2 WHERE code = 'FACULTY';

  -- EC26030: HARSHITHA H V
  INSERT INTO users_v2(username, password_hash, display_name, must_change_password, is_active)
  VALUES('ec26030', default_pw_hash, 'HARSHITHA H V', true, true)
  ON CONFLICT(username) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO u_id;
  IF u_id IS NOT NULL AND fac_role_id IS NOT NULL THEN
    INSERT INTO user_roles_v2(user_id, role_id) VALUES(u_id, fac_role_id) ON CONFLICT DO NOTHING;
    INSERT INTO faculty_v2(user_id, employee_id, name, department, source, is_active)
    VALUES(u_id, 'EC26030', 'HARSHITHA H V', 'CSE', 'FACULTY_MASTER', true)
    ON CONFLICT(employee_id) DO UPDATE SET user_id = EXCLUDED.user_id, name = EXCLUDED.name;
  END IF;

  -- EC26031: TEJAS R HASBAVI
  INSERT INTO users_v2(username, password_hash, display_name, must_change_password, is_active)
  VALUES('ec26031', default_pw_hash, 'TEJAS R HASBAVI', true, true)
  ON CONFLICT(username) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO u_id;
  IF u_id IS NOT NULL AND fac_role_id IS NOT NULL THEN
    INSERT INTO user_roles_v2(user_id, role_id) VALUES(u_id, fac_role_id) ON CONFLICT DO NOTHING;
    INSERT INTO faculty_v2(user_id, employee_id, name, department, source, is_active)
    VALUES(u_id, 'EC26031', 'TEJAS R HASBAVI', 'CSE', 'FACULTY_MASTER', true)
    ON CONFLICT(employee_id) DO UPDATE SET user_id = EXCLUDED.user_id, name = EXCLUDED.name;
  END IF;

  -- EC26052: SUSHAMA P M
  INSERT INTO users_v2(username, password_hash, display_name, must_change_password, is_active)
  VALUES('ec26052', default_pw_hash, 'SUSHAMA P M', true, true)
  ON CONFLICT(username) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO u_id;
  IF u_id IS NOT NULL AND fac_role_id IS NOT NULL THEN
    INSERT INTO user_roles_v2(user_id, role_id) VALUES(u_id, fac_role_id) ON CONFLICT DO NOTHING;
    INSERT INTO faculty_v2(user_id, employee_id, name, department, source, is_active)
    VALUES(u_id, 'EC26052', 'SUSHAMA P M', 'CSE', 'FACULTY_MASTER', true)
    ON CONFLICT(employee_id) DO UPDATE SET user_id = EXCLUDED.user_id, name = EXCLUDED.name;
  END IF;

  -- EC26056: BHAVANA K Y
  INSERT INTO users_v2(username, password_hash, display_name, must_change_password, is_active)
  VALUES('ec26056', default_pw_hash, 'BHAVANA K Y', true, true)
  ON CONFLICT(username) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO u_id;
  IF u_id IS NOT NULL AND fac_role_id IS NOT NULL THEN
    INSERT INTO user_roles_v2(user_id, role_id) VALUES(u_id, fac_role_id) ON CONFLICT DO NOTHING;
    INSERT INTO faculty_v2(user_id, employee_id, name, department, source, is_active)
    VALUES(u_id, 'EC26056', 'BHAVANA K Y', 'CSE', 'FACULTY_MASTER', true)
    ON CONFLICT(employee_id) DO UPDATE SET user_id = EXCLUDED.user_id, name = EXCLUDED.name;
  END IF;

  -- EC26063: BABU SAB
  INSERT INTO users_v2(username, password_hash, display_name, must_change_password, is_active)
  VALUES('ec26063', default_pw_hash, 'BABU SAB', true, true)
  ON CONFLICT(username) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO u_id;
  IF u_id IS NOT NULL AND fac_role_id IS NOT NULL THEN
    INSERT INTO user_roles_v2(user_id, role_id) VALUES(u_id, fac_role_id) ON CONFLICT DO NOTHING;
    INSERT INTO faculty_v2(user_id, employee_id, name, department, source, is_active)
    VALUES(u_id, 'EC26063', 'BABU SAB', 'CSE', 'FACULTY_MASTER', true)
    ON CONFLICT(employee_id) DO UPDATE SET user_id = EXCLUDED.user_id, name = EXCLUDED.name;
  END IF;
END $$;
