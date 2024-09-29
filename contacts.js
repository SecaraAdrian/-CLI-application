const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const contact = contacts.find(c => c.id === String(contactId));
  console.log(contact);
}


async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const newContact = { id: String(contacts.length + 1), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log('Contact added:', newContact);
}


async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  let contacts = JSON.parse(data);
  contacts = contacts.filter(c => c.id !== String(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact with ID ${contactId} removed.`);
}

module.exports = { listContacts, getContactById, addContact, removeContact };
