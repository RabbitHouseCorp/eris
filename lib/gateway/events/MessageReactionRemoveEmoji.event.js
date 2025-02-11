const EventCursor = require('../../util/EventCursor');
class MessageReactionRemoveEmoji extends EventCursor {
  constructor(data, client, shardController) {
    super('MESSAGE_REACTION_REMOVE_EMOJI', data, data, client, shardController);
  }

  onEvent(packet) {
    const channel = this.client.getChannel(packet.d.channel_id);
    let message;
    if (channel) {
      message = channel.messages.get(packet.d.message_id);
      if (message) {
        const reaction = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        delete message.reactions[reaction];
      }
    }
    if (!message) {
      message = {
        id: packet.d.message_id,
        channel: channel || { id: packet.d.channel_id }
      };
      if (packet.d.guild_id) {
        message.guildID = packet.d.guild_id;
        if (!message.channel.guild) {
          message.channel.guild = { id: packet.d.guild_id };
        }
      }
    }
    /**
     * Fired when someone removes all reactions from a message for a single emoji
     * @event Client#messageReactionRemoveEmoji
     * @prop {Message | Object} message The message object. If the message is not cached, this will be an object with `id` and `channel` keys. If the channel is not cached, channel key will be an object with only an id. No other property is guaranteed
     * @prop {Object} emoji The reaction emoji object
     * @prop {Boolean?} emoji.animated Whether the emoji is animated or not
     * @prop {String?} emoji.id The ID of the emoji (null for non-custom emojis)
     * @prop {String} emoji.name The emoji name
     */
    this.shardController.emit('messageReactionRemoveEmoji', message, packet.d.emoji);
    return;
  }
}

module.exports = MessageReactionRemoveEmoji;
