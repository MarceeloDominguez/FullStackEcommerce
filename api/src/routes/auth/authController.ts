import { Request, Response } from "express";
import { usersTable } from "../../db/usersSchema.js";
import { db } from "../../db/index.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({ ...data, password: hashedPassword })
      .returning();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    //create jwt token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your-secret",
      { expiresIn: "48h" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
}
