const validateUsername = (username) => {
  const regex = /^[a-zA-z\d_]{4,16}$/;
  const result = regex.test(username);
  return result;
};
const validatePassword = (password) => {
  const regex = /^.{4,20}$/;
  const result = regex.test(password);
  return result;
};

const validateForm = (username, password) => {
  const usernameResult = validateUsername(username);
  const passwordResult = validatePassword(password);
  if (usernameResult && passwordResult) {
    return true;
  } else if (!usernameResult) {
    alert("username is not valid!");
  } else if (!passwordResult) {
    alert("password is not valid!");
  }
};

export { validateForm };
