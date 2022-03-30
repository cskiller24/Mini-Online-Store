import axios from "../axios";
import { guest } from "../../utils/constants";

export const apiLogin = async (user) => {
  await axios
    .post(guest.LOGIN, user)
    .then((res) => {
      status_helper(true, res.data.user, res.response.status);
    })
    .catch((res) => {
      status_helper(false, res.data.error, res.response.status);
    });
};

export const apiRegister = async (user) => {
  await axios
    .post(guest.REGISTER, user)
    .then((res) => {
      status_helper(true, res.data, res.response.status);
    })
    .catch((res) => {
      status_helper(true, res.data.error, res.response.status);
    });
};

export const apiLogout = async () => {
  await axios
    .post(guest.LOGOUT)
    .then((res) => {
      status_helper(true, res.data.error, res.response.status);
    })
    .catch((res) => {
      status_helper(false, res.data.error, res.response.status);
    });
};

function status_helper(status, data, code) {
  return {
    status: status ?? false,
    data: data ?? [],
    status_code: code ?? 500,
  };
}

//general format
// const response = {
//   status : true/false,
//   data: {
//     products: [],
//     user: [],
//     etc.
//   },
//   status_code: 200(int)
// }
