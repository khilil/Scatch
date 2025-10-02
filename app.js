const express = require('express');
const app = express();
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const db = require('./config/mongooseConnection')

const cookieParser = require('cookie-parser');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});