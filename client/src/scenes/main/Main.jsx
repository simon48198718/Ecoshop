import ShoppingList from "./ShoppingList";
import Category from "./Category";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

function Main() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box padding="40px 0" backgroundColor={neutral.light}>
      <MainCarousel />
      <Category />
      <ShoppingList />
      <Subscribe />
    </Box>
  );
}

export default Main;
