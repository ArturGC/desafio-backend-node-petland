"use strict";

require("express-async-errors");
const express = require("express");
const { obterHorariosDisponiveis } = require("./services");

const app = express();

app.get("/", async (req, res) => {
  const availableTimes = await obterHorariosDisponiveis();

  res.send(availableTimes);
});

app.get("/*", (req, res) => {
  res.status(404).send({
    title: "404",
    message: "Página não encontrada.",
  });
});

app.use((error, req, res, next) => {
  res.status(500).send({
    title: "500",
    message: error.message,
  });
});

module.exports = app;
