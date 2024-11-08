import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
);
