import { Button, Modal, Form } from "react-bootstrap";
import Palm from "../assets/images/iconPalm.png";
import Hibiscus from "../assets/images/iconHibiscus.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/context/userContext";
import { useCustomMutation } from "../config/query";
import { login } from "../utils/auth";

import { setAuthToken } from "../config/api";
import Swal from "sweetalert2";

const Login = ({ show, handleCloseLogin }) => {
  const navigate = useNavigate();
  const loginMutation = useCustomMutation("login", login);

  const [_, dispatch] = useContext(UserContext);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = formLogin

  const OnHandlerChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginMutation.mutateAsync(formLogin);
      if (response) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response,
        });

        setAuthToken(response?.token);

        console.log(response?.role);

        if (response?.role === "As Partner") {
          navigate("/admin");
        } else if (response?.role === "As User") {
          navigate("/");
        } else {
          navigate("/")
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not registered!",
      });
    }
    handleCloseLogin();
  };

  return (
    <Modal show={show} onHide={() => handleCloseLogin()}>
      <Modal.Title
        className="RegisterLog"
      >
        Login
      </Modal.Title>

      <Modal.Body className="bodyRegLog">
        <Form onSubmit={(e) => handleLogin(e)}>
          <Form.Group className="formGroup">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              autoFocus
              required
              onChange={OnHandlerChange}
            />
          </Form.Group>
          <Form.Group className="formGroup">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={OnHandlerChange}
            />
          </Form.Group>
          <div className="buttonRegisterLog">
            <Button type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Modal.Body>

      <p className="text-center blurText">
        Don't have an account? Click <span>Here</span>
      </p>
    </Modal>
  );
};

export default Login;