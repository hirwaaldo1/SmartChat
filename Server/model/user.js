const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newSchema = new Schema({
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  image:{
    type:String,
    default:""
   },
   post:[
       {
    type:String,
    default:""
   }
],
  password: {
    type: String,
    default: "",
  },
  following: [
    {
        user:{ 
            type: Schema.ObjectId, 
            ref: 'User' 
        },
    }

],
followers: [
    {
        user:{ 
            type: Schema.ObjectId, 
            ref: 'User' 
        },
    }
],
});
newSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
newSchema.methods.validpassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const Userdata = mongoose.model("Userdata", newSchema);
module.exports = Userdata;
