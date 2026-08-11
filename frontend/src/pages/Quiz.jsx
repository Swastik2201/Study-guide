import { useState } from "react";

function Quiz() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const correctAnswer = "React";

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Quiz</h1>

      <p>Test your knowledge.</p>

      <div
        style={{
          marginTop: "30px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >
        <h2>Question 1</h2>

        <p>
          Which library is used to build user interfaces?
        </p>

        <label style={{ display: "block", margin: "10px 0" }}>
          <input
            type="radio"
            name="answer"
            value="React"
            checked={selectedAnswer === "React"}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />

          {" "}React
        </label>

        <label style={{ display: "block", margin: "10px 0" }}>
          <input
            type="radio"
            name="answer"
            value="Python"
            checked={selectedAnswer === "Python"}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />

          {" "}Python
        </label>

        <label style={{ display: "block", margin: "10px 0" }}>
          <input
            type="radio"
            name="answer"
            value="MySQL"
            checked={selectedAnswer === "MySQL"}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />

          {" "}MySQL
        </label>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Submit Answer
        </button>

        {submitted && (
          <div style={{ marginTop: "20px" }}>
            {selectedAnswer === correctAnswer ? (
              <p style={{ color: "green" }}>
                Correct! 🎉
              </p>
            ) : (
              <p style={{ color: "red" }}>
                Incorrect. The correct answer is React.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;