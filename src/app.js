"use strict";

const express = require("express");

const { obterHorariosDisponiveis } = require("./services");

const app = express();

app.get("/", async (req, res) => {
  try {
    const availableTimes = await obterHorariosDisponiveis();

    res.send(availableTimes);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = app;
