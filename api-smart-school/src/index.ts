import express from "express";
import { errorMiddleware } from "./middleware/error-middleware";
import  router  from "./routes/api";
import cors from "cors"
import { logger } from "./application/logging";

export const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
}));


app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use("/api/v1", router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  logger.info(`App start at ${process.env.HOST}:${process.env.PORT}`);
});

export default app