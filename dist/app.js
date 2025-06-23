"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book/book.controller");
const borrow_controller_1 = require("./borrow/borrow.controller");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/books", book_controller_1.booksRoutes);
exports.app.use("/api/borrow", borrow_controller_1.borrowBookRoutes);
exports.app.get("/", (req, res) => {
    console.log("server is running");
});
exports.default = exports.app;
