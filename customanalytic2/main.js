const { Telegraf, Markup} = require('telegraf')
const fs = require('fs')

const configFile = fs.readFileSync('./configs/telegram.json', 'utf8')
const conf = JSON.parse(configFile)

// Modules
const { repoAllAirplane } = require('./modules/airplane/repositories')

// Helpers
const { generateRandomNumber } = require('./helpers/generator')
const { repoAllShips } = require('./modules/ships/repositories')
const { repoAllWeapons } = require('./modules/weapons/repositories')
const { repoAllEvents } = require('./modules/events/repositories')
const { repoAllVehicles } = require('./modules/vehicles/repositories')

const bot = new Telegraf(conf.TOKEN)

const menuOptions = [
    '/Show All Airplane',
    '/Show All Ship',
    '/Show All Event',
    '/Show All Weapon',
    '/Show All Vehicle',
];

bot.start( async (ctx) => {
    const userId = ctx.from.id
    ctx.reply(`Please choose an option in Menu:`, 
        Markup.keyboard(menuOptions.map(option => [option])).resize()
    );
});

bot.on('message', async (ctx) => {
    // Respond / Presenting data
    const present_respond = ['Showing','Let me show you the',"Here's the","I got the","See this"]

    const telegramId = ctx.from.id

    if (ctx.message.text) {
        const message = ctx.message.text
        const idx_rand_present = generateRandomNumber(1,present_respond.length)

        if(message[0] == "/"){
            const index = menuOptions.indexOf(message)
            let msg, page

            switch (index) {
                case 0:
                    [msg,page] = await repoAllAirplane()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes...\n\n${msg}`)
                    break
                case 1:
                    [msg,page] = await repoAllShips()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all ships...\n\n${msg}`)
                    break
                case 2:
                    [msg,page] = await repoAllEvents()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all events...\n\n${msg}`)
                    break
                case 3:
                    [msg,page] = await repoAllWeapons()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all weapons...\n\n${msg}`)
                    break
                case 4:
                    [msg,page] = await repoAllVehicles()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles...\n\n${msg}`)
                    break
                default:
                    ctx.reply(`Sorry I'dont know your command`)
                    break
            }
        }
    } 
});

bot.launch().then(() => {
    console.log('Bot started')
}).catch((err) => {
    console.error('Error starting bot:', err)
});
