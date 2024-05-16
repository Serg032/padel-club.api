import mongoose, { Document, Schema } from "mongoose";
import { Club } from "../domain";

interface IClub extends Document, Omit<Club, "id"> {}

const clubSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const clubModel = mongoose.model<IClub>("Club", clubSchema);
