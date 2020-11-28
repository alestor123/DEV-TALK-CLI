var readline = require('readline'),
socket = require('socket.io-client')('https://dev-talk.glitch.me'),//server
chalk = require('chalk'),
rl = readline.createInterface(process.stdin, process.stdout),
username = process.argv[2],
channel = process.argv[3];
socket.on('connect', () => {
    console.log(`Username: ${chalk.green(username)} , Channel: ${chalk.red(channel)}`);
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
