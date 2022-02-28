"use strict";

const request = require("supertest");

const app = require("../src/app");

describe("Testa requisição", () => {
  test("Deve retornar resposta com código de sucesso 200 e os campos esperados", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("availableTimes");
  });

  test("Deve retornar uma resposta com código de erro 404 e mensagem de erro quando é feita uma requisção para um caminho não implementado", async () => {
    const response = await request(app).get("/outros");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
