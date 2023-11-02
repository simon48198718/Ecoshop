import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@emotion/react";
import Item from "../../components/Item";
import {
  Typography,
  Box,
  Rating,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state/cartSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const {
    palette: { neutral },
  } = useTheme();
  const ref = useRef(false);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [subCategory, setSubCategory] = useState([]);
  const items = useSelector((state) => state.cart.items);
  // const breakPoint = useMediaQuery("(min-width:600px)");
  const [selectedCat, setSelectedCat] = useState(0);

  const isSelected = (select) => {
    return select === selectedCat;
  };

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

  const Rate = ({ value }) => {
    return (
      <Box display={"flex"} sx={{ cursor: "pointer" }}>
        <Box mr={1}>
          <Rating defaultValue={value} readOnly />
        </Box>
        <Box>
          <Typography>& UP</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="40px 0" backgroundColor={neutral.light}>
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item sm={2} display={{ xs: "none", sm: "block" }}>
            <Box mb={4}>
              <Typography mb={3}>All Categories</Typography>
              {subCategory.map((category) => (
                <Typography
                  key={category.id}
                  ml={1}
                  mb={1}
                  onClick={() => {
                    setSelectedCat(category.id);
                  }}
                  sx={{
                    color: isSelected(category.id) ? "red" : "inherit",
                    fontWeight: isSelected(category.id) ? "bold" : "inherit",
                    cursor: "pointer",
                  }}
                >
                  {category.name}
                </Typography>
              ))}
            </Box>

            <Box mb={4}>
              <Typography mb={2}>Rating</Typography>
              <Box sx={{ cursor: "pointer" }}>
                <Rating defaultValue={5} readOnly />
              </Box>
              <Rate value={4} />
              <Rate value={3} />
              <Rate value={2} />
              <Rate value={1} />
            </Box>
            <Box mb={4}>
              <Typography mb={2}>Price Range</Typography>
              <Box display={"flex"} columnGap={2} mb={1}>
                <TextField label="$ Min" variant="outlined" />
                <TextField label="$ Max" variant="outlined" />
              </Box>
              <Box display={"flex"}>
                <Button variant="contained" fullWidth>
                  SEARCH
                </Button>
              </Box>
            </Box>
            <Box>
              <Typography>Brand</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={4} sm={4} md={3} lg={2.4}>
                  <Item item={item} key={`${item.name}-${item.id}`} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Search;
