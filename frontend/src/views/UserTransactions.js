import { Paper } from "@mui/material";
import UserTransaction from "./UserTransaction";

const UserTransactions = ({ transactions, cancelTransaction }) => {
  return (
    <Paper elevation={5} sx={{ mt: 3 }}>
      {transactions.map((transaction) => (
        <UserTransaction
          transaction={transaction}
          key={transaction.id}
          cancelTransaction={cancelTransaction}
        />
      ))}
    </Paper>
  );
};

export default UserTransactions;
