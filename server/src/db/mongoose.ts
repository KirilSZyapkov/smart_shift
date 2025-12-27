import 'dotenv/config';
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL!

if (!MONGODB_URI) {
  throw new Error("DATABASE_URL is not defined");
}


interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongooseGlobal: MongooseGlobal | undefined;
}

const globalForMongoose = global as typeof global & {
  mongooseGlobal?: MongooseGlobal;
};

if (!globalForMongoose.mongooseGlobal) {
  globalForMongoose.mongooseGlobal = {
    conn: null,
    promise: null
  };
}

export async function connectToDatabase() {
  if (globalForMongoose.mongooseGlobal!.conn) {
    return globalForMongoose.mongooseGlobal!.conn;
  }

  if (!globalForMongoose.mongooseGlobal!.promise) {
    globalForMongoose.mongooseGlobal!.promise = mongoose.connect(MONGODB_URI, {
      autoIndex: true,
    });
  }


  globalForMongoose.mongooseGlobal!.conn = await globalForMongoose.mongooseGlobal!.promise;

  return globalForMongoose.mongooseGlobal!.conn;
}