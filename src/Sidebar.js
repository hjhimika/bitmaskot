import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Sidebar = ({ items, width }) => {
  return (
    <Drawer anchor="left" variant="permanent">
      <List style={{ paddingTop: "80px", width: width }}>
        {items.map((item) => (
          <ListItem button component={Link} to={item.link} key={item.text}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
