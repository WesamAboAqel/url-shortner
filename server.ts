import express from "express";
import index from "./routes/index.route.js";
import url from "./routes/url.route.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error_handler.js";

const app = express();

app.use("/", express.static("site"));

app.use(express.json());

app.use(logger);

app.use("/api", index);
app.use("/", url);

app.use(errorHandler);

app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running and listening to port: 3000");
});
