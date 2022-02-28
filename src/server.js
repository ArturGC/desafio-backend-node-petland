"use strict";

const app = require("./app");
const porta = 3000;

app.listen(porta, () => {
  console.log(`App executando na porta ${porta}`);
});
