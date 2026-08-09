import React from 'react'

function StudyTimeline({ days = [] }) {
  if (!days.length) {
    return (
      <div>
        <h2>Study Timeline</h2>
        <p>No study sessions planned yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Study Timeline</h2>

      {days.map((day, index) => (
        <div key={day.date || index}>
          <h3>{day.date}</h3>

          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Hours</th>
              </tr>
            </thead>

            <tbody>
              {(day.sessions || []).map((session, sessionIndex) => (
                <tr key={sessionIndex}>
                  <td>{session.subject}</td>
                  <td>{session.hours} hours</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
        </div>
      ))}
    </div>
  )
}

export default StudyTimeline