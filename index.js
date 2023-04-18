// declared needed packages
const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const express = require("express");

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
    name: "name",
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
    message: "What is the engineers github profile",
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
    message: "What is the interns school name",
  },
];
let manager = [];
let intern = [];
let engineer = [];

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
function promptManager() {
  inquirer.prompt(managerQuestions).then((answers) => {
    // create engineer object with answers from prompt
    manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.office
    );

    console.log(manager);

    fs.writeFileSync("team.html", htmlData());

    menu();
  });
}

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

  function exit() {
    console.log("Goodbye.");
    process.exit();
  }

  function viewTeam() {
    // I WANT THIS TO OPEN UP THE TEAM.HTML IN THE BROWSER
    //FOR NOW, I'LL JUST CONSOLE LOG IT LOL
    console.log(engineer.name, manager, intern);
    //CONSOLE LOG NOT WORKING HMS
  }

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
  let html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Roster</title>
  </head>
  <body>
    <h1>Team Roster</h1>
    <ul>
      <li>
        Manager: ${manager.name}
        <ul>
          <li>ID: ${manager.id}</li>
          <li>Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
          <li>Office Number: ${manager.office}</li>
        </ul>
      </li>`;

  if (engineer) {
    html += `
      <li>
        Engineer: ${engineer.name}
        <ul>
          <li>ID: ${engineer.id}</li>
          <li>Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
          <li>GitHub: <a href="https://github.com/${engineer.github}" target="_blank">${engineer.github}</a></li>
        </ul>
      </li>`;
  }

  if (intern) {
    html += `
      <li>
        Intern: ${intern.name}
        <ul>
          <li>ID: ${intern.id}</li>
          <li>Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
          <li>School: ${intern.school}</li>
        </ul>
      </li>`;
  }

  html += `
    </ul>
  </body>
  </html>`;

  return html;
}
