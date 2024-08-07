import { MessageVariant } from "./enums";
import { User } from "./types";
const consola = require("consola");

export class Message {
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

export class UsersData {
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

  public edit({ name, age, newName }: User & { newName: string }) {
    const foundUser = this.data.find((user) => user.name === name);
    if (foundUser) {
      this.data = this.data.map((user) => {
        if (user.name === name) {
          return { ...user, name: newName, age };
        } else {
          return user;
        }
      });
      Message.showColorized(MessageVariant.Success, "User editted!");
    } else {
      Message.showColorized(
        MessageVariant.Error,
        `User with name '${name}' not found!`
      );
    }
  }
}
