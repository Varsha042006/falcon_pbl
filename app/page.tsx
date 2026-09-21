import Link from 'next/link';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { ensureFacultyRoster } from '@/lib/ensure-faculty';

export default async function HomePage(){
  await ensureFacultyRoster();
  const session = await getSession();

  const counts = (await query<any>(`
    SELECT
      (SELECT COUNT(*)::int FROM projects_v2 WHERE visibility='PUBLIC' AND status<>'DRAFT') as projects_count,
      (SELECT COUNT(*)::int FROM teams_v2 WHERE status='ACTIVE') as teams_count,
      (SELECT COUNT(*)::int FROM project_allocations_v2 WHERE status='ACTIVE') as allocations_count,
      (SELECT COUNT(*)::int FROM faculty_v2 WHERE is_active=true) as faculty_count
  `))[0] || { projects_count: 0, teams_count: 0, allocations_count: 0, faculty_count: 0 };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Falcon PBL Project Hub</h1>
          <p className="lead">
            Project-Based Learning platform for the Department of Computer Science and Engineering at GM University.
            Supporting cycle management, team formation, project allocation, review submissions, and rubric evaluation.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn" href="/projects">Explore Projects</Link>
            <Link className="btn secondary" href="/teams">View Teams</Link>
            {session ? (
              <Link className="btn secondary" href="/dashboard">Open Dashboard</Link>
            ) : (
              <Link className="btn secondary" href="/login">Secure Login</Link>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Overview & Live Metrics</h2>
          <div className="grid">
            <div className="card">
              <span className="metric">{counts.projects_count}</span>
              <h3>Published Projects</h3>
              <p>Faculty-offered and team-initiated project proposals.</p>
              <Link className="btn secondary" href="/projects">Explore Projects</Link>
            </div>
            <div className="card">
              <span className="metric">{counts.teams_count}</span>
              <h3>Active PBL Teams</h3>
              <p>Formed teams with 5 to 6 members and designated leaders.</p>
              <Link className="btn secondary" href="/teams">View Teams</Link>
            </div>
            <div className="card">
              <span className="metric">{counts.allocations_count}</span>
              <h3>Project Allocations</h3>
              <p>Teams assigned to approved project titles with faculty guides.</p>
              <Link className="btn secondary" href="/allocations">View Allocations</Link>
            </div>
            <div className="card">
              <span className="metric">{counts.faculty_count}</span>
              <h3>Faculty Members</h3>
              <p>Mentors, coordinators, and project guides in CSE.</p>
              <Link className="btn secondary" href="/faculty">Faculty Directory</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
