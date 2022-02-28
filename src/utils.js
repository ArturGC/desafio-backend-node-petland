"use strict";

module.exports = {
  arredondarParaHorarioTermino,
  validarEObterHorarioObjeto,
  obterHorariosEntreHoras,
  arredondarParaHorarioInicio,
  obterHorariosAgendamento,
  obterHorariosAgendados,
  obterHorariosDisponiveis,
  normalizarHorarioInicioAgendamento,
  normalizarHorarioTerminoAgendamento,
};

function validarEObterHorarioObjeto(horario) {
  const resultado = horario.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/);

  if (!resultado) {
    throw new Error("Horário inválido");
  }

  const [, horaString, minutoString] = resultado;

  return { hora: Number(horaString), minutos: Number(minutoString) };
}

function arredondarParaHorarioInicio(horario) {
  if (horario.minutos < 30) {
    return { hora: horario.hora, minutos: 0 };
  }

  return { hora: horario.hora, minutos: 30 };
}

function arredondarParaHorarioTermino(horario) {
  if (horario.minutos > 0 && horario.minutos < 30) {
    return { hora: horario.hora, minutos: 30 };
  } else if (horario.minutos > 30) {
    return { hora: horario.hora + 1, minutos: 0 };
  }

  return horario;
}

function obterDataComHorario(horario) {
  const horarioString =
    horario.hora.toString().padStart(2, "0") +
    ":" +
    horario.minutos.toString().padStart(2, "0");

  return new Date(`2022-01-01T${horarioString}:00.000Z`);
}

function obterHorariosEntreHoras(inicio, termino) {
  const dataInicio = obterDataComHorario(inicio);
  const dataTermino = obterDataComHorario(termino);
  const invervaloEmMilisegundos = 30 * 60 * 1000;
  const quantidadeDeHorarios =
    (dataTermino - dataInicio) / invervaloEmMilisegundos;

  return Array.from({ length: quantidadeDeHorarios }).map((_, index) => {
    const horario = new Date(
      dataInicio.getTime() + index * invervaloEmMilisegundos
    );

    const regexp = /T(\d\d:\d\d)/;
    return horario.toISOString().match(regexp)[1];
  });
}

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

function obterHorariosAgendados(profissional) {
  return profissional.appointments.reduce((horariosAgendados, agendamento) => {
    const horarioInicio = validarEObterHorarioObjeto(agendamento.startsAt);
    const horarioInicioNormalizado = arredondarParaHorarioInicio(horarioInicio);

    const horarioTermino = validarEObterHorarioObjeto(agendamento.finishesAt);
    const horarioTerminoNormalizado =
      arredondarParaHorarioTermino(horarioTermino);

    const horarios = obterHorariosEntreHoras(
      horarioInicioNormalizado,
      horarioTerminoNormalizado
    );

    return [...horariosAgendados, ...horarios];
  }, []);
}

function obterHorariosDisponiveis(horariosPossiveis, horariosAgendados) {
  return horariosPossiveis.filter(
    (horario) => !horariosAgendados.includes(horario)
  );
}

/*
{
  employeeId: 1,
  appointmentId: '100',
  startsAt: '09:30',
  finishesAt: '10:30'
}
{
  employeeId: 1,
  appointmentId: '101',
  startsAt: '11:00',
  finishesAt: '11:20'
}
{
  employeeId: 1,
  appointmentId: '102',
  startsAt: '16:00',
  finishesAt: '16:30'
}
{
  employeeId: 2,
  appointmentId: '103',
  startsAt: '10:30',
  finishesAt: '11:30'
}
{
  employeeId: 2,
  appointmentId: '104',
  startsAt: '16:00',
  finishesAt: '16:20'
}
{
  employeeId: 3,
  appointmentId: '100',
  startsAt: '12:00',
  finishesAt: '14:00'
}
{
  employeeId: 3,
  appointmentId: '106',
  startsAt: '16:00',
  finishesAt: '17:30'
}
{
  employeeId: 4,
  appointmentId: '107',
  startsAt: '11:00',
  finishesAt: '11:30'
}
{
  employeeId: 4,
  appointmentId: '108',
  startsAt: '16:00',
  finishesAt: '17:00'
}
*/

/*
{ id: 1, name: 'Marco', startsAt: '08:00', finishesAt: '18:00' },
{ id: 2, name: 'Leo', startsAt: '08:00', finishesAt: '18:00' },
{ id: 3, name: 'Gustavo', startsAt: '12:00', finishesAt: '18:00' },
{ id: 4, name: 'Nath', startsAt: '08:00', finishesAt: '18:00' }
*/
