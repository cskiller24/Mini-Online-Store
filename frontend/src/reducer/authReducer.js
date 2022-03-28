import axios from "../api/axios";

export const authActions = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
};

const login = async (user) => {
  await axios
    .post(authActions.LOGIN, user)
    .then((res) => {
      console.log(res.data.user, "asd");
    })
    .catch((err) => {
      console.log(err.response.data, "123");
    });
};

const register = async (user) => {
  const response = await axios
    .post(authActions.REGISTER, user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = async () => {
  const response = await axios
    .post(authActions.LOGOUT)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.LOGIN:
      return login(action.payload);
    case authActions.REGISTER:
      return register(action.payload);
    case authActions.LOGOUT:
      return logout;
    default:
      console.log("ERROR AUTH ACITONS");
      break;
  }
};
