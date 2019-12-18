import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
  console.error(`unable to connect to database: ${err}`);
});

app.listen(config.port, err => {
  if (err) console.error(err);
  console.info("Server started on port %s", config.port);
});
