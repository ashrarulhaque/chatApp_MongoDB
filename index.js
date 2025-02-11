const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const path = require('path');

const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/styles", express.static(__dirname + "/public/styles"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));



main()
  .then(() => {
      console.log("connection established");
    })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat_app');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

// let chat1 = new Chat({
//   from: "ashrarul",
//   to: "arfa",
//   msg: "Hi, How Are You?",
//   created_at: Date.now(),
// })

// chat1.save().then(res=>{console.log("chat is saved", res)});

// const chatSchema = new Schema({
//     sender: String, // String is shorthand for {type: String}
//     receiver: String,
//     body: String,
//     date: { type: Date, default: Date.now },
//     time: {type: Time}
// });

app.listen(8080, () => {
  console.log('server is listening')}
);

//Read Route

app.get("/", async (req,res) => {
  let chatData = await Chat.find();
  res.render("chatbox.ejs", {chatData});
});

//Create Route
app.get("/new", (req,res) => {
  res.render('newchat.ejs');
});

app.post("/", (req,res) => {
  let {from, to, msg} = req.body;
  let newChat = new Chat(
    {
      from: from,
      to: to,
      msg: msg,
    }
  )
  console.log(newChat);
  newChat.save().then((res) => console.log('chat is saved')).catch((err) => console.log(err));
  res.redirect('/');
});

//Update Route

app.get("/:id/edit", async (req,res) => {
  let {id} = req.params;
  let usermsg = await Chat.findById(id);
  console.log(usermsg);
  res.render('edit.ejs', {usermsg});
})

app.patch("/:id", async (req,res) => {
  let {id} = req.params;
  let { msg: newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg, created_at: Date.now()}, {runValidators: true, new: true});
  console.log(updatedChat);
  res.redirect("/");
})

//Delete Route

app.get("/:id/delete", async (req,res) => {
  let {id} = req.params;
  let usermsg = await Chat.findById(id);
  console.log(usermsg);
  res.render('delete.ejs', {usermsg});
})

app.delete("/:id", async (req,res) => {
  let {id} = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  console.log(deleteChat);
  res.redirect("/");
})
