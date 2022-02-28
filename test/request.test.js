"use strict";

const {
  consultarAgendamentosProfissional,
  consultarProfissionais,
} = require("../src/request");

describe("consultarProfissionais", () => {
  test("It should response the GET method", async () => {
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
  test("It should response the GET method", async () => {
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
