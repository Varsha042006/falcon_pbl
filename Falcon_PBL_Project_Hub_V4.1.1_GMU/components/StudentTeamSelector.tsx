'use client';

import { useMemo, useState } from 'react';

type Student = {
  enrollment_id: number | string;
  usn: string;
  name: string;
  section_code: string;
  mentor_name: string | null;
};

export default function StudentTeamSelector({
  students,
  pblCycleId,
  semester,
  minSize,
  maxSize,
}: {
  students: Student[];
  pblCycleId: number;
  semester: number;
  minSize: number;
  maxSize: number;
}) {
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('ALL');
  const [selected, setSelected] = useState<string[]>([]);
  const [leader, setLeader] = useState<string>('');

  const sections = useMemo(
    () => Array.from(new Set(students.map((s) => s.section_code))).sort(),
    [students],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students.filter((s) => {
      const sectionOk = section === 'ALL' || s.section_code === section;
      const searchOk = !q || s.usn.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
      return sectionOk && searchOk;
    });
  }, [students, search, section]);

  const selectedStudents = useMemo(
    () => students.filter((s) => selected.includes(String(s.enrollment_id))),
    [students, selected],
  );

  function toggle(id: number | string) {
    const strId = String(id);
    setSelected((current) => {
      if (current.includes(strId)) {
        const next = current.filter((x) => x !== strId);
        if (leader === strId) setLeader('');
        return next;
      }
      if (current.length >= maxSize) return current;
      return [...current, strId];
    });
  }

  function remove(id: number | string) {
    const strId = String(id);
    setSelected((current) => current.filter((x) => x !== strId));
    if (leader === strId) setLeader('');
  }

  const ready =
    selected.length >= minSize &&
    selected.length <= maxSize &&
    Boolean(leader) &&
    selected.includes(leader);

  return (
    <form action="/api/teams" method="post" className="form">
      <input type="hidden" name="pblCycleId" value={pblCycleId} />
      {selected.map((id) => (
        <input key={id} type="hidden" name="enrollmentIds" value={id} />
      ))}

      <div className="field">
        <label>Team name</label>
        <input name="teamName" required />
      </div>

      <div className="card">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px,1fr) minmax(170px,240px)',
            gap: '12px',
            alignItems: 'end',
          }}
        >
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Search student</label>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by USN or student name"
            />
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Section</label>
            <select value={section} onChange={(e) => setSection(e.target.value)}>
              <option value="ALL">All Sections</option>
              {sections.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="notice">
        <b>
          Selected: {selected.length} / {maxSize}
        </b>{' '}
        · Team size must be between {minSize} and {maxSize} students. Semester {semester} students only.
      </div>

      {selectedStudents.length > 0 && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Selected Students</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {selectedStudents.map((s, index) => {
              const strId = String(s.enrollment_id);
              return (
                <div
                  key={strId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <span>
                    <b>
                      {index + 1}. {s.usn}
                    </b>{' '}
                    — {s.name} <span className="muted">({s.section_code})</span>
                  </span>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => remove(strId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>USN</th>
              <th>Student Name</th>
              <th>Section</th>
              <th>Mentor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((s) => {
                const strId = String(s.enrollment_id);
                const checked = selected.includes(strId);
                const disabled = !checked && selected.length >= maxSize;
                return (
                  <tr key={strId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggle(strId)}
                        aria-label={`Select ${s.usn} ${s.name}`}
                      />
                    </td>
                    <td>
                      <b>{s.usn}</b>
                    </td>
                    <td>{s.name}</td>
                    <td>{s.section_code}</td>
                    <td>{s.mentor_name || '—'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>No eligible students match the current search/filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="field">
        <label>Team leader</label>
        <select
          name="leaderEnrollmentId"
          required
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
        >
          <option value="">Select one of the chosen students</option>
          {selectedStudents.map((s) => {
            const strId = String(s.enrollment_id);
            return (
              <option key={strId} value={strId}>
                {s.usn} — {s.name}
              </option>
            );
          })}
        </select>
      </div>

      {!ready && selected.length > 0 && (
        <div className="notice">
          Select {Math.max(0, minSize - selected.length)} more student(s) if needed and choose a team leader before creating the team.
        </div>
      )}

      <button className="btn" disabled={!ready}>
        Create &amp; Activate Team
      </button>
    </form>
  );
}
