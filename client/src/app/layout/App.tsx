import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === "light" ? "#eaeaea" : "#121212",
            },
        },
    });

    function handleThemeChange() {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                <Header
                    darkMode={darkMode}
                    handleThemeChange={handleThemeChange}
                />
                <Container>
                    <Catalog />
                </Container>
            </ThemeProvider>
        </>
    );
}

export default App;
