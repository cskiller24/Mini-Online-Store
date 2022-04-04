import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../utils/components/Loading";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const effectLogout = async () => {
    const { status } = await logout();
    if (status) {
      setLoading(false);
      navigate("/login", { replace: true });
    }
  };
  useEffect(() => {
    if (loading) {
      effectLogout();
    }
    return () => {
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <Loading />
    </>
  );
};

export default Logout;
