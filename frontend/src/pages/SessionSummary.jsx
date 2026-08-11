import { useEffect, useState } from "react";

function SessionSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/sessions/summary");

        if (!response.ok) {
          throw new Error("Failed to fetch session summary.");
        }

        const data = await response.json();

        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <h2>Loading session summary...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.container}>
        <h2>Something went wrong</h2>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  // No data
  if (!summary) {
    return (
      <div style={styles.container}>
        <h2>No session data available.</h2>
      </div>
    );
  }

  /*
    Expected API response:

    {
      "totalMinutes": 180,
      "streak": 5,
      "subjects": [
        {
          "subject": "Mathematics",
          "minutes": 90
        },
        {
          "subject": "Physics",
          "minutes": 60
        },
        {
          "subject": "Computer Science",
          "minutes": 30
        }
      ]
    }
  */

  const subjects = summary.subjects || [];

  // Find the largest subject time.
  // This will be used to calculate bar widths.
  const maxMinutes =
    subjects.length > 0
      ? Math.max(...subjects.map((item) => item.minutes))
      : 1;

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            Session Summary
          </h1>

          <p style={styles.subtitle}>
            Track your study progress and consistency.
          </p>
        </div>

        {/* Streak Badge */}
        <div style={styles.streakBadge}>
          🔥
          <span>
            {summary.streak || 0} day streak
          </span>
        </div>
      </div>

      {/* Total Minutes Card */}
      <div style={styles.totalCard}>

        <p style={styles.cardLabel}>
          Total Study Time
        </p>

        <h2 style={styles.totalMinutes}>
          {summary.totalMinutes || 0}
          <span style={styles.minutesText}>
            {" "}minutes
          </span>
        </h2>

        <p style={styles.hoursText}>
          {convertMinutes(summary.totalMinutes || 0)}
        </p>

      </div>

      {/* Subject Breakdown */}
      <div style={styles.section}>

        <h2>
          Study Time by Subject
        </h2>

        {subjects.length === 0 ? (
          <p style={styles.empty}>
            No subject data available yet.
          </p>
        ) : (
          <div style={styles.subjectList}>

            {subjects.map((item, index) => {

              /*
                Calculate percentage.

                Example:

                Mathematics = 90 minutes
                Maximum = 90 minutes

                90 / 90 * 100 = 100%

                Physics = 60 minutes

                60 / 90 * 100 = 66.6%
              */

              const percentage =
                (item.minutes / maxMinutes) * 100;

              return (
                <div
                  key={index}
                  style={styles.subjectRow}
                >

                  {/* Subject name */}
                  <div style={styles.subjectHeader}>

                    <span style={styles.subjectName}>
                      {item.subject}
                    </span>

                    <span style={styles.subjectMinutes}>
                      {item.minutes} min
                    </span>

                  </div>

                  {/* Bar */}
                  <div style={styles.barBackground}>

                    <div
                      style={{
                        ...styles.bar,
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}


/*
  Convert minutes into a readable format.

  Example:

  90 minutes
  ↓
  1h 30m
*/
function convertMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }

  return `${hours}h ${remainingMinutes}m`;
}


// Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  subtitle: {
    color: "#666",
    marginTop: "8px",
  },

  streakBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "20px",
    backgroundColor: "#fff3cd",
    color: "#856404",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },

  totalCard: {
    padding: "25px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    backgroundColor: "#f8f8f8",
    marginBottom: "30px",
  },

  cardLabel: {
    margin: 0,
    color: "#666",
  },

  totalMinutes: {
    margin: "10px 0 5px",
    fontSize: "40px",
  },

  minutesText: {
    fontSize: "20px",
    fontWeight: "normal",
  },

  hoursText: {
    margin: 0,
    color: "#777",
  },

  section: {
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
  },

  subjectList: {
    marginTop: "25px",
  },

  subjectRow: {
    marginBottom: "25px",
  },

  subjectHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },

  subjectName: {
    fontWeight: "bold",
  },

  subjectMinutes: {
    color: "#666",
  },

  barBackground: {
    width: "100%",
    height: "18px",
    backgroundColor: "#e5e5e5",
    borderRadius: "10px",
    overflow: "hidden",
  },

  bar: {
    height: "100%",
    backgroundColor: "#333",
    borderRadius: "10px",
    transition: "width 0.5s ease",
  },

  empty: {
    color: "#777",
  },

  error: {
    color: "red",
  },
};

export default SessionSummary;