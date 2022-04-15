import Close from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import useStore from "../../hooks/useStore";
import Loading from "../../utils/components/Loading";
import AdminTransaction from "./components/AdminTransaction";

const AdminTransactions = ({ updateStatus }) => {
  // const transactions2 = [
  //   {
  //     id: 1,
  //     name: "Juan Dela Cruz 5",
  //     contact_number: "121213",
  //     address: "Home Address",
  //     status: "Pending",
  //     products: [
  //       {
  //         id: 1,
  //         name: "This is a name",
  //         quantity: 4,
  //         price: 1000,
  //       },
  //       {
  //         id: 2,
  //         name: "This is a name 2",
  //         quantity: 6,
  //         price: 1000,
  //       },
  //       {
  //         id: 3,
  //         name: "This is a name 3",
  //         quantity: 5,
  //         price: 1000,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Juan Dela Cruz 4",
  //     contact_number: "121213",
  //     address: "Home Address",
  //     status: "Pending",
  //     products: [
  //       {
  //         id: 1,
  //         name: "This is a name",
  //         quantity: 4,
  //         price: 1000,
  //       },
  //       {
  //         id: 2,
  //         name: "This is a name 2",
  //         quantity: 6,
  //         price: 1000,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Juan Dela Cruz 3",
  //     contact_number: "121213",
  //     address: "Home Address",
  //     status: "Pending",
  //     products: [
  //       {
  //         id: 1,
  //         name: "This is a name",
  //         quantity: 4,
  //         price: 1000,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "Juan Dela Cruz",
  //     contact_number: "121213",
  //     address: "Home Address",
  //     status: "Pending",
  //     products: [
  //       {
  //         id: 1,
  //         name: "This is a name",
  //         quantity: 4,
  //         price: 1000,
  //       },
  //       {
  //         id: 2,
  //         name: "This is a name 2",
  //         quantity: 6,
  //         price: 1000,
  //       },
  //       {
  //         id: 3,
  //         name: "This is a name 3",
  //         quantity: 5,
  //         price: 1000,
  //       },
  //       {
  //         id: 4,
  //         name: "This is a name 4",
  //         quantity: 5,
  //         price: 1000,
  //       },
  //       {
  //         id: 5,
  //         name: "This is a name 5",
  //         quantity: 5,
  //         price: 1000,
  //       },
  //     ],
  //   },
  // ];

  const { transactions, fetch_transactions } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [transactionAlert, setTransactionAlert] = useState({
    state: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    const index = async () => {
      if (transactions.length <= 0) {
        await fetch_transactions();
      }
      setIsLoading(false);
    };
    index();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Collapse in={transactionAlert.state}>
        <Alert
          severity={transactionAlert.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setTransactionAlert({
                  state: false,
                  message: "",
                });
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 3 }}
        >
          {transactionAlert.message}
        </Alert>
      </Collapse>
      {transactions.map((transaction) => (
        <AdminTransaction
          transaction={{ ...transaction, status: parseInt(transaction.status) }}
          key={transaction.id}
          updateStatus={updateStatus}
          setIsLoading={setIsLoading}
          transactionAlert={setTransactionAlert}
        />
      ))}
    </>
  );
};

export default AdminTransactions;
