import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
    const { setBasket } = useStoreContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buyerId = getCookie("buyerId");
        if (buyerId) {
            agent.Basket.get()
                .then((basket) => {
                    setBasket(basket);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [setBasket]);

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

    if (loading) {
        return <LoadingComponent message="Initialising app..." />;
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
