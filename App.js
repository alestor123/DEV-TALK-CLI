var readline = require('readline'),
socket = require('socket.io-client')('https://dev-talk.glitch.me'),//server
chalk = require('chalk'),
rl = readline.createInterface(process.stdin, process.stdout),
username = process.argv[2],
channel = process.argv[3];
socket.emit('join', { username: username, channel: channel });
function prompt() {
    rl.question(`${chalk.cyan(username)}: `, (input) => {
        socket.emit('message', { user: username, msg: input });
        prompt()
        rl.prompt(true);
      })
}
