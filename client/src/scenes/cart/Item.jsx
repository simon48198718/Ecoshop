import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const Item = ({ item }) => {
  const navigate = useNavigate();

  const { price, name, image } = item;

  return (
    <Box
      display="flex"
      columnGap="40px"
      width={"100%"}
      height={"80px"}
      onClick={() => navigate(`/item/${item.id}`)}
    >
      <Box width="80px" height="80px">
        <img alt={name} width="80px" height="80px" src={image} />
      </Box>
      <Box mt={1}>
        <Typography
          fontSize={14}
          fontWeight={"bold"}
          mb={1}
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
        <Typography fontSize={12}>${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
