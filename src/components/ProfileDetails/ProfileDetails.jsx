import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Card,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material/";
import ChatIcon from "@mui/icons-material/Chat";

export default function ProfilePage({
  updatingProfile,
  setUpdatingProfile,
  profile,
  setProfile,
}) {
  return (
    <>
      <Typography variant="h3" gutterBottom align="center">
        {profile.useUsername
          ? profile.username
          : `${profile.firstName} ${profile.lastName}`}
      </Typography>
      <Divider />
      <Grid align="center" sx={{ p: 2 }}>
        <Card
          raised={true}
          sx={{
            borderRadius: "50%",
            width: "15rem",
            height: "15rem",
          }}
        >
          <CardMedia
            component="img"
            alt={`${profile.firstName} ${profile.lastName}`}
            image={profile.profilePics[0].url}
          />
        </Card>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Home Base:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            {profile.homeBase.placeName}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Grid item xs={8}>
          <Typography variant="h6" gutterBottom>
            {profile.isMessageable
              ? "Would love to make friends!"
              : "Enjoys solo traveling!"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            {profile.isMessageable ? (
              <IconButton color="info">
                <ChatIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Bio
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" gutterBottom>
            {profile.bio}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
