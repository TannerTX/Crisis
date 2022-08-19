const client = require("../index.js")
const yahooStockPrices = require('yahoo-stock-prices')

module.exports = {
    name: 'stocks',
    description: 'Manage stock ticker',
    usage: ',stocks <add, remove>',
    execute(message, args) {

        var func = args[1].toLowerCase()
        var sym = ""

        if (args.length > 2)
            sym = args[2].toUpperCase()


        const check_if_valid_symbol = async (symbol) => {
            try {
                const data = await yahooStockPrices.getCurrentData(symbol)
                return true
            }
            catch (e) { return false }
        }


        const check_if_symbol_exists = async (s) => {
            client.symbolModel.findOne({ symbol: s }).then(res => {
                console.log(res)
                if (res) { console.log("EXISTS ALREADY"); return true } // SYMBOL EXISTS ALREADY
                else { console.log("DOESNT EXIST"); return false }    // SYMBOL DOESN'T EXIST 
            })
        }


        const doSwitch = async (func) => {

            switch (func) {

                case 'add':
                    if (await check_if_symbol_exists(sym)) message.channel.send(`${message.author} | Symbol already exists in database!`).then(msg => setTimeout(() => msg.delete(), 5000))

                    else {
                        if (await check_if_valid_symbol(sym)) {
                            client.symbolModel.create({ symbol: sym })
                            message.channel.send(`Successfully added \`${sym}\` to the database!`).then(msg => setTimeout(() => msg.delete(), 5000))
                        }
                        else message.channel.send(`${message.author} | Invalid Symbol!`).then(msg => setTimeout(() => msg.delete(), 5000))
                    }
                    break


                case 'remove':

                    if (!await check_if_symbol_exists(sym)) client.symbolModel.remove({ symbol: sym }).then(res => message.channel.send(`Successfully removed \`${sym}\` from the database!`).then(msg => setTimeout(() => msg.delete(), 5000)))
                    else message.channel.send(`${message.author} | Symbol does not exist in the database!`).then(msg => setTimeout(() => msg.delete(), 5000))

                    break

            }
        }

        doSwitch(func)

    }

}