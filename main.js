require('dotenv').config();
const express = require('express');

const {connectMongoDB} = require('./connection');

const {secMiddleware} = require('./middlewares/index');
const userRouter = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(express.json());  

app.use(express.urlencoded({extended:false}));



connectMongoDB(process.env.DBURL).then(()=>{
    console.log("MongoDB Connected");
})

app.use(secMiddleware);

app.use('/users',userRouter);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})