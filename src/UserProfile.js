import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";

const UserProfile = ({ user }) => {
  // Placeholder user data
  // const placeholderUserData = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   address: "123 Main St",
  //   phone: "(555) 555-5555",
  //   email: "john@example.com",
  //   birthdate: "01/01/1990",
  // };

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${user.id}`)
      .then((response) => {
        console.log(response);
        const responseUserData = response.data;
        const newUserData = {
          firstName: responseUserData.firstName,
          lastName: responseUserData.lastName,
          address: responseUserData.address,
          phone: responseUserData.phone,
          email: responseUserData.email,
          birthdate: responseUserData.birthDate,
        };
        setUserData(newUserData);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Error getting user data!");
        }
      });
  }, [user]);

  return (
    <div style={{ paddingTop: "30px", paddingLeft: "50px" }}>
      <Typography variant="h4" sx={{ marginBottom: "40px", textAlign: "left" }}>
        User Profile
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {userData && (
        <div
          style={{ marginLeft: "20px", marginTop: "20px", textAlign: "left" }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              display: "inline-block",
              width: "150px",
            }}
          >
            First Name:
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            {userData.firstName}
          </Typography>
          <br />
          <br />
          <Typography
            style={{
              fontWeight: "bold",
              display: "inline-block",
              width: "150px",
            }}
          >
            Last Name:
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            {userData.lastName}
          </Typography>
          <br />
          <br />

          <Typography
            style={{
              fontWeight: "bold",
              display: "inline-block",
              width: "150px",
            }}
          >
            Address:
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            {userData.address}
          </Typography>
          <br />
          <br />

          <Typography
            style={{
              fontWeight: "bold",
              display: "inline-block",
              width: "150px",
            }}
          >
            Phone:
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            {userData.phone}
          </Typography>
          <br />
          <br />

          <Typography
            style={{
              fontWeight: "bold",
              display: "inline-block",
              width: "150px",
            }}
          >
            Email:
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            {userData.email}
          </Typography>
          <br />
          <br />

          <Typography
            style={{
              fontWeight: "bold",
              display: "inline-block",
              width: "150px",
            }}
          >
            Birthdate:
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            {userData.birthdate}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
