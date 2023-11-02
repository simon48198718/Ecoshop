import React, { useEffect, useState, useRef } from "react";
import {
  Paper,
  Typography,
  Box,
  styled,
  Container,
  Grid,
  Fab,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Category = () => {
  const ref = useRef(false);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  // const itemsPerPage = { xs: 6, sm: 8, md: 12, lg: 16 };
  const itemsPerPage = 12;
  // const breakPoint = useMediaQuery("(min-width:600px)");
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(min-width:600px) and (max-width:900px)");
  const isMd = useMediaQuery("(min-width:900px) and (max-width:1200px)");
  const isLg = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    if (ref.current === false) {
      const fetchData = async () => {
        try {
          const res = await axios.get("category/");
          setCat(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (ref.current === false) {
      const fetchData = async () => {
        try {
          const res = await axios.get("category/");
          setCat(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const StyledCard = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "100%",
    overflow: "hidden",
    width: "80px",
    height: "80px",
    "&:hover": {
      opacity: 0.8,
      boxSizing: "borderBox",
      zIndex: 1,
      transition: `all 0.45s ease`,
    },
  }));

  const CardBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
  });

  const NextButton = () => {
    setPage(page + 1);
    console.log(page);
  };

  const BackButton = () => {
    setPage(page - 1);
  };

  const CatDisplay = ({ item }) => {
    return (
      <Grid container spacing={2}>
        {cat.slice(page * item, page * item + item).map((category) => (
          <Grid item xs={4} sm={3} md={2} lg={1.5}>
            <CardBox
              key={category.id}
              onClick={() => navigate(`/search/${category.slug}`)}
            >
              <StyledCard
                sx={{
                  backgroundImage: `url(${category.image})`,
                  mb: 1,
                }}
              />
              <Typography textAlign={"center"}>{category.name}</Typography>
            </CardBox>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container>
      <Paper sx={{ pt: 3, pb: 3, mt: 5 }}>
        <Box display={"flex"} alignItems={"center"}>
          <Box pr={1}>
            <IconButton onClick={() => BackButton()}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h3" mb={4}>
              CATEGORIES
            </Typography>
            {isXs && <CatDisplay item={6} />}
            {isSm && <CatDisplay item={8} />}
            {isMd && <CatDisplay item={12} />}
            {isLg && <CatDisplay item={16} />}
          </Box>
          <Box pl={1}>
            <IconButton onClick={NextButton}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Category;
