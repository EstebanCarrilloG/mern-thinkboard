import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js" 

const app = express();
process.loadEnvFile();


app.use("/api/notes", noteRoutes);
connectDB();

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
