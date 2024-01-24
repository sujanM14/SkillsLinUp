import mongoose from "mongoose";
const { Schema } = mongoose;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRZlkydRTKZwSuQPuonEhTwInhXf-tCo4cGJ0i4Qj5kgHlcQs&s",
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
 
  username: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
  survey:[{
    type:Schema.Types.ObjectId,
    ref:"survey",
  }],
});

export default mongoose.model("student", studentSchema);
