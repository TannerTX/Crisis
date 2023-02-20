const client = require("../index.js")

module.exports = {
    name: 'change',
    description: 'Changes the theme of channels & roles',
    usage: ',change <theme>',
    execute(message, args) {
        var theme = args[1].toLowerCase()
        let TEXT_CHANGE = []
        let VOICE_CHANGE = []
        let ROLES_CHANGE = []

        switch(theme) {

            case 'testing':
                TEXT_CHANGE = ['MainTest',
                               'NSFWTest',
                               'BotTest']  
                
                VOICE_CHANGE = ['GeneralTest',
                                'SecondaryTest',
                                'TertiaryTest',
                                'QuaternaryTest',
                                'AFKTest']

                ROLES_CHANGE = ['AdminTest',
                                'ModTest',
                                'CloseTest',
                                'LurkTest',
                                'WhoTest']
            break;
            
            case 'starwars':
                TEXT_CHANGE = ['𝐌𝐨𝐬 𝐄𝐢𝐬𝐥𝐞𝐲 𝐒𝐩𝐚𝐜𝐞𝐩𝐨𝐫𝐭',
                               '𝐓𝐚𝐭𝐨𝐨𝐢𝐧𝐞 𝐁𝐚𝐝𝐥𝐚𝐧𝐝𝐬',
                               '𝐉𝐚𝐰𝐚 𝐒𝐚𝐧𝐝𝐜𝐫𝐚𝐰𝐥𝐞𝐫']  
                
                VOICE_CHANGE = ['𝐌𝐨𝐬 𝐄𝐢𝐬𝐥𝐞𝐲 𝐂𝐚𝐧𝐭𝐢𝐧𝐚',
                                '𝐒𝐭𝐨𝐫𝐦𝐭𝐫𝐨𝐨𝐩𝐞𝐫 𝐉𝐚𝐜𝐮𝐳𝐳𝐢',
                                '𝐃𝐞𝐚𝐭𝐡 𝐒𝐭𝐚𝐫 𝐓𝐫𝐞𝐧𝐜𝐡',
                                '𝐁𝐨𝐮𝐧𝐭𝐲 𝐇𝐮𝐧𝐭𝐞𝐫𝐬 𝐎𝐧𝐥𝐲',
                                '𝐌𝐢𝐧𝐢𝐤𝐢𝐭 𝐇𝐮𝐧𝐭𝐢𝐧𝐠']

                ROLES_CHANGE = ['𝐒𝐢𝐭𝐡 𝐑𝐨𝐲𝐚𝐥 𝐆𝐮𝐚𝐫𝐝𝐬',
                                '𝐆𝐫𝐚𝐧𝐝 𝐀𝐝𝐦𝐢𝐫𝐚𝐥𝐬',
                                '𝐒𝐭𝐨𝐫𝐦𝐭𝐫𝐨𝐨𝐩𝐞𝐫𝐬',
                                '𝐉𝐚𝐰𝐚𝐬',
                                '𝐔𝐠𝐧𝐚𝐮𝐠𝐡𝐭𝐬']
            break;
            
        }

        /*   Execute Change   */
        if(message.member.roles.cache.has(client.OWNER_ROLE)) {

        for(const [INDEX, ELEMENT] of client.TEXT_CHANNELS.entries())
            client.CHANNELS.cache.get(ELEMENT).setName(TEXT_CHANGE[INDEX])

        for(const [INDEX, ELEMENT] of client.VOICE_CHANNELS.entries())
            client.CHANNELS.cache.get(ELEMENT).setName(VOICE_CHANGE[INDEX])
        
        for(const [INDEX, ELEMENT] of client.ROLES.entries())
            client.CHANNELS.cache.get(ELEMENT).setName(ROLES_CHANGE[INDEX])
        }
        else message.channel.send(`${message.author} | Insufficient Permissions!`)

    }

}