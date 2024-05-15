import mongoose, { Document, Schema } from "mongoose";
import { CreateMemberCommand, MemberType } from "../domain";

export interface IMember extends Document, Omit<CreateMemberCommand, "id"> {}

const memberSchema: Schema = new Schema({
  name: String,
  email: String,
  money: Number,
  type: {
    type: String,
    enum: Object.values(MemberType),
    required: true,
  },
});

export const memberModel = mongoose.model<IMember>("Member", memberSchema);
