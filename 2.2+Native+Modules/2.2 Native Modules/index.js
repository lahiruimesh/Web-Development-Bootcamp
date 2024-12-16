//console.log("Hello world!");

const fs = require("fs");

fs.writeFile("msg.txt", "Hello world!", (err) => {
    if(err) throw err;
    console.log("The file was saved!");
});

// Reading the file

fs.readFile("msg.txt", "utf8", (err, data) => {
    if(err) throw err;
    console.log("The file content is:", data);
});