import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setItems } from "../../state/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Products from "./Products";

const Home = () => {
  const ref = useRef(false);
  const { name } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState("home");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   if (ref.current === false) {
  //     const fetchSubCategory = async () => {
  //       try {
  //         const res = await axios.get(`subcategory/?search=${name}`);
  //         setSubCategory(res.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchSubCategory();
  //     return () => (ref.current = true);
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (ref.current === false) {
  //     const fetchProduct = async () => {
  //       try {
  //         const res = await axios.get(`product/?search=${slug}`);
  //         dispatch(setItems(res.data));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchProduct();
  //     return () => (ref.current = true);
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { display: "block" },
            }}
            sx={{
              m: "25px",
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
          <Box display="flex" border={1} borderRadius="5px" mt={4}>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search in Shop" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
        {value === "home" && <Typography>This is Home</Typography>}
        {value === "allproducts" && <Products />}
      </Box>
    </>
  );
};

export default Home;
