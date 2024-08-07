const inquirer = require("inquirer");
const consola = require("consola");

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit",
}

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info",
}

type InquirerAnswers = {
  action: Action;
};

class Message {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  public show() {
    console.log(this.content);
  }

  public capitalize() {
    this.content = this.content[0].toUpperCase() + this.content.slice(1);
  }

  public toUpperCase() {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase() {
    this.content = this.content.toLowerCase();
  }

  static showColorized(messageVariant: MessageVariant, inputText: string) {
    switch (messageVariant) {
      case "success":
        consola.success(inputText);
        break;
      case "error":
        consola.error(inputText);
        break;
      case "info":
        consola.info(inputText);
        break;
    }
  }
}

interface User {
  name: string;
  age: number;
}

class UsersData {
  data: User[];

  constructor() {
    this.data = [];
  }

  public showAll() {
    Message.showColorized(MessageVariant.Info, "Users data");
    if (this.data.length) {
      console.table(this.data);
    } else {
      console.log("No data...");
    }
  }

  public add(newUser: User) {
    if (newUser.age > 0 && newUser.name.length) {
      this.data.push(newUser);

      Message.showColorized(
        MessageVariant.Success,
        "User has been successfully added!"
      );
    } else {
      Message.showColorized(MessageVariant.Error, "Wrong data!");
    }
  }

  public remove(inputName: string) {
    const foundUser = this.data.find((user) => user.name === inputName);
    if (foundUser) {
      this.data = this.data.filter((user) => user.name !== inputName);
      Message.showColorized(MessageVariant.Success, "User deleted!");
    } else {
      Message.showColorized(MessageVariant.Error, "User not found!");
    }
  }
}

const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
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
