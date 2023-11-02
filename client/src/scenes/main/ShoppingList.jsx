import React, { useEffect, useState, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Container, Grid, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cartSlice";
import axios from "axios";

const ShoppingList = () => {
  const ref = useRef(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (ref.current === false) {
      const fetchData = async () => {
        try {
          const res = await axios.get("product/");
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
    <Container>
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Grid container spacing={2} mt={2}>
        {items.map((item) => (
          <Grid item xs={4} sm={3} md={2.4} lg={2}>
            <Item item={item} key={`${item.name}-${item.id}`} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShoppingList;
