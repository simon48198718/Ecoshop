import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cartSlice";
import Item from "./Item";

const Products = () => {
  const ref = useRef(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (ref.current === false) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`product/?search=${user.username}`);
          dispatch(setItems(res.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      margin="0 auto"
      display="grid"
      gridTemplateColumns="repeat(auto-fill, 350px)"
      justifyContent="space-around"
      rowGap="20px"
      columnGap="1.2%"
    >
      {items.map((item) => (
        <Item item={item} key={`${item.name}-${item.id}`} />
      ))}
    </Box>
  );
};

export default Products;
