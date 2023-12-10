const express = require("express");
const { connection } = require("./db");
const {userRouter} =require("./routes/user.routes");
const {noteRouter}=require("./routes/notes.routes");

const app = express();

app.use(express.json())

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.listen(8080, async () => {
    try {
        await connection
        console.log("server running at port 8080")
        console.log("connected to DB")
    } catch (err) {
        console.log(err)
    }

})