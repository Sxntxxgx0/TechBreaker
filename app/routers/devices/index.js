import { createDevice, getDevice } from "../../controllers/device.js";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const data = req.body;

  if (!data.name) return res.status(400).json({});

  const result = await createDevice(data.name);

  if (result) return res.status(201).json({ id: result });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({});

  const result = await getDevice(id);

  if (result) return res.status(201).json(result);
});

export default router;