import { UsersData, Message } from "./global/classes";
import { Action, MessageVariant } from "./global/enums";
import { InquirerAnswers, User } from "./global/types";
const inquirer = require("inquirer");

const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("edit – edit existing user in the list");
console.log("quit – quit the app");
console.log("\n");

const startApp = () => {
  inquirer
    .prompt([
      {
        name: "action",
        type: "input",
        message: "How can I help you?",
      },
    ])
    .then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const newUser: User = await inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "Enter name",
            },
            {
              name: "age",
              type: "number",
              message: "Enter age",
            },
          ]);
          users.add(newUser);
          break;
        case Action.Remove:
          const userToRemove: { name: string } = await inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "Enter name",
            },
          ]);
          users.remove(userToRemove.name);
          break;
        case Action.Edit:
          const userToEdit: User & { newName: string } = await inquirer.prompt([
            {
              name: "name",
              type: "input",
              message: "Enter name of user to edit",
            },
            {
              name: "newName",
              type: "input",
              message: "Enter new name",
            },
            {
              name: "age",
              type: "number",
              message: "Enter new age",
            },
          ]);
          users.edit(userToEdit);
          break;
        case Action.Quit:
          Message.showColorized(MessageVariant.Info, "Bye bye!");
          return;
        default:
          console.log("Command not found");
      }
      startApp();
    });
};

startApp();
