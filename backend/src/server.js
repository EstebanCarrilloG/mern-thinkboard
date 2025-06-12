import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js" 

const app = express();
process.loadEnvFile();

connectDB();

//middleware
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5001");
});
