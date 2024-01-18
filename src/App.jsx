import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing";
import AuthProvider from "./Providers/AuthProvider";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import store from './StateManagement/Store/store';
import { Provider } from 'react-redux';

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '44px', // Set the height of the dropdown to 44px
          padding: "8px 8px"
          // Add any other styles you want to apply to the root of the Select component
        },
        select: {
          height: '23px', // Ensures the select field itself also has the desired height
          padding: "8px 8px",
          textAlign: "left"
          // You can add additional styles for the select field here if needed
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Change the font size and height here
          fontSize: '16px', // Set your desired font size
          height: 'fit-content', // Set your desired height
          overflowY: "hidden",
          padding: '0', // Adjust padding as needed
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333', // Your desired focus color
          },
        },
        input: {
          padding: '14px 14px', // Adjust to align text properly within the input field
          '&:-webkit-autofill': {
            'WebkitBoxShadow': '0 0 0 100px #fff inset',
            'backgroundColor': '#f1f1f1 !important',
            'WebkitTextFillColor': '#333 !important'
          }
        },
        notchedOutline: {
          top: 0, // Adjust according to your needs
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px', // Adjust label font size
          '&.Mui-focused': {
            color: '#333', // Your desired label focus color
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: '16px', // Adjust input (placeholder) font size
          // ... other input styles
        },
      },
    },
  },
});

const stripePromise = loadStripe('pk_test_51OU8cxDhEC7QrbhyXNDZFKnFjl1rM9eqZElMdnx5tqaw2xDrCmAH4InT78qJO7V88S2HihXphcY2xA6Ff3mMvNtv00SgSHNfGL');

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
          <Elements stripe={stripePromise}>
            <CssBaseline />
            <Routing />
          </Elements>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
