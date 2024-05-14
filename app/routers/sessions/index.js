import { Router } from "express";
import {
  getSessionById,
  getSession,
  createSession,
  finisSession,
  updateSession,
} from "../../controllers/sessions.js";

const router = Router();

router.get("/", async (req, res) => {
  const data = await getSession();

  return res.status(200).json(data);
});

router.post("/", async (req, res) => {
  const data = req.body;

  if (!data.company || !data.device || !data.phones)
    return res.status(400).json({});

  const result = await createSession({ ...data, isTerminal: false });

  if (result) return res.status(201).json({ id: result });

  return res.status(400).json({});
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ error: "id not found!" });

  const data = await getSessionById(id);
  console.log(data);

  return res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  if (!id) return res.status(400).json({});

  const result = await updateSession(id, data.phone_n);

  if (result) {
    return res.status(201).json({
      message: "Session updating!",
      id: id,
    });
  }

  return res.status(400).json({});
});

router.put("/end/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({});

  const result = await finisSession(id);

  if (result)
    return res.status(201).json({
      message: "Session finished!",
      id: id,
    });
});

export default router;
