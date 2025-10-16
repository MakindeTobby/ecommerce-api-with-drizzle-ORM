import { Router } from "express";
import bcrypt from "bcryptjs";

import { validateData } from "../../middleware/validationMiddleware";
import { createUserSchema, usersTable } from "../../db/userSchema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();
    // @ts-ignore
    delete user.password;
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/login", validateData(createUserSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    // @ts-ignore
    delete user.password;
    if (!user) {
      return res.status(400).json({ error: "Authentication failed" });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
