"use strict";

const {
  validarEObterHorarioObjeto,
  obterHorariosEntreInicioETermino,
} = require("./helpers");

module.exports = {
  normalizarHorarioInicioPossivel,
  normalizarHorarioTerminoPossivel,
  obterHorariosPossiveis,
};

function normalizarHorarioInicioPossivel(horarioInicioObj) {
  if (horarioInicioObj.minutos > 0 && horarioInicioObj.minutos < 30) {
    return { hora: horarioInicioObj.hora, minutos: 30 };
  } else if (horarioInicioObj.minutos > 30) {
    return { hora: horarioInicioObj.hora + 1, minutos: 0 };
  }

  return horarioInicioObj;
}

function normalizarHorarioTerminoPossivel(horarioTerminoObj) {
  if (horarioTerminoObj.minutos > 30) {
    return { hora: horarioTerminoObj.hora, minutos: 30 };
  } else if (horarioTerminoObj.minutos > 0 && horarioTerminoObj.minutos < 30) {
    return { hora: horarioTerminoObj.hora, minutos: 0 };
  }

  return horarioTerminoObj;
}

function obterHorariosPossiveis(startsAt, finishesAt) {
  const horarioInicio = validarEObterHorarioObjeto(startsAt);
  const horarioInicioNormalizado =
    normalizarHorarioInicioPossivel(horarioInicio);

  const horarioTermino = validarEObterHorarioObjeto(finishesAt);
  const horarioTerminoNormalizado =
    normalizarHorarioTerminoPossivel(horarioTermino);

  return obterHorariosEntreInicioETermino(
    horarioInicioNormalizado,
    horarioTerminoNormalizado
  );
}
