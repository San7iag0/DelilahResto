const http = require("http");
const app = require("./app");


const server = http.createServer(app);


server.listen(3000, () => {
    // check2
    console.log('Server running on port 3000');
})

