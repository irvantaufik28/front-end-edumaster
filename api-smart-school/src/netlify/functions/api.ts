import ServerlessHttp from "serverless-http";
import{ app }from "../../index"




module.exports.handler = ServerlessHttp(app);
