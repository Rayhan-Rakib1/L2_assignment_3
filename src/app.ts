import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./book/book.controller";
import { borrowBookRoutes } from "./borrow/borrow.controller";

export const app: Application = express();
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowBookRoutes);

app.get("/", (req: Request, res: Response) => {
   console.log("server is running");
});

export default app;
