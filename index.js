'use strict';

const Client = require('./lib/Client');

function Eris(token, options) {
  return new Client(token, options);
}

Eris.Base = require('./lib/structures/Base');
Eris.Bucket = require('./lib/util/Bucket');
Eris.Call = require('./lib/structures/Call');
Eris.CategoryChannel = require('./lib/structures/CategoryChannel');
Eris.Channel = require('./lib/structures/Channel');
Eris.Client = Client;
Eris.Collection = require('./lib/util/Collection');
Eris.Command = require('./lib/command/Command');
Eris.CommandClient = require('./lib/command/CommandClient');
Eris.Constants = require('./lib/Constants');
Eris.DiscordHTTPError = require('./lib/errors/DiscordHTTPError');
Eris.DiscordRESTError = require('./lib/errors/DiscordRESTError');
Eris.ExtendedUser = require('./lib/structures/ExtendedUser');
Eris.GroupChannel = require('./lib/structures/GroupChannel');
Eris.Guild = require('./lib/structures/Guild');
Eris.GuildChannel = require('./lib/structures/GuildChannel');
Eris.GuildIntegration = require('./lib/structures/GuildIntegration');
Eris.GuildPreview = require('./lib/structures/GuildPreview');
Eris.GuildTemplate = require('./lib/structures/GuildTemplate');
Eris.StickerItem = require('./lib/structures/StickerItem');
Eris.Invite = require('./lib/structures/Invite');
Eris.Member = require('./lib/structures/Member');
Eris.Message = require('./lib/structures/Message');
Eris.NewsChannel = require('./lib/structures/NewsChannel');
Eris.Permission = require('./lib/structures/Permission');
Eris.PermissionOverwrite = require('./lib/structures/PermissionOverwrite');
Eris.PrivateChannel = require('./lib/structures/PrivateChannel');
Eris.Relationship = require('./lib/structures/Relationship');
Eris.RequestHandler = require('./lib/rest/RequestHandler');
Eris.Role = require('./lib/structures/Role');
Eris.SequentialBucket = require('./lib/util/SequentialBucket');
Eris.Shard = require('./lib/gateway/Shard');
Eris.SharedStream = require('./lib/voice/SharedStream');
Eris.StickerItem = require('./lib/structures/StickerItem');
Eris.StickerPack = require('./lib/structures/StickerPack');
Eris.StoreChannel = require('./lib/structures/StoreChannel');
Eris.TextChannel = require('./lib/structures/TextChannel');
Eris.ThreadChannel = require('./lib/structures/ThreadChannel');
Eris.UnavailableGuild = require('./lib/structures/UnavailableGuild');
Eris.User = require('./lib/structures/User');
Eris.VERSION = require('./package.json').version;
Eris.VoiceChannel = require('./lib/structures/VoiceChannel');
Eris.VoiceConnection = require('./lib/voice/VoiceConnection');
Eris.VoiceConnectionManager = require('./lib/voice/VoiceConnectionManager');
Eris.VoiceState = require('./lib/structures/VoiceState');
Eris.CommandBase = require('./lib/slashcommand/CommandBase');
Eris.CommandList = require('./lib/slashcommand/CommandList');
Eris.SlashCommand = require('./lib/slashcommand/SlashCommand');
Eris.SlashCommandGuild = require('./lib/slashcommand/SlashCommandGuild');
Eris.CommandBase = require('./lib/slashcommand/CommandBase');
Eris.CommandOptions = require('./lib/slashcommand/CommandOptions');
Eris.Choice = require('./lib/slashcommand/Choice');
Eris.MessageInteraction = require('./lib/structures/MessageInteraction');
Eris.MessageComponents = require('./lib/structures/components/MessageComponents');
Eris.ActionRow = require('./lib/structures/components/ActionRow');
Eris.MessageComponents = require('./lib/structures/components/MessageComponents');
Eris.Button = require('./lib/structures/components/Button');
Eris.SelectionMenu = require('./lib/structures/components/SelectionMenu');
Eris.Interaction = require('./lib/structures/Interaction');
Eris.CommandDataResolved = require('./lib/slashcommand/data/CommandDataResolved');
module.exports = Eris;
