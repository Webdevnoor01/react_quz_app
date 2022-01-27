import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("Failed to Login");
    }
  };

  return (
    <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        alternate_email
      </TextInput>
      <TextInput
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        lock
      </TextInput>

      <Button type="submit" disabled={loading}>
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <a href="signup.html">Signup</a> instead.
      </div>
    </Form>
  );
};

export default LoginForm;
