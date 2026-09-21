import Link from 'next/link';
import { listProjects } from '@/lib/data';

export default async function ProjectsPage(){
  const projects = await listProjects();
  return (
    <section className="section">
      <div className="container">
        <h1>Explore Projects</h1>
        <p className="lead">Browse open faculty projects and student-initiated projects across semesters.</p>
        <div className="grid">
          {projects.map(p => (
            <article className="card" key={p.id}>
              <span className="status">{p.project_type === 'STUDENT_PROJECT' ? 'STUDENT INITIATED' : p.status}</span>
              <h2>{p.title}</h2>
              <p>{p.short_description || p.description?.slice(0, 160)}</p>
              <p><b>Semester:</b> {p.semester} &nbsp; <b>Capacity:</b> {p.allocated_count} / {p.max_teams}</p>
              <p><b>Owner:</b> {p.owner_name} &nbsp; <b>Guide:</b> {p.guide_name}</p>
              {p.technology_stack && (
                <div style={{ margin: '8px 0' }}>
                  {p.technology_stack.split(',').filter(Boolean).map(t => (
                    <span className="tag" key={t}>{t.trim()}</span>
                  ))}
                </div>
              )}
              <Link className="btn" href={`/projects/${p.id}`}>View Details</Link>
            </article>
          ))}
          {projects.length === 0 && <p>No published projects found.</p>}
        </div>
      </div>
    </section>
  );
}
