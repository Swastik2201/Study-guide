import { useEffect, useState } from "react";

function StudyTimeline() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch("/api/plan/latest");

        if (!response.ok) {
          throw new Error("Failed to load study plan");
        }

        const data = await response.json();

        // Get the days array from the API response
        setDays(data.days || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  // Loading
  if (loading) {
    return <h2>Loading study plan...</h2>;
  }

  // Error
  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // No days
  if (days.length === 0) {
    return <h2>No study plan available.</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Study Timeline</h1>

      <p style={styles.subtitle}>
        Your study plan organized by date
      </p>

      {/* Timeline */}
      <div style={styles.timeline}>

        {days.map((day, index) => (
          <div key={index} style={styles.dayCard}>

            {/* Date */}
            <div style={styles.dateSection}>
              <div style={styles.number}>
                {index + 1}
              </div>

              <div>
                <h2 style={styles.date}>
                  {formatDate(day.date)}
                </h2>

                <p style={styles.dayText}>
                  Day {index + 1}
                </p>
              </div>
            </div>

            {/* Tasks table */}
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Topic</th>
                  <th style={styles.th}>Hours</th>
                </tr>
              </thead>

              <tbody>
                {day.tasks && day.tasks.length > 0 ? (
                  day.tasks.map((task, taskIndex) => (
                    <tr key={taskIndex}>
                      <td style={styles.td}>
                        {task.subject}
                      </td>

                      <td style={styles.td}>
                        {task.topic}
                      </td>

                      <td style={styles.td}>
                        {task.hours} hr
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      style={styles.empty}
                    >
                      No tasks for this day
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        ))}

      </div>
    </div>
  );
}


// Convert date into readable format
function formatDate(dateString) {
  if (!dateString) {
    return "Unknown Date";
  }

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


// Basic styling
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  dayCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
  },

  dateSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  number: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#222",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  date: {
    margin: 0,
    fontSize: "20px",
  },

  dayText: {
    margin: "5px 0 0",
    color: "#777",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    borderBottom: "2px solid #ddd",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  empty: {
    padding: "15px",
    textAlign: "center",
    color: "#777",
  },
};

export default StudyTimeline;