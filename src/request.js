"use strict";

const axios = require("axios");

module.exports = { consultarAgendamentosProfissional, consultarProfissionais };

async function consultarProfissionais() {
  const response = await getRequest(
    "https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees"
  );

  if (!response) {
    throw new Error("Não foi possível consultar os profissionais");
  }

  return response.data.employees;
}

async function consultarAgendamentosProfissional(profissionaolId) {
  try {
    const response = await axios.get(
      `https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employee/${profissionaolId}/appointments`
    );

    if (!response) {
      throw new Error(
        `Não foi possível consultar agendamentos do profissional de id ${profissionaolId}`
      );
    }

    return response.data.appointments;
  } catch (error) {
    return error;
  }
}

async function getRequest(url) {
  return axios.get(url);
}
