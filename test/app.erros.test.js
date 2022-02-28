"use strict";

const request = require("supertest");
const app = require("../src/app");
const axios = require("axios");

jest.mock("axios");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(404);
  });
});
