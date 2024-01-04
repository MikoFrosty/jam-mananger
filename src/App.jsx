import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing";
import AuthProvider from "./Providers/AuthProvider";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const theme = createTheme({
  components: {
    // This will target the Outlined Input component (used in TextField)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Override styles for the input when it is autofilled
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #ffffff inset', // Change '#fff' to the desired background color
            WebkitTextFillColor: '#333', // Change '#000' to the desired text color
          },
        },
      },
    },
  },
});

const stripePromise = loadStripe('pk_test_51OU8cxDhEC7QrbhyXNDZFKnFjl1rM9eqZElMdnx5tqaw2xDrCmAH4InT78qJO7V88S2HihXphcY2xA6Ff3mMvNtv00SgSHNfGL');

function App() {
  return (
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
  );
}

export default App;
