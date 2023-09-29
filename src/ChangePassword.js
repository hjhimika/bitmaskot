import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import axios from "axios";

const ChangePassword = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console log the form values
    console.log("Current Password:", currentPassword);
    console.log("New Password", newPassword);
    console.log("Confirm Password", confirmPassword);

    // check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // check if current password is correct
    axios
      .get(`http://localhost:8080/api/users/${user.id}`)
      .then((response) => {
        const responseUser = response.data;
        if (responseUser.password !== currentPassword) {
          setError("Current password is incorrect!");
          return;
        }

        // change password
        axios
          .put(`http://localhost:8080/api/users/change-password`, {
            userId: user.id,
            newPassword: newPassword,
          })
          .then((response) => {
            console.log(response);
            setError(response.data);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((err) => {
            console.log(err);
            setError(err.response.data);
          });
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Error getting user data!");
        }
      });
  };

  return (
    <div style={{ paddingTop: "20px", paddingLeft: "50px" }}>
      <Typography variant="h4" sx={{ marginBottom: "40px", textAlign: "left" }}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: "35%" }}>
        <Grid container spacing={2} direction="column">
          {error && (
            <>
              <Typography style={{ textAlign: "left" }} color="error">
                {error}
              </Typography>
              <br />
            </>
          )}
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
          <br />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
          <br />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          <br />
          <Button type="submit" variant="contained">
            Change Password
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default ChangePassword;
