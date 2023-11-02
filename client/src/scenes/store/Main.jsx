import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  styled,
  Paper,
  Tab,
  Tabs,
  InputBase,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Home from "./Home";
import Products from "./Products";

const Main = () => {
  const ref = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const [store, setStore] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("home");

  const {
    palette: { neutral },
  } = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (ref.current === true) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`seller/?search=${user.id}`);
          res.data.map((data) => {
            setStore(data.name);
            setImage(data.image);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    return () => (ref.current = true);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const StyledCard = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "100%",
    border: "1px solid",
    overflow: "hidden",
    width: "100px",
    height: "100px",
  }));

  return (
    <Box padding="40px 0" backgroundColor={neutral.light}>
      <Box width="80%" margin="50px auto 20px auto">
        <Paper>
          <Box display="flex" columnGap="40px" p={5}>
            <Box>
              <StyledCard>
                <img alt={store} width="100px" height="100px" src={image} />
              </StyledCard>
            </Box>
            <Box mt={1}>
              <Typography fontSize={24} fontWeight="bold">
                {store}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} p={"0 20px"}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  sx: { display: "block" },
                }}
                sx={{
                  "& .MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                  },
                }}
              >
                <Tab label="HOME" value="home" />
                <Tab label="ALL PRODCUTS" value="allproducts" />
              </Tabs>
            </Box>
            <Box>
              <Box display="flex" border={1} borderRadius="5px">
                <InputBase
                  sx={{ ml: 2, flex: 1 }}
                  placeholder="Search in Shop"
                />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ mt: 3 }}>
          <Box p={3}>
            {value === "home" && <Home />}
            {value === "allproducts" && <Products />}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Main;
