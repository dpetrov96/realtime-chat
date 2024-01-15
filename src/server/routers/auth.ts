import { TRPCError } from '@trpc/server';

import { hashPassword, verifyPassword } from '@/utils/auth';
import { userDataIsValid } from '@/utils/inputValidation';
import { signInSchema, signUpSchema } from '@/schema';

import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  createUser: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input: userInfo, ctx }) => {
      ctx.logger.info("Creating new user...");
      const invalidUserMessage = userDataIsValid(userInfo);
      if (invalidUserMessage !== "") {
        ctx.logger.error("Invalid user input: " + invalidUserMessage);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: invalidUserMessage,
        });
      }

      // Check if user already exists.
      const user = await ctx.collections.user.findOne({
        email: userInfo.email,
      });
      if (user) {
        ctx.logger.error("User already exists.");
        // User found therefore an account already exists.
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You already have an account. Click below to sign in.",
        });
      }

      const hashedPassword = await hashPassword(userInfo.password);

      const result = await ctx.collections.user.insertOne({
        email: userInfo.email,
        username: userInfo.username,
        password: hashedPassword,
        groups: [],
      });

      if (!result) {
        ctx.logger.error("Failed to create new user.");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create new user.",
        });
      }

      ctx.logger.info("New user created successfully.");
      return { message: "Created new user!" };
    }),

  loginUser: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input: userInfo, ctx }) => {
      ctx.logger.info("Logging in user...");

      const user = await ctx.collections.user.findOne({
        email: userInfo.email,
      });

      if (!user || !user.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found.",
        });
      }

      const paswwordIsValid = await verifyPassword(
        userInfo.password,
        user.password,
      );

      if (!paswwordIsValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password.",
        });
      }

      ctx.logger.info("User logged in successfully.");
      return {
        id: user._id.toString(),
        email: userInfo.email,
      };
    }),
});
