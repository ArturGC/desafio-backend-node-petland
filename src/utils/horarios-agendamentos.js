"use strict";

const {
  validarEObterHorarioObjeto,
  obterHorariosEntreInicioETermino,
} = require("./utils");

module.exports = {
  normalizarHorarioInicioAgendamento,
  normalizarHorarioTerminoAgendamento,
  obterHorariosAgendamento,
};

function normalizarHorarioInicioAgendamento(horarioInicioObj) {
  if (horarioInicioObj.minutos > 0 && horarioInicioObj.minutos < 30) {
    return { hora: horarioInicioObj.hora, minutos: 30 };
  } else if (horarioInicioObj.minutos > 30) {
    return { hora: horarioInicioObj.hora + 1, minutos: 0 };
  }

  return horarioInicioObj;
}

function normalizarHorarioTerminoAgendamento(horarioTerminoObj) {
  if (horarioTerminoObj.minutos > 30) {
    return { hora: horarioTerminoObj.hora, minutos: 30 };
  } else if (horarioTerminoObj.minutos > 0 && horarioTerminoObj.minutos < 30) {
    return { hora: horarioTerminoObj.hora, minutos: 0 };
  }

  return horarioTerminoObj;
}

function obterHorariosAgendamento(startsAt, finishesAt) {
  const horarioInicio = validarEObterHorarioObjeto(startsAt);
  const horarioInicioNormalizado =
    normalizarHorarioInicioAgendamento(horarioInicio);

  const horarioTermino = validarEObterHorarioObjeto(finishesAt);
  const horarioTerminoNormalizado =
    normalizarHorarioTerminoAgendamento(horarioTermino);

  return obterHorariosEntreInicioETermino(
    horarioInicioNormalizado,
    horarioTerminoNormalizado
  );
}
