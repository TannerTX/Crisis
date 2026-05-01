const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  name: "tiktok",
  description:
    "Download a TikTok and repost it in the same channel, then delete the local file",
  usage: ",tiktok <tiktok_link>",
  execute(message, args) {
    const run = async () => {
      const tiktokUrl = args[1];

      if (!tiktokUrl) {
        message.channel
          .send(`${message.author} | Usage: \`,tiktok <tiktok_link>\``)
          .then((msg) => setTimeout(() => msg.delete(), 7000));
        return;
      }

      const isTikTokLink = /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)\//i.test(
        tiktokUrl
      );

      if (!isTikTokLink) {
        message.channel
          .send(`${message.author} | Please provide a valid TikTok URL.`)
          .then((msg) => setTimeout(() => msg.delete(), 7000));
        return;
      }

      const downloadDir = path.join(__dirname, "..", "downloads");
      if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

      const filename = `tiktok_${Date.now()}.mp4`;
      const filePath = path.join(downloadDir, filename);

      try {
        const apiResponse = await axios.get("https://www.tikwm.com/api/", {
          params: { url: tiktokUrl, hd: 1 },
          timeout: 15000,
        });

        const videoUrl = apiResponse?.data?.data?.hdplay || apiResponse?.data?.data?.play;

        if (!videoUrl) {
          throw new Error("Could not resolve downloadable TikTok video URL.");
        }

        const videoResponse = await axios.get(videoUrl, {
          responseType: "stream",
          timeout: 60000,
        });

        await new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(filePath);
          videoResponse.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        await message.channel.send({
          content: `Requested by ${message.author}`,
          files: [filePath],
        });
      } catch (error) {
        console.log(error);
        message.channel
          .send(`${message.author} | Failed to download/post that TikTok.`)
          .then((msg) => setTimeout(() => msg.delete(), 7000));
      } finally {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.log(unlinkErr);
          });
        }
      }
    };

    run();
  },
};
