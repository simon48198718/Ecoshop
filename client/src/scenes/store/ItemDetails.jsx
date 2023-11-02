import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState("");

  const {
    palette: { neutral },
  } = useTheme();

  const fetchItem = async () => {
    try {
      const res = await axios.get(`product/${itemId}`);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box padding="40px 0" backgroundColor={neutral.light}>
      <Box width="80%" m="80px auto">
        <Box display="flex" mb={3}>
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
                <Typography>${item.price}</Typography>
              </Box>
              <Box>
                <Button variant="contained">Edit</Button>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ mt: 2, p: 3 }}>
          <Box>
            <Typography variant="h3">Description</Typography>
            <Typography mt={2}>{item.description}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ItemDetails;
