"use strict";

const request = require("supertest");
const axios = require("axios");

const app = require("../src/app");

jest.mock("axios");

describe("Testa erros na requisição", () => {
  test("Deve retornar uma resposta com código de erro 404 e a mensagem de erro", async () => {
    axios.get.mockResolvedValue(undefined);

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message");
  });
});
