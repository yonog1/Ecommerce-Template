import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet, Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === "light" ? "#e0e0e0" : "#424242",
            },
        },
    });

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <ToastContainer
                    position="bottom-right"
                    hideProgressBar
                    theme="colored"
                />
                <CssBaseline></CssBaseline>
                <Header
                    darkMode={darkMode}
                    handleThemeChange={handleThemeChange}
                />
                <Container sx={{ mb: 4 }}>
                    <Outlet />
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
