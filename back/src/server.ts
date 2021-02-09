import express from "express";
import cors from "cors";
import { getAddressInformations } from "./transactions";

const app = express();

// Enable CORS for *
app.use(cors());

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.get("/address/:address", (req, res) => {
  let bitcoin_address = req.params.address;
  getAddressInformations(bitcoin_address)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500);
      res.send({ error: err.message });
    });
});

const port = 8080;
app.listen(port, () => {
  console.log(
    `Server listening on port ${port} (${
      process.env.NODE_ENV ?? "unknown environment"
    })`
  );
});
