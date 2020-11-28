var readline = require('readline'),
socket = require('socket.io-client')('https://dev-talk.glitch.me'),
chalk = require('chalk'),
rl = readline.createInterface(process.stdin, process.stdout);