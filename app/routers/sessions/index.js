import {
  getSessionById,
  getSession,
  createSession,
  finisSession,
} from "../../controllers/sessions.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getSession();

  return res.status(200).json(data);
});

router.post("/", async (req, res) => {
  const data = req.body;

  if (!data.company || !data.device || !data.phones)
    return res.status(400).json({});

  const result = await createSession(data);

  if (result) return res.status(201).json({ id: result });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ error: "id not found!" });

  const data = await getSessionById(id);
  console.log(data);

  return res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!data.time || !id) return res.status(400).json({});

  const result = await finisSession(id, data.time);

  console.log(result);
  if (result) return res.status(201).json({});
});

export default router;
