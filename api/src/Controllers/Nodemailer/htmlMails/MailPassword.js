const passwordRecoveryCode = (code) => {
  return `${code}`;
};
const wrongMail = (email) => {
  return `${email}`;
};
const passwordHasChange = (email, password) => {
  return `${email} ${password}`;
};
module.exports = { passwordRecoveryCode, wrongMail, passwordHasChange };
