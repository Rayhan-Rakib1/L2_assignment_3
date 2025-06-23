import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Borrow from "../borrow/borrow.model";
import Book from "../book/book.model";
 
export const borrowBookRoutes = express.Router();

borrowBookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    // Validate required fields and types
    if (!bookId || !quantity || !dueDate || quantity <= 0) {
       res.status(400).json({
        success: false,
        message: "book, quantity (positive number), and dueDate are required",
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
       res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    // Find the book
    const book = await Book.findById(bookId);
    if (!book) {
       res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check availability and update stock
    await book!.checkAvailabilityAndUpdate(quantity);

    // Create borrow record
    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

   res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
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
      message: error.message || "Internal server error",
    });
  }
});

borrowBookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    console.error("Aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving borrow summary",
      error: error.message,
    });
  }
});
