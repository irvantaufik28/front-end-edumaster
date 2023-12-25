// import { web } from "./application/web";
// import { logger } from "./application/logging";

// web.listen(process.env.PORT, () => {
//   logger.info(`App start at ${process.env.HOST}:${process.env.PORT}` );
// });


// export default webimport express from "express";

import express from "express";

const app = express();
app.use(express.json());

app.get("/post", (req, res) => {
  res.status(200).json({ message: "post routes" });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
export default app;