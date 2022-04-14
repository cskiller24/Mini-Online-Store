import Close from "@mui/icons-material/Close";
import { Alert, Collapse, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import UserTransaction from "./Components/UserTransaction";

const UserTransactions = () => {
  const { transactions, fetch_transaction } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isTransactionAlertOpen, setIsTransactionAlertOpen] = useState(false);

  useEffect(() => {
    const index = async () => {
      if (transactions.length <= 0) {
        await fetch_transaction();
      }
      setIsLoading(false);
    };
    index();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && transactions.length <= 0) {
    return (
      <Typography variant="h2" sx={{ mt: 3, textAlign: "center" }}>
        No Transactions
      </Typography>
    );
  }

  if (!isLoading && transactions.length > 0) {
    return (
      <>
        <Collapse in={isTransactionAlertOpen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsTransactionAlertOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 2 }}
          >
            Successfully Modified Transaction
          </Alert>
        </Collapse>
        <Paper elevation={5} sx={{ mt: 3 }}>
          {transactions.map((transaction) => (
            <UserTransaction
              transaction={transaction}
              setIsTransactionAlertOpen={setIsTransactionAlertOpen}
              key={transaction.id}
            />
          ))}
        </Paper>
      </>
    );
  }
};

export default UserTransactions;
