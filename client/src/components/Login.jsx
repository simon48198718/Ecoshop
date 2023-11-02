import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;

    dispatch(setUser(data["user"]));
    navigate(from, { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 20,
          mb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", color: "blue" }}
              >
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{ cursor: "pointer", color: "blue" }}
              >
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
