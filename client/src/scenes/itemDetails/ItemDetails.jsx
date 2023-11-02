import { useTheme } from "@emotion/react";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [review, setReview] = useState(0);

  const {
    palette: { neutral },
  } = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchItem = async () => {
    try {
      const res = await axios.get(`product/${itemId}`);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchItems = async () => {
    try {
      const res = await axios.get("product/");
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
    fetchItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box padding="40px 0" backgroundColor={neutral.light}>
      <Container>
        <Box display="flex" mb={3} mt={10}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="none" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">{item.name}</Typography>
          </Breadcrumbs>
        </Box>
        <Paper>
          <Box display="flex" height={"500px"} columnGap="40px" pt={3}>
            {/* IMAGES */}
            <Box flex="1 1 40%" mb="40px">
              <img
                alt={item?.name}
                width="100%"
                height="100%"
                src={item.image}
                style={{ objectFit: "contain" }}
              />
            </Box>

            {/* ACTIONS */}
            <Box flex="1 1 50%" mb="40px">
              <Box mb={5}>
                <Typography variant="h3">{item.name}</Typography>
                <Typography mt={2}>${item.price}</Typography>
              </Box>

              <Box display="flex" alignItems="center" minHeight="50px">
                <Box
                  display="flex"
                  alignItems="center"
                  border={`1.5px solid ${shades.neutral[300]}`}
                  mr="20px"
                  p="2px 5px"
                >
                  <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  sx={{
                    backgroundColor: "#222222",
                    color: "white",
                    borderRadius: 0,
                    minWidth: "150px",
                    padding: "10px 40px",
                  }}
                  onClick={() =>
                    dispatch(addToCart({ item: { ...item, count } }))
                  }
                >
                  ADD TO CART
                </Button>
              </Box>
              <Box>
                <Box m="20px 0 5px 0" display="flex">
                  <FavoriteBorderOutlinedIcon />
                  <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper>
          <Box mt={2} p={2}>
            <Typography variant="h3">Description</Typography>
            <Box mt={3}>{item.description}</Box>
          </Box>
        </Paper>

        <Paper>
          <Box mt={2} p={2}>
            <Typography variant="h3">Reviews</Typography>
            <Box display={"flex"} mt={3}>
              <Box flex={2}>
                <Typography>{review} out of 5</Typography>
                <Rating
                  name="half-rating"
                  defaultValue={review}
                  onChange={(newValue) => {
                    setReview(newValue);
                  }}
                  precision={0.5}
                />
              </Box>
              <Box flex={10} height={"300px"} border={1}>
                There is no review yet.
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* RELATED ITEMS */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Grid container spacing={2} mt={2}>
            {items.slice(0, 6).map((item) => (
              <Grid item xs={2}>
                <Item item={item} key={`${item.name}-${item.id}`} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ItemDetails;
