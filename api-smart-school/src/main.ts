import { web } from "./application/web";
import { logger } from "./application/logging";

web.listen(4000, () => {
  logger.info("App start");
});