import { pool } from './db';
import bcrypt from 'bcryptjs';

export const ADDITIONAL_FACULTY = [
  { employee_id: 'EC26030', name: 'HARSHITHA H V' },
  { employee_id: 'EC26031', name: 'TEJAS R HASBAVI' },
  { employee_id: 'EC26052', name: 'SUSHAMA P M' },
  { employee_id: 'EC26056', name: 'BHAVANA K Y' },
  { employee_id: 'EC26063', name: 'BABU SAB' }
];

let syncPromise: Promise<void> | null = null;

export async function ensureFacultyRoster(): Promise<void> {
  if (!syncPromise) {
    syncPromise = (async () => {
      try {
        const roleRes = await pool.query("SELECT id FROM roles_v2 WHERE code='FACULTY'");
        const facRoleId = roleRes.rows[0]?.id;
        if (!facRoleId) return;

        const defaultHash = await bcrypt.hash('Falcon@2026!', 10);

        for (const f of ADDITIONAL_FACULTY) {
          const username = f.employee_id.toLowerCase();
          const userRes = await pool.query(
            `INSERT INTO users_v2(username, password_hash, display_name, must_change_password, is_active)
             VALUES($1, $2, $3, true, true)
             ON CONFLICT(username) DO UPDATE SET display_name = EXCLUDED.display_name
             RETURNING id`,
            [username, defaultHash, f.name]
          );
          const userId = userRes.rows[0]?.id;
          if (userId) {
            await pool.query(
              `INSERT INTO user_roles_v2(user_id, role_id) VALUES($1, $2) ON CONFLICT DO NOTHING`,
              [userId, facRoleId]
            );
            await pool.query(
              `INSERT INTO faculty_v2(user_id, employee_id, name, department, source, is_active)
               VALUES($1, $2, $3, 'CSE', 'FACULTY_MASTER', true)
               ON CONFLICT(employee_id) DO UPDATE SET user_id = EXCLUDED.user_id, name = EXCLUDED.name`,
              [userId, f.employee_id, f.name]
            );
          }
        }
      } catch (e) {
        console.error('Auto-sync missing faculty error:', e);
      }
    })();
  }
  return syncPromise;
}
