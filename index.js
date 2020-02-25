const server = require('./server.js');

const port = 5000;
 
server.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
