import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                mt: 5,
                py: 2,
                textAlign: "center",
                backgroundColor: "#bd2552",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
            }}
        >
            <Typography variant="body2" sx={{ color: "#c0c0c0" }}>
                © {new Date().getFullYear()} Product Recommender | All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
