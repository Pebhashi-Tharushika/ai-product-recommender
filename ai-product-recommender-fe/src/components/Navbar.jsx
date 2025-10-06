import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => navigate(path);

    return (
        <AppBar
            sx={{
                mb: 2,
                backgroundColor: "#bd2552",
                position: "sticky",
                top: 0,
                left: 0,
                width: "100%",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left-side title */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center" }}
                    onClick={() => handleNavigation("/home")}
                >
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            backgroundColor: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 1,
                            boxShadow: 2,
                        }}
                    >
                        <img
                            src="/logo192.png"
                            alt="Logo"
                            style={{ width: 24, height: 24 }}
                        />
                    </Box>

                    Product Recommender
                </Typography>

                {/* Center nav items */}
                <Box>
                    <Button
                        onClick={() => handleNavigation("/home")}
                        sx={{
                            fontWeight: "bold",
                            color: location.pathname === "/home" || location.pathname === "/" ? "#c0c0c0" : "#fff",
                            "&:hover": {
                                backgroundColor: "#bd2552",
                                color: "#c0c0c0"
                            },
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        sx={{
                            fontWeight: "bold",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#bd2552",
                                color: "#c0c0c0"
                            },
                        }}
                    >
                        Services
                    </Button>
                    <Button
                        sx={{
                            fontWeight: "bold",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#bd2552",
                                color: "#c0c0c0"
                            },
                        }}
                    >
                        About Us
                    </Button>
                </Box>

                {/* Right-side buttons */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                    <Button
                        variant="outlined"
                        onClick={() => handleNavigation("/dashboard")}
                        sx={{
                            borderColor: "white",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "black",
                            },
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                        }}
                    >Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
