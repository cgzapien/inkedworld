const express = require("express")
const app = express()
require("dotenv").config()
const expressJwt = require("express-jwt")
const morgan = require("morgan")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 9000
const path = require("path")

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/capstone-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the capstone DB")
)

//routes
app.use("/auth", require("./routes/AuthRouter"))
app.use('/api', expressJwt({ secret: process.env.SECRET,  algorithms: ['HS256'] }))
app.use("/api/thread", require("./routes/ThreadRouter"))
app.use("/api/thread/comment", require("./routes/ThreadCommentRouter"))
app.use("/api/thread/comment/commented", require("./routes/CommentOnCommentRouter"))

//error catching
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "Unauthorized Error") {
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})
if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"))
}
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });


//port 
app.listen(PORT, () => {
  console.log("App is listening on PORT 9000")
})