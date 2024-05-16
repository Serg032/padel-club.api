import mongoose, { Document, Schema } from "mongoose";
import { Court } from "../domain";

interface ICourt extends Document, Omit<Court, "id"> {}

const courtSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  clubId: { type: Schema.Types.ObjectId, ref: "Club" },
});

export const courtModel = mongoose.model<ICourt>("Court", courtSchema);
