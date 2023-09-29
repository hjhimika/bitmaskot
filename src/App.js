//import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UserProfile from "./UserProfile";
import UserList from "./UserList";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import ChangePassword from "./ChangePassword";
import NavigationBar from "./NavigationBar";
import Sidebar from "./Sidebar";

const headerHeight = "70px";
const sidebarWidth = "180px";

function App() {
  const [user, setUser] = useState(null);

  // load user from local storage on page load
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // save user to local storage whenever user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // if user is not logged in, show login page
  if (user === null) {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/register"
              element={<RegisterPage setUser={setUser} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    );
  }

  // if user is admin, show user list
  if (user.admin) {
    return (
      <div className="App">
        <Router>
          <NavigationBar setUser={setUser} height={headerHeight} />
          <Sidebar
            items={[{ text: "User List", link: "/userlist" }]}
            width={sidebarWidth}
          />
          <div style={{ marginTop: headerHeight, marginLeft: sidebarWidth }}>
            <Routes>
              <Route path="/userlist" element={<UserList />} />
              <Route path="*" element={<Navigate to="/userlist" />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }

  // if user is normal user, show user profile
  return (
    <div className="App">
      <Router>
        <NavigationBar setUser={setUser} height={headerHeight} />
        <Sidebar
          items={[
            { text: "Profile", link: "/profile" },
            { text: "Change Password", link: "/change-password" },
          ]}
          width={sidebarWidth}
        />
        <div style={{ marginTop: headerHeight, marginLeft: sidebarWidth }}>
          <Routes>
            <Route path="/profile" element={<UserProfile user={user} />} />
            <Route
              path="/change-password"
              element={<ChangePassword user={user} />}
            />
            <Route path="*" element={<Navigate to="/profile" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
