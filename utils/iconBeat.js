const beatHandler = (event, type) => {
    if (event.target.localName === "button") {
      if (type === "in") {
        event.target.lastChild.classList = "fa-solid fa-cart-shopping";
        event.target.lastChild.classList += " fa-beat";
      } else {
        event.target.lastChild.classList = "fa-solid fa-cart-shopping";
      }
    }else{
       if (type === "in") {
        event.target.classList = "fa-solid fa-cart-shopping";
        event.target.classList += " fa-beat";
      } else {
        event.target.classList = "fa-solid fa-cart-shopping";
      }
    }
    };
window.beatHandler = beatHandler;
  export {beatHandler}