import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid } from "@mui/material";
import axios from "axios";

const RootContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(10),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarIcon = styled(AccountCircleIcon)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "white",
  height: 50,
  width: 50,
}));

const LoginForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console log the form values
    console.log("Email:", email);
    console.log("Password:", password);

    // communicate with backend
    axios
      .post("http://localhost:8080/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Error loggin in!");
        }
      });
  };

  return (
    <RootContainer component="main" maxWidth="xs">
      <StyledPaper elevation={10}>
        <AvatarIcon />
        <Typography component="h1" variant="h5">
          Login Panel
        </Typography>
        <LoginForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </SubmitButton>
            </Grid>

            <Grid item>
              <SubmitButton
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => {
                  setEmail("");
                  setPassword("");
                }}
              >
                Clear
              </SubmitButton>
            </Grid>
          </Grid>
        </LoginForm>
        {error && <Typography color="error">{error}</Typography>}
        <Typography variant="body2">
          Are you new here?{" "}
          <Link href="/register" variant="body2">
            Register Now
          </Link>
        </Typography>
      </StyledPaper>
    </RootContainer>
  );
}

export default LoginPage;
