const bcrypt = require('bcrypt');

const verifyPassword = async () => {
const myPassword = 'admin qwew vshfsdn 323..'; //

const hash = '$2b$10$D5xQASFhP1SCI/LNOaFu/eUOGjSeMDvK4XyRozz5VcSKx35wSdF.G';

const isMatch = await bcrypt.compare(myPassword, hash);


console.log(isMatch);
}

verifyPassword();
