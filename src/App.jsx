import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing";
import AuthProvider from "./Providers/AuthProvider";

const theme = createTheme();

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
