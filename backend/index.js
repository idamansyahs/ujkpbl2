import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import siswaRoute from "./route/siswaRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(siswaRoute);

const PORT = 8888;
app.listen(PORT, () => {
  console.log("Server Berjalan Alhamdulillaaah");
});
