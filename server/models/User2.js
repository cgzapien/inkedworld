const mongoose = require("mongoose")
const Schmea = mongoose.Schema
const bcrypt = require("bcryptjs")

const User2Schema = new Schmea({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  firstname: {
    type: String,
    parse: true
  },
  lastname: {
    type: String,
    parse: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    parse: true
  },
  membersince: {
    type: Date,
    default: Date.now()
  },
  isadmin: {
    type: Boolean,
    default: false
  }
})
// pre-save hook to encrypt user password on signup
User2Schema.pre("save", function(next) {
  const user = this
  if(!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err,hash) => {
    if(err) return next(err)
    user.password = hash
    next()
  })
})
// method to check encrypted password on login
User2Schema.methods.checkPassword = function(passwordAttempt, callback){
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if(err) return callback(err)
    return callback(null, isMatch)
  })
}
// method to remove user's password for token/sending the response
User2Schema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}
module.exports =  mongoose.model("User", User2Schema)