import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";
import Home from "./Home";

const Main = () => {
  const ref = useRef(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [subCategory, setSubCategory] = useState([]);
  const items = useSelector((state) => state.cart.items);
  // const breakPoint = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (ref.current === false) {
      const fetchSubCategory = async () => {
        try {
          const res = await axios.get(`subcategory/?search=${slug}`);
          setSubCategory(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSubCategory();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ref.current === false) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`product/?search=${slug}`);
          dispatch(setItems(res.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchProduct();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" margin="80px auto">
      <Profile />
      <Home />
    </Box>
  );
};

export default Main;
