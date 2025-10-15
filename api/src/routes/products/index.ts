import { Router } from "express";
import { getProducts } from "../../controllers/product";
import { createProduct } from "../../controllers/product";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);

export default router;
