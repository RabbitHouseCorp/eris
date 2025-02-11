'use strict';

const Base = require('./Base');
const Endpoints = require('../rest/Endpoints');

/**
* Represents a user
* @prop {String?} avatar The hash of the user's avatar, or null if no avatar
* @prop {String} avatarURL The URL of the user's avatar which can be either a JPG, PNG or GIF
* @prop {String?} banner The hash of the user's banner, or null if no banner (restMode is required)
* @prop {String?} bannerURL The URL of the user's banner witch can be either a JPG, PNG or GIF (restMode is required)
* @prop {Boolean} bot Whether the user is an OAuth bot or not
* @prop {Number} createdAt Timestamp of the user's creation
* @prop {String} defaultAvatar The hash for the default avatar of a user if there is no avatar set
* @prop {String} defaultAvatarURL The URL of the user's default avatar
* @prop {String} discriminator The discriminator of the user
* @prop {String} id The ID of the user
* @prop {String} mention A string that mentions the user
* @prop {Number?} publicFlags Publicly visible flags for this user
* @prop {String} staticAvatarURL The URL of the user's avatar (always a JPG)
* @prop {Boolean} system Whether the user is an official Discord system user (e.g. urgent messages)
* @prop {String} username The username of the user
*/
class User extends Base {
  constructor(data, client) {
    super(data.id);
    if (!client) {
      this._missingClientError = new Error('Missing client in constructor'); // Preserve constructor callstack
    }
    this._client = client;
    this.bot = !!data.bot;
    this.system = !!data.system;
    this.update(data);
  }

  update(data) {
    if (data.avatar !== undefined) {
      this.avatar = data.avatar;
    }
    if (data.username !== undefined) {
      this.username = data.username;
    }
    if (data.discriminator !== undefined) {
      this.discriminator = data.discriminator;
    }
    if (data.global_name !== undefined) {
      this.globalName = data.global_name
    }
    if (data.public_flags !== undefined) {
      this.publicFlags = data.public_flags;
    }

    // Rest mode {Options}
    if (this._client !== undefined) {
      this.banner = this._client.options.restMode ? data.banner ? data.banner : null : `Eris REST mode is required, use .getRESTUser(${data.id})`;
      this.bannerColor = this._client.options.restMode ? data.banner_color ? data.banner_color : null : `Eris REST mode is required, use .getRESTUser(${data.id})`;
      this.accentColor = this._client.options.restMode ? data.accent_color ? data.accent_color : null : `Eris REST mode is required, use .getRESTUser(${data.id})`;
    }
  }

  get avatarURL() {
    if (this._missingClientError) {
      throw this._missingClientError;
    }
    return this.avatar ? this._client._formatImage(Endpoints.USER_AVATAR(this.id, this.avatar)) : this.defaultAvatarURL;
  }

  get bannerURL() {
    if (!this._client.options.restMode) {
      return new Error('Eris REST mode is not enabled');
    } else {
      return this.banner ? this._client._formatImage(Endpoints.USER_BANNER(this.id, this.banner)) : undefined;
    }
  }

  get defaultAvatar() {
    return this.discriminator % 5;
  }

  get defaultAvatarURL() {
    return `${Endpoints.CDN_URL}${Endpoints.DEFAULT_USER_AVATAR(this.defaultAvatar)}.png`;
  }

  get mention() {
    return `<@${this.id}>`;
  }

  get staticAvatarURL() {
    if (this._missingClientError) {
      throw this._missingClientError;
    }
    return this.avatar ? this._client._formatImage(Endpoints.USER_AVATAR(this.id, this.avatar), 'jpg') : this.defaultAvatarURL;
  }

  /**
    * [USER ACCOUNT] Create a relationship with the user
    * @arg {Boolean} [block=false] If true, block the user. Otherwise, add the user as a friend
    * @returns {Promise}
    */
  addRelationship(block) {
    return this._client.addRelationship.call(this._client, this.id, block);
  }

  /**
    * [USER ACCOUNT] Delete the current user's note for another user
    */
  deleteNote() {
    return this._client.deleteUserNote.call(this._client, this.id);
  }

  /**
    * Get the user's avatar with the given format and size
    * @arg {String} [format] The filetype of the avatar ("jpg", "jpeg", "png", "gif", or "webp")
    * @arg {Number} [size] The size of the avatar (any power of two between 16 and 4096)
    */
  dynamicAvatarURL(format, size) {
    return this.avatar ? this._client._formatImage(Endpoints.USER_AVATAR(this.id, this.avatar), format, size) : this.defaultAvatarURL;
  }

  /**
    * [USER ACCOUNT] Edit the current user's note for the user
    * @arg {String} note The note
    * @returns {Promise}
    */
  editNote(note) {
    return this._client.editUserNote.call(this._client, this.id, note);
  }

  /**
    * Get a DM channel with the user, or create one if it does not exist
    * @returns {Promise<PrivateChannel>}
    */
  getDMChannel() {
    return this._client.getDMChannel.call(this._client, this.id);
  }

  /**
    * [USER ACCOUNT] Get profile data for the user
    * @returns {Promise<Object>} The user's profile data.
    */
  getProfile() {
    return this._client.getUserProfile.call(this._client, this.id);
  }

  /**
    * [USER ACCOUNT] Remove a relationship with the user
    * @returns {Promise}
    */
  removeRelationship() {
    return this._client.removeRelationship.call(this._client, this.id);
  }

  toJSON(props = []) {
    return super.toJSON([
      'avatar',
      'bot',
      'discriminator',
      'publicFlags',
      'system',
      'username',
      ...props
    ]);
  }
}

module.exports = User;
