import { Box, Container, Typography } from "@mui/material";
import complete from "../assets/complete.jpg";
const ShoppingComplete = () => {
  return (
    <>
      <Container>
        <Box sx={{ my: 5 }}>
          <Typography className="title" variant="h3">
            Shopping complete!
          </Typography>
          <Box sx={{ width: "80%", mx: "auto", my: 2 }}>
            <img
              src={complete}
              alt="grocery bag"
              className="tilting"
            >
            </img>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ShoppingComplete;
