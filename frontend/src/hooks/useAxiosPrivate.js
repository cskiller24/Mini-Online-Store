import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { token } = useAuth();
  // useEffect(() => {
  //   const requestInterceptor = axiosPrivate.interceptors.request.use(
  //     (config) => {
  //       console.log("request run");
  //       if (!config.headers["Authorization"]) {
  //         config.headers["Authorization"] = `Bearer ${token}`;
  //       }
  //       return config;
  //     }
  //   );
  //   return () => {
  //     axiosPrivate.interceptors.request.eject(requestInterceptor);
  //   };
  // });
  axiosPrivate.interceptors.request.use((config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });
  return axiosPrivate;
};

export default useAxiosPrivate;
