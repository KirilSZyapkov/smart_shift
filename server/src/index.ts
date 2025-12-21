import express from "express";
import cors from "cors";
// import {errorHandler} from "./middlewares/errorHandler";
import {clerkMiddleware} from "@clerk/express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//todo: да активирам клърк app.use(clerkMiddleware());

// app.use("/trpc",{
//   router: appRouter,
//
// });

app.get("/favicon.ico", (req, res)=> res.status(204).end());
app.get("/",(req, res)=>{
  res.send("Welcome, server is running!");
});

// app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`)
})