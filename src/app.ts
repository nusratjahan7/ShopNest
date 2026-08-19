import express, { Application } from "express";
import cors from "cors";
import env from "./config/env";
import apiRouter from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/not-found.middleware";

const app: Application = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
