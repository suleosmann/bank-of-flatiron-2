import React, { useState } from "react";

function AddTransactionForm() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault(); 
    if (!date || !description || !category || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        description: description,
        category: category,
        amount: parseFloat(amount), // Ensure amount is a number
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Transaction added successfully");
          // Clear the form fields
          setDate("");
          setDescription("");
          setCategory("");
          setAmount("");
          setError(null); // Clear any previous errors
        } else {
          alert("Failed to add the transaction. Please try again.");
        }
      })
      .catch((error) => {
        setError("An error occurred: " + error.message);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Date input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Description input */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        {/* Category input */}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />

        {/* Amount input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
          required
        />

        <button type="submit">Add Transaction</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default AddTransactionForm;
