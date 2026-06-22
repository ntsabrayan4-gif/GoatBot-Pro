const axios = require("axios");

// ─── Helper ───────────────────────────────────────────────────────────────────
async function sendImage(api, { api: Api, event, message }) {
  try {
    const res = await axios.get(api);
    const url = res.data.url;
    await Api.sendMessage({ attachment: await global.utils.getStreamFromURL(url) }, event.threadID, event.messageID);
  } catch (err) {
    return message.reply("❌ An error occurred while retrieving data: " + err.message);
  }
}

// ─── Base URLs ────────────────────────────────────────────────────────────────
const BASE = "https://api.maher-zubair.tech/";
const WAIFU = "https://api.waifu.pics/";

// ─── NSFW Commands ────────────────────────────────────────────────────────────

module.exports.config = {
  name: "dick",
  version: "1.0.0",
  author: "France King",
  countDown: 5,
  role: 0,
  category: "nsfw",
  shortDescription: "Send a dick image",
  longDescription: "",
  guide: ""
};
module.exports.onStart = async (ctx) => sendImage(BASE + "nsfw/dick", ctx);

// ───────────────────────────────────────────────────────────────────────────────

const _commands = [
  // NSFW
  { name: "ass",      url: BASE + "nsfw/ass",      cat: "nsfw",      emoji: "🍑" },
  { name: "pussy",    url: BASE + "nsfw/pussy",    cat: "nsfw",      emoji: "💦" },
  { name: "fuck",     url: BASE + "nsfw/fuck",     cat: "nsfw",      emoji: "😋" },
  { name: "porngif",  url: BASE + "nsfw/porngif",  cat: "nsfw",      emoji: "😋" },
  { name: "hentai",   url: WAIFU + "nsfw/waifu",   cat: "nsfw",      emoji: "😋" },
  { name: "trap",     url: WAIFU + "nsfw/trap",    cat: "nsfw",      emoji: "😋" },
  { name: "bj",       url: BASE  + "nsfw/blowjob", cat: "nsfw",      emoji: "🙄" },

  // Wallpapers
  { name: "blackpink", url: BASE + "wallpaper/blackpink", cat: "wallpapers", emoji: "😋" },
  { name: "cr7",       url: BASE + "wallpaper/cr7",       cat: "wallpapers", emoji: "😋" },
  { name: "messi",     url: BASE + "wallpaper/messi",     cat: "wallpapers", emoji: "😋" },
  { name: "pubg",      url: BASE + "wallpaper/pubg",      cat: "wallpapers", emoji: "😋" },
  { name: "dog",       url: BASE + "wallpaper/dog",       cat: "wallpapers", emoji: "🐶" },
  { name: "horror",    url: BASE + "wallpaper/horror",    cat: "wallpapers", emoji: "💀" },
  { name: "enemy",     url: BASE + "wallpaper/enemy",     cat: "wallpapers", emoji: "😋" },
  { name: "aesthetic", url: BASE + "wallpaper/aesthetic", cat: "wallpapers", emoji: "🌻" },
  { name: "car",       url: BASE + "wallpaper/car",       cat: "wallpapers", emoji: "🚗" },
  { name: "bike",      url: BASE + "wallpaper/bike",      cat: "wallpapers", emoji: "🚲" },
  { name: "islamic",   url: BASE + "wallpaper/islamic",   cat: "wallpapers", emoji: "" },
];

// ─── Export all as individual GoatBot command files ──────────────────────────
// Place each export below in its own file named <name>.js in your scripts/cmds/ folder.
// This single file shows the pattern — duplicate per command as needed.

for (const cmd of _commands) {
  // In a real GoatBot setup, each command lives in its own file.
  // Below is the template each file should follow:
  /*
  ─────────────────────────────────────────────
  File: scripts/cmds/<name>.js
  ─────────────────────────────────────────────
  const axios = require("axios");

  module.exports.config = {
    name: "<name>",
    version: "1.0.0",
    author: "France King",
    countDown: 5,
    role: 0,
    category: "<cat>",
    shortDescription: "Send a <name> image",
    longDescription: "",
    guide: ""
  };

  module.exports.onStart = async function ({ api, event, message }) {
    try {
      const res = await axios.get("<url>");
      const url = res.data.url;
      const stream = await global.utils.getStreamFromURL(url);
      return api.sendMessage({ attachment: stream }, event.threadID, event.messageID);
    } catch (err) {
      return message.reply("❌ Error retrieving data: " + err.message);
    }
  };
  ─────────────────────────────────────────────
  */
}

// ─── READY-TO-USE: All commands in one exportable array ──────────────────────
// Alternatively, use a GoatBot multi-command loader if your version supports it.

module.exports.commands = _commands.map((cmd) => ({
  config: {
    name: cmd.name,
    version: "1.0.0",
    author: "France King",
    countDown: 5,
    role: 0,
    category: cmd.cat,
    shortDescription: `Send a ${cmd.name} image`,
    longDescription: "",
    guide: ""
  },
  onStart: async function ({ api, event, message }) {
    try {
      const res = await axios.get(cmd.url);
      const url = res.data.url;
      const stream = await global.utils.getStreamFromURL(url);
      return api.sendMessage({ attachment: stream }, event.threadID, event.messageID);
    } catch (err) {
      return message.reply(`❌ Error while retrieving data: ${err.message}`);
    }
  }
}));

