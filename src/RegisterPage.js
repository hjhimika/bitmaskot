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

const RegisterForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function RegisterPage({ setUser }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClear = (e) => {
    setFirstname("");
    setLastname("");
    setAddress("");
    setPhone("");
    setEmail("");
    setBirthdate("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console log the form values
    console.log("First Name:", firstname);
    console.log("Last Name:", lastname);
    console.log("Address:", address);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Birthdate:", birthdate);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmpassword);

    // check if the passwords match
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    // communicate with backend
    axios
      .post("http://localhost:8080/api/users/register", {
        firstName: firstname,
        lastName: lastname,
        address: address,
        phone: phone,
        email: email,
        birthDate: birthdate,
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
          setError("Error registering!");
        }
      });
  };

  return (
    <RootContainer component="main" maxWidth="xs">
      <StyledPaper elevation={10}>
        <AvatarIcon />
        <Typography component="h1" variant="h5">
          Register Panel
        </Typography>

        <RegisterForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstnme"
            autoComplete="firstname"
            //autoFocus
            value={firstname}
            onChange={handleFirstnameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            //autoFocus
            value={lastname}
            onChange={handleLastnameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            //autoFocus
            value={address}
            onChange={handleAddressChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phonel"
            label="Phone"
            name="phone"
            autoComplete="phone"
            //autoFocus
            value={phone}
            onChange={handlePhoneChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            //autoFocus
            value={email}
            onChange={handleEmailChange}
          />

          {/* birthdate */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="birthdate"
            label="Birthdate"
            name="birthdate"
            //autoComplete="email"
            //autoFocus
            InputLabelProps={{ shrink: true }}
            type="date"
            value={birthdate}
            onChange={handleBirthdateChange}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="confirmPassword"
            type="password"
            id="confirmpassword"
            autoComplete="current-password"
            value={confirmpassword}
            onChange={handleConfirmPasswordChange}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Register
              </SubmitButton>
            </Grid>

            <Grid item>
              <SubmitButton
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleClear}
              >
                Cancel
              </SubmitButton>
            </Grid>
          </Grid>
        </RegisterForm>
      </StyledPaper>
    </RootContainer>
  );
}

export default RegisterPage;
