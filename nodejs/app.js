var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var helpRouter = require('./routes/help');
var cateRouter = require('./routes/cate');
var userRouter = require('./routes/users');
var orderRouter = require('./routes/order');
var productRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var newsRouter = require('./routes/news');
var commentRouter = require('./routes/comment');
var pingRouter = require('./routes/ping');

var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vue', { useNewUrlParser: true }, (err, res) => {
    if (!err) {
        console.log(res)
    }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/help', helpRouter);
app.use('/cate', cateRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/news', newsRouter);
app.use('/comment', commentRouter);
app.use('/ping', pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;