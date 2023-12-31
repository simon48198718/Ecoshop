import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState, useRef, useEffect } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../state/cartSlice";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(false);
  const [activeStep, setActiveStep] = useState(0);
  const [customerID, setCustomerID] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cart);
  const totalprice = useSelector((state) => state.cart.total);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  useEffect(() => {
    if (ref.current === true) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`customer/?search=${user.id}`);
          res.data.map((data) => setCustomerID(data.id));
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

    return () => (ref.current = true);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const makePayment = async () => {
    console.log(customerID);
    const orderData = {
      customer: customerID,
      total_price: totalprice,
      order_items: cart.map((item) => ({
        product: {
          id: item.id,
          name: item.name,
          description: item.description,
          price: Number(item.price),
        },
        quantity: item.count,
        price: Number(item.price) * item.count,
      })),
    };

    await axios.post("order/", orderData);
    dispatch(clearCart());
    navigate("/");
    // const stripe = await stripePromise;
    // const requestBody = {
    //   userName: [values.firstName, values.lastName].join(" "),
    //   email: values.email,
    //   products: cart.map(({ id, count }) => ({
    //     id,
    //     count,
    //   })),
    // };
    // const response = await fetch("http://localhost:2000/api/orders", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(requestBody),
    // });
    // const session = await response.json();
    // await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });
  };
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);
    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      makePayment();
    }
    actions.setTouched({}); // reset the formik conditions
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;
