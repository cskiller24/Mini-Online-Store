import axios from "../axios";
import { guest } from "../../utils/constants";

export const apiLogin = async (user) => {
  await axios
    .post(guest.LOGIN, user)
    .then((res) => {
      console.log(res.data); //status_helper(true, res.data.user, res.response.status);
    })
    .catch((res) => {
      console.log(res.response.data); //status_helper(false, res.data.error, res.response.status);
    });
};

export const apiRegister = async (user) => {
  return await axios
    .post(guest.REGISTER, user)
    .then((res) => {
      console.log(res.data); //status_helper(true, res.data, res.response.status);
    })
    .catch((res) => {
      return status_helper(false, res.response.data, res.response.status);
      // return {
      //   status: false,
      //   data: res.response.data ?? [],
      //   status_code: res.response.code ?? 500,
      // };
    });
};

export const apiLogout = async () => {
  await axios
    .post(guest.LOGOUT)
    .then((res) => {
      console.log(res.data); //status_helper(true, res.data.error, res.response.status);
    })
    .catch((res) => {
      console.log(res.data); //status_helper(false, res.data.error, res.response.status);
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
