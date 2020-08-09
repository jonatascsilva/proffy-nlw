const database = require('./database/db');

const {
  subjects,
  weekdays,
  getSubject,
  converHoursToMinutes,
} = require('./utils/format');
const createProffy = require('./database/createProffy');

function pageLanding(req, res) {
  return res.render('index.html');
}

async function pageStudy(req, res) {
  const filters = req.query;

  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render('study.html', { filters, subjects, weekdays });
  }

  const timeToMinutes = converHoursToMinutes(filters.time);
  const subjectFiltered = getSubject(filters.subject);

  const query = `
    SELECT
      classes.*,
      proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedules.*
      FROM class_schedules
      WHERE class_schedules.class_id = classes.id
      AND class_schedules.weekday = ${filters.weekday}
      AND class_schedules.time_from <= ${timeToMinutes}
      AND class_schedules.time_to > ${timeToMinutes}
    )
    AND classes.subject = "${subjectFiltered}";
  `;

  try {
    const db = await database;
    const proffys = await db.all(query);

    return res.render('study.html', { proffys, filters, subjects, weekdays });
  } catch (error) {
    console.log(error);
  }
}

function pageGiveClasses(req, res) {
  return res.render('give-classes.html', { subjects, weekdays });
}

async function saveClasses(req, res) {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    weekday,
    time_from,
    time_to,
  } = req.body;

  const proffyValue = {
    name,
    avatar,
    whatsapp,
    bio,
  };

  const classValue = {
    subject: getSubject(subject),
    cost,
  };

  const classScheduleValues = weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: converHoursToMinutes(time_from[index]),
      time_to: converHoursToMinutes(time_to[index]),
    };
  });

  try {
    const db = await database;
    await createProffy(db, { proffyValue, classValue, classScheduleValues });

    let queryString = '?subject=' + subject;
    queryString += '&weekday=' + weekday[0]
    queryString += '&time=' + time_from[0]
    
    return res.redirect('/study' + queryString);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
};
