import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Order = () => {
  const ref = useRef(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (ref.current === false) {
      const fetchData = async () => {
        try {
          const res = await axios.get("order/");
          setOrder(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

      return () => (ref.current = true);
    }
  }, []);

  return (
    <Box>
      {order.map((item) => (
        <Box key={item.id}>
          {console.log(item)}
          {console.log(item.order_items)}
          {item.order_items.map((product) => {
            console.log(product.price);
            console.log(product.product.name);
          })}
        </Box>
      ))}
    </Box>
  );
};

export default Order;
