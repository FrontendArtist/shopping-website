import { getCookie } from "./cookie.js";

const authHandler = () => {
  const cookie = getCookie();
  const url = location.href;
  if (cookie && url.includes("auth")) {
    location.assign("index.html");
  } else if (!cookie && url.includes("dashboard")) {
    location.assign("auth.html");
  }
};

export { authHandler };
