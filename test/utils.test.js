"use strict";

const {
  obterHorariosAgendamento,
} = require("../src/utils/horarios-agendamentos");

const { obterHorariosAgendados } = require("../src/utils/horarios-agendados");

const {
  mesclarArraysHorariosDisponiveis,
  validarEObterHorarioObjeto,
  obterHorariosEntreInicioETermino,
  filtrarHorariosDisponiveis,
} = require("../src/utils/utils");

describe("validarEObterHorarioObjeto: Deve validar um horário em string no formato hh:mm e retornar um objeto com os valores valores de horas e minutos", () => {
  test("10:25 => { hora: 10, minuto: 25 }", () => {
    const objetoHorario = validarEObterHorarioObjeto("10:25");

    expect(objetoHorario.hora).toBe(10);
    expect(objetoHorario.minutos).toBe(25);
  });

  test("32:00 => Erro por horário inválido", () => {
    expect.assertions(1);

    try {
      validarEObterHorarioObjeto("32:00");
    } catch (erro) {
      expect(erro.message).toBe("Horário inválido");
    }
  });
});

test("obterHorariosEntreInicioETermino: Deve gerar um array com horários em intervalos de 30 minutos", () => {
  const horarioInicioObj = { hora: 8, minutos: 0 };
  const horarioTerminoObj = { hora: 10, minutos: 0 };
  const horarios = obterHorariosEntreInicioETermino(
    horarioInicioObj,
    horarioTerminoObj
  );

  expect(horarios).toEqual(["08:00", "08:30", "09:00", "09:30", "10:00"]);
});

test("filtrarHorariosDisponiveis: Deve filtrar um array com os horários disponíveis", () => {
  const horariosPossiveis = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];
  const horariosAgendados = [
    "12:00",
    "13:00",
    "13:30",
    "14:00",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const horariosDisponiveis = filtrarHorariosDisponiveis(
    horariosPossiveis,
    horariosAgendados
  );

  expect(horariosDisponiveis).toEqual([
    "12:30",
    "14:30",
    "15:00",
    "15:30",
    "18:00",
  ]);
});

describe("mesclarArraysHorariosDisponiveis: Deve retornar um array com os horários disponíveis, ordenados por hora e sem repetição de horário a partir da mesclagem de array de horários disponíveis ", () => {
  const horariosDisponiveis = mesclarArraysHorariosDisponiveis([
    ["08:30", "10:00", "15:30", "17:00"],
    ["10:30", "13:00", "18:00"],
    ["08:30", "12:00", "13:00", "17:00"],
  ]);

  expect(horariosDisponiveis).toEqual([
    "08:30",
    "10:00",
    "10:30",
    "12:00",
    "13:00",
    "15:30",
    "17:00",
    "18:00",
  ]);
});
