"use strict";

const {
  obterHorariosDisponiveis,
} = require("../src/services/horarios-disponiveis");

describe("obterHorariosDisponiveis:", () => {
  test("08:00 => 08:00", async () => {
    const horariosDisponiveis = await obterHorariosDisponiveis();

    expect(horariosDisponiveis.availableTimes).toEqual([
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:30",
      "17:00",
      "17:30",
    ]);
  });
});
