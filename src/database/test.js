const database = require('./db');

const createProffy = require('./createProffy');

database.then(async (db) => {
  const proffyValue = {
    name: 'Diego Fernandes',
    avatar:
      'https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4',
    whatsapp: 8998765422,
    bio:
      'Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.'
  };

  const classValue = {
    subject: 1,
    cost: 20
  };

  const classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 2,
      time_from: 520,
      time_to: 1220
    }
  ];

  // await createProffy(db, { proffyValue, classValue, classScheduleValues });

  /* const selectedProffys = await db.all('SELECT * FROM proffys');
  console.log(selectedProffys);

  const selectClassesAndProffys = await db.all(`
    SELECT
      classes.*,
      proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `);
  console.log(selectClassesAndProffys); */

  const selectClassesSchedules = await db.all(`
    SELECT class_schedules.*
    FROM class_schedules
    WHERE class_schedules.class_id = 1
    AND class_schedules.weekday = 1
    AND class_schedules.time_from <= 720
    AND class_schedules.time_to > 720;
  `);

  console.log(selectClassesSchedules);
});
