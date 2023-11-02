import React, { useEffect, useState, useRef } from "react";
import Item from "../../components/Item";
import { Typography, Box } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const ref = useRef(false);
  const { name } = useParams();
  const dispatch = useDispatch();
  const [type, setType] = useState([]);
  const items = useSelector((state) => state.cart.items);
  // const breakPoint = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (ref.current === false) {
      const fetchProductType = async () => {
        try {
          const res = await axios.get(`producttype/?search=${name}`);
          setType(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProductType();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ref.current === false) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`product/?search=${name}`);
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
    <Box display="flex" columnGap="40px">
      <Box flex="1 1 15%">
        <Box mb={4}>
          <Typography mb={3}>All Products</Typography>
          {type.map((item) => (
            <Typography key={item.id} ml={1} mb={1}>
              {item.name}
            </Typography>
          ))}
        </Box>
        <Box>
          <Typography>Brand</Typography>
        </Box>
      </Box>
      <Box
        flex="1 1 85%"
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 230px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.2%"
      >
        {items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
