"use strict";

const {
  validarEObterHorarioObjeto,
  obterHorariosEntreHoras,
} = require("./utils");

module.exports = {
  normalizarHorarioInicioAgendamento,
  normalizarHorarioTerminoAgendamento,
  obterHorariosAgendamento,
};

function normalizarHorarioInicioAgendamento(horarioObjeto) {
  if (horarioObjeto.minutos > 0 && horarioObjeto.minutos < 30) {
    return { hora: horarioObjeto.hora, minutos: 30 };
  } else if (horarioObjeto.minutos > 30) {
    return { hora: horarioObjeto.hora + 1, minutos: 0 };
  }

  return horarioObjeto;
}

function normalizarHorarioTerminoAgendamento(horarioObjeto) {
  if (horarioObjeto.minutos > 30) {
    return { hora: horarioObjeto.hora, minutos: 30 };
  } else if (horarioObjeto.minutos > 0 && horarioObjeto.minutos < 30) {
    return { hora: horarioObjeto.hora, minutos: 0 };
  }

  return horarioObjeto;
}

function obterHorariosAgendamento(startsAt, finishesAt) {
  const horarioInicio = validarEObterHorarioObjeto(startsAt);
  const horarioInicioNormalizado =
    normalizarHorarioInicioAgendamento(horarioInicio);

  const horarioTermino = validarEObterHorarioObjeto(finishesAt);
  const horarioTerminoNormalizado =
    normalizarHorarioTerminoAgendamento(horarioTermino);

  return obterHorariosEntreHoras(
    horarioInicioNormalizado,
    horarioTerminoNormalizado
  );
}
