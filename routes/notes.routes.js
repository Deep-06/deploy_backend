const { NoteModel } = require("../model/notes.model")
const { auth } = require("../middleware/auth.middleware")
const express = require("express")

const noteRouter = express.Router();



noteRouter.post("/create", auth, async (req, res) => {
    //const { title, body } = req.body
    try {

        const notes = new NoteModel(req.body)
        await notes.save()
        res.status(200).send({ "msg": "notes added", "post": req.body })

    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

noteRouter.get("/", auth, async (req, res) => {
    try {
            const notes = await NoteModel.find({userID:req.body.userID})
            res.status(200).send(notes)

    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

noteRouter.patch("/update/:noteID", auth, async (req, res) => {
    const { noteID } = req.params
    try {
        const note=await NoteModel.findOne({_id:noteID})
        if(req.body.userID===note.userID){
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.status(200).send(req.body)
        }else{
            res.status(400).send({"msg":"You are not authorized"})
        }
        
    } catch (err) {
        res.status(400).send({ "error": err })
    }
})
noteRouter.delete("/delete/:noteID", auth, async (req, res) => {
    const { noteID } = req.params
    try {
        await NoteModel.findByIdAndDelete({ _id: noteID })
         res.status(200).send({"message":"note deleted"})
    } catch (err) {
        res.status(400).send({ "error": err })
    }
})

module.exports = {
    noteRouter
}
