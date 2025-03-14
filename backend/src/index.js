import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload";
import path from "path"; //for file upload

dotenv.config();

const app = express();
const __dirname = path.resolve(); //for file upload
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(clerkMiddleware()); //this will add auth to req obj -> req.auth.userId
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"), //for file upload
  createParentPath: true, //if tmp dir doesn't exist, create it
  limits: {
    fileSize: 1024 * 1024 * 10, //10MB
  },
}));


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  console.log("Error in error handling middleware", err);
  res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
