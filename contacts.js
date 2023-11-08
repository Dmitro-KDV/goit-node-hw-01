const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "db", "contacts.json")

async function listContacts() {
     // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contact = await listContacts();
    const result = contact.find(i => i.id === contactId);
    return result || null;
  }
  
  async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contact = await listContacts();
    const index = contact.findIndex(i => i.id === contactId);
    if (index === -1) {
      return null
    }
    const [result] = contact.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return result;
  }
  
  async function addContact(dani) {
    // ...твій код. Повертає об'єкт доданого контакту. 
    const contact = await listContacts();
    const contactNew = {
      // id: (+new Date).toString(16),
      id: nanoid(),
      ...dani,
    }
    contact.unshift(contactNew);
    await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
    return contactNew;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }