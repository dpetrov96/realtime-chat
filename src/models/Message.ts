import { ObjectId } from "mongodb";
export interface Message {
  text: string;
  groupId: ObjectId;
  userId: ObjectId;
  email: string;
  createdAt: Date;
}
