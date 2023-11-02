import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const [review, setReview] = useState(4.5);

  const { price, name, image } = item;

  return (
    <Card sx={{ maxWidth: { width } }}>
      <CardActionArea onClick={() => navigate(`/item/${item.id}`)}>
        <CardMedia>
          <img alt={name} width="100%" height="200px" src={image} />
        </CardMedia>
        <CardContent>
          <Typography
            mb={1}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "40px",
            }}
          >
            {name}
          </Typography>
          <Typography mb={0.5} fontWeight="bold">
            ${price}
          </Typography>
          <Rating
            name="half-rating"
            defaultValue={review}
            precision={0.5}
            readOnly
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Item;
