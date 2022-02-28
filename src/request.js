"use strict";

const axios = require("axios");
const { obterHorariosAgendados } = require("./utils/horarios-agendados");
const { obterHorariosAgendamento } = require("./utils/horarios-agendamentos");
const {
  filtrarHorariosDisponiveis,
  mesclarArraysHorariosDisponiveis,
} = require("./utils/utils");

module.exports = {
  consultarAgendamentosProfissional,
  consultarProfissionais,
  obterHorariosDisponiveis,
};

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

async function obterHorariosDisponiveisProfissional(startsAt, finishesAt, id) {
  const horariosPossiveis = obterHorariosAgendamento(startsAt, finishesAt);

  const appointments = await consultarAgendamentosProfissional(id);
  const horariosAgendados = obterHorariosAgendados(appointments);

  const horariosDisponiveisProfissional = filtrarHorariosDisponiveis(
    horariosPossiveis,
    horariosAgendados
  );

  return horariosDisponiveisProfissional;
}

async function obterHorariosDisponiveis() {
  const profissionais = await consultarProfissionais();

  const arrayHorariosDisponiveis = await Promise.all(
    profissionais.map(async ({ startsAt, finishesAt, id }) =>
      obterHorariosDisponiveisProfissional(startsAt, finishesAt, id)
    )
  );

  const horariosDisponiveis = mesclarArraysHorariosDisponiveis(
    arrayHorariosDisponiveis
  );

  return { availableTimes: horariosDisponiveis };
}
