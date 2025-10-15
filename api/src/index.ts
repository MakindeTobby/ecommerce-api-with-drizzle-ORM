import express, { urlencoded } from "express";
import productRoutes from "./routes/products/index";

const app = express();
app.use(urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worlddd!");
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
