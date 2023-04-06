const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

dotenv.config({ path: "./config/config.env"});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port: ${port}`));

connectDB();