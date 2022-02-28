"use strict";

const {
  normalizarHorarioInicioAgendados,
  normalizarHorarioTerminoAgendados,
  obterHorariosAgendados,
} = require("../src/utils/horarios-agendados");

describe("normalizarHorarioInicioAgendados: Deve arredondar um horário para o horário anterior mais próximo em que os valores de minutos seja 0 ou 30", () => {
  test("08:00 => 08:00", () => {
    const horarioInicio = { hora: 8, minutos: 0 };
    const inicio = normalizarHorarioInicioAgendados(horarioInicio);

    expect(inicio).toEqual({ hora: 8, minutos: 0 });
  });

  test("09:30 => 09:30", () => {
    const horarioInicio = { hora: 9, minutos: 30 };
    const inicio = normalizarHorarioInicioAgendados(horarioInicio);

    expect(inicio).toEqual({ hora: 9, minutos: 30 });
  });

  test("10:15 => 10:00", () => {
    const horarioInicio = { hora: 10, minutos: 15 };
    const inicio = normalizarHorarioInicioAgendados(horarioInicio);

    expect(inicio).toEqual({ hora: 10, minutos: 0 });
  });

  test("11:45 => 11:30", () => {
    const horarioInicio = { hora: 11, minutos: 45 };
    const inicio = normalizarHorarioInicioAgendados(horarioInicio);

    expect(inicio).toEqual({ hora: 11, minutos: 30 });
  });
});

describe("normalizarHorarioTerminoAgendados: Deve arredondar um horário para o horário seguinte mais próximo em que os valores de minutos seja 0 ou 30", () => {
  test("12:00 => 12:00", () => {
    const horarioTermino = { hora: 12, minutos: 0 };
    const termino = normalizarHorarioTerminoAgendados(horarioTermino);

    expect(termino).toEqual({ hora: 12, minutos: 0 });
  });

  test("13:30 => 13:30", () => {
    const horarioTermino = { hora: 13, minutos: 30 };
    const termino = normalizarHorarioTerminoAgendados(horarioTermino);

    expect(termino).toEqual({ hora: 13, minutos: 30 });
  });

  test("14:25 => 14:30", () => {
    const horarioTermino = { hora: 14, minutos: 25 };
    const termino = normalizarHorarioTerminoAgendados(horarioTermino);

    expect(termino).toEqual({ hora: 14, minutos: 30 });
  });

  test("15:45 => 16:00", () => {
    const horarioTermino = { hora: 15, minutos: 45 };
    const termino = normalizarHorarioTerminoAgendados(horarioTermino);

    expect(termino).toEqual({ hora: 16, minutos: 0 });
  });
});

describe("obterHorariosAgendados: Deve gerar um array com os horários de agendamento quando é fornecido as string de horário de início e horário de término", () => {
  test("Inicio: 08:00, Termino: 10:00 => ['08:00', '08:30', '09:00', '09:30']", () => {
    const agendamentos = [
      {
        startsAt: "09:30",
        finishesAt: "10:30",
      },
      {
        startsAt: "11:00",
        finishesAt: "11:20",
      },
      {
        startsAt: "16:00",
        finishesAt: "16:30",
      },
    ];
    const horariosAgendados = obterHorariosAgendados(agendamentos);

    expect(horariosAgendados).toEqual([
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "16:00",
      "16:30",
    ]);
  });
});
