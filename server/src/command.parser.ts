export class CommandArgvParser {
  private commands: Array<{
    key: string;
    requireValue: boolean;
  }>;
  private simplifideCommands: {
    v: string;
    h: string;
    p: string;
    s: string;
  };
  private commandArgValueMap: Array<{
    name: string;
    value?: string | boolean;
  }>;
  private projectVersion: string;
  private projectName: string;

  constructor() {
    this.commands = [
      { key: 'port', requireValue: true },
      { key: 'https', requireValue: false },
      { key: 'dev', requireValue: false },
      { key: 'prod', requireValue: false },
      { key: 'help', requireValue: false },
      { key: 'version', requireValue: false },
    ];
    this.simplifideCommands = {
      h: 'help',
      v: 'version',
      p: 'port',
      s: 'https',
    };
    this.commandArgValueMap = [];
    const { version, name } = require('../package.json');
    this.projectVersion = version;
    this.projectName = name;

    const error = this.commandArgs();
    if (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      this.commandHelp();
      process.exit();
    } else if (this.hasCommand('help')) {
      this.commandHelp();
      process.exit();
    } else if (this.hasCommand('version')) {
      this.versionInfo();
      process.exit();
    }
  }

  hasCommand(name) {
    for (const arg of this.commandArgValueMap) {
      const formatName = arg.name.replace(/--?/, '');
      if (formatName === name || this.simplifideCommands[formatName] === name) {
        return true;
      }
    }
    return false;
  }

  parseCommandArgs() {
    const commandArgs = process.argv.slice(2);
    for (let i = 0; i < commandArgs.length; i++) {
      if (commandArgs[i].indexOf('-') > 0) {
        return 'Unknown command: ' + commandArgs[i];
      }
      if (commandArgs[i].indexOf('--') > 0) {
        return 'Unknown command: ' + commandArgs[i];
      } else if (
        commandArgs[i].indexOf('--') < 0 &&
        commandArgs[i].indexOf('-') < 0
      ) {
        if (
          !commandArgs[i - 1] ||
          commandArgs[i - 1].indexOf('--') !== 0 ||
          commandArgs[i - 1].indexOf('-') !== 0
        ) {
          return 'Unknown value: ' + commandArgs[i];
        }

        const hasArgValue = this.commandArgValueMap.find(
          argValue => argValue.name === commandArgs[i - 1],
        );
        if (hasArgValue) {
          hasArgValue.value = commandArgs[i];
        } else {
          this.commandArgValueMap.push({
            name: commandArgs[i - 1],
            value: commandArgs[i],
          });
        }
      } else if (commandArgs[i].indexOf('-') === 0) {
        this.commandArgValueMap.push({
          name: commandArgs[i],
        });
      }
    }
    return;
  }

  commandArgs() {
    const error = this.parseCommandArgs();
    if (error) {
      return error;
    }

    for (const argValue of this.commandArgValueMap) {
      let arg = this.commands.find(
        argType => argValue.name === `--${argType.key}`,
      );
      if (!arg) {
        arg = this.simplifideCommands[argValue.name.replace(/^-/, '')];
      }
      if (!arg) {
        return 'Unknown command: ' + argValue.name;
      }
      if (arg.requireValue && typeof argValue.value === 'undefined') {
        return 'Missing value of: ' + argValue.name;
      }
    }
    return;
  }

  commandHelp() {
    // tslint:disable-next-line:no-console
    console.log('Command line: node [option] <value>');
    // tslint:disable-next-line:no-console
    console.log(
      '--https [-s]\t\tto enable server to launch with ssl certificate. certificate file is saved in .\\certificate',
    );
    // tslint:disable-next-line:no-console
    console.log(
      '--port [-p] <number>\tto customise port, default port is 3000 in dev mode',
    );
    // tslint:disable-next-line:no-console
    console.log(
      '--dev\t\t\tto launch sever in dev mode, port will be 3000 in default',
    );
    // tslint:disable-next-line:no-console
    console.log(
      '--prod\t\t\tto launch server in prod mode, port will be 80 in default, 443 with https server',
    );
    // tslint:disable-next-line:no-console
    console.log('--help [-h]\t\tto get command help');
    // tslint:disable-next-line:no-console
    console.log('--version [-v]\t\tto get project version');
  }

  get(name): string | boolean {
    const findArg = this.commandArgValueMap.find(
      arg => arg.name === `--${name}`,
    );
    if (!findArg) {
      return null;
    }
    return findArg.value || true;
  }

  versionInfo() {
    // tslint:disable-next-line:no-console
    console.log(this.projectName + ' v' + this.projectVersion);
  }
}
