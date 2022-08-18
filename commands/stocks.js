const client = require("../index.js")
const yahooStockPrices = require('yahoo-stock-prices')

module.exports = {
    name: 'stocks',
    description: 'Manage stock ticker',
    usage: ',stocks <add, remove>',
    execute(message, args) {

        const check_if_valid_symbol = async (symbol) => {
            try {
                const data = await yahooStockPrices.getCurrentData(sym)
                return true
            }
            catch (e) { return false }
        }

        const check_if_symbol_exists = async (symbol) => {
            client.symbolModel.findOne({ symbol: sym }).then(res => {
                if(res) return true // SYMBOL EXISTS ALREADY
                else return false    // SYMBOL DOESN'T EXIST 
            })
        }


        var func = args[1].toLowerCase()
        var sym = ""

        if (args.length > 2)
            sym = args[2].toUpperCase()

        switch (func) {

            case 'add':

                if(!check_if_symbol_exists(sym)) message.channel.send(`${message.author} | Symbol already exists in database!`)
                
                else {
                    if (check_if_valid_symbol(sym)) {
                        client.symbolModel.create({symbol: sym})
                        message.channel.send(`Successfully added \`${sym}\` to the database!`)
                    }
                    
                    else message.channel.send(`${message.author} | Invalid Symbol!`)
                }
                break


            case 'remove': 

            if(check_if_symbol_exists(sym)) client.symbolModel.deleteOne({symbol: sym}).then(res => message.channel.send(`Successfully removed \`${sym}\` from the database!`))
            else message.channel.send(`${message.author} | Symbol does not exist in the database!`)
            
            break

        }


    }

}