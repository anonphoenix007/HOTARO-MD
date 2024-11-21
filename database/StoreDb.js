const { isJidGroup } = require("@whiskeysockets/baileys");
const config = require("../config");
const { DataTypes } = require("sequelize");

const chatDb = config.DATABASE.define("Chat", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  conversationTimestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

const messageDb = config.DATABASE.define("message", {
  jid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

const contactDb = config.DATABASE.define("contact", {
  jid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const saveContact = async (jid, name) => {
  try {
    if (!jid || !name) {
      console.log("saveContact: Invalid parameters", { jid, name });
      return;
    }
    if (isJidGroup(jid)) return;
    const exists = await contactDb.findOne({ where: { jid } });
    if (exists) {
      if (exists.name === name) return;
      return await contactDb.update({ name }, { where: { jid } });
    } else {
      return await contactDb.create({ jid, name });
    }
  } catch (e) {
    console.error("Error in saveContact:", e);
  }
};

const saveMessage = async (message, user) => {
  try {
    const jid = message.key?.remoteJid;
    const id = message.key?.id;
    const msg = message;

    if (!jid || !id || !msg) {
      console.log("saveMessage: Invalid parameters", { jid, id, msg });
      return;
    }
    await saveContact(user, message.pushName);

    const exists = await messageDb.findOne({ where: { id, jid } });
    if (exists) {
      return await messageDb.update({ message: msg }, { where: { id, jid } });
    } else {
      return await messageDb.create({ id, jid, message: msg });
    }
  } catch (e) {
    console.error("Error in saveMessage:", e);
  }
};

const loadMessage = async (id) => {
  try {
    if (!id) {
      console.log("loadMessage: Invalid id", id);
      return;
    }
    const message = await messageDb.findOne({ where: { id } });
    if (message) return message.dataValues;
    return false;
  } catch (e) {
    console.error("Error in loadMessage:", e);
  }
};

const saveChat = async (chat) => {
  try {
    if (!chat || !chat.id || !chat.conversationTimestamp) {
      console.log("saveChat: Invalid chat object", chat);
      return;
    }
    if (chat.id === "status@broadcast" || chat.id === "broadcast") return;

    const isGroup = isJidGroup(chat.id);
    const chatexists = await chatDb.findOne({ where: { id: chat.id } });
    if (chatexists) {
      return await chatDb.update(
        { conversationTimestamp: chat.conversationTimestamp },
        { where: { id: chat.id } }
      );
    } else {
      return await chatDb.create({
        id: chat.id,
        conversationTimestamp: chat.conversationTimestamp,
        isGroup,
      });
    }
  } catch (e) {
    console.error("Error in saveChat:", e);
  }
};

const getName = async (jid) => {
  try {
    if (!jid) {
      console.log("getName: Invalid jid", jid);
      return;
    }
    const contact = await contactDb.findOne({ where: { jid } });
    if (!contact) return jid.split("@")[0].replace(/_/g, " ");
    return contact.name;
  } catch (e) {
    console.error("Error in getName:", e);
  }
};

module.exports = {
  saveMessage,
  loadMessage,
  saveChat,
  getName,
};
