"use strict";

const {
  validarEObterHorarioObjeto,
  obterHorariosEntreHoras,
} = require("./utils");

module.exports = {
  normalizarHorarioInicioAgendados,
  normalizarHorarioTerminoAgendados,
  obterHorariosAgendados,
};

function normalizarHorarioInicioAgendados(horario) {
  if (horario.minutos < 30) {
    return { hora: horario.hora, minutos: 0 };
  }

  return { hora: horario.hora, minutos: 30 };
}

function normalizarHorarioTerminoAgendados(horario) {
  if (horario.minutos > 0 && horario.minutos < 30) {
    return { hora: horario.hora, minutos: 30 };
  } else if (horario.minutos > 30) {
    return { hora: horario.hora + 1, minutos: 0 };
  }

  return horario;
}

function obterHorariosAgendados(appointments) {
  return appointments.reduce((horariosAgendados, agendamento) => {
    const horarioInicio = validarEObterHorarioObjeto(agendamento.startsAt);
    const horarioInicioNormalizado =
      normalizarHorarioInicioAgendados(horarioInicio);

    const horarioTermino = validarEObterHorarioObjeto(agendamento.finishesAt);
    const horarioTerminoNormalizado =
      normalizarHorarioTerminoAgendados(horarioTermino);

    const horarios = obterHorariosEntreHoras(
      horarioInicioNormalizado,
      horarioTerminoNormalizado
    );

    return [...horariosAgendados, ...horarios];
  }, []);
}
