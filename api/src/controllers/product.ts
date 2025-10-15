import { Request, Response } from "express";

export function getProducts(req: Request, res: Response) {
  res.send([
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ]);
}

export function createProduct(req: Request, res: Response) {
  const { name } = req.body;
  const newProduct = { id: Date.now(), name };
  res.send(newProduct);
}
