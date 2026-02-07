import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
  name: String, //
  phone: String, //
  email:String, //
  token:String,
  image: String, //
  total_ads:String, 
  location:String, 
  password:{type:String,required:true}, //
  is_token_valid: {type:Boolean, false : false},
},
  { timestamps: true }

);




UserSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);


export default User;
