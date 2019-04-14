const awesomeFolks = document.querySelectorAll(".awesome-folk");
awesomeFolks.forEach(element => {
  element.style["grid-column"] = `span ${Math.max(
    2,
    Math.ceil(Math.random() * Math.sqrt(60 / awesomeFolks.length))
  )}`;
  element.style["grid-row"] = `span ${Math.ceil(
    Math.random() * Math.sqrt(60 / awesomeFolks.length)
  )}`;
});
