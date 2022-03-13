const express = require('express');
const cors = require('cors');
const Crypto = require('crypto');
const Port=process.env.PORT || 4000
const DotEnv = require("dotenv")
DotEnv.config({});
const SecretKey = Crypto.randomBytes(20).toString("hex");
const RandomToken = Crypto.createHash("sha256").digest(SecretKey).toString("hex")

const JWT = require('jsonwebtoken')

const conn = require('./Mongoose/Conn');
const { ToDoModel, UserModel } = require('./Mongoose/Schema');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello World")
})
app.post("/register", async (req, res) => {
    const { Email, UserName, Password } = req.body;
    const ChkPreUser = await UserModel.findOne({ username: UserName });

    if (ChkPreUser) {
        return res.status(500).json({ message: "User Already Exists", })
    }

    const NewUser = new UserModel({ email: Email, username: UserName, password: Password });
    await NewUser.save();
    res.status(200).json({
        message: "Success",
        NewUser
    })
})
app.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
    console.log(req.body);
    const UserInfo = (req.body)
    const User = await UserModel.findOne({ email: Email });
    const AccessToken = JWT.sign(UserInfo, process.env.ACCESS_TOKEN_SECRET);


    if (!User || User.password != Password) {
        return res.status(403).json({ message: "Invalid Login", })
    } else {
        return res.status(200).json({ status: "ok", Token: AccessToken, UserName: User.username });
    }
})
app.post("/todo", async (req, res) => {
    const FrontEndTodos = [req.body]

    const Token = req.headers["x-access-token"];


    const { Email, Password, _id } = JWT.verify(Token, process.env.ACCESS_TOKEN_SECRET);

    const FindUser = await UserModel.findOne({ email: Email });
    // console.log(FindUser.password+"   "+Password)
    if (!FindUser || FindUser.password != Password) {
        return res.status(403).json({ message: "Invalid Login", });
    }

    const Todo = await ToDoModel.findOne({ userId: FindUser._id });
    // console.log(Todo);
    if (!Todo) {
        const NewToDo = new ToDoModel({
            userId: FindUser._id,
            ToDo: FrontEndTodos.map((value, index, arr) => {
                return {
                    Task: value.text,
                    checked: value.checked,

                }
            })
        })
        const Saved = await NewToDo.save()
    }
    else {
        ToDoModel.updateOne
            (
                { userId: FindUser._id },
                {
                    $push: {
                        ToDo: FrontEndTodos.map((value, index, arr) => {
                            return {
                                Task: value.text,
                                checked: value.checked,

                            }
                        })

                    }
                },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log(success);
                    }
                }
            ),
            res.json({ status: 200 })
    }

})
app.get('/todo', async (req, res) => {
    const Token = req.headers["x-access-token"];

    const userInfo = JWT.verify(Token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(userInfo)
    const User = await UserModel.findOne({ email: userInfo.Email });
    if (User) {
        const ToDoList = await ToDoModel.findOne({ userId: User._id });

        if (ToDoList) {
            return res.json({ status: "ok", todoList: ToDoList.ToDo })
        }
    }
})
app.put('/todo', async (req, res) => {
    const ToDos = req.body;
    const Token = req.headers["x-access-token"];
    const userInfo = JWT.verify(Token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(ToDos)
    const User = await UserModel.findOne({ email: userInfo.Email });
    const findToDo = await ToDoModel.findOne({
        userId: User._id, ToDo: {
            $elemMatch: {
                Task: ToDos.text,

            }
        }
    });

    ToDoModel.updateOne(
        {
            userId: userInfo._id,
            ToDo: {
                $elemMatch: {
                    Task: ToDos.text,
                    // checked:!ToDos.checked
                }
            }
        },
        {
            $set:{
                'ToDo.$.Task': "arslan",
                'ToDo.$.checked': true,

            }

        }, 
        {
            new: true,
            useFinedAndModify: false,
        },
        (err, result) => {
            if (err) {
                console.error("Error ", err);
            }
            else {
                console.log("Result ", result);
            };
        })
})

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("frontend/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}
// nodemon Backend/server.js
app.listen(Port, () => {
    console.log(`Server is running at port ${Port}`)
});