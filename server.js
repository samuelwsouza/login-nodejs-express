import express from "express";
import publicRoutes from "./src/routes/publicRoutes.js";
import privateRoute from "./src/routes/privateRoute.js";

import auth from "./src/middleware/auth.js";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);
app.use("/", auth, privateRoute);

app.listen(2099, () => console.log("Rodando..."));
