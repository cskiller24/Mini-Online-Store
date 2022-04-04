import axiosClient from "../axios";
import { guest, TOKEN } from "../../utils/constants";

export const apiLogin = async (user) => {
  return await axiosClient
    .post(guest.LOGIN, user)
    .then(({ data, status }) => {
      return status_helper(true, data, status);
    })
    .catch((res) => {
      return status_helper(false, res.response.data, res.response.status);
    });
};

export const apiRegister = async (user) => {
  return await axiosClient
    .post(guest.REGISTER, user)
    .then((res) => {
      return status_helper(true, res.data, res.status);
    })
    .catch((res) => {
      return status_helper(false, res.response.data, res.response.status);
    });
};

export const apiLogout = async () => {
  const token = localStorage.getItem(TOKEN);
  return await axiosClient
    .post(
      guest.LOGOUT,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((res) => {
      return status_helper(true, res.data, res.status);
    })
    .catch((res) => {
      return status_helper(false, res.response?.data, res.response?.status);
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
