import mongoose, { Document, Schema } from "mongoose";
import { CreateMemberCommand, MemberType } from "../domain";

interface IMember extends Document, Omit<CreateMemberCommand, "id"> {}

const memberSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    enum: Object.values(MemberType),
    required: true,
  },
});

export const memberModel = mongoose.model<IMember>("Member", memberSchema);
