const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "../db/contacts.json");

const listContacts = async () => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contactList = JSON.parse(dataJson);
    console.table(contactList);
    return contactList;
  } catch (err) {
    console.error("Błąd odczytu listy ", err);
  }
};

const getContactById = async (contactId) => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(dataJson);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.table(contact);
      return contact;
    } else {
      console.log(`Kontakt id:${contactId} nie został znaleziony.`);
      return null;
    }
  } catch (err) {
    console.error("Błąd odnalezienia kontaktu ", err);
  }
};

const removeContact = async (contactId) => {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(dataJson);
    fs.unlink(
      contactsPath,
      contacts.filter((contact) => contact.id !== contactId)
    );
  } catch (err) {
    console.error("Błąd usuwania kontaktu ", err);
  }
};

const addContact = (name, email, phone) => {
  try {
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    fs.appendFile(contactsPath, newContact);
  } catch (err) {
    console.error("Błąd dodawania kontaktu ", err);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
