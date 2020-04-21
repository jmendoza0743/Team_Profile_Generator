const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Intern = require('./lib/intern');
const Engineer = require('./lib/engineer');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const outputDirectory = path.resolve(__dirname, 'Output');
const outputPath = path.join(outputDirectory, 'team.html');
const renderHTML= require('./lib/htmlrender')

let teamArray =[];

function startApp(){
    createManager();
}

startApp();

function createManager(){
    inquirer.prompt([
        {
            type:"input",
            name: "managerName",
            message: "What is your manager's name?"
         },
         {
            type:"input",
            name: "managerId",
            message: "What is your manager's ID?"
         },
         {
            type:"input",
            name: "managerEmail",
            message: "What is your manager's Email?"
         },
         {
            type:"input",
            name: "managerOfficeNumber",
            message: "What is your manager's Office Number?"
         }

    ]).then(function(answers){
        // console.log(answers)
        let manager = new  Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamArray.push(manager);
        createTeam()
    });
}

function createEngineer(){   
     inquirer.prompt([
    {
        type:"input",
        name: "engineerName",
        message: "What is your engineer's name?"
     },
     {
        type:"input",
        name: "engineerId",
        message: "What is your engineers's ID?"
     },
     {
        type:"input",
        name: "engineerEmail",
        message: "What is your engineer's Email?"
     },
     {
        type:"input",
        name: "engineerGithub",
        message: "What is your engineers Github?"
     }

]).then(function(answers){
    // console.log(answers)
    let engineer = new  Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    teamArray.push(engineer);
    createTeam()
});

}
function createIntern(){
    inquirer.prompt([
        {
            type:"input",
            name: "internName",
            message: "What is your interns's name?"
         },
         {
            type:"input",
            name: "internId",
            message: "What is your interns's ID?"
         },
         {
            type:"input",
            name: "internEmail",
            message: "What is your interns's Email?"
         },
         {
            type:"input",
            name: "internSchool",
            message: "What is your intern's school?"
         }
    
    ]).then(function(answers){
        // console.log(answers)
        let intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamArray.push(intern);
        createTeam()
    });

}
function createTeam(){
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
              "Engineer",
              "Intern",
              "I don't want to add any more team members"
            ]
          }


    ]).then(function(answers){
        // console.log(answers)
        if (answers.memberChoice === 'Engineer'){
            createEngineer();
        }else if(answers.memberChoice === 'Intern'){
            createIntern();
        }else {
            buildTeamOutput(teamArray);
        } 

    });
}
function buildTeamOutput(data){
    var htmltextelements= renderHTML(data)
    fs.writeFileSync(outputPath, htmltextelements)

}
