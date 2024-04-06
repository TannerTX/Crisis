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
                                'LurkTest']
            break;
            

            case 'weed':
                TEXT_CHANGE = ['WEED', 
                               'WEED',
                               'WEED']
                
                VOICE_CHANGE = ['WEED',
                                'WEED',
                                'WEED', 
                                'WEED', 
                                'WEED']

                ROLES_CHANGE = ['WEED', 
                                'WEED', 
                                'WEED', 
                                'WEED']
            
            break;


            case 'corona':
                TEXT_CHANGE = ['𝖯𝖺𝗍𝗂𝖾𝗇𝗍 𝖹𝖾𝗋𝗈',
								'𝖳𝗈𝗂𝗅𝖾𝗍 𝖯𝖺𝗉𝖾𝗋',
								'𝖢𝖣𝖢']

                VOICE_CHANGE = ['𝖢𝗋𝗈𝗐𝖽𝖾𝖽 𝖧𝗈𝗌𝗉𝗂𝗍𝖺𝗅',
								'𝖤𝗆𝗉𝗍𝗒 𝖲𝗍𝗈𝗋𝖾𝗌',
								'𝖢𝗈𝗇𝗍𝖺𝗆𝗂𝗇𝖺𝗍�𝖽𝖲𝗈𝖼𝗂𝖺𝗅 𝖲𝗉𝖺𝖼𝖾',
								'𝖢𝗈𝗋𝗈𝗇𝖺 𝖶𝖺𝗌𝗍𝖾𝗅𝖺𝗇𝖽',
								'𝖲𝖾𝗇𝗂𝗈𝗋 𝖦𝗋𝖺𝗏𝖾𝗒𝖺𝗋𝖽']

                ROLES_CHANGE = ['𝖢𝗈𝗋𝗈𝗇𝖺 𝖠𝖽𝗆𝗂𝗇',
								'𝖢𝗈𝗋𝗈𝗇𝖺 𝖬𝗈𝖽',
								'𝖢𝗈𝗋𝗈𝗇𝖺 𝖠𝗌𝗌𝗈𝖼𝗂𝖺𝗍𝖾𝗌',
								'𝖢𝗈𝗋𝗈𝗇𝖺 𝖴𝗇𝗄𝗇𝗈𝗐𝗇',
								'𝖵𝗂𝗋𝗎𝗌']
            
            break;


            case 'generic':
                TEXT_CHANGE = [
                'General',
								'NSFW',
								'Bot-commander']

                VOICE_CHANGE = [
                'General',
								'Games',
								'Other',
								'Even More Other',
								'AFK']

                ROLES_CHANGE = [
                'Admin',
								'Mod',
								'Who are you',
								'Who are you but bright yellow']
        
            break;


            case 'newyork':
                TEXT_CHANGE = [
                '𝐍𝐘𝐂',
								'𝐒𝐞𝐰𝐞𝐫𝐬',
								'𝐂𝐨𝐟𝐟𝐞𝐞 𝐂𝐚𝐟𝐞']

                VOICE_CHANGE = [
                '𝐋𝐮𝐝𝐥𝐨𝐰 𝐒𝐭. 𝐆𝐚𝐦𝐢𝐧𝐠 𝐂𝐚𝐟𝐞',
								'𝐀𝐩𝐚𝐫𝐭𝐦𝐞𝐧𝐭 𝐁𝐮𝐢𝐥𝐝𝐢𝐧𝐠𝐬','𝐁𝐢𝐫𝐝𝐥𝐚𝐧𝐝 𝐉𝐚𝐳𝐳 𝐂𝐥𝐮𝐛 & 𝐁𝐚𝐫',
								'𝐇𝐨𝐭 𝐃𝐨𝐠 𝐊𝐢𝐨𝐬𝐤',
								'𝐌𝐚𝐧𝐡𝐚𝐭𝐭𝐚𝐧 𝐁𝐫𝐢𝐝𝐠𝐞']

                ROLES_CHANGE = [
                '𝐂𝐫𝐢𝐦𝐬𝐨𝐧 𝐌𝐚𝐟𝐢𝐚 𝐔𝐧𝐝𝐞𝐫𝐛𝐨𝐬𝐬',
								'𝐂𝐫𝐢𝐦𝐬𝐨𝐧 𝐌𝐚𝐟𝐢𝐚 𝐒𝐨𝐥𝐝�𝐞𝐫𝐬',
								'𝐂r𝐢𝐦𝐬𝐨𝐧𝐌𝐚𝐟𝐢𝐚 𝐀𝐬𝐬𝐨𝐜𝐢𝐚𝐭𝐞𝐬',
								'𝐋𝐢𝐭𝐞𝐫𝐚𝐥 𝐇𝐨𝐫𝐬𝐞𝐬𝐡𝐢𝐭']
            
            break;


            case 'bucees':
                TEXT_CHANGE = [
                '𝖳𝖾𝗑𝖺𝗌 𝖱𝗈𝗎𝗇𝖽 𝖴𝗉',
								'𝖯𝗋𝖾𝗆𝖺𝖽𝖾 𝖡𝗋𝗈𝗐𝗇𝗂𝖾𝗌 🤢',
								'𝖠𝗎𝗍𝗈𝗆𝖺𝗍𝖾𝖽 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾']

                VOICE_CHANGE = [
                "𝖡𝗎𝖼-𝖾𝖾'𝗌 𝖥𝗈𝗒𝖾𝗋",
								'𝖮𝗋𝖽𝖾𝗋 𝖲𝗍𝖺𝗍𝗂𝗈𝗇',
								'𝖬𝖺𝗌𝗌𝗂𝗏𝖾 𝖥𝗎𝖼𝗄𝗂𝗇𝗀 𝖢𝖺𝗋𝗐a𝗌𝗁',
								'𝖩𝖾𝗋𝗄𝖾𝗒 𝖲𝗍𝖺𝗍𝗂𝗈𝗇',
								'𝖭𝗂𝖼𝖾 𝖠𝗌𝗌 𝖡𝖺𝗍𝗁𝗋𝗈𝗈𝗆𝗌']

                ROLES_CHANGE = [
                '𝖦𝖾𝗇𝖾𝗋𝖺𝗅 𝖬𝖺𝗇𝖺𝗀𝖾𝗋𝗌',
								'𝖶𝖺𝗋𝖾𝗁𝗈𝗎𝗌𝖾 𝖬𝖺𝗇𝖺𝗀𝖾𝗋𝗌',
								'𝖲𝗍𝗈𝖼k𝖾𝗋𝗌',
								'𝖩a𝗇𝗂𝗍𝗈𝗋𝗌']
            
            break;


            case 'halloween':
                TEXT_CHANGE = [
                '🏚️𝖧𝖺𝗎𝗇𝗍𝖾𝖽 𝖬𝖺𝗇𝗌𝗂𝗈𝗇🏚️',
								'🔮🍄𝖶𝗂𝗍𝖼𝗁𝖾𝗌 𝖡𝗋𝖾𝗐𝖾𝗋𝗒🔮🍄',
								'👻𝖲𝗉𝗂𝗋𝗂𝗍 𝖢r𝖾𝖺𝗍𝗂𝗈𝗇👻']

                VOICE_CHANGE = [
                '🕷️𝖬𝖺𝗇𝗌𝗂𝗈𝗇 𝖥𝗈𝗒𝖾𝗋🕷️',
								'🕯️𝖢𝖺𝗇𝖽𝗅𝖾𝖫𝗂𝗍 𝖧𝖺𝗅𝗅🕯️',
								'🎃𝖯𝗎𝗆𝗉k𝗂𝗇𝖥𝖺𝗋𝗆🎃',
								'😱𝖦𝗁𝗈𝗌𝗍 𝖣𝗂𝗆𝖾𝗇𝗌𝗂𝗈𝗇😱',
								'🧟𝖦𝗋𝖺𝗏𝖾𝗒𝖺𝗋𝖽🧟']

                ROLES_CHANGE = [
                '𝖶𝗂𝗍𝖼𝗁𝖾𝗌',
								'𝖵𝖺𝗆𝗉𝗂𝗋𝖾𝗌',
								'𝖲𝗄𝖾𝗅𝖾𝗍𝗈𝗇𝗌',
								'𝖯𝖺𝗐𝗇𝗌']
            
            break;


            case 'thanksgiving':
                TEXT_CHANGE = [
                '𝖳𝗁𝖺𝗇𝗄𝗌𝗀𝗂𝗏𝗂𝗇𝗀 𝖣𝖺𝗒 🦃',
								'𝖱𝗈𝗍𝗍𝖾𝗇 𝖥𝗈𝗈𝖽 🥫',
								'𝖡𝗈𝗍𝗌']

                VOICE_CHANGE = [
                '𝖲𝖾𝗍 𝖳𝖺𝖻𝗅𝖾',
								'𝖢𝖺𝗇𝖽𝗅𝖾𝖫𝗂𝗍 𝖧𝖺𝗅𝗅',
								'𝟨 𝖧𝗈𝗎𝗋 𝖲𝖾𝗍𝗎𝗉',
								'𝟥𝟢𝖬𝗂𝗇𝗎𝗍𝖾 F𝗂𝗇𝗂𝗌𝗁',
								'𝖳𝖺𝗄𝖾 𝖺 𝖭𝖺𝗉']

                ROLES_CHANGE = [
                '𝖯𝗅𝗒𝗆𝗈𝗍𝗁 𝖦𝗈𝗏𝖾𝗋𝗇𝗈𝗋𝗌',
								'𝖯𝗂𝗅𝗀𝗋𝗂𝗆𝗌',
								'𝖳𝖺𝖻𝗅𝖾 𝖲𝖾𝗍𝗍𝖾𝗋𝗌',
								'𝖢𝗅𝖾𝖺𝗇𝖾𝗋𝗌']
            
            break;


            case 'christmas':
                TEXT_CHANGE = [
                '𝐂𝐇𝐑𝐈𝐒𝐓𝐌𝐀𝐒𝐁𝐎𝐈𝐒',
								'𝐍𝐚𝐮𝐠𝐡𝐭𝐲-𝐋𝐢𝐬𝐭',
								'𝐒𝐚𝐧𝐭𝐚𝐬 𝐅𝐚𝐜𝐭𝐨𝐫𝐲']

                VOICE_CHANGE = [
                '𝐍𝐨𝐫𝐭𝐡 𝐏𝐨𝐥𝐞',
								'𝐍𝐨𝐫𝐭𝐡𝐞𝐫𝐧 𝐋𝐢𝐠𝐡𝐭𝐬',
								'𝐂𝐡𝐫𝐢𝐬𝐭𝐦𝐚𝐬 𝐓𝐫𝐞𝐞',
								'𝐒𝐚𝐧𝐭𝐚𝐬 𝐒𝐥𝐞𝐢𝐠𝐡',
								'𝐋𝐮𝐦𝐩 𝐨𝐟 𝐂𝐨𝐚𝐥']

                ROLES_CHANGE = [
                '𝐒𝐚𝐧𝐭𝐚𝐬 𝐑𝐞𝐢𝐧𝐝𝐞𝐞𝐫',
								'𝐒𝐚𝐧𝐭𝐚𝐬 𝐄𝐥𝐯𝐞𝐬',
								'𝐂𝐨𝐚𝐥 𝐒𝐡𝐨𝐯𝐞𝐥𝐞𝐫𝐬',
								'𝐑𝐞𝐢𝐧𝐝𝐞𝐞𝐫 𝐒𝐡𝐢𝐭']
            
            break;


            case 'newyears':
                TEXT_CHANGE = [
                '𝐍𝐘𝐂',
								'𝐋𝐚𝐬𝐭 𝐘𝐞𝐚𝐫 𝐒𝐡𝐢𝐭',
								'𝐆𝐡𝐨𝐬𝐭𝐬 𝐨𝐟 𝐭𝐡𝐢𝐬 𝐘𝐞𝐚𝐫']

                VOICE_CHANGE = [
                '𝐓𝐢𝐦𝐞𝐬 𝐒𝐪𝐮𝐚𝐫𝐞',
								'𝐓𝐨𝐚𝐬𝐭𝐢𝐧𝐠 𝐂𝐡𝐚𝐦𝐩𝐚𝐠𝐧𝐞',
								'𝐅𝐢𝐫𝐞𝐰𝐨𝐫𝐤�',
								'𝐍𝐞𝐰 𝐘𝐞𝐚𝐫 𝐑𝐞𝐬𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬',
								'𝐒𝐭𝐮𝐜𝐤 𝐢𝐧 𝐋𝐚𝐬𝐭 𝐘𝐞𝐚𝐫']
                                
                ROLES_CHANGE = [
                '𝐓𝐢𝐦𝐞𝐬 𝐒𝐪𝐮𝐚𝐫𝐞 𝐂𝐨𝐨𝐫𝐝𝐢𝐧𝐚𝐭𝐨𝐫',
								'𝐅𝐢𝐫𝐞𝐰𝐨𝐫𝐤 𝐂𝐨𝐧𝐭𝐫𝐨𝐥𝐦𝐞𝐧',
								'𝐋𝐞𝐟𝐭𝐨𝐯𝐞𝐫 𝐁𝐞𝐞𝐫',
								'𝐋𝐢𝐭𝐞𝐫𝐚𝐥 𝐇𝐨𝐫𝐬𝐞𝐬𝐡𝐢𝐭']
            
            break;


            case 'idk':
                TEXT_CHANGE = [
                '🟧⬛',
								'🟧⬛',
								'🟧⬛']

                VOICE_CHANGE = [
                '🟧⬛',
								'🟧⬛',
								'🟧⬛',
								'🟧⬛',
								'🟧⬛']

                ROLES_CHANGE = [
                '🟧⬛',
								'🟧⬛',
								'🟧⬛',
								'🟧⬛']
            
            break;


            case 'drphil':
                TEXT_CHANGE = [
                'Confrontation room',
								'-',
								'-']

                VOICE_CHANGE = [
                'Confrontation room',
								'-',
								'-',
								'-',
								'-']

                ROLES_CHANGE = [
                'Dr Phil Associate',
								'Dr Phil Associate',
								'Fuck Off',
								'Fuck Off']
            
            break;


            case 'july':
                TEXT_CHANGE = [
                "'𝖬𝖾𝗋𝗂𝖼𝖺 🎉",
								'𝖵𝗈𝗆𝗂𝗍 🤮',
								'𝖡𝗈𝗍𝗌']

                VOICE_CHANGE = [
                '𝖫𝗈𝗎𝖽 𝖠𝗌𝗌 𝖥𝗂𝗋𝖾𝗐𝗈𝗋𝗄𝗌 📣',
								'𝖧𝗈𝗍𝖽𝗈𝗀𝗌 🌭',
								'𝖧𝖺𝗆𝖻𝗎𝗋𝗀𝖾𝗋𝗌🍔',
								'𝖢𝗁𝗂𝗉𝗌 𝖭 𝖣𝗂𝗉 🍟',
								'𝖯𝖺𝗌𝗌𝖾𝖽 𝗍𝗁𝖾 𝖿𝗎𝖼𝗄 𝗈𝗎𝗍 💤']

                ROLES_CHANGE = [
                '𝖥𝗂𝗋𝖾𝗐𝗈𝗋𝗄𝗌 𝖢𝗈𝗈𝗋𝖽𝗂𝗇𝖺𝗍𝗈𝗋',
								'𝖥𝖾𝖺𝗌𝗍 𝖯𝗋𝖾𝗉𝗉𝖾𝗋𝗌',
								'𝖳𝗋𝖺s𝗁𝖢𝗅𝖾𝖺𝗇𝖾𝗋𝗌',
								'𝖶𝗁𝗈 𝗂𝗇𝗏𝗂𝗍𝖾𝖽 𝗒𝗈𝗎',]
            
            break;


            case 'stpatrick':
              TEXT_CHANGE = ['🌈 Pot o\' Gold',
                             '🍀 Shamrock Lounge',
                             '💚 Lucky Charms Corner']  
              
              VOICE_CHANGE = ['🍺 Leprechaun\'s Pub',
                              '🎻 Celtic Jigs Junction',
                              '🎩 Emerald Isle Gathering',
                              '🌟 Shamrock Shindig',
                              '🍀 Luck of the Irish Lounge']

              ROLES_CHANGE = ['🍀 Clover Clan',
                              '🎩 Leprechaun Legends',
                              '💚 Green Guardians',
                              '🌈 Rainbow Royalty']
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
                              '𝐉𝐚𝐰𝐚𝐬']
          break;
        }

        /*   Execute Change   */
        try {
          if (message.member.roles.cache.has(client.OWNER_ROLE)) {

            for (const [INDEX, ELEMENT] of client.TEXT_CHANNELS.entries())
              client.CHANNELS.cache.get(ELEMENT).setName(TEXT_CHANGE[INDEX]);

            for (const [INDEX, ELEMENT] of client.VOICE_CHANNELS.entries())
              client.CHANNELS.cache.get(ELEMENT).setName(VOICE_CHANGE[INDEX]);

            for (const [INDEX, ELEMENT] of client.ROLES.entries())
              client.GUILD.roles.cache.get(ELEMENT).setName(ROLES_CHANGE[INDEX]);
          } else
            message.channel.send(
              `${message.author} | Insufficient Permissions!`
            );
        } catch (error) {
          console.log(`Something farted\n\n\n${error}`);
        }

    }

}