const mongoose = require('mongoose');
// const client = new MongoClient(uri);
mongoose.connect('mongodb+srv://arslananjum_401:arslanAA564^^&&@cluster0.pidwl.mongodb.net/TodoApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
}, (err) => {
    if (err) {

        console.error(err)
    }
})
// mongoose.connect('mongodb+srv://arslananjum_401:arslanAA12@cluster0.pidwl.mongodb.net/TodoApp?retryWrites=true&w=majority', {
// 