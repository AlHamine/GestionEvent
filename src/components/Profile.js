import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Profile() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          User Profile
        </Typography>
        <Typography color="textSecondary">Name: John Doe</Typography>
        <Typography color="textSecondary">
          Email: johndoe@example.com
        </Typography>
        <Typography color="textSecondary">Location: City, Country</Typography>
        <Typography color="textSecondary">
          Interests: Web Development, Design, Hiking
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Profile;
