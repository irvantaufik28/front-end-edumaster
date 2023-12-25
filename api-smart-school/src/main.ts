import { web } from "./application/web";
import { logger } from "./application/logging";

web.listen(process.env.PORT, () => {
  logger.info(`App start at ${process.env.HOST}:${process.env.PORT}` );
});

