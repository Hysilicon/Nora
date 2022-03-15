const path = require('path');
const http = require('http');
const app = require('./index');
const express = require('express');
const server = http.createServer(app);



server.listen(8000, ()=>console.log(`Server running on port 8000`));
