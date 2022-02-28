"use strict";

const {
  validarEObterHorarioObjeto,
  obterHorariosEntreHoras,
} = require("../src/utils/utils");

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

describe("obterHorariosEntreHoras: Deve gerar uma lista com horários em intervalos de 30 minutos a partir de um horário de início e termino", () => {
  test("Inicio: 08:00, Termino: 10:00 => ['08:00', '08:30', '09:00', '09:30']", () => {
    const horarioInicio = { hora: 8, minutos: 0 };
    const horarioTermino = { hora: 10, minutos: 0 };
    const horarios = obterHorariosEntreHoras(horarioInicio, horarioTermino);

    expect(horarios).toEqual(["08:00", "08:30", "09:00", "09:30", "10:00"]);
  });
});
