"use strict";

const axios = require("axios");

const horarios = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

async function obterEmployees() {
  try {
    const { data } = await axios.get(
      "https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees"
    );

    return data;
  } catch (error) {
    return error;
  }
}

async function obterHorariosEmpregadoPorId(id) {
  const urlAppontments = `https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employee/{id-do-profissional}/appointments`;
  const urlEmpregado = urlAppontments.replace("{id-do-profissional}", `${id}`);

  try {
    const { data } = await axios.get(urlEmpregado);

    return data;
  } catch (error) {
    return error;
  }
}

function gerarHorariosEntreHorarios(inicio, termino) {
  const dataInicio = new Date(`2022-01-01T${inicio}:00.000Z`);
  const dataTermino = new Date(`2022-01-01T${termino}:00.000Z`);
  const invervaloEmMilisegundos = 30 * 60 * 1000;
  const quantidadeDeHorarios =
    (dataTermino - dataInicio) / invervaloEmMilisegundos;

  const horarios = [];

  for (let i = 0; i <= quantidadeDeHorarios; i += 1) {
    const horario = new Date(
      dataInicio.getTime() + i * invervaloEmMilisegundos
    );

    const regexp = /T(\d\d:\d\d)/;
    const horarioString = horario.toISOString().match(regexp)[1];
    horarios.push(horarioString);
  }

  console.log(horarios);
  return horarios;
}

async function forecast() {
  const horariosIndisponiveis = [];
  const employees = await obterEmployees();

  for (const employee of employees.employees) {
    const appointments = await obterHorariosEmpregadoPorId(employee.id);

    for (const appointment of appointments.appointments) {
      console.log(appointment);
    }
  }
}

function validadorHorario(horario) {
  const resultado = horario.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/);

  if (!resultado) {
    throw new Error("Horário inválido");
  }

  const [, horaString, minutoString] = resultado;

  return { hora: Number(horaString), minuto: Number(minutoString) };
}

(async () => {
  // gerarHorariosEntreHorarios("09:30", "10:30");
  await forecast();
})();

// Incluir validador regex para os horários fornecidos
// return Number(taxaString.match(/^(\d{1,3}[,\.]?\d{0,3})%$/)[1].replace(',', '.'));
