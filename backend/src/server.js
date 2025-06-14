import express from "express";
import cors from "cors"

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";


const app = express();
process.loadEnvFile();

app.use(cors({
  origin:"http://localhost:5173"
}))


//middleware
app.use(express.json());
//add rate limiting

//Simple custom middleware
// app.use((req,res,next) =>{
//   console.log("This is a simple custom middleware");
//   next();
// })

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5001");
  });
});
