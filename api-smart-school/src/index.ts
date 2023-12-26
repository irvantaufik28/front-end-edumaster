import express from "express";
// import { errorMiddleware } from "./middleware/error-middleware";
// import router from "./routes/api";
import cors from "cors"
import { logger } from "./application/logging";
// import { VercelRequest, VercelResponse } from '@vercel/node';
import { prismaClient } from "./application/database";
export const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
}));


app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.get("/test", async (req, res) => {
  try {
    const student = await prismaClient.student.findMany();

    res.status(200).json({
      data: student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.use("/api/v1", router);
// app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  logger.info(`App start at ${process.env.HOST}:${process.env.PORT}`);
});

export default app