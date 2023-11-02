import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  IconButton,
  MenuItem,
  Typography,
  Container,
  Paper,
  MenuList,
  Popper,
  InputBase,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state/cartSlice";
import { setIsLogin } from "../../state/authSlice";
import axios from "axios";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import Item from "../cart/Item";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const LoginRegister = () => {
    return (
      <Box display={"flex"}>
        <Typography
          fontSize={14}
          sx={{ cursor: "pointer" }}
          mr={1}
          onClick={() => navigate("/login")}
        >
          Login
        </Typography>
        <Typography mr={1}>/</Typography>
        <Typography
          fontSize={14}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </Typography>
      </Box>
    );
  };

  const Notification = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    return (
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          ref={anchorRef}
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          sx={{ cursor: "pointer" }}
        >
          <NotificationsActiveIcon fontSize="inherit" />
          <Typography ml={0.5} fontSize={14}>
            Notification
          </Typography>
        </Box>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          sx={{ zIndex: 9999 }}
        >
          <Paper
            sx={{
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            }}
          >
            <MenuList>
              <MenuItem onClick={() => navigate("/account/profile")}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"300px"}
                  height={"300px"}
                >
                  There is no notification yet
                </Box>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </Box>
    );
  };

  const Account = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    return (
      <Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          ref={anchorRef}
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          sx={{ cursor: "pointer" }}
        >
          <AccountCircleIcon fontSize="inherit" />
          <Typography ml={0.5} fontSize={14}>
            {user.username}
          </Typography>
        </Box>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          sx={{ zIndex: 9999 }}
        >
          <Paper
            sx={{
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 10,
              },
            }}
          >
            <MenuList>
              <MenuItem onClick={() => navigate("/account/profile")}>
                <Box>Profile</Box>
              </MenuItem>
              <MenuItem onClick={() => logout()}>
                <Box>Logout</Box>
              </MenuItem>
            </MenuList>
          </Paper>
        </Popper>
      </Box>
    );
  };

  const logout = async () => {
    await axios.post("auth/logout", {}, { withCredentials: true });
    dispatch(setIsLogin());
    console.log("success");
  };

  const Cart = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    return (
      <Box>
        <IconButton
          ref={anchorRef}
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
        >
          <ShoppingCartIcon />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          disablePortal
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          sx={{ zIndex: 9999 }}
        >
          <Paper
            sx={{
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 10,
              },
            }}
          >
            <Box width={"500px"} p={2}>
              {cart.map((item) => (
                <Box width={"100%"}>
                  <MenuItem
                    sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  >
                    <Item item={item} key={`${item.name}-${item.id}`} />
                  </MenuItem>
                </Box>
              ))}
              <MenuItem>
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  <Button variant="contained">View Shopping Cart</Button>
                </Box>
              </MenuItem>
            </Box>
            {/* <MenuList>
              <Box width={"500px"}>
                {cart.map((item) => (
                  <MenuItem>
                    <Box width={"500px"}>
                      <Item item={item} key={`${item.name}-${item.id}`} />
                    </Box>
                  </MenuItem>
                ))}

                <MenuItem>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"flex-end"}
                  >
                    <Button variant="contained">View Shopping Cart</Button>
                  </Box>
                </MenuItem>
              </Box>
            </MenuList> */}
          </Paper>
        </Popper>
      </Box>
    );
  };

  return (
    <Box
      width="100%"
      height="90px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="5"
    >
      <Container>
        <Box display={"flex"} justifyContent={"flex-end"} columnGap={4}>
          <Notification />
          {isLogin ? <Account /> : <LoginRegister />}
        </Box>
        <Box display={"flex"} columnGap={5} alignItems={"center"} mt={2}>
          <Box>
            <Typography
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
              color={shades.secondary[500]}
            >
              ECOMMERCE
            </Typography>
          </Box>
          <Box flex={1}>
            <Box display="flex" border={1} borderRadius="5px">
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search in Shop" />
              <IconButton sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 2px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <Cart />
              {/* <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                // sx={{ color: "black" }}
              >
                <ShoppingCartIcon />
              </IconButton> */}
            </Badge>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
