import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Navigation } from "@mui/icons-material";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";
import axios from "axios";

const UserList = ({ user }) => {
  // placeholder user data
  // const placeholderUsers = [
  //   {
  //     name: "John Doe",
  //     age: 25,
  //     email: "johndoe@example.com",
  //     phone: "123-456-7890",
  //   },
  //   {
  //     name: "Jane Doe",
  //     age: 30,
  //     email: "janedoe@example.com",
  //     phone: "234-567-8901",
  //   },
  //   {
  //     name: "Bob Smith",
  //     age: 40,
  //     email: "bobsmith@example.com",
  //     phone: "345-678-9012",
  //   },
  //   {
  //     name: "Alice Johnson",
  //     age: 35,
  //     email: "alicejohnson@example.com",
  //     phone: "456-789-0123",
  //   },
  // ];

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users/all").then((response) => {
      const responseUsers = response.data;
      const newUsers = responseUsers.map((user) => {
        return {
          name: user.firstName + " " + user.lastName,
          // calculate age from date of birth
          age: Math.floor(
            (new Date() - new Date(user.birthDate).getTime()) / 3.15576e10
          ),
          email: user.email,
          phone: user.phone,
        };
      });
      const filteredUsers = searchTerm
        ? newUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : newUsers;
      setUsers(filteredUsers);
    });
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      // Filter users when the Enter key is pressed
      fetchUsers();
    }
  };

  useEffect(fetchUsers, []);

  return (
    <div
      style={{
        paddingTop: "30px",
        paddingRight: "40px",
        paddingLeft: "40px",
        textAlign: "left",
      }}
    >
      <Typography variant="h4" sx={{ display: "inline-block" }}>
        Users
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        sx={{ float: "right", marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
