import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Tabs,
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
    <Box>
      <Typography>This is Home and everything</Typography>
    </Box>
  );
};

export default Home;
