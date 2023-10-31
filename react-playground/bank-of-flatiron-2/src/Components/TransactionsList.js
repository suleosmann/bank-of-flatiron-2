import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions }) { // Use object destructuring to access transactions
  const list = transactions.map((item) => (
    <Transaction
      key={item.id}
      date={item.date}
      description={item.description}
      category={item.category}
      amount={item.amount}
    />
  ));

  return <div>{list}</div>;
}

export default TransactionsList;
