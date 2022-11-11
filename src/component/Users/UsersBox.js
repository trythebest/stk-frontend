import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const UsersBox = ({ user }) => {
  // Getting the user details as prop from Users comp
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        height="140"
        image={user.picture}
        alt={user.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          {user.email}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UsersBox;