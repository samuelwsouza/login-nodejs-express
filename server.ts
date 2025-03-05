import express from "express";
import publicRoutes from "./src/routes/publicRoutes";
import privateRoute from "./src/routes/privateRoute";

import auth from "./src/middleware/auth";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);
app.use("/", auth, privateRoute);

app.listen(2099, () => console.log("Rodando..."));
