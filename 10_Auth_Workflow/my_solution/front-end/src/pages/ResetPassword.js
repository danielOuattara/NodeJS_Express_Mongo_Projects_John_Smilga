import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import FormRow from "../components/FormRow";
import useLocalState from "../utils/localState";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { alert, showAlert, loading, setLoading, success, setSuccess } =
    useLocalState();

  const query = useQuery();

  const handleChange = async (e, func) => {
    func(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password || !passwordConfirm) {
      showAlert({
        text: "please enter password and the password confirmation",
      });
      setLoading(false);
      return;
    }
    if (password !== passwordConfirm) {
      showAlert({
        text: "password and password confirmation must identical, please try again",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/v1/auth/reset-password", {
        password,
        passwordConfirm,
        token: query.get("token"),
        email: query.get("email"),
      });
      setLoading(false);
      setSuccess(true);
      showAlert({
        text: `Success, redirecting to login page shortly`,
        type: "success",
      });
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };
  return (
    <Wrapper className="page">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form
          className={loading ? "form form-loading" : "form"}
          onSubmit={handleSubmit}
        >
          <h4>reset password</h4>
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={(e) => handleChange(e, setPassword)}
          />
          <FormRow
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            handleChange={(e) => handleChange(e, setPasswordConfirm)}
          />
          <button
            type="submit"
            className="btn btn-block"
            disabled={loading}
          >
            {loading ? "Please Wait..." : "New Password"}
          </button>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

export default ResetPasswordForm;
