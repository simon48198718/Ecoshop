import React, { useEffect, useState, useRef } from "react";
import { Typography, Box, Button, styled, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";

const Profile = () => {
  const ref = useRef(false);
  const { name } = useParams();
  const [sellerName, setSellerName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (ref.current === false) {
      const fetchSubCategory = async () => {
        try {
          const res = await axios.get(`seller/?search=${name}`);
          res.data.map((data) => {
            setSellerName(data.name);
            setImage(data.image);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchSubCategory();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const StyledCard = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "100%",
    overflow: "hidden",
    width: "100px",
    height: "100px",
  }));

  const Data = ({ icon, name, data }) => {
    return (
      <Box mb={2} display={"flex"} justifyItems={"center"}>
        {icon}
        <Typography>
          {name} : {data}
        </Typography>
      </Box>
    );
  };

  return (
    <Box display="flex" columnGap="40px">
      <Box flex={1}>
        <Paper elevation={4} sx={{ padding: 2, backgroundColor: "grey" }}>
          <Box display="flex" columnGap="40px">
            <Box>
              <StyledCard>
                <img alt={name} width="100px" height="100px" src={image} />
              </StyledCard>
            </Box>
            <Box mt={1}>
              <Typography
                fontSize={20}
                fontWeight={"bold"}
                color={"white"}
                mb={2}
              >
                {sellerName}
              </Typography>
              <Box display={"flex"} columnGap={2}>
                <Button variant="contained" endIcon={<AddIcon />}>
                  Follow
                </Button>
                <Button variant="contained" endIcon={<ShareIcon />}>
                  Share
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box flex={2}>
        <Box mt={1}>
          <Data icon={<ShareIcon />} name={"Products"} data={"256"} />
          <Data icon={<AddIcon />} name={"Followers"} data={"1K"} />
          <Data
            icon={<ShareIcon />}
            name={"Rating"}
            data={"4.5 (2.8K Rating)"}
          />
          <Data icon={<AddIcon />} name={"Joined Since"} data={"2 years ago"} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
