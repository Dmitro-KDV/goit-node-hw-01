const contacts = require("./contacts")
// const argv = require('yargs').argv;
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action, id, name, email, phone}) => {
    switch(action) {
        case 'list' :
            const allContacts = await contacts.listContacts();
            return console.log(allContacts);
        case 'get':
            const getContactId = await contacts.getContactById(id);
            return console.log(getContactId);
        case 'remove':
            const removeContactId = await contacts.removeContact(id);
            return console.log(removeContactId);
        case 'add':
            const addContact = await contacts.addContact({name, email, phone});
            return console.log(addContact);
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

// invokeAction({action: 'list'})
// invokeAction({action: 'getById', id:'05olLMgyVQdWRwgKfg5J6'})
// invokeAction({action: 'remove', id:'zJAxeCdJDNRZ0fQJKEgTT'})
// invokeAction({action: 'add', name: 'Dmytro Kushnarek', email: '3627722@gmail.com', phone: '38-098-607-62-73'})

invokeAction(argv);
