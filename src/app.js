"use strict";

const express = require("express");

const { obterHorariosDisponiveis } = require("./services");

const app = express();

app.get("/", async (req, res) => {
  try {
    const availableTimes = await obterHorariosDisponiveis();

    res.send(availableTimes);
  } catch (error) {
    res.status(404).send({
      title: "404",
      message: error.message,
    });
  }
});

app.get("/*", (req, res) => {
  res.status(404).send({
    title: "404",
    message: "Página não encontrada.",
  });
});

module.exports = app;
