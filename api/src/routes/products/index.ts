import { Router } from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../controllers/product";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductsById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
