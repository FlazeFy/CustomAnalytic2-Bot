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
const { repoAllVehicles, repoShowVehiclesByCountry, repoShowVehiclesBySides, repoShowVehiclesByRole } = require('./modules/vehicles/repositories')
const { repoShowFacilitiesByCountry, repoShowFacilitiesByType, repoShowFacilitiesBySides } = require('./modules/facilities/repositories')

const bot = new Telegraf(conf.TOKEN)

const menuOptions = [
    '/Show All Airplane',
    '/Show All Ship',
    '/Show All Event',
    '/Show All Weapon',
    '/Show All Vehicle',
    '/Show Total Vehicle By Country',
    '/Show Total Vehicle By Role',
    '/Show Total Vehicle By Sides',
    '/Show Total Facility By Country',
    '/Show Total Facility By Type',
    '/Show Total Facility By Side'
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
                case 0: // Show All Airplanes
                    [msg, page] = await repoAllAirplane();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes...\n\n${msg}`);
                    break;
                case 1: // Show All Ships
                    [msg, page] = await repoAllShips();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all ships...\n\n${msg}`);
                    break;
                case 2: // Show All Events
                    [msg, page] = await repoAllEvents();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all events...\n\n${msg}`);
                    break;
                case 3: // Show All Weapons
                    [msg, page] = await repoAllWeapons();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all weapons...\n\n${msg}`);
                    break;
                case 4: // Show All Vehicles
                    [msg, page] = await repoAllVehicles();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles...\n\n${msg}`);
                    break;

                case 5: // Show Total Vehicle by Country
                    [msg, page] = await repoShowVehiclesByCountry();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles's country...\n\n${msg}`);
                    break;
                case 6: // Show Total Vehicle by Role
                    [msg, page] = await repoShowVehiclesByRole();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles's role...\n\n${msg}`);
                    break;
                case 7: // Show Total Vehicle by Sides
                    [msg, page] = await repoShowVehiclesBySides();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles's sides...\n\n${msg}`);
                    break;

                case 8: // Show Total Facility by Country
                    [msg, page] = await repoShowFacilitiesByCountry();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all facilities's country...\n\n${msg}`);
                    break;
                case 9: // Show Total Facility by Type
                    [msg, page] = await repoShowFacilitiesByType();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all facilities's type...\n\n${msg}`);
                    break;
                case 10: // Show Total Facility by Sides
                    [msg, page] = await repoShowFacilitiesBySides();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all facilities's sides...\n\n${msg}`);
                    break;
                
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
