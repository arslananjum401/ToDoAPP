const mongoose = require('mongoose');
// const client = new MongoClient(uri);
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
}, (err) => {
    if (err) {

        console.error(err)
    }
})
