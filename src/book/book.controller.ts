import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../book/book.model";

export const booksRoutes = express.Router();

// Helper function to check valid ObjectId
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// Create book
booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const createBook = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createBook,
    });
  } catch (error: any) {
    console.error(error);

    if (error.name === "ValidationError") {
       res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors, // detailed validation errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Book creation failed",
      error: error.message || "Unknown error",
    });
  }
});

// Get all books
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const genre = req.query.filter as string | undefined;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "desc" ? -1 : 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const filter: Record<string, any> = {};
    if (genre) {
      filter.genre = { $regex: new RegExp(genre, "i") };
    }

    const books = await Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
});

// Get single book by ID
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    if (!isValidObjectId(bookId)) {
       res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const singleBook = await Book.findById(bookId);

    if (!singleBook) {
       res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: singleBook,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
});

// Update book by ID
booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body;

    if (!isValidObjectId(bookId)) {
       res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true, // return updated document
      runValidators: true, // validate updated data
    });

    if (!updatedBook) {
       res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
       res.status(400).json({
        success: false,
        message: "Validation failed",
        error: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
});

// Delete book by ID
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    if (!isValidObjectId(bookId)) {
       res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const deletedBook = await Book.findOneAndDelete({ _id: bookId });

    if (!deletedBook) {
       res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
});
