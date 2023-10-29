import { authHandler } from "./utils/authorization.js";
import { setCookie, getCookie } from "./utils/cookie.js";
import { postData } from "./utils/httpReq.js";
import { validateForm } from "./utils/validation.js";
const inputs = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();
  const username = inputs[1].value;
  const password = inputs[2].value;
  if (validateForm(username, password) === true) {
    const response = await postData("auth/login", { username, password });
    setCookie(response.token);
    location.assign("index.html");
    console.log(response);
  }
};

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authHandler);
