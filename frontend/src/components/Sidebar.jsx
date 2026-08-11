import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        backgroundColor: "#222",
        color: "white",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>
        StudyMate
      </h2>

      <nav>
        <Link
          to="/dashboard"
          style={styles.link}
        >
          Dashboard
        </Link>

        <Link
          to="/timeline"
          style={styles.link}
        >
          Study Timeline
        </Link>

        <Link
          to="/flashcards"
          style={styles.link}
        >
          Flashcards
        </Link>

        <Link
          to="/quiz"
          style={styles.link}
        >
          Quiz
        </Link>
      </nav>
    </aside>
  );
}

const styles = {
  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "12px",
    marginBottom: "8px",
    borderRadius: "6px",
  },
};

export default Sidebar;