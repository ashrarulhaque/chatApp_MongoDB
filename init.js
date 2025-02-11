
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
      console.log("connection established");
    })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat_app');
};

let allChats = [
    {
        from: "ashrarul",
        to: "arfa",
        msg: "Hi, How Are You?",
        created_at: new Date(),
    },
    {
        from: "arfa",
        to: "ashrarul",
        msg: "Hello, I am fine",
        created_at: Date.now(),
    },
    {
        from: "abeeha",
        to: "ashrarul",
        msg: "hello dad",
        created_at: Date.now(),
    },
    {
        from: "ashrarul",
        to: "abeeha",
        msg: "What are you doing?",
        created_at: Date.now(),
    },
    {
        from: "ashrarul",
        to: "ash",
        msg: "Hello, I am fine",
        created_at: Date.now(),
    },
    {
        from: "arfa",
        to: "ashrarul",
        msg: "Are you mad?",
        created_at: Date.now(),
    }
];

Chat.insertMany(allChats);