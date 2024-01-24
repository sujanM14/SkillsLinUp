import mongoose from "mongoose";
const { Schema } = mongoose;

const clubSchema = new Schema({
  clubName: {
    type: String,
    required: true,
    trim: true,
  },
  isTechnical: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("club", clubSchema);
