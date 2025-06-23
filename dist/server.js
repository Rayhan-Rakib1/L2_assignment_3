"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const PORT = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb+srv://rayhan:rayhan@cluster0.cfb3mbc.mongodb.net/BooksCollection?retryWrites=true&w=majority&appName=Cluster0');
            server: app_1.app.listen(PORT, () => {
                console.log(`server is running on port: ${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
// import { Server } from "http";
// import app from "./app";
// import mongoose from 'mongoose';
// let server: Server;
// const PORT = 5000;
// async function  main(){
//     try {
//         await mongoose.connect('mongodb+srv://mongoDB:mongoDB@cluster0.cfb3mbc.mongodb.net/advancedNoteApp?retryWrites=true&w=majority&appName=Cluster0');
//         console.log('server connected to mongoose');
//         server = app.listen(PORT, () => {
//             console.log(`server is running on port: ${PORT}`);
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// main();
