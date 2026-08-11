function Flashcards() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Flashcards</h1>

      <p>
        Review your study material using flashcards.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          maxWidth: "500px",
        }}
      >
        <h2>Sample Flashcard</h2>

        <p>
          <strong>Question:</strong>
        </p>

        <p>
          What is a matrix?
        </p>

        <hr />

        <p>
          <strong>Answer:</strong>
        </p>

        <p>
          A matrix is a rectangular arrangement of numbers,
          symbols, or expressions in rows and columns.
        </p>
      </div>
    </div>
  );
}

export default Flashcards;