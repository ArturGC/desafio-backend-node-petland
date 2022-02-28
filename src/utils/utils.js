"use strict";

module.exports = { obterHorariosEntreHoras, validarEObterHorarioObjeto };

function validarEObterHorarioObjeto(horario) {
  const resultado = horario.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/);

  if (!resultado) {
    throw new Error("Horário inválido");
  }

  const [, horaString, minutoString] = resultado;

  return { hora: Number(horaString), minutos: Number(minutoString) };
}

function obterDataComHorario(horario) {
  const horarioString =
    horario.hora.toString().padStart(2, "0") +
    ":" +
    horario.minutos.toString().padStart(2, "0");

  return new Date(`2022-01-01T${horarioString}:00.000Z`);
}

function obterHorariosEntreHoras(inicio, termino) {
  const dataInicio = obterDataComHorario(inicio);
  const dataTermino = obterDataComHorario(termino);
  const invervaloEmMilisegundos = 30 * 60 * 1000;
  const quantidadeDeHorarios =
    (dataTermino - dataInicio) / invervaloEmMilisegundos;

  return Array.from({ length: quantidadeDeHorarios + 1 }).map((_, index) => {
    const horario = new Date(
      dataInicio.getTime() + index * invervaloEmMilisegundos
    );

    const regexp = /T(\d\d:\d\d)/;
    return horario.toISOString().match(regexp)[1];
  });
}
