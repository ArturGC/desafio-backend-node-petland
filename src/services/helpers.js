"use strict";

module.exports = {
  mesclarArraysHorariosDisponiveis,
  obterHorariosEntreInicioETermino,
  filtrarHorariosDisponiveis,
  validarEObterHorarioObjeto,
};

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

function obterHorariosEntreInicioETermino(horarioInicioObj, horarioTerminoObj) {
  const dataHoraInicio = obterDataComHorario(horarioInicioObj);
  const dataHoraTermino = obterDataComHorario(horarioTerminoObj);

  const invervaloEmMilisegundos = 30 * 60 * 1000;
  const quantidadeDeHorarios =
    (dataHoraTermino - dataHoraInicio) / invervaloEmMilisegundos;

  return Array.from({ length: quantidadeDeHorarios }).map((_, index) => {
    const horario = new Date(
      dataHoraInicio.getTime() + index * invervaloEmMilisegundos
    );

    return horario.toISOString().match(/T(\d\d:\d\d)/)[1];
  });
}

function filtrarHorariosDisponiveis(horariosPossiveis, horariosAgendados) {
  return horariosPossiveis.filter(
    (horario) => !horariosAgendados.includes(horario)
  );
}

function mesclarArraysHorariosDisponiveis(arrayHorariosDisponiveis) {
  return arrayHorariosDisponiveis
    .reduce((horariosDisponiveisMesclado, horariosDisponiveis) => {
      horariosDisponiveis.forEach((horario) => {
        if (!horariosDisponiveisMesclado.includes(horario)) {
          horariosDisponiveisMesclado.push(horario);
        }
      });

      return horariosDisponiveisMesclado;
    }, [])
    .sort();
}
