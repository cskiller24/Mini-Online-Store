import AdminTransaction from "./components/AdminTransaction";

const AdminTransactions = ({ transactions, updateStatus }) => {
  return (
    <>
      {transactions.map((transaction) => (
        <AdminTransaction
          transaction={transaction}
          key={transaction.id}
          updateStatus={updateStatus}
        />
      ))}
    </>
  );
};

export default AdminTransactions;
