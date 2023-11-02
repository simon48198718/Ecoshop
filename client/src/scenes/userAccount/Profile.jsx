import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserMenu from "./UserMenu";

const Profile = () => {
  const ref = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (ref.current === true) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`customer/?search=${user.id}`);
          res.data.map((data) => {
            setPhone(data.phone);
            setDob(data.dob);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

    return () => (ref.current = true);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box backgroundColor="gray">
      <Box width="70%" margin="80px auto" display={"flex"} p={5}>
        <Box flex={1} p={5}>
          <UserMenu />
        </Box>
        <Box flex={4} backgroundColor="white" p={5}>
          <Box mb={5}>
            <Typography variant="h5">Profile</Typography>
            <Typography variant="h6">Manage Account</Typography>
            <Divider />
          </Box>
          <Box
            display={"flex"}
            width={"50%"}
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Avatar>H</Avatar>
          </Box>
          <Box mb={5}>
            <Typography variant="h5" color={"black"}>
              Full Name - Simon
            </Typography>
            <Typography variant="h5" color={"black"}>
              Username - {user.username}
            </Typography>
            <Typography variant="h5" color={"black"}>
              Email - {user.email}
            </Typography>
            <Typography variant="h5" color={"black"}>
              Phone - {phone}
            </Typography>
            <Typography variant="h5" color={"black"}>
              Date of Birth - {dob}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">Edit</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
