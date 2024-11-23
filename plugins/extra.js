/*command(
  {
    pattern: "ss ?(.*)",
    fromMe: true,
    desc: "Screenshots a site",
    type: "misc",
  },
  async (message, match) => {
    if (!match) {
      return await message.sendMessage("*Please provide a URL to screenshot.*");
    }

    const screenshotUrl = `https://api.giftedtech.my.id/api/tools/vurl?apikey=gifted&url=${encodeURIComponent(match)}`;

    await message.client.sendMessage(
      message.jid,
      {
        image: { url: screenshotUrl },
        mimetype: "image/jpeg",
        caption: `\n> screenshot of ${(match)} generated successfully `,
      },
      { quoted: message }
    );
  }
);
*/
