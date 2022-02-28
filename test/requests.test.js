"use strict";

const {
  consultarAgendamentosProfissional,
  consultarProfissionais,
} = require("../src/services/requests-api-externas");

describe("consultarProfissionais", () => {
  test("Deve obter um array composto por objetos que representam um profisional", async () => {
    const profissionais = await consultarProfissionais();
    const profissional = profissionais[0];

    expect(Array.isArray(profissionais)).toBe(true);
    expect(profissional).toHaveProperty("id");
    expect(profissional).toHaveProperty("name");
    expect(profissional).toHaveProperty("startsAt");
    expect(profissional).toHaveProperty("finishesAt");
  });
});

describe("consultarAgendamentosProfissional", () => {
  test("Deve obter um array com os agendamentos de um profissional", async () => {
    const profissionalId = 1;
    const agendamentosProfissional = await consultarAgendamentosProfissional(
      profissionalId
    );
    const agendamento = agendamentosProfissional[0];

    expect(Array.isArray(agendamentosProfissional)).toBe(true);
    expect(agendamento.employeeId).toBe(profissionalId);
    expect(agendamento).toHaveProperty("appointmentId");
    expect(agendamento).toHaveProperty("startsAt");
    expect(agendamento).toHaveProperty("finishesAt");
  });
});
