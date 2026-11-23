
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginModel from "./loginModel";

const useLoginViewModel = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleUsernameChange = (value) => {
    setUsername(value);

    setErrors((prev) => ({
      ...prev,
      username: "",
    }));

    setMessage("");
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    setErrors((prev) => ({
      ...prev,
      password: "",
    }));

    setMessage("");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setMessage("");

    const validationErrors =
      loginModel.validateCredentials(username, password);

    setErrors(validationErrors);

    if (
      validationErrors.username ||
      validationErrors.password
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const result = loginModel.authenticate(
        username,
        password
      );

      if (result.success) {
        setPassword("");

        navigate("/dashboard", {
          replace: true,
        });
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setMessage(loginModel.forgotPassword());
  };

  const handleGuestLogin = () => {
    const result = loginModel.guestLogin();

    if (result.success) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  };

  return {
    username,
    password,
    showPassword,
    isLoading,
    message,
    errors,

    handleUsernameChange,
    handlePasswordChange,
    togglePassword,
    handleLogin,
    handleForgotPassword,
    handleGuestLogin,
  };
};

export default useLoginViewModel;
