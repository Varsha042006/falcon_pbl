import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  const attempts = await query(`SELECT * FROM login_attempts_v2 ORDER BY id DESC LIMIT 5`);
  const lastUser = attempts[0]?.username;
  const user = lastUser ? await query(`SELECT id, username, display_name, must_change_password, last_login_at, password_changed_at FROM users_v2 WHERE lower(username)=$1`, [lastUser]) : [];
  const faculty = await query(`SELECT u.id, u.username, u.must_change_password, u.last_login_at, u.password_changed_at FROM users_v2 u JOIN faculty_v2 f ON f.user_id = u.id LIMIT 10`);
  return NextResponse.json({ attempts, user, faculty });
}
