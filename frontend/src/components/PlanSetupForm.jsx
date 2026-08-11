import { useState } from "react";

function PlanSetupForm({ onPlanCreated }) {
  const subjectsList = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Data Structures",
    "Artificial Intelligence",
  ];

  const [subjects, setSubjects] = useState([]);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubjectChange = (subject) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((item) => item !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (subjects.length === 0) {
      setError("Please select at least one subject.");
      return;
    }

    if (!date) {
      setError("Please select a start date.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjects,
          date,
          hours,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create study plan.");
      }

      const data = await response.json();

      onPlanCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-form">
      <h1>Create Your Study Plan</h1>

      <p>Select your subjects and decide how much time you want to study.</p>

      <form onSubmit={handleSubmit}>

        {/* Subjects */}
        <div>
          <h3>Select Subjects</h3>

          {subjectsList.map((subject) => (
            <label key={subject} style={{ display: "block", margin: "8px 0" }}>
              <input
                type="checkbox"
                checked={subjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
              />

              {" "}

              {subject}
            </label>
          ))}
        </div>

        {/* Date */}
        <div style={{ marginTop: "20px" }}>
          <h3>Start Date</h3>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Hours */}
        <div style={{ marginTop: "20px" }}>
          <h3>Hours Per Day</h3>

          <input
            type="range"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />

          <p>{hours} hours per day</p>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating Plan..." : "Create Study Plan"}
        </button>

      </form>
    </div>
  );
}

export default PlanSetupForm;