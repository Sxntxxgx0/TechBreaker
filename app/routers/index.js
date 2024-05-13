import express from "express";
import sessionsRouter from "./sessions/index.js";
import devicesRouter from "./devices/index.js";

const routes = express.Router();

routes.use("/sessions", sessionsRouter);
routes.use("/devices", devicesRouter);

export default routes;
