"use strict";

const {
  consultarAgendamentosProfissional,
  consultarProfissionais,
} = require("./requests-api-externas");

const { obterHorariosAgendados } = require("./horarios-agendados");
const { obterHorariosPossiveis } = require("./horarios-possiveis");

const {
  filtrarHorariosDisponiveis,
  mesclarArraysHorariosDisponiveis,
} = require("./helpers");

module.exports = {
  obterHorariosDisponiveis,
  obterHorariosDisponiveisProfissional,
};

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

async function obterHorariosDisponiveisProfissional(startsAt, finishesAt, id) {
  const horariosPossiveis = obterHorariosPossiveis(startsAt, finishesAt);

  const appointments = await consultarAgendamentosProfissional(id);
  const horariosAgendados = obterHorariosAgendados(appointments);

  const horariosDisponiveisProfissional = filtrarHorariosDisponiveis(
    horariosPossiveis,
    horariosAgendados
  );

  return horariosDisponiveisProfissional;
}
