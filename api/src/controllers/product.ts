import { Request, Response } from "express";
import { db } from "../db";
import { productsTable } from "../db/productSchema";
import { eq } from "drizzle-orm";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch products" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.userId);
    // console.log(req.rol);

    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send({ error: "Failed to create product" });
  }
}

export async function getProductsById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch product" });
  }
}
export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [updated] = await db
      .update(productsTable)
      .set(req.body)
      .where(eq(productsTable.id, id))
      .returning();
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const [deleted] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning({ id: productsTable.id });

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 204 = success, no body
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete product" });
  }
}
