// declared needed packages
const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// const inquirer = require('inquirer');
// const fs = require('fs');
// const path = require('path');
// const open = require('open');

// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab

// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

// const name = "";
// const employeeId = "";
// const email = "";
// const officeNumber = "";
// const github = "";

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the managers name",
  },
  {
    type: "input",
    name: "id",
    message: "What is the managers id",
  },
  {
    type: "input",
    name: "email",
    message: "What is the managers email",
  },
  {
    type: "input",
    name: "office",
    message: "What is the managers office number",
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "What is the engineers name",
  },
  {
    type: "input",
    name: "id",
    message: "What is the engineers id",
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineers email",
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineers office number",
  },
];
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the interns name",
  },
  {
    type: "input",
    name: "id",
    message: "What is the interns id",
  },
  {
    type: "input",
    name: "email",
    message: "What is the interns email",
  },
  {
    type: "input",
    name: "school",
    message: "What is the interns office number",
  },
];
let manager;
let intern;
let engineer;

// function promptEngineer() {
//   inquirer.prompt(managerQuestions).then((anything) => {
//     console.log(anything);
//     const manager = new Manager(
//       anything.name,
//       anything.id,
//       anything.email,
//       anything.office
//     );
//     console.log(manager);
//     fs.writeFileSync("fun.html", htmlData());
//   });
// }
// function promptManager() {
//   inquirer.prompt(managerQuestions).then((anything) => {
//     console.log(anything);
//     manager = new Manager(
//       anything.name,
//       anything.id,
//       anything.email,
//       anything.office
//     );
//     console.log(manager);
//     fs.writeFileSync("team.html", htmlData());
//   });
// }
// function promptManager() {
//   inquirer.prompt(engineerQuestions, internQuestions).then((anything) => {
//     console.log(anything);

//     engineer = new Engineer(
//       anything.name,
//       anything.id,
//       anything.email,
//       anything.github
//     );
//     console.log(engineer);
//     fs.writeFileSync("team.html", htmlData());
//   });
// }

///QUESTION: SHOULD I KEEP IT LIKE THIS??
// function promptIntern() {
//   inquirer
//     .prompt([...managerQuestions, ...engineerQuestions, ...internQuestions])
//     .then((answers) => {
//       // create manager object with answers from prompt
//       manager = new Manager(
//         answers.name,
//         answers.id,
//         answers.email,
//         answers.office
//       );
//       // create engineer object with answers from prompt
//       engineer = new Engineer(
//         answers.name,
//         answers.id,
//         answers.email,
//         answers.github
//       );
//       // create intern object with answers from prompt
//       intern = new Intern(
//         answers.name,
//         answers.id,
//         answers.email,
//         answers.school
//       );

//       console.log(manager, intern, engineer);
//       fs.writeFileSync("team.html", htmlData());
//     });
function promptIntern() {
  inquirer.prompt(internQuestions).then((answers) => {
    // create intern object with answers from prompt
    intern = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );

    console.log(intern);

    fs.writeFileSync("team.html", htmlData());
    menu();
  });
}
function promptEngineer() {
  inquirer.prompt(engineerQuestions).then((answers) => {
    // create engineer object with answers from prompt
    engineer = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );

    console.log(engineer);

    fs.writeFileSync("team.html", htmlData());

    menu();
  });
}
async function promptManager() {
  try {
    const answers = await inquirer.prompt(managerQuestions);

    // create manager object with answers from prompt
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.office
    );

    console.log(manager);

    fs.writeFileSync("team.html", htmlData());
    menu();
  } catch (error) {
    console.error(error);
  }
}

async function promptManager() {
  try {
    let answers = await inquirer.prompt(managerQuestions);

    // create manager object with answers from prompt
    let manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.office
    );

    console.log(manager);

    fs.writeFileSync("team.html", htmlData());
    menu();
  } catch (error) {
    console.error(error);
  }
}

// function promptManager() {
//   inquirer
//     .prompt([...managerQuestions, ...engineerQuestions, ...internQuestions])
//     .then((answers) => {
//       // create manager object with answers from prompt
//       manager = new Manager(
//         answers.name,
//         answers.id,
//         answers.email,
//         answers.office
//       );
//       // create engineer object with answers from prompt
//       engineer = new Engineer(
//         answers.name,
//         answers.id,
//         answers.email,
//         answers.github
//       );
//       // create intern object with answers from prompt
//       intern = new Intern(
//         answers.name,
//         answers.id,
//         answers.email,
//         answers.school
//       );

//       console.log(manager, intern, engineer);
//       fs.writeFileSync("team.html", htmlData());
//     });
// }

//fs.writeFile(filename, data, err cb function)

async function menu() {
  const answer = await inquirer.prompt({
    type: "list",
    message: "What do you want to do?",
    name: "options",
    choices: [
      "Add an engineer",
      "Add a team manager",
      "Add an intern",
      "View team",
      "Exit",
    ],
  });

  if (answer.options === "Add an engineer") {
    promptEngineer();
  } else if (answer.options === "Add a team manager") {
    promptManager();
  } else if (answer.options === "Add an intern") {
    promptIntern();
  } else if (answer.options === "View team") {
    viewTeam();
  } else if (answer.options === "Exit") {
    exit();
  }
}

menu(); // First executed function

function htmlData() {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <title>Your Team Profile!</title>
</head>


<body>
<h1>MY TEAM</h1>
<div class="container">
  <div class="row">
    <div class="col">
      <h2>MANAGER</h2>
      ${manager.id}
      ${manager.name}
      ${manager.office}
      ${manager.email}
      
    </div>
    <div class="col">
    <h2>ENGINEER</h2>
    ${engineer.id}
    ${engineer.name}
    ${engineer.github}
    ${engineer.email}
    </div>
  </div>
  <div class="row">
    <div class="col">
    <h2>INTERN</h2>
    ${intern.id}
    ${intern.name}
    ${intern.school}
    ${intern.email}
    </div>
    <div class="col">
    
    </div>
  </div>
</div>
  <h1>HEY!!!!!</h1>
</body>
</html>
  `;
}
