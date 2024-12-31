import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordToggled, setPasswordToggled] = useState(false);
  const [loginAs, setLoginAs] = useState("user"); // Default login role
  const [isSignUp, setIsSignUp] = useState(false); // Define isSignUp state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = isSignUp
      ? "h2ttp://17.0.0.1:8000/api/auth/signup/"
      : loginAs === "instructor"
      ? "http://127.0.0.1:8000/api/auth/instructor-login/"
      : "http://127.0.0.1:8000/api/auth/user-login/";

    try {
      const response = await axios.post(endpoint, {
        username,
        password,
      });

      if (response.status === 200) {
        const { access, refresh, student_data } = response.data;

        // Simpan token ke localStorage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Simpan data siswa ke localStorage
        if (student_data) {
          localStorage.setItem("student_data", JSON.stringify(student_data));
          console.log("Student Data:", student_data);
        }

        // Redirect ke halaman profil siswa
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", loginAs);
        onLogin(loginAs);
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordToggled(!passwordToggled);
  };

  // Function to refresh access token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: refreshToken,
        }
      );

      // Save new access token in localStorage
      const { access } = response.data;
      localStorage.setItem("access_token", access);

      return access; // Return the new access token
    } catch (error) {
      console.error("Error refreshing token:", error);
      setError("Your session has expired, please log in again.");
      navigate("/login");
      return null;
    }
  };

  // Function to make API requests with token
  const fetchData = async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/your-protected-endpoint/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response?.data?.code === "token_not_valid") {
        console.warn("Access token expired, refreshing token...");
        const refreshToken = localStorage.getItem("refresh_token");
        try {
          const refreshResponse = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              refresh: refreshToken,
            }
          );
          const { access } = refreshResponse.data;

          // Perbarui access token di localStorage
          localStorage.setItem("access_token", access);

          // Coba ulang permintaan dengan token baru
          const retryResponse = await axios.get(
            "http://127.0.0.1:8000/your-protected-endpoint/",
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
          console.log(retryResponse.data);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          setError("Your session has expired, please log in again.");
          navigate("/login");
        }
      } else {
        console.error("Error:", error.response?.data || error);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <div className="error-message">{error}</div>}

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={`toggle-password ${
              passwordToggled ? "underline unchecked" : "underline"
            }`}
            onClick={togglePasswordVisibility}
            title={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>

        {!isSignUp && (
          <div className="role-selection">
            <button
              type="button"
              className={`role-button ${loginAs === "user" ? "active" : ""}`}
              onClick={() => setLoginAs("user")}
            >
              Login as User
            </button>
            <button
              type="button"
              className={`role-button ${
                loginAs === "instructor" ? "active" : ""
              }`}
              onClick={() => setLoginAs("instructor")}
            >
              Login as Instructor
            </button>
          </div>
        )}

        <div className="button-container">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading
              ? isSignUp
                ? "Signing up..."
                : "Logging in..."
              : isSignUp
              ? "Sign Up"
              : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
