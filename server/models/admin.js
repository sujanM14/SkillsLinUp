import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    department: {
      type: String,
    },
    dob: {
      type: String,
    },
    joiningYear: {
      type: String,
    },
    avatar: {
      type: String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRZlkydRTKZwSuQPuonEhTwInhXf-tCo4cGJ0i4Qj5kgHlcQs&s",
    },
    contactNumber: {
      type: Number,
    },
    passwordUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

export default mongoose.model("admin", adminSchema);
