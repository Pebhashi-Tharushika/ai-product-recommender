import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getProductById, getRecommendedProducts } from "../api/productApi";

const PreviewAndRecommendationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodData = await getProductById(id);
        setProduct(prodData);

        const recData = await getRecommendedProducts(id);
        setRecommendations(recData);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <Typography>Loading product details...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Product Preview Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            textAlign: "center",
          }}
        >
          <img
            src={
              product.image_url ||
              "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={product.name}
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </Button>
        </Box>
      </Box>

      {/* Recommended Products Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Recommended Products
        </Typography>

        {recommendations.length === 0 ? (
          <Typography color="text.secondary">No recommendations found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {recommendations.map((rec) => (
              <Grid item key={rec.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: 3,
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                  onClick={() => navigate(`/preview/${rec.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={
                      rec.image_url ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={rec.name}
                    height="180"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontSize={16}
                      fontWeight={800}>
                      {rec.name}
                    </Typography>
                    <Typography color="text.secondary">
                      ${rec.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default PreviewAndRecommendationPage;

