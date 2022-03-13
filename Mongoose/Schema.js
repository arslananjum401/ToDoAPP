const mongoose = require("mongoose");
const USerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        uinque: true

    },
    email: {
        type: String,
        required: true,
        uinque: true
    },
    password: {
        type: String,
        required: true,
    }
})
const ToDosSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    ToDo: [{
        Task: {
            type: String,
            required: true,

        },
        checked: {
            type: Boolean,
            required: true,
        },

    }
    ]
})
const ToDoModel = new mongoose.model("ToDo", ToDosSchema)
const UserModel = new mongoose.model("User", USerSchema)
module.exports = { ToDoModel, UserModel };
// module.exports = UserModel;