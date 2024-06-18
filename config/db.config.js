const mongoose = require("mongoose");

const DB_NAME = "turistearte_app";
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_URI = `${URI}/${DB_NAME}`;

mongoose
  .connect(DB_URI)
  .then(() => console.info(`Successfully connected to the database ${DB_URI}`))
  .catch((error) => {
    console.error(
      `An error ocurred trying to connect to de database ${DB_URI}`,
      error
    );
    process.exit(0);
  });

process.on("SIGINT", () => {
  mongoose.connection.close().then(function () {
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
  });
});
