const TelegramApi = require('node-telegram-bot-api')
const token = '1866384683:AAGdGiOeU-1GxDpBs68e0ZBFyPp5FfFaW6Q'

const bot = new TelegramApi(token, {polling: true})

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Выпьем пивка?', callback_data: '1'}],
            [{text: 'Сольюсь..', callback_data: '2'}]
        ]
    })
}

bot.setMyCommands([
    {command: '/start', description: 'Приветствие'},
    {command: '/game', description: 'Выпить'}
])

bot.on('message', async msg => {
    const text = msg.text
    const name = msg.from.first_name
    const chatId = msg.chat.id
    if (text === '/start') {
        await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/8.webp`)
        return bot.sendMessage(chatId, `Привет, ${name}. Добро пожаловать в гости!`)
    }
    if (text === '/game') {
        return bot.sendMessage(chatId, `Есть время? Ну погнали.`, gameOptions)
    }
    return bot.sendMessage(chatId, `Ну привет, ${name}. Ты написал мне ${text}`)
    console.log(msg)
})

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    if (data === '1') {
        await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/192/46.webp`)
        return bot.sendMessage(chatId, `Азуенно. Бегу охлаждать. Тебе какое?`)
    }
    if (data === '2') {
        await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/10.webp`)
        return bot.sendMessage(chatId, `Досвидули`)
    }
})