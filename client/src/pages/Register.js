import React,{ useState,useEffect} from 'react';
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import image2 from "./image2.jpg";
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const submitHandler = async (values) => {
        try {
          setLoading(true);
          await axios.post("/users/register", values);
          message.success("Registeration Successfull");
          setLoading(false);
          navigate("/login");
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
    <div style={{ backgroundImage: "url(" + "https://www.theforage.com/blog/wp-content/uploads/2023/02/expenses-1.jpg" + ")",backgroundRepeat:"no-repeat", 
    backgroundSize:'cover'
    }} className='resgister-page'>
        {loading && <Spinner />}
        <Form style={{border: '200px', padding:'50px', backgroundColor:'white', color: "#000" }} layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link className='m-3' to="/login">Already a user ? Cleck Here to login</Link>
            <button className="btn btn-primary">Resgiter</button>
          </div>
        </Form>
    </div>
  )
}

export default Register