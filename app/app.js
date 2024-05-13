import express, { json } from "express";

import routes from "./routers/index.js";

const app = express();

// middleware
app.use(json());
app.use(express.static("src"));

// routes
app.use("/api", routes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
