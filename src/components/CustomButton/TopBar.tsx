import React, { useState } from "react";
import { Link } from "react-router";
import pb from "../../services/pocketbase";
import Avatar from "@mui/joy/Avatar";
import { List, ListItem } from "@mui/joy";
import { Button } from "@mui/joy";

const TopBar: React.FC = () => {
  const [userValid] = useState(pb.authStore.isValid);
  const [user] = useState(pb.authStore.record);

  const getEmail = () => {
    if (user) {
      return user.email.substring(0, 2).toUpperCase();
    }
  };

  //    const barStyle: React.CSSProperties = {
  //        maxWidth: '100%',
  //        margin: '0 auto',
  //        display: 'flex',
  //        flexDirection: 'row',
  //        gap: '10px',
  //    };

  return (
    <div>
      {userValid ? (
        //<Avatar src={getIconUrl()} />
        <List
          orientation="horizontal"
          sx={{
            display: "flex",
            justifyContent: "space-between", // Ensures first and last items are aligned to the edges
            width: "100%", // Make the list take the full width of its container
          }}
        >
          <ListItem>
            <Avatar> {getEmail()} </Avatar>
          </ListItem>
          <ListItem>
            <Button
              color="danger"
              variant="outlined"
              onClick={() => {
                  pb.authStore.clear();
                  window.location.reload();
                  console.log("logout");
              }}
            >
              {" "}
              Logout{" "}
            </Button>
          </ListItem>
        </List>
      ) : (
        <div>
          <Link to="/register"> Register </Link>|
          <Link to="/login"> Login </Link>
        </div>
      )}
    </div>
  );
};

export default TopBar;
