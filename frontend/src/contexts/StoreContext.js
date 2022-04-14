import React, { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  products as API_PRODUCTS,
  carts as API_CARTS,
  transactions as API_TRANSACTIONS,
} from "../utils/constants";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { PRODUCTS, PRODUCT, PRODUCT_CREATE, PRODUCT_UPDATE, PRODUCT_DELETE } =
    API_PRODUCTS;
  const { CARTS, CART_ADD, CART_DECREASE } = API_CARTS;
  const { TRANSACTIONS, TRANSACTION, TRANSACTION_CREATE, TRANSACTIION_UPDATE } =
    API_TRANSACTIONS;
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Validators before function calls
  const adminValidator = (user) => {
    return user?.is_admin === true;
  };
  const userValidator = (user) => {
    return user?.is_admin === false;
  };

  const fetch_products = async () => {
    await axiosPrivate
      .get(PRODUCTS)
      .then(({ status, data }) => {
        if (status === 200) {
          setProducts(data.data.products);
        }
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const fetch_carts = async () => {
    if (userValidator) {
      await axiosPrivate
        .get(CARTS)
        .then(({ status, data }) => {
          if (status === 200) {
            setCarts(data.data.carts);
          }
          console.log(data);
        })
        .catch((res) => console.error(res));
    } else {
      console.log("403 Forbidden");
    }
  };

  const insert_cart = async (id, product) => {
    if (!userValidator) {
      return console.log("401 Forbidden");
    }
    const data = {
      product_id: id,
    };
    await axiosPrivate
      .put(CART_ADD, data)
      .then(({ status, data }) => {
        console.log(data);
      })
      .catch((res) => console.log(res));
    if (carts.length > 0) {
      insert_cart_noload(product);
    }
  };

  const decrease_cart = async (id, product) => {
    if (!userValidator) {
      return console.log("401 Forbidden");
    }
    await axiosPrivate
      .put(CART_DECREASE, { product_id: id })
      .then(({ status, data }) => {
        console.log(data);
      })
      .catch((res) => {
        console.log(res);
      });
    if (carts.length > 0) {
      decrease_cart_noload(product);
    }
  };

  const fetch_transaction = async () => {
    if (!userValidator) {
      return console.log("401 Forbidden");
    }
    await axiosPrivate
      .get(TRANSACTION)
      .then(({ status, data }) => {
        if (status === 200) {
          setTransactions(data.data.transactions);
        }
        console.log(data);
      })
      .catch((res) => console.log(res));
  };

  const create_transaction = async (data) => {
    await axiosPrivate
      .post(TRANSACTION_CREATE, data)
      .then(({ status, data }) => {
        console.log(data);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const update_transaction = async (data) => {
    await axiosPrivate
      .put(TRANSACTIION_UPDATE, data)
      .then(({ status, data }) => {
        if (status === 200) {
          update_transaction_noload(data.data.transaction);
        }
        console.log(data);
      })
      .catch((res) => console.error(res));
  };

  const insert_cart_noload = (product) => {
    const cart = carts.find((cart) => product.name === cart.name);
    if (cart) {
      let newCart = carts.map((cart) =>
        cart.id === product.id ? { ...cart, quantity: cart.quantity + 1 } : cart
      );
      setCarts(newCart);
    } else {
      const addCart = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        slug: product.slug,
        quantity: 1,
      };
      setCarts([...carts, addCart]);
    }
  };

  const decrease_cart_noload = (product) => {
    let newCart = carts.map((cart) =>
      cart.id === product.id ? { ...cart, quantity: cart.quantity - 1 } : cart
    );
    newCart = newCart.filter((cart) => cart.quantity > 0);
    setCarts(newCart);
  };

  const update_transaction_noload = ({ reference_id, status }) => {
    let newTransaction = transactions.map((transaction) =>
      transaction.reference_id === reference_id
        ? { ...transaction, status: status }
        : transaction
    );
    setTransactions(newTransaction);
  };

  const api_test = async () => {
    await axiosPrivate.get("/test");
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        fetch_products,
        products,
        api_test,
        fetch_carts,
        carts,
        insert_cart,
        decrease_cart,
        transactions,
        fetch_transaction,
        create_transaction,
        update_transaction,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
