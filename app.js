import express, { json } from "express";
import {
  getSession,
  createSession,
  finisSession,
} from "./controllers/sessions.js";
import { createDevice, getDevice } from "./controllers/device.js";


const app = express();

// middleware
app.use(json());

app.get("/sessions/:id", async (req, res) => {
  const id = req.params.id;
  const active = req.query.active;

  if (!id || active === undefined) return res.status(400).json({});

  const data = await getSession(id, active);

  return res.status(200).json(data);
});

app.post("/sessions/", async (req, res) => {
  const data = req.body;

  if (!data.company || !data.device || !data.phones)
    return res.status(400).json({});

  const result = await createSession(data);

  if (result) return res.status(201).json({ id: result });
});

app.put("/sessions/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!data.time || !id) return res.status(400).json({});

  const result = await finisSession(id, data.time);

  console.log(result);
  if (result) return res.status(201).json({});
});

app.post("/device/", async (req, res) => {
  const data = req.body;

  if (!data.name) return res.status(400).json({});

  const result = await createDevice(data.name);

  if (result) return res.status(201).json({ id: result });
});

app.get("/device/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({});

  const result = await getDevice(id);

  if (result) return res.status(201).json(result);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
