import express from "express";
import dotenv from "dotenv";
import connection from "./config/database.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
   
     res.status(200).json({success:true,message:"server started successfully"})
})

app.use("/api/user",userRouter)
const startServer = async () => {
  try {
    await connection();

    app.listen(port, () => {
      console.log(`server has started at ${port}`);
    });
  } catch (err) {
    console.log("some error while connecting database");
  }
};

startServer();
