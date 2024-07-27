const bcrypt = require('bcrypt');

const hashPassword = async () => {

const myPassword = 'admin qwew vshfsdn 323..';

const hash = await bcrypt.hash(myPassword, 10);
console.log(hash);
}

hashPassword();
