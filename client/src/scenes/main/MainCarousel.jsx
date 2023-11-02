import { Box, Typography, useMediaQuery } from "@mui/material";
import { shades } from "../../theme";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainCarousel = () => {
  const ref = useRef(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    if (ref.current === false) {
      const fetchData = async () => {
        try {
          const res = await axios.get("carousel/");
          setCarousel(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      return () => (ref.current = true);
    }
  }, []);

  return (
    <Box mt={3}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {carousel.map((item) => (
          <SwiperSlide key={`carousel-image-${item.id}`}>
            <Box>
              <img
                src={item.image}
                alt={`carousel-${item.id}`}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                }}
              />
              <Box
                color="white"
                padding="20px"
                borderRadius="1px"
                textAlign="left"
                backgroundColor="rgb(0, 0, 0, 0.4)"
                position="absolute"
                top="46%"
                left={isNonMobile ? "10%" : "0"}
                right={isNonMobile ? undefined : "0"}
                margin={isNonMobile ? undefined : "0 auto"}
                maxWidth={isNonMobile ? undefined : "240px"}
              >
                <Typography
                  color={shades.secondary[200]}
                  sx={{ "&:hover": { cursor: "default" } }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{ "&:hover": { cursor: "default" } }}
                >
                  {item.title}
                </Typography>
                <Typography
                  fontWeight="bold"
                  color={shades.secondary[300]}
                  sx={{
                    textDecoration: "underline",
                    "&:hover": { cursor: "pointer" },
                  }}
                >
                  Discover More
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MainCarousel;
