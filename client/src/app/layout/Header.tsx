import { LightMode, ModeNight, ShoppingCart } from "@mui/icons-material";
import {
    AppBar,
    Badge,
    Box,
    IconButton,
    List,
    ListItem,
    Switch,
    Toolbar,
    Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

//if theme switch ever gets funky, revert to this: <Switch checked={darkMode} onChange={handleThemeChange} />

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
];

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
];

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
        color: "grey.500",
    },
    "&.active": {
        color: "text.secondary",
    },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector((state) => state.basket);

    const itemCount = basket?.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box display="flex" alignItems="center">
                    <Typography variant="h6">RE-STORE</Typography>

                    <Box display="flex" alignItems="center">
                        <Switch
                            checked={darkMode}
                            onChange={handleThemeChange}
                        />
                        {darkMode ? (
                            <ModeNight sx={{ color: "yellow" }}></ModeNight>
                        ) : (
                            <LightMode sx={{ color: "yellow" }}></LightMode>
                        )}
                    </Box>
                </Box>
                <List sx={{ display: "flex" }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" alignItems="center">
                    <IconButton
                        component={NavLink}
                        to={"/basket"}
                        size="large"
                        sx={{ color: "inherit" }}
                    >
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: "flex" }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
