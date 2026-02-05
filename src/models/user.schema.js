import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email:String,
  token:String,
  password:{type:String,required:true},
  is_token_valid: {type:Boolean, false : false},
},
  { timestamps: true }

);




// PASSWORD HASHING: Save hone se pehle ye function chalega
UserSchema.pre("save", async function (next) {
  // Agar password change nahi hua to skip karein

  if (!this.isModified("password")) return;

  // Password ko encrypt (hash) karein
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper Method: Password check karne ke liye (Login ke waqt kaam ayega)
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);


export default User;
