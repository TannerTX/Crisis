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
        }

        for(const [INDEX, ELEMENT] of client.TEXT_CHANNELS.entries())
            client.CHANNELS.cache.get(ELEMENT).setName(TEXT_CHANGE[INDEX])

        for(const [INDEX, ELEMENT] of client.VOICE_CHANNELS.entries())
            client.CHANNELS.cache.get(ELEMENT).setName(VOICE_CHANGE[INDEX])
        
        for(const [INDEX, ELEMENT] of client.ROLE_CHANNELS.entries())
            client.CHANNELS.cache.get(ELEMENT).setName(ROLES_CHANGE[INDEX])


    }

}