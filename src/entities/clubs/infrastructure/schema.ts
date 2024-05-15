import mongoose, { Document, Schema } from "mongoose";
import { Club } from "../domain";

export interface IClub extends Document, Omit<Club, "id"> {}

const clubSchema: Schema = new Schema({
  name: String,
  address: String,
});

export const clubModel = mongoose.model<IClub>("Club", clubSchema);
