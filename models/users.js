var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id:  String, // String is shorthand for {type: String}
  userName: String,
  address:String,
  password:   String,
  email:   String,
  phone:   String,
  secondPhone:   String,
  joinDate:   Date,
  role:String,

});
const  users = mongoose.model('users', usersSchema);
module.exports = { users,usersSchema } ;