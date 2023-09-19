const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5001;

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const freelancerRoutes = require("./routes/freelancer.routes");
const clientRoutes = require("./routes/client.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/freelancer", freelancerRoutes);
app.use("/api/v1/client", clientRoutes);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
