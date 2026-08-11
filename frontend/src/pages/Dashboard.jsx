import { useEffect, useState } from "react";
import PlanSetupForm from "../components/PlanSetupForm";

function Dashboard() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestPlan = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/plan/latest");

        // No plan exists
        if (response.status === 404) {
          setShowSetup(true);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch study plan.");
        }

        const data = await response.json();

        setPlan(data);
        setShowSetup(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPlan();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <div>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  // No plan exists
  if (showSetup) {
    return (
      <div>
        <PlanSetupForm
          onPlanCreated={(newPlan) => {
            setPlan(newPlan);
            setShowSetup(false);
          }}
        />
      </div>
    );
  }

  // Plan exists
  return (
    <div>
      <h1>Study Dashboard</h1>

      <h2>Latest Study Plan</h2>

      {plan && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h3>Plan Details</h3>

          <p>
            <strong>Start Date:</strong>{" "}
            {plan.date}
          </p>

          <p>
            <strong>Hours Per Day:</strong>{" "}
            {plan.hours}
          </p>

          <h4>Subjects</h4>

          <ul>
            {plan.subjects?.map((subject, index) => (
              <li key={index}>
                {subject}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setShowSetup(true)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
        }}
      >
        Create New Plan
      </button>

      {showSetup && (
        <PlanSetupForm
          onPlanCreated={(newPlan) => {
            setPlan(newPlan);
            setShowSetup(false);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;