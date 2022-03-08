import { Box } from "@mui/system";
import Product from "../components/Product";

const Home = ({ products }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default Home;
