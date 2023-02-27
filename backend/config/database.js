const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DATABASE)
    .then(() => console.log(`Connected to DB`))
    .catch(err => console.log(`Error while connecting to DB: ${err}`))
}