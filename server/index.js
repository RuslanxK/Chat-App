const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const userRouter = require("./routers/userRouter")
const chatRouter = require("./routers/chatRouter")
const messageRouter = require("./routers/messageRouter")

const app = express()
require("dotenv").config()

const port = process.env.PORT || 8080;
const uri = process.env.DATA_BASE

app.use(cors())
app.use(express.json())
app.use("/api/users", userRouter)
app.use("/api/chats", chatRouter)
app.use("/api/messages", messageRouter)

app.listen(port, (req, res) => {

     console.log(`Server running on port ${port}`)
})


mongoose.connect(uri).then(() => console.log("connected to database")).catch((err) => console.log(err))