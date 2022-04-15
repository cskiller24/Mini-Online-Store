import React, { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  products as API_PRODUCTS,
  carts as API_CARTS,
  transactions as API_TRANSACTIONS,
  ADMIN_INDEX,
} from "../utils/constants";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const {
    PRODUCTS,
    PRODUCT,
    PRODUCT_CREATE,
    PRODUCT_UPDATE,
    PRODUCT_DELETE,
    PRODUCT_RESTOCK,
  } = API_PRODUCTS;
  const { CARTS, CART_ADD, CART_DECREASE } = API_CARTS;
  const { TRANSACTIONS, TRANSACTION, TRANSACTION_CREATE, TRANSACTIION_UPDATE } =
    API_TRANSACTIONS;
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [adminData, setAdminData] = useState(null);

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

  //User
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

  //Admin
  const fetch_transactions = async () => {
    if (!adminValidator) {
      return "401 Forbidden";
    }

    await axiosPrivate
      .get(TRANSACTIONS)
      .then(({ status, data }) => {
        if (status === 200) {
          setTransactions(data.data.transactions);
        }
        console.log(data);
      })
      .catch((res) => console.error(res));
  };

  const create_transaction = async (data) => {
    await axiosPrivate
      .post(TRANSACTION_CREATE, data)
      .then(({ status, data }) => {
        console.log(data);
        if (status === 200) {
          setCarts([]);
        }
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

  const insert_product = async (data) => {
    if (!adminValidator) {
      return console.log("401 Forbidden");
    }
    await axiosPrivate
      .post(PRODUCT_CREATE, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ status, data }) => {
        if (status === 201) {
          insert_product_noload(data.data.product);
        }
        console.log(data.data.product);
      })
      .catch((res) => console.error(res));
  };

  const update_product = async (data, id) => {
    await axiosPrivate
      .post(PRODUCT_UPDATE + id, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          update_product_noload(data.data.product);
        }
        console.log(data);
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const delete_product = async (id) => {
    await axiosPrivate
      .delete(PRODUCT_DELETE + id)
      .then(({ status }) => {
        if (status === 204) {
          delete_product_noload(id);
        }
        console.log(status);
      })
      .catch((res) => console.error(res));
  };

  const restock_product = async (id, quantity) => {
    await axiosPrivate
      .put(PRODUCT_RESTOCK + id, { quantity: quantity })
      .then(({ status, data }) => {
        if (status === 200) {
          update_product_noload(data.data.product);
        }
        console.log(data);
      })
      .catch((res) => console.log(res));
  };

  const fetch_admin = async () => {
    if (!adminValidator) {
      return console.log("401 Forbidden");
    }
    await axiosPrivate
      .get(ADMIN_INDEX)
      .then(({ status, data }) => {
        if (status === 200) {
          setAdminData(data.data);
        }
        console.log(data);
      })
      .catch((res) => console.error(res));
  };

  const reset_store = () => {
    setAdminData(null);
    setCarts([]);
    setProducts([]);
    setTransactions([]);
  };

  const insert_product_noload = (product) => {
    setProducts([...products, product]);
  };

  const update_product_noload = (newProduct) => {
    let newProducts = products.map((product) =>
      product.id === newProduct.id
        ? {
            ...product,
            name: newProduct.name,
            quantity: newProduct.quantity,
            slug: newProduct.slug,
            image: newProduct.image,
            price: newProduct.price,
          }
        : product
    );
    setProducts(newProducts);
  };

  const delete_product_noload = (id) => {
    let newProduct = products.filter((product) => product.id !== id);
    setProducts(newProduct);
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
        fetch_admin,
        adminData,
        insert_product,
        update_product,
        delete_product,
        restock_product,
        reset_store,
        fetch_transactions,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
