"use strict";

const {
  validarEObterHorarioObjeto,
  arredondarParaHorarioTermino,
  obterHorariosEntreHoras,
  arredondarParaHorarioInicio,
  obterHorariosAgendamento,
  obterHorariosAgendados,
  obterHorariosDisponiveis,
  normalizarHorarioInicioAgendamento,
  normalizarHorarioTerminoAgendamento,
} = require("../src/utils");

describe("validarEObterHorarioObjeto: Deve validar um horário no formato hh:mm e retornar um objeto com os valores númericos de hora e minuto", () => {
  test("10:00 => { hora: 10, minuto: 0 }", () => {
    const objetoHorario = validarEObterHorarioObjeto("10:00");

    expect(objetoHorario.hora).toBe(10);
    expect(objetoHorario.minutos).toBe(0);
  });

  test("Erro por horário inválido", () => {
    expect.assertions(1);

    try {
      validarEObterHorarioObjeto("32:00");
    } catch (erro) {
      expect(erro.message).toBe("Horário inválido");
    }
  });
});

describe("arredondarParaHorarioInicio: Deve arredondar um horário para o horário anterior mais próximo em que os valores de minutos seja 0 ou 30", () => {
  test("08:00 => 08:00", () => {
    const horarioInicio = { hora: 8, minutos: 0 };
    const inicio = arredondarParaHorarioInicio(horarioInicio);

    expect(inicio).toEqual({ hora: 8, minutos: 0 });
  });

  test("09:30 => 09:30", () => {
    const horarioInicio = { hora: 9, minutos: 30 };
    const inicio = arredondarParaHorarioInicio(horarioInicio);

    expect(inicio).toEqual({ hora: 9, minutos: 30 });
  });

  test("10:15 => 10:00", () => {
    const horarioInicio = { hora: 10, minutos: 15 };
    const inicio = arredondarParaHorarioInicio(horarioInicio);

    expect(inicio).toEqual({ hora: 10, minutos: 0 });
  });

  test("11:45 => 11:30", () => {
    const horarioInicio = { hora: 11, minutos: 45 };
    const inicio = arredondarParaHorarioInicio(horarioInicio);

    expect(inicio).toEqual({ hora: 11, minutos: 30 });
  });
});

describe("arredondarParaHorarioTermino: Deve arredondar um horário para o horário seguinte mais próximo em que os valores de minutos seja 0 ou 30", () => {
  test("12:00 => 12:00", () => {
    const horarioTermino = { hora: 12, minutos: 0 };
    const termino = arredondarParaHorarioTermino(horarioTermino);

    expect(termino).toEqual({ hora: 12, minutos: 0 });
  });

  test("13:30 => 13:30", () => {
    const horarioTermino = { hora: 13, minutos: 30 };
    const termino = arredondarParaHorarioTermino(horarioTermino);

    expect(termino).toEqual({ hora: 13, minutos: 30 });
  });

  test("14:25 => 14:30", () => {
    const horarioTermino = { hora: 14, minutos: 25 };
    const termino = arredondarParaHorarioTermino(horarioTermino);

    expect(termino).toEqual({ hora: 14, minutos: 30 });
  });

  test("15:45 => 16:00", () => {
    const horarioTermino = { hora: 15, minutos: 45 };
    const termino = arredondarParaHorarioTermino(horarioTermino);

    expect(termino).toEqual({ hora: 16, minutos: 0 });
  });
});

describe("obterHorariosEntreHoras: Deve gerar uma lista com horários em intervalos de 30 minutos a partir de um horário de início e termino", () => {
  test("Inicio: 08:00, Termino: 10:00 => ['08:00', '08:30', '09:00', '09:30']", () => {
    const horarioInicio = { hora: 8, minutos: 0 };
    const horarioTermino = { hora: 10, minutos: 0 };
    const horarios = obterHorariosEntreHoras(horarioInicio, horarioTermino);

    expect(horarios).toEqual(["08:00", "08:30", "09:00", "09:30"]);
  });
});

describe("normalizarHorarioInicioAgendamento: Deve arredondar um horário de início de agendamento para o horário seguinte mais próximo em que os minutos são 0 ou 30", () => {
  test("08:00 => 08:00", () => {
    const horarioInicio = { hora: 8, minutos: 0 };
    const inicio = normalizarHorarioInicioAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 8, minutos: 0 });
  });

  test("09:30 => 09:30", () => {
    const horarioInicio = { hora: 9, minutos: 30 };
    const inicio = normalizarHorarioInicioAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 9, minutos: 30 });
  });

  test("10:15 => 10:30", () => {
    const horarioInicio = { hora: 10, minutos: 15 };
    const inicio = normalizarHorarioInicioAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 10, minutos: 30 });
  });

  test("11:45 => 12:00", () => {
    const horarioInicio = { hora: 11, minutos: 45 };
    const inicio = normalizarHorarioInicioAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 12, minutos: 0 });
  });
});

describe("normalizarHorarioTerminoAgendamento: Deve arredondar um horário de término de agendamento para o horário anterior mais próximo em que os minutos são 0 ou 30", () => {
  test("08:00 => 08:00", () => {
    const horarioInicio = { hora: 8, minutos: 0 };
    const inicio = normalizarHorarioTerminoAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 8, minutos: 0 });
  });

  test("09:30 => 09:30", () => {
    const horarioInicio = { hora: 9, minutos: 30 };
    const inicio = normalizarHorarioTerminoAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 9, minutos: 30 });
  });

  test("10:15 => 10:00", () => {
    const horarioInicio = { hora: 10, minutos: 15 };
    const inicio = normalizarHorarioTerminoAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 10, minutos: 0 });
  });

  test("11:45 => 11:30", () => {
    const horarioInicio = { hora: 11, minutos: 45 };
    const inicio = normalizarHorarioTerminoAgendamento(horarioInicio);

    expect(inicio).toEqual({ hora: 11, minutos: 30 });
  });
});

// describe("obterHorariosAgendamento: Deve gerar um array com os horários de agendamento quando é fornecido as string de horário de início e horário de término", () => {
//   test("Inicio: 08:00, Termino: 10:00 => ['08:00', '08:30', '09:00', '09:30']", () => {
//     const horariosAgendamento = obterHorariosAgendamento("08:20", "13:25");

//     console.log(horariosAgendamento);

//     expect(horariosAgendamento).toEqual([]);
//   });
// });

// describe("obterHorariosDisponiveis", () => {
//   test.only("Inicio: 08:00, Termino: 12:00 => ['08:00', '08:30', '09:00', '09:30']", () => {
//     const profissional1 = {
//       id: 3,
//       name: "Gustavo",
//       startsAt: "12:00",
//       finishesAt: "18:00",
//       appointments: [
//         {
//           startsAt: "12:00",
//           finishesAt: "14:00",
//         },
//         {
//           startsAt: "16:00",
//           finishesAt: "17:30",
//         },
//       ],
//     };

//     const horariosAgendamento = obterHorariosAgendamento(profissional1);
//     const horariosAgendados = obterHorariosAgendados(profissional1);

//     const horariosDisponiveis = obterHorariosDisponiveis(
//       horariosAgendamento,
//       horariosAgendados
//     );

//     console.log(horariosAgendamento);
//     console.log(horariosAgendados);
//     console.log(horariosDisponiveis);

//     const agendamentos1 = ["08:00", "08:30", "09:30"];
//     const agendamentos2 = ["08:00", "09:00", "09:30"];
//     const agendamentos3 = ["08:30", "09:00", "09:30"];

//     expect(horarios).toEqual(["08:00", "08:30", "09:00", "09:30"]);
//   });
// });

// Normalizado
