const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

// Temporary database
const proffys = [
  {
    name: 'Diego Fernandes',
    avatar: 'https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4',
    whatsapp: 8998765422,
    bio: 'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    subject: 'Química',
    cost: 20,
    weekday: [0],
    time_from: [720],
    time_to: [1280],
  },
  {
    name: 'Mayk Brito',
    avatar: 'https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4',
    whatsapp: 45665787841,
    bio: 'Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar. Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: "Aprenda a fazer dinheiro com isso!"',
    subject: 'Educação Física',
    cost: 40,
    weekday: [1],
    time_from: [720],
    time_to: [1280],
  },
  {
    name: 'Tiago Luchtenberg',
    avatar: 'https://mir-s3-cdn-cf.behance.net/user/115/4713a37191453.5f14e9ebb5e58.jpg',
    whatsapp: 134568764658,
    bio: 'As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em qualquer lugar. Tenho memória fotográfica e nunca fico perdido. Eu ensino a galera como não se perder na vida, com lições geográficas simples pra você nunca mais precisar de mapa na sua bela vida.',
    subject: 'Geografia',
    cost: 100,
    weekday: [3],
    time_from: [720],
    time_to: [1280],
  },
];

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

function pageLanding (req, res) {
  return res.render('index.html');
}

function pageStudy (req, res) {
  const filters = req.query;

  return res.render('study.html', { proffys, filters, subjects, weekdays });
}

function pageGiveClasses (req, res) {
  const data = req.query;

  const isNotEmpty = Object.keys(data).length > 0;

  if (isNotEmpty) {
    data.subject = getSubject(data.subject);
    proffys.push(data);
    
    return res.redirect('/study');
  }

  return res.render('give-classes.html', { subjects, weekdays });
}

// Template engine
nunjucks.configure('src/pages', {
  express: server,
  noCache: true,
});

// Configure static files
server.use(express.static('public'));

// Application routes
server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);

server.listen(5500);
