import mongoose, { Schema } from "mongoose";
import { Match } from "../domain";

interface IMatch extends Document, Omit<Match, "id"> {}

const matchSchema: Schema = new Schema({
  clubId: { type: Schema.Types.ObjectId, ref: "Club" },
  courtId: { type: Schema.Types.ObjectId, ref: "Court" },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  teams: {
    type: [
      {
        drive: { type: Schema.Types.ObjectId, ref: "Member" },
        backhand: { type: Schema.Types.ObjectId, ref: "Member" },
      },
    ],
    required: true,
  },
  price: { type: Number, required: true },
});

export const matchModel = mongoose.model<IMatch>("Match", matchSchema);
