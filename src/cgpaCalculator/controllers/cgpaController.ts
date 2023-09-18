import { GRADE_POINTS, SEMESTERS_RESULT } from "../constants/cgpa";

function calculateGPA(subjects: any[]): string {
  if (!Array.isArray(subjects)) {
    throw new Error("Subjects should be an array.");
  }

  const gradePoints: { [key: string]: number } = GRADE_POINTS;

  const totalGradePoints = subjects.reduce((total: any, subject: any) => {
    if (!subject.hasOwnProperty('grade') || !subject.hasOwnProperty('creditHour')) {
      throw new Error("Each subject should have 'grade' and 'creditHour' properties.");
    }

    const { grade, creditHour } = subject;
    const numericCreditHour = parseFloat(creditHour);

    if (!gradePoints.hasOwnProperty(grade)) {
      throw new Error(`Invalid grade: ${grade}`);
    }

    if (isNaN(numericCreditHour) || numericCreditHour <= 0) {
      throw new Error(`Invalid credit hours for subject: ${subject.name}`);
    }

    return total + gradePoints[grade] * numericCreditHour;
  }, 0);

  const totalCreditHours = subjects.reduce((total, subject) => {
    const numericCreditHour = parseFloat(subject.creditHour);
    return total + (isNaN(numericCreditHour) ? 0 : numericCreditHour);
  }, 0);

  return (totalGradePoints / totalCreditHours).toFixed(5);
}

function calculateCGPA(semesters: any) {
  if (!Array.isArray(semesters)) {
    throw new Error("Semesters should be an array.");
  }

  let totalCGPAPoints = 0;
  let totalCreditHours = 0;

  var cgpa: any = 0;

  for (const semester of semesters) {
    const semesterGPA: any = calculateGPA(semester.subjects);
    const semesterCreditHours = semester.subjects.reduce((total: any, subject: any) => {
      const numericCreditHour = parseFloat(subject.creditHour);
      return total + (isNaN(numericCreditHour) ? 0 : numericCreditHour);
    }, 0);

    totalCGPAPoints += semesterGPA * semesterCreditHours;
    totalCreditHours += semesterCreditHours;

    console.log(`GPA for Semester: ${parseFloat(semesterGPA).toFixed(5)}`);

    cgpa = (totalCGPAPoints / totalCreditHours).toFixed(5);
    console.log(`CGPA: ${cgpa}`);
  }

  
  return cgpa;
}

// usage
calculateCGPA(SEMESTERS_RESULT);