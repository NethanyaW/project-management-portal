import {config} from 'dotenv';
config();
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'socket.io';
import SessionController from './controller/Sessions.controller';
import UsersRoute from './router/users.router';
import FoodsRoute from './router/foods.router';
import TagsRoute from './router/tags.router';
import OrdersRoute from './router/orders.router';
import { OrderModel } from './models/Order.model';
import expressAsyncHandler from 'express-async-handler';
import httpStatus from 'http-status';
const PORT = 5000;

const app = express();

app.use(express.json());

// enable cors
app.use(cors({
  credentials:true,
  origin:["http://localhost:4200"]
}));

// Socket IO Configs
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  }
})

// Session Config
app.use(SessionController);

// File Uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, './upload');
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname);
    }
  });
  
  const fileFilter = (req:any, file:any, callback:any) => {
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
      callback(null, true);
    } else {
      callback(null, false);
    }
  };
  
  const upload = multer({
    storage: storage, 
    limits: { 
      fileSize: 4 * 1024 * 1024
    },
    fileFilter: fileFilter
  });

app.use('/users', UsersRoute);
app.use('/foods', FoodsRoute);
app.use('/tags', TagsRoute);
app.use('/orders', OrdersRoute);


app.get("/", (req, res) => {
    res.send("This is App");
});

io.on("connection", (socket)=>{
  console.log('Client connected');
  dataUpdate(socket);

  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  })
});

function dataUpdate(socket:any) {
    socket.emit('dataupdate', {load:true});

    setTimeout(() =>{
        dataUpdate(socket);
    }, 5000)
}

mongoose.connect('mongodb+srv://dbuser:0342257187AS@cluster0.voyto7l.mongodb.net/?retryWrites=true&w=majority', {}).then(() => {
    console.log("DB Connected!");
    server.listen(PORT);
}).catch((err) => {
  console.log(err);
  server.listen(PORT);
})



