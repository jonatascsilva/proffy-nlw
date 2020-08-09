const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação Física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function getSubject(subjectNumber) {
  const position = subjectNumber - 1;

  return subjects[position];
}

function converHoursToMinutes(time) {
  const [hours, minutes] = time.split(':');

  return (Number(hours) * 60) + Number(minutes);
}

module.exports = {
  subjects,
  weekdays,
  getSubject,
  converHoursToMinutes
}