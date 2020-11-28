#!/usr/bin/env node

var readline = require('readline'),
socket = require('socket.io-client')('https://dev-talk.glitch.me'),//server
chalk = require('chalk'),
rl = readline.createInterface(process.stdin, process.stdout),
username = process.argv[2],
pck = require('./package.json'),  
channel = process.argv[3];
if(username== '-v' ||username == '--version'){
    console.log( `${pck.version}`)
  process.exit(1);
}
else if (username =='-h'|| username == '--help') { // checking undifined args
    console.log(`
    Usage: ${pck.name} username Channel 
`);
process.exit(0)
}

else if (username =='-i'|| username == '--issue') { // checking undifined args
  console.log(`
  Issues at ${pck.bugs.url} 
`);
process.exit(0)
}

else if (username =='-a'|| username == '--author') { // checking undifined args
  console.log(`
  Author: ${pck.author} 
`);
process.exit(0)
}

else if (username =='-d'|| username == '--docs') { // checking undifined args
  console.log(`
  Docs at ${pck.homepage} 
`);
process.exit(0)
}
if(channel == undefined || username == undefined){
console.log(chalk.red('Error : Enter username And Channel Correctly; Type dev-talk -h for help'));
process.exit(0)
}
socket.on('connect', () => {
    console.log(`username: ${chalk.green(username)} , Channel: ${chalk.red(channel)}`);
    console.log(chalk.red('=== start chatting ==='))
    socket.emit('join', { username: username, channel: channel });
    prompt()
})
socket.on('message', ({ user, msg, channel }) => function(user, msg, channel = this.channel) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    switch (user) {
      case 'Info':
        console.log(`(${chalk.yellow(user)}): ${chalk.yellow(msg)} (${chalk.yellow('channel')}: ${chalk.red(channel)})`);
   break;
      default:
        console.log(`${chalk.green(user)}: ${chalk.green(msg)}`);
    }
rl.prompt(true);
}(user, msg, channel));

function prompt() {
    rl.question(`${chalk.cyan(username)}: `, (input) => {
        socket.emit('message', { user: username, msg: input });
        prompt()
        rl.prompt(true);
      })
}
