"use strict";

const express = require("express");

const { obterHorariosDisponiveis } = require("./request");

const port = 3000;
const app = express();

app.get("/", async (req, res) => {
  try {
    const availableTimes = await obterHorariosDisponiveis();

    res.send(availableTimes);
  } catch (error) {
    res.render("404", {
      title: "404",
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Implementar timeout para responstar não obtidas
