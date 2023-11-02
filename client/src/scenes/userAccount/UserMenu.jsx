import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        <Avatar
          alt="profile-user"
          // src="/static/images/avatar/1.jpg"
          sx={{ width: 56, height: 56 }}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        <Typography variant="h4" fontWeight="bold">
          {user.username}
        </Typography>
      </Box>
      <Divider /> */}
      <Box m={"20px 0 0 30px"}>
        <Typography
          variant="h6"
          mb={2}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "white",
              opacity: 0.8,
              transition: `all 0.45s ease`,
            },
          }}
          onClick={() => navigate("/account/profile")}
        >
          Profile
        </Typography>
        <Typography
          variant="h6"
          mb={2}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "white",
              opacity: 0.8,
              transition: `all 0.45s ease`,
            },
          }}
          onClick={() => navigate("/account/order")}
        >
          Order
        </Typography>
        <Typography
          variant="h6"
          mb={2}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "white",
              opacity: 0.8,
              transition: `all 0.45s ease`,
            },
          }}
          onClick={() => navigate("/account/notification")}
        >
          Notification
        </Typography>
        <Typography
          variant="h6"
          mb={2}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "white",
              opacity: 0.8,
              transition: `all 0.45s ease`,
            },
          }}
        >
          Voucher
        </Typography>
      </Box>
    </Box>
  );
};

export default UserMenu;
