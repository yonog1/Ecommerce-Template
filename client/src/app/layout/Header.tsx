import { LightMode, ModeNight, ShoppingCart } from "@mui/icons-material";
import {
    AppBar,
    Badge,
    IconButton,
    List,
    ListItem,
    Switch,
    Toolbar,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

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
    textDecoration: "None",
    typography: "h6",
    "&:hover": { color: "grey.500" },
    "&.active": { color: "text.secondary" },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
    return (
        <>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" sx={navStyles}>
                            RE-STORE
                        </Typography>

                        <Switch onChange={handleThemeChange} />
                        {darkMode ? (
                            <ModeNight sx={{ color: "yellow" }}></ModeNight>
                        ) : (
                            <LightMode sx={{ color: "yellow" }}></LightMode>
                        )}
                    </Box>

                    <List sx={{ display: "flex" }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem key={path} sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    <Box display="flex" alignItems="center">
                        <IconButton size="large" sx={{ color: "inherit" }}>
                            <Badge badgeContent={4} color="secondary">
                                <ShoppingCart> </ShoppingCart>
                            </Badge>
                        </IconButton>

                        <List sx={{ display: "flex" }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem key={path} sx={navStyles}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}
