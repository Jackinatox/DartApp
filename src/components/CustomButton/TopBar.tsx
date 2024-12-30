import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import pb from "../../services/pocketbase";
import Avatar from "@mui/joy/Avatar";
import { List, ListItem } from "@mui/joy";
import { Button } from "@mui/joy";
import { Home } from "@mui/icons-material";

const TopBar: React.FC = () => {
  const [userValid] = useState(pb.authStore.isValid);
  const [user] = useState(pb.authStore.record);

  const navigate = useNavigate();

  const getEmail = () => {
    if (user) {
      return user.email.substring(0, 2).toUpperCase();
    }
  };

  return (
    <div>
      <List
        orientation="horizontal"
        sx={{
          display: "flex",
          justifyContent: "space-between", // Spread items to edges
          alignItems: "center", // Center items vertically
          gap: "10px", // Add spacing between items
          width: "100%", // Full width of the container
          padding: "0 0px", // Add some padding to the edges
        }}
      >
        {/* Home Button */}
        <ListItem sx={{ marginRight: "auto" }}> {/* Aligns to the far left */}
          <Button
            startDecorator={<Home />}
            onClick={() => {navigate('/')}}
            variant="solid"
          >
            Home
          </Button>
        </ListItem>

        {userValid ? (
          <>
            {/* Avatar */}
            <ListItem>
              <Avatar>{getEmail()}</Avatar>
            </ListItem>

            {/* Logout Button */}
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
                Logout
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            {/* Register and Login Links */}
            <ListItem>
              <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default TopBar;
