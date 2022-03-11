import Transaction from "../../components/Transaction";

const Transactions = ({ transactions, updateStatus }) => {
  return (
    <>
      {transactions.map((transaction) => (
        <Transaction
          transaction={transaction}
          key={transaction.id}
          updateStatus={updateStatus}
        />
      ))}
    </>
  );
};

export default Transactions;
