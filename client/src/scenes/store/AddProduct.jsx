import { useEffect, useState, useRef } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Container,
  Input,
  Paper,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";

const AddProduct = () => {
  const {
    palette: { neutral },
  } = useTheme();
  const ref = useRef(false);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandValue, setBrandValue] = useState(0);
  const [cat, setCat] = useState([]);
  const [catValue, setCatValue] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [subCatValue, setSubCatValue] = useState(0);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState([]);
  const [typeValue, setTypeValue] = useState(0);

  const submit = async (e) => {
    e.preventDefault();

    await axios.post("auth/register", {
      // username,
      // email,
      // password,
    });

    navigate("/login");
  };

  useEffect(() => {
    if (ref.current === false) {
      const fetchCategory = async () => {
        try {
          const res = await axios.get(`category/`);
          setCat(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchSubCategory = async () => {
        try {
          const res = await axios.get(`subcategory/`);
          setSubCategory(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchType = async () => {
        try {
          const res = await axios.get(`producttype/`);
          setTypes(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetchBrand = async () => {
        try {
          const res = await axios.get(`brand/`);
          setBrand(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCategory();
      fetchSubCategory();
      fetchType();
      fetchBrand();
      return () => (ref.current = true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSubCat(subCategory.filter((cat) => cat.category === catValue));
  }, [catValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setType(types.filter((type) => type.category === subCatValue));
  }, [subCatValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const ChooseImage = () => {
    const fileInput = useRef();
    return (
      <Paper elevation={image ? 3 : 0}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={{ xs: "350px", sm: "550px", md: "350px", lg: "400px" }}
          onClick={() => fileInput.current.click()}
          sx={{
            cursor: "pointer",
            border: image ? 0 : 2,
            borderStyle: "dashed",
            borderRadius: 2,
          }}
        >
          {image ? (
            <img
              alt={name}
              width="100%"
              height="100%"
              src={URL.createObjectURL(image)}
            />
          ) : (
            <>
              <IconButton size="large">
                <UploadIcon />
              </IconButton>
              <Typography>Upload Image</Typography>
            </>
          )}
          <input
            ref={fileInput}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(image);
            }}
          />
        </Box>
      </Paper>
    );
  };

  return (
    <Box padding="40px 0" backgroundColor={neutral.light}>
      <Container sx={{ backgroundColor: "white", mt: 8 }}>
        <Box display={"flex"} justifyContent={"center"} p={2}>
          <Typography component="h1" variant="h5">
            Product Registeration
          </Typography>
        </Box>
        <Box component="form" onSubmit={submit} p={3}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={5}>
              <ChooseImage />
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>Product Name</InputLabel>
                  <TextField
                    name="productname"
                    required
                    fullWidth
                    label="Product Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <InputLabel>Brand</InputLabel>
                      <Select
                        value={brandValue}
                        fullWidth
                        onChange={(e) => setBrandValue(e.target.value)}
                      >
                        <MenuItem value={0}>Select*</MenuItem>
                        {brand.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={catValue}
                        fullWidth
                        onChange={(e) => setCatValue(e.target.value)}
                      >
                        <MenuItem value={0}>Select*</MenuItem>
                        {cat.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <InputLabel>SubCategory</InputLabel>
                      <Select
                        value={subCatValue}
                        fullWidth
                        onChange={(e) => setSubCatValue(e.target.value)}
                      >
                        <MenuItem value={0}>Select*</MenuItem>
                        {subCat.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={typeValue}
                        fullWidth
                        onChange={(e) => setTypeValue(e.target.value)}
                      >
                        <MenuItem value={0}>Select*</MenuItem>
                        {type.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Price</InputLabel>
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Description</InputLabel>
                  <TextField
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I accept Term & Conditions"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer", color: "blue" }}
              >
                Already have an account? Sign In
              </Typography>
            </Grid>
          </Grid> */}
        </Box>
      </Container>
    </Box>
  );
};

export default AddProduct;
