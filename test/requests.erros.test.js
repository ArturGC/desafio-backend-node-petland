"use strict";

const {
  consultarAgendamentosProfissional,
  consultarProfissionais,
} = require("../src/services/requests-api-externas");

const axios = require("axios");
jest.mock("axios");

describe("consultarProfissionais", () => {
  test("Deve lançar um erro quando não é possível consultar os profissionais", async () => {
    expect.assertions(1);
    axios.get.mockResolvedValue(undefined);

    try {
      await consultarProfissionais();
    } catch (erro) {
      expect(erro.message).toBe("Não foi possível consultar os profissionais");
    }
  });
});

describe("consultarAgendamentosProfissional", () => {
  test("Deve lançar um erro quando não é possível consultar os agendamentos de um profissional", async () => {
    expect.assertions(1);
    axios.get.mockResolvedValue(undefined);

    try {
      await consultarAgendamentosProfissional(1);
    } catch (erro) {
      expect(erro.message).toBe(
        "Não foi possível consultar agendamentos do profissional de id 1"
      );
    }
  });
});
