import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, { message: "Required" }),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(7),
});

export const createGroupSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  userIds: z.array(z.string()).min(2, { message: "Please select a minimum of 2 users" }),
});

export const sendMessageSchema = z.object({
  text: z.string(),
  groupId: z.string(),
});
