
const loginModel = {

  validateCredentials(username, password) {
    const errors = {
      username: "",
      password: "",
    };

    if (!username.trim()) {
      errors.username = "Username is required.";
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
    }

    return errors;
  },

  authenticate(username, password) {
    if (!username.trim() || !password.trim()) {
      return {
        success: false,
        message: "Please enter username and password.",
      };
    }

    // Demo authentication only
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("loggedInUser", username.trim());

    return {
      success: true,
      user: username.trim(),
    };
  },

  guestLogin() {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("loggedInUser", "Guest");

    return {
      success: true,
      user: "Guest",
    };
  },

  forgotPassword() {
    return "Please contact your administrator to reset your password.";
  },

  logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
  },
};

export default loginModel;
