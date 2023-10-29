const BASE_URL = "https://fakestoreapi.com";

const postData = async (path, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    alert("an error occured!");
  }
};

const getProducts = async (path) => {
  try {
    const data = await fetch(`http://fakestoreapi.com/${path}`);
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
export { postData, getProducts };
