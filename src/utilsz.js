"use strict";

module.exports = {
  normalizarHorarioTerminoAgendados,
  validarEObterHorarioObjeto,
  obterHorariosEntreHoras,
  normalizarHorarioInicioAgendados,
  obterHorariosAgendamento,
  obterHorariosAgendados,
  obterHorariosDisponiveis,
  normalizarHorarioInicioAgendamento,
  normalizarHorarioTerminoAgendamento,
};

function obterHorariosAgendados(profissional) {
  return profissional.appointments.reduce((horariosAgendados, agendamento) => {
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
