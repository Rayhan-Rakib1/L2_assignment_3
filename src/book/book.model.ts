import { Schema, model } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
      uppercase: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, 'Copies are required'],
      min: [0, 'Copies must be a positive number'],
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ✅ Add instance method here
bookSchema.methods.checkAvailabilityAndUpdate = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  this.copies -= quantity;

  if (this.copies === 0) {
    this.available = false;
  }

  await this.save();
};

const Book = model<IBook>('Book', bookSchema);

export default Book;
