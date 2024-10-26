import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join(__dirname, "../db/contacts.json");
// console.log(contactsPath);

export const listContacts = () => {
  fs.readFile(contactsPath);
};

export const getContactById = (contactId) => {};

export const removeContact = (contactId) => {
  fs.unlink(contactsPath, () => {});
};

export const addContact = (name, email, phone) => {
  const id = uuidv4();
  const newContact = { id, name, email, phone };
  fs.appendFile(contactsPath, newContact);
};
