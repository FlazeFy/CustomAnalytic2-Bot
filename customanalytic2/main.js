const { Telegraf, Markup, session } = require('telegraf')
const fs = require('fs')

// const configFile = fs.readFileSync('./configs/telegram.json', 'utf8')
const configFile = fs.readFileSync('./configs/telegram_stage.json', 'utf8')
const conf = JSON.parse(configFile)

// Helpers
const { generateRandomNumber } = require('./helpers/generator')

// Modules
const { repoAllAirplane, repoShowAirplanesByCountry, repoShowAirplanesBySides, repoShowAirplanesByRole, repoShowAirplanesByManufacturer, repoShowAirplaneSummary, repoAirplaneDoc } = require('./modules/airplane/repositories')
const { repoAllShips, repoShowShipsByCountry, repoShowShipsByClass, repoShowShipsBySides, repoShowShipSummary, repoShipDoc } = require('./modules/ships/repositories')
const { repoAllWeapons, repoShowWeaponsByCountry, repoShowWeaponsBySides, repoShowWeaponsByType, repoShowWeaponSummary, repoWeaponDoc } = require('./modules/weapons/repositories')
const { repoAllEvents, repoEventDoc } = require('./modules/events/repositories')
const { repoAllVehicles, repoShowVehiclesByCountry, repoShowVehiclesBySides, repoShowVehiclesByRole, repoShowVehicleSummary } = require('./modules/vehicles/repositories')
const { repoShowFacilitiesByCountry, repoShowFacilitiesByType, repoShowFacilitiesBySides, repoShowFacilitySummary, repoShowNearestFacilities } = require('./modules/facilities/repositories')
const { generatePaginationBot } = require('./helpers/telegram')
const { repoAllBooks, repoBookDoc } = require('./modules/book/repositories')
const { repoShowCasualitiesSummary, repoCasualitiesDoc } = require('./modules/casualities/repositories')

const bot = new Telegraf(conf.TOKEN)
bot.use(session())

const menuOptions = [
    '/Show All Airplane',
    '/Show Total Airplane By Country',
    '/Show Total Airplane By Role',
    '/Show Total Airplane By Sides',
    '/Show Total Airplane By Manufacturer',

    '/Show All Ship',
    '/Show Total Ship By Country',
    '/Show Total Ship By Class',
    '/Show Total Ship By Sides',
    
    '/Show All Event',

    '/Show All Weapon',
    '/Show Total Weapon By Country',
    '/Show Total Weapon By Type',
    '/Show Total Weapon By Sides',

    '/Show All Vehicle',
    '/Show Total Vehicle By Country',
    '/Show Total Vehicle By Role',
    '/Show Total Vehicle By Sides',

    '/Show Total Facility By Country',
    '/Show Total Facility By Type',
    '/Show Total Facility By Side',

    '/Show All Book',

    '/Show Aircraft Summary',
    '/Show Ship Summary',
    '/Show Vehicle Summary',
    '/Show Casualities Summary',
    '/Show Facility Summary',
    '/Show Weapon Summary',

    '/Download Airplane Dataset',
    '/Download Ship Dataset',
    '/Download Weapon Dataset',
    '/Download Casualities Dataset',
    '/Download Event Dataset',
    '/Download Book Dataset'
];

bot.start( async (ctx) => {
    const userId = ctx.from.id
    ctx.reply(`Please choose an option in Menu:`, 
        Markup.keyboard(menuOptions.map(option => [option])).resize()
    );
});

bot.on('location', async (ctx) => {
    // Respond / Presenting data
    const present_respond = ['Showing','Let me show you the',"Here's the","I got the","See this","I gathered","I found"]
    const user_location = ctx.message.location
    const latitude = user_location.latitude
    const longitude = user_location.longitude

    if(latitude && longitude){
        const idx_rand_present = generateRandomNumber(1,present_respond.length)
        let [msg, page] = await repoShowNearestFacilities(latitude,longitude)
        ctx.reply(`${present_respond[idx_rand_present-1]} nearest facilities...\n\n${msg}<i>Info : For your privacy, we dont save your location 😉</i>`, {
            parse_mode:'HTML'
        })
    } else {
        ctx.reply(`Sorry, can't find your location`)
    }
})

bot.on('message', async (ctx) => {
    // Respond / Presenting data
    const present_respond = ['Showing','Let me show you the',"Here's the","I got the","See this","I gathered","I found"]

    const telegramId = ctx.from.id

    if (!ctx.session) ctx.session = {}

    if (ctx.message.text) {
        const message = ctx.message.text
        const idx_rand_present = generateRandomNumber(1,present_respond.length)

        if(message[0] == "/"){
            const index = menuOptions.indexOf(message)
            let msg, page

            switch (index) {
                case 0: // Show All Airplanes
                    [msg, page] = await repoAllAirplane(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes...\n\n${msg}`)
                    generatePaginationBot(ctx,page,'/Show All Airplane')
                    break
                case 1: // Show Total Airplane by Country
                    [msg, page] = await repoShowAirplanesByCountry()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes's country...\n\n${msg}`)
                    break
                case 2: // Show Total Airplane by Role
                    [msg, page] = await repoShowAirplanesByRole()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes's role...\n\n${msg}`)
                    break
                case 3: // Show Total Airplane by Sides
                    [msg, page] = await repoShowAirplanesBySides()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes's sides...\n\n${msg}`)
                    break;
                case 4: // Show Total Airplane by Manufacturer
                    [msg, page] = await repoShowAirplanesByManufacturer()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes's manufacturer...\n\n${msg}`)
                    break;

                case 5: // Show All Ships
                    [msg, page] = await repoAllShips(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all ships...\n\n${msg}`)
                    generatePaginationBot(ctx,page,'/Show All Ship')
                    break
                case 6: // Show Total Ships by Country
                    [msg, page] = await repoShowShipsByCountry();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all ship's country...\n\n${msg}`)
                    break
                case 7: // Show Total Ships by Class
                    [msg, page] = await repoShowShipsByClass()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all ship's class...\n\n${msg}`)
                    break
                case 8: // Show Total Ships by Sides
                    [msg, page] = await repoShowShipsBySides()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all ship's sides...\n\n${msg}`)
                    break

                case 9: // Show All Events
                    [msg, page] = await repoAllEvents(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all events...\n\n${msg}`)
                    generatePaginationBot(ctx,page,'/Show All Event')
                    break

                case 10: // Show All Weapons
                    [msg, page] = await repoAllWeapons(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all weapons...\n\n${msg}`)
                    generatePaginationBot(ctx,page,'/Show All Weapon')
                    break
                case 11: // Show Total Weapons by Country
                    [msg, page] = await repoShowWeaponsByCountry()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all weapons's country...\n\n${msg}`)
                    break
                case 12: // Show Total Weapons by Role
                    [msg, page] = await repoShowWeaponsByType();
                    ctx.reply(`${present_respond[idx_rand_present-1]} all weapons's type...\n\n${msg}`)
                    break
                case 13: // Show Total Weapons by Sides
                    [msg, page] = await repoShowWeaponsBySides()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all weapons's sides...\n\n${msg}`)
                    break

                case 14: // Show All Vehicles
                    [msg, page] = await repoAllVehicles(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles...\n\n${msg}`)
                    generatePaginationBot(ctx,page,'/Show All Vehicle')
                    break
                case 15: // Show Total Vehicle by Country
                    [msg, page] = await repoShowVehiclesByCountry()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles's country...\n\n${msg}`)
                    break
                case 16: // Show Total Vehicle by Role
                    [msg, page] = await repoShowVehiclesByRole()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles's role...\n\n${msg}`)
                    break
                case 17: // Show Total Vehicle by Sides
                    [msg, page] = await repoShowVehiclesBySides()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles's sides...\n\n${msg}`)
                    break

                case 18: // Show Total Facility by Country
                    [msg, page] = await repoShowFacilitiesByCountry()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all facilities's country...\n\n${msg}`)
                    break
                case 19: // Show Total Facility by Type
                    [msg, page] = await repoShowFacilitiesByType()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all facilities's type...\n\n${msg}`)
                    break
                case 20: // Show Total Facility by Sides
                    [msg, page] = await repoShowFacilitiesBySides()
                    ctx.reply(`${present_respond[idx_rand_present-1]} all facilities's sides...\n\n${msg}`)
                    break
                
                case 21: // Show All Book
                    [msg, page] = await repoAllBooks(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} all books...\n\n${msg}`)
                    generatePaginationBot(ctx,page,'/Show All Book')
                    break

                case 22: // Show Aircraft Summary
                    [msg, page] = await repoShowAirplaneSummary(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} aircraft summary...\n\n${msg}`,{ parse_mode:'html' })
                    break
                case 23: // Show Ship Summary
                    [msg, page] = await repoShowShipSummary(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} ship summary...\n\n${msg}`,{ parse_mode:'html' })
                    break
                case 24: // Show Vehicle Summary
                    [msg, page] = await repoShowVehicleSummary(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} vehicle summary...\n\n${msg}`,{ parse_mode:'html' })
                    break
                case 25: // Show Casualities Summary
                    [msg, page] = await repoShowCasualitiesSummary(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} casualities summary...\n\n${msg}`,{ parse_mode:'html' })
                    break
                case 26: // Show Facility Summary
                    [msg, page] = await repoShowFacilitySummary(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} facility summary...\n\n${msg}`,{ parse_mode:'html' })
                    break
                case 27: // Show Weapon Summary
                    [msg, page] = await repoShowWeaponSummary(ctx)
                    ctx.reply(`${present_respond[idx_rand_present-1]} weapon summary...\n\n${msg}`,{ parse_mode:'html' })
                    break
                
                case 28: // Generate Airplane CSV
                    [msg, path, filename] = await repoAirplaneDoc()
                    if(path == null){
                        ctx.reply(`Sorry, we're failed to generate the dataset of airplane`)
                    } else {
                        await ctx.replyWithDocument({
                            source: path,
                            filename: filename
                        });
                        fs.unlink(path, (err) => {
                            if (err) throw err
                        });
                    }
                    break
                case 29: // Generate Ship CSV
                    [msg, path, filename] = await repoShipDoc()
                    if(path == null){
                        ctx.reply(`Sorry, we're failed to generate the dataset of ship`)
                    } else {
                        await ctx.replyWithDocument({
                            source: path,
                            filename: filename
                        });
                        fs.unlink(path, (err) => {
                            if (err) throw err
                        });
                    }
                    break
                case 30: // Generate Weapon CSV
                    [msg, path, filename] = await repoWeaponDoc()
                    if(path == null){
                        ctx.reply(`Sorry, we're failed to generate the dataset of weapon`)
                    } else {
                        await ctx.replyWithDocument({
                            source: path,
                            filename: filename
                        });
                        fs.unlink(path, (err) => {
                            if (err) throw err
                        });
                    }
                    break
                case 31: // Generate Casualities CSV
                    [msg, path, filename] = await repoCasualitiesDoc()
                    if(path == null){
                        ctx.reply(`Sorry, we're failed to generate the dataset of casualities`)
                    } else {
                        await ctx.replyWithDocument({
                            source: path,
                            filename: filename
                        });
                        fs.unlink(path, (err) => {
                            if (err) throw err
                        });
                    }
                    break
                case 32: // Generate Event CSV
                    [msg, path, filename] = await repoEventDoc()
                    if(path == null){
                        ctx.reply(`Sorry, we're failed to generate the dataset of event`)
                    } else {
                        await ctx.replyWithDocument({
                            source: path,
                            filename: filename
                        });
                        fs.unlink(path, (err) => {
                            if (err) throw err
                        });
                    }
                    break
                case 33: // Generate Book CSV
                    [msg, path, filename] = await repoBookDoc()
                    if(path == null){
                        ctx.reply(`Sorry, we're failed to generate the dataset of book`)
                    } else {
                        await ctx.replyWithDocument({
                            source: path,
                            filename: filename
                        });
                        fs.unlink(path, (err) => {
                            if (err) throw err
                        });
                    }
                    break
                default:
                    ctx.reply(`Sorry I'dont know your command`)
                    break
            }
        } else if(message === 'Back to Main Menu'){
            ctx.reply(`Please choose an option in Menu:`, 
                Markup.keyboard(menuOptions.map(option => [option])).resize()
            );
        } else if (/^Page \d+ - \/Show All (Airplane|Ship|Event|Weapon|Vehicle|Book)$/.test(message)) {
            const parts = message.split(' - ')
            const selectedPage = parseInt(parts[0].split(' ')[1])
            const topic = parts[1]
            ctx.session.currentPage = selectedPage
            let msg, page

            if(topic === '/Show All Airplane'){
                [msg, page] = await repoAllAirplane(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all airplanes...\n\n${msg}`)
                generatePaginationBot(ctx, page, '/Show All Airplane')
            } else if(topic === '/Show All Ship'){
                [msg, page] = await repoAllShips(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all ships...\n\n${msg}`)
                generatePaginationBot(ctx, page, '/Show All Ship')
            } else if(topic === '/Show All Event'){
                [msg, page] = await repoAllEvents(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all events...\n\n${msg}`)
                generatePaginationBot(ctx, page, '/Show All Event')
            } else if(topic === '/Show All Weapon'){
                [msg, page] = await repoAllWeapons(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all weapons...\n\n${msg}`)
                generatePaginationBot(ctx, page, '/Show All Weapon')
            } else if(topic === '/Show All Vehicle'){
                [msg, page] = await repoAllVehicles(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all vehicles...\n\n${msg}`)
                generatePaginationBot(ctx, page, '/Show All Vehicle')
            } else if(topic === '/Show All Book'){
                [msg, page] = await repoAllBooks(ctx)
                ctx.reply(`${present_respond[idx_rand_present-1]} all books...\n\n${msg}`)
                generatePaginationBot(ctx, page, '/Show All Book')
            }

            ctx.reply(`Opened page ${selectedPage}`);
        } else {
            ctx.reply(`Unknown command. Please try again`)
        }
    } 
});

bot.launch().then(() => {
    console.log('Bot started')
}).catch((err) => {
    console.error('Error starting bot:', err)
});
