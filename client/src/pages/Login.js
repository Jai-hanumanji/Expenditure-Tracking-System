import React,{ useState,useEffect} from 'react';
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import image1 from "./image1.jpg";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div style={{ backgroundImage: "url(" + "https://cdn.corporatefinanceinstitute.com/assets/accounts-expenses.jpeg" + ")",
    backgroundPosition: 'center',backgroundRepeat:"no-repeat", 
    backgroundSize:'cover'
    }} className='resgister-page'>
    {loading && <Spinner />}
    <div >
        <Form style={{border: '200px', padding:'50px', backgroundColor:'white', color: "#000" }} layout="vertical" onFinish={submitHandler}>
          <h1>Login Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link className='m-3' to="/register">Not a user ? Cleck Here to Register  </Link>
            <button className="btn btn-primary">  Login</button>
          </div>
        </Form>
        </div>
    </div>
  )
}

export default Login