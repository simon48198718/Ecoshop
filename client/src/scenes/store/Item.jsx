import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Rating } from "@mui/material";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const [review, setReview] = useState(4.5);

  const { price, name, image } = item;

  return (
    <Paper elevation={4} sx={{ padding: 2, cursor: "pointer" }}>
      <Box
        display="flex"
        columnGap="40px"
        height={"150px"}
        onClick={() => navigate(`/account/store/item/${item.id}`)}
      >
        <Box width="150px" height="150px">
          <img alt={name} width="150px" height="150px" src={image} />
        </Box>
        <Box mt={1}>
          <Typography
            fontSize={14}
            fontWeight={"bold"}
            mb={2}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "45px",
            }}
          >
            {name}
          </Typography>
          <Typography fontSize={12} mb={2}>
            ${price}
          </Typography>
          <Rating
            name="half-rating"
            defaultValue={review}
            precision={0.5}
            readOnly
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Item;
