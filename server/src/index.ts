import express from "express";
import cors from "cors";
import * as trpcExpress from '@trpc/server/adapters/express';
import {connectToDatabase} from "./db/mongoose";
// import {errorHandler} from "./middlewares/errorHandler";
import {clerkMiddleware} from "@clerk/express";
import {createContext} from "./trpc/context";
import {appRouter} from "./trpc/router";

const app = express();

startServer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//todo: да активирам клърк app.use(clerkMiddleware());

app.use("/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
);

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", (req, res) => {
  res.send("Welcome, server is running!");
});

// app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    });
  } catch (e) {
    console.error(e);
    console.log("❌ Failed to connect to MongoDB");
    process.exit(1)
  }
}

