const mongoose=require("mongoose");


//schema

const notesSchema=mongoose.Schema({
    title: String,
    body: String,
    userID: String,
    username: String
},{
    versionKey:false
})

//model

const NoteModel=mongoose.model("note",notesSchema)

module.exports={
    NoteModel
}