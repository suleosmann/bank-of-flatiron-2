import React, { useState, useEffect } from "react";
import TransactionsList from "./Components/TransactionsList";
import TransactionForm from "./Components/TransactionForm";
import SearchBar from "./Components/SearchBar";
import "./App.css";
function App() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTransactions(filteredTransactions);
  };

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="app-container">
      <h1>Bank of Flatiron</h1>
      <SearchBar onSearch={handleSearch} setSearchTerm={setSearchTerm} />
      <TransactionForm />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default App;
