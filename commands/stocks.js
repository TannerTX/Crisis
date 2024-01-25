const client = require("../index.js");
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "stocks",
  description: "Manage stock ticker",
  usage: ",stocks <add, remove> <symbol>",
  execute(message, args) {
    var func = args[1].toLowerCase();
    var sym = "";

    if (args.length > 2) sym = args[2].toUpperCase();

    const checkIfValidSymbol = async (symbol) => {
      flag = 0;
      try {
        await yahooFinance.search(symbol).then((res) => {
          if (res.count > 0) flag = 1;
        });

        if (flag) return true;

        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    const getCurrPrice = async (symbol) => {
      const quote = await yahooFinance.quote(symbol);
      const { regularMarketPrice, currency } = quote;
      return regularMarketPrice;
    };

    const checkIfSymbolExists = async (s) => {
      const res = await client.symbolModel.findOne({ symbol: s });
      return !!res;
    };

    const DO_WORK = async (func) => {
      switch (func) {
        case "add":
          if (await checkIfSymbolExists(sym)) {
            message.channel
              .send(
                `${message.author} | Symbol already exists in the database!`
              )
              .then((msg) => setTimeout(() => msg.delete(), 5000));
          } else {
            if (await checkIfValidSymbol(sym)) {
              await client.symbolModel.create({ symbol: sym });
              message.channel
                .send(`Successfully added \`${sym}\` to the database!`)
                .then((msg) => setTimeout(() => msg.delete(), 5000));
            } else {
              message.channel
                .send(`${message.author} | Invalid Symbol!`)
                .then((msg) => setTimeout(() => msg.delete(), 5000));
            }
          }
          break;

        case "remove":
          if (await checkIfSymbolExists(sym)) {
            await client.symbolModel.deleteOne({ symbol: sym });
            message.channel
              .send(`Successfully removed \`${sym}\` from the database!`)
              .then((msg) => setTimeout(() => msg.delete(), 5000));
          } else {
            message.channel
              .send(
                `${message.author} | Symbol does not exist in the database!`
              )
              .then((msg) => setTimeout(() => msg.delete(), 5000));
          }
          break;

        case "list":
          client.symbolModel.find({}).then(async (res) => {
            if (!res)
              message.channel
                .send(`Query returned NULL | Database is empty!`)
                .then((msg) => setTimeout(() => msg.delete(), 5000));
            else {
              const STOCK_EMBED = new EmbedBuilder()
                .setColor("#1bf2c0")
                .setTitle("Active Stock Symbols");

              var POS = 1;
              await Promise.all(
                res.map(async (stock) => {
                  const price = await getCurrPrice(stock.symbol);
                  STOCK_EMBED.addFields({
                    name: `**${POS}**. \`${stock.symbol}\``,
                    value: `$${price}`,
                  });
                  POS++;
                })
              ).then(() =>
                message.channel
                  .send({ embeds: [STOCK_EMBED] })
                  .then((msg) => setTimeout(() => msg.delete(), 25000))
              );
            }
          });
          break;
      }
    };

    DO_WORK(func);
  },
};
