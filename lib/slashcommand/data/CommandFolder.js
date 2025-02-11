const CommandDataOption = require('../data/CommandDataOption');
class CommandFolder {
  constructor(data, guild) {
    this.commandName = '';

    this.options = [];
    this.interface = new Map();
    this.commandNameArray = [];
    if (data?.name !== undefined) {
      if (!this.commandNameArray.includes(data?.name)) {
        this.commandNameArray.push(data.name);
      }
    }
    if (data?.version !== undefined) {
      this.version = data?.version;
    }
    if (data?.target_id !== undefined) {
      this.targetID = data?.target_id;
    }
    if (data?.options !== undefined) {
      for (const option of data.options) {
        this.options.push(new CommandDataOption(this, option, guild));
      }
    } else {
      this.updateName();
    }
  }
  addMap(name, value) {
    return this.interface.set(name, value);
  }
  updateName() {
    this.commandName = this.commandNameArray.join(' ');
  }
}

module.exports = CommandFolder;
