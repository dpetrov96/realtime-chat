import { getSession } from "next-auth/react";

import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { Db, MongoClient } from "mongodb";
import EventEmitter from "events";

import { BaseUser } from "@/models/User";
import clientPromise from "@/utils/dbConnect";
import logger from "@/utils/logger";

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

interface User {
  id: string;
  email: string;
}

export const createContext = async (
  opts: CreateNextContextOptions | CreateWSSContextFnOptions,
) => {
  const session = await getSession(opts);

  const client: MongoClient = await clientPromise;
  const db: Db = client.db(process.env.DB_NAME || "realtime-chat");

  const collections = {
    user: db.collection<BaseUser>("users"),
  };

  return {
    user: session?.user as User | undefined,
    ee,
    collections,
    logger,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
