import { readFileSync } from 'fs';
import { db, studentGrades, students as studentsTable } from './database/schema.js';
import { sql } from 'drizzle-orm';
const data = readFileSync('studentgroupteacher.json', 'utf8');
const students = JSON.parse(data).students;

let grades = [];
let group = 'TA-21E';
async function insertStudentGrades() {
  for (let i = 0; i < students.length; i++) {
    let s = students[i];

    s.resultColumns?.forEach(rc => {
      rc.journalResult?.results.forEach(result => {
        if (grades[s.fullname] === undefined)
          grades[s.fullname] = [];

        let grade;
        switch (result.grade.code) {
          case 'KUTSEHINDAMINE_5':
            grade = '5';
            break;
          case 'KUTSEHINDAMINE_4':
            grade = '4';
            break;
          case 'KUTSEHINDAMINE_3':
            grade = '3';
            break;
          case 'KUTSEHINDAMINE_2':
            grade = '2';
            break;
          case 'KUTSEHINDAMINE_X':
            grade = 'X';
            break;
          default:
            grade = '';
        }

        let subject = {
          tahvel_id: s.id,
          name: s.fullname,
          lesson: result.journal.nameEt,
          grade: grade,
          teacher: result.gradeInsertedBy
        };
        grades[s.fullname].push(subject);
      });
    });
  }

  for (let name in grades) {
    grades[name] = grades[name].flat();
  }

  for (let i = 0; i < students.length; i++) {
    let s = students[i];
    await db.insert(studentsTable).values({
      id: s.id,
      name: s.fullname,
      group: group
    }).onDuplicateKeyUpdate({ set: { id: sql`id` } });

    await db.delete(studentGrades).where(sql`student_id = ${s.id}`);
    //for (let student in grades) {
      let student = s.fullname;
      for (let i = 0; i < grades[student].length; i++)
      await db.insert(studentGrades).values({
        student_id: s.id,
        lesson: grades[student][i].lesson ?? "",
        grade: grades[student][i].grade ?? "",
        teacher: grades[student][i].teacher ?? ""
      })
    //};
  }
}
insertStudentGrades();