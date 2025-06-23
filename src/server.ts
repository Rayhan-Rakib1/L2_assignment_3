import { Server } from "http";
import { app } from "./app";
import mongoose from "mongoose";


let server: Server;
const PORT= 5000;



async function main() {
    try {
         await mongoose.connect('mongodb+srv://rayhan:rayhan@cluster0.cfb3mbc.mongodb.net/BooksCollection?retryWrites=true&w=majority&appName=Cluster0')
        server: app.listen(PORT, () => {
            console.log(`server is running on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
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