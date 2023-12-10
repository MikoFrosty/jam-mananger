import "./App.css";
import Dashboard from "./features/Dashboard/Dashboard";
import AppBarComponent from "./features/AppBar/AppBarComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./features/Footer/Footer";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        {/* <AppBarComponent /> */}
        <Dashboard />
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;
