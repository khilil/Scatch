const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash'); // ✅ Correct

const app = express();


const ownersRouter = require('./routes/owners.route');
const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const indexRouter = require('./routes/index');


require('dotenv').config();
app.use(cookieParser());

const db = require('./config/mongooseConnection');


const path = require('path');

app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(flash());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/", indexRouter)
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});