import { useEffect } from "react";
import FormSignin from "./components/FormSign";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { authSelector, signin } from "../../features/authSlice";

const SigninPage = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const data = useSelector(authSelector.selectToken);
  const navigate = useNavigate();

  const handleSubmit = (payload) => {
    dispatch(signin(payload));
  };

  useEffect(() => {
    if (data) {
      setCookie("token", data, { path: "/" });
      const user = jwtDecode(data);
      console.log(user);
      navigate("/admin/dashboard");
    }
  }, [data, cookies, setCookie, navigate]);

  return <FormSignin onSubmit={handleSubmit} />;
};

export default SigninPage;
