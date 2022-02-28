"use strict";

const {
  normalizarHorarioInicioPossivel,
  normalizarHorarioTerminoPossivel,
  obterHorariosPossiveis,
} = require("../src/services/horarios-possiveis");

describe("normalizarHorarioInicioPossivel: Deve normalizar um horário de início de agendamento para o horário seguinte mais próximo em que os minutos são 0 ou 30", () => {
  test("08:00 => 08:00", () => {
    const horarioInicioObj = { hora: 8, minutos: 0 };
    const inicio = normalizarHorarioInicioPossivel(horarioInicioObj);

    expect(inicio).toEqual({ hora: 8, minutos: 0 });
  });

  test("09:30 => 09:30", () => {
    const horarioInicioObj = { hora: 9, minutos: 30 };
    const inicio = normalizarHorarioInicioPossivel(horarioInicioObj);

    expect(inicio).toEqual({ hora: 9, minutos: 30 });
  });

  test("10:15 => 10:30", () => {
    const horarioInicioObj = { hora: 10, minutos: 15 };
    const inicio = normalizarHorarioInicioPossivel(horarioInicioObj);

    expect(inicio).toEqual({ hora: 10, minutos: 30 });
  });

  test("11:45 => 12:00", () => {
    const horarioInicioObj = { hora: 11, minutos: 45 };
    const inicio = normalizarHorarioInicioPossivel(horarioInicioObj);

    expect(inicio).toEqual({ hora: 12, minutos: 0 });
  });
});

describe("normalizarHorarioTerminoPossivel: Deve normalizar um horário de término de agendamento para o horário anterior mais próximo em que os minutos são 0 ou 30", () => {
  test("08:00 => 08:00", () => {
    const horarioTerminoObj = { hora: 8, minutos: 0 };
    const inicio = normalizarHorarioTerminoPossivel(horarioTerminoObj);

    expect(inicio).toEqual({ hora: 8, minutos: 0 });
  });

  test("09:30 => 09:30", () => {
    const horarioTerminoObj = { hora: 9, minutos: 30 };
    const inicio = normalizarHorarioTerminoPossivel(horarioTerminoObj);

    expect(inicio).toEqual({ hora: 9, minutos: 30 });
  });

  test("10:15 => 10:00", () => {
    const horarioTerminoObj = { hora: 10, minutos: 15 };
    const inicio = normalizarHorarioTerminoPossivel(horarioTerminoObj);

    expect(inicio).toEqual({ hora: 10, minutos: 0 });
  });

  test("11:45 => 11:30", () => {
    const horarioTerminoObj = { hora: 11, minutos: 45 };
    const inicio = normalizarHorarioTerminoPossivel(horarioTerminoObj);

    expect(inicio).toEqual({ hora: 11, minutos: 30 });
  });
});

describe("obterHorariosPossiveis: Deve gerar um array com os horários possíveis quando é fornecido as string de horário de início e horário de término", () => {
  test("Inicio: 08:00, Termino: 10:00 => ['08:00', '08:30', '09:00', '09:30']", () => {
    const horariosAgendamento = obterHorariosPossiveis("08:20", "11:25");

    expect(horariosAgendamento).toEqual([
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
    ]);
  });
});
