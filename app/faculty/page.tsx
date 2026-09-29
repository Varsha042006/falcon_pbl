import { query } from '@/lib/db';
import { ensureFacultyRoster } from '@/lib/ensure-faculty';

export default async function FacultyDirectory(){
  await ensureFacultyRoster();
  const faculty = await query<any>(`
    SELECT f.employee_id, f.name, f.department, COALESCE(f.designation, 'Faculty') designation,
      COALESCE(gl.overall_max_projects, 6) max_guide_capacity,
      COUNT(pa.id) FILTER (WHERE pa.status = 'ACTIVE')::int active_teams
    FROM faculty_v2 f
    LEFT JOIN faculty_guide_limits_v2 gl ON gl.faculty_id = f.id
    LEFT JOIN project_allocations_v2 pa ON pa.guide_faculty_id = f.id
    WHERE f.is_active = true
    GROUP BY f.id, f.employee_id, f.name, f.department, f.designation, gl.overall_max_projects
    ORDER BY f.name
  `);

  return (
    <section className="section">
      <div className="container">
        <h1>Faculty Directory</h1>
        <p className="lead">Department of Computer Science & Engineering faculty members, mentors, and guides.</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Active Guided Teams</th>
                <th>Guide Capacity</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map(f => (
                <tr key={f.employee_id}>
                  <td><b>{f.employee_id}</b></td>
                  <td>{f.name}</td>
                  <td>{f.department}</td>
                  <td>{f.active_teams}</td>
                  <td>{f.max_guide_capacity}</td>
                </tr>
              ))}
              {faculty.length === 0 && (
                <tr>
                  <td colSpan={5}>No faculty found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
