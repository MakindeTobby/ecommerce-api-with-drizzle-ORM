import { Router } from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../controllers/product";
import { validateData } from "../../middleware/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productSchema";
import { verifySeller, verifyToken } from "../../middleware/authMiddleware";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", validateData(updateProductSchema), getProductsById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
