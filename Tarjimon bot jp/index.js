
require('dotenv').config();
require('dotenv').config();

console.log('BOT_TOKEN:', process.env.BOT_TOKEN); 

const TelegramBot = require('node-telegram-bot-api');
const translate = require('@vitalets/google-translate-api');

const token = '7723363818:AAFrBN4PrfkqOR_gjP7MyGr3XORqN667QlA';

const bot = new TelegramBot(token, { polling: true });

console.log(' Bot ishga tushdi...');

const dictionary = {
  'salom': 'こんにちは (Konnichiwa)',
  'xayr': 'さようなら (Sayounara)',
  'qandaysiz': 'お元気ですか？ (Ogenki desu ka?)',
  'rahmat': 'ありがとう (Arigatou)',
  'iltimos': 'お願いします (Onegaishimasu)',
  'uzr': 'すみません (Sumimasen)',
  'ha': 'はい (Hai)',
  'yo‘q': 'いいえ (Iie)',
  'mening ismim ...': '私の名前は...です (Watashi no namae wa ... desu)',
  'men o‘zbekistonlikman': '私はウズベキスタン人です (Watashi wa Uzubekisutan-jin desu)',
  'siz yaponmisiz?': 'あなたは日本人ですか？ (Anata wa Nihonjin desu ka?)',
  'qayerdansiz?': 'どこから来ましたか？ (Doko kara kimashita ka?)',
  'men ... danman': '私は...から来ました (Watashi wa ... kara kimashita)',
  'sizni ko‘rib xursandman': 'お会いできて嬉しいです (Oai dekite ureshii desu)',
  'xayrli tong': 'おはようございます (Ohayou gozaimasu)',
  'xayrli kun': 'こんにちは (Konnichiwa)',
  'xayrli tun': 'おやすみなさい (Oyasuminasai)',
  'nechchi soat?': '今何時ですか？ (Ima nanji desu ka?)',
  'bu nech pul turadi?': 'これはいくらですか？ (Kore wa ikura desu ka?)',
  'men tushunmadim': 'わかりません (Wakarimasen)',
  'tushunaman': 'わかります (Wakarimasu)',
  'bu nima?': 'これは何ですか？ (Kore wa nan desu ka?)',
  'men ovqatlanmoqchiman': '食事をしたいです (Shokuji o shitai desu)',
  'och qoldim': 'お腹がすきました (Onaka ga sukimashita)',
  'chanqadim': '喉が渇きました (Nodo ga kawakimashita)',
  'ovqat mazali edi': '美味しかったです (Oishikatta desu)',
  'men ketdim': '行きます (Ikimasu)',
  'men keldim': '来ました (Kimashita)',
  'hozir emas': '今ではありません (Ima dewa arimasen)',
  'ertaga uchrashamiz': 'また明日会いましょう (Mata ashita aimashou)',
  'ko‘rishguncha': 'またね (Mata ne)',
  'yo‘qol': '失せろ (Usero)', // sal keskin!
  'to‘g‘ri': '正しいです (Tadashii desu)',
  'xato': '間違いです (Machigai desu)',
  'bu meniki': 'これは私のものです (Kore wa watashi no mono desu)',
  'sizning ismingiz nima?': 'あなたの名前は何ですか？ (Anata no namae wa nan desu ka?)',
  'men sizni yaxshi ko‘raman': 'あなたのことが好きです (Anata no koto ga suki desu)',
  'mening oilam katta': '私の家族は大きいです (Watashi no kazoku wa ookii desu)',
  'maktabga boraman': '学校に行きます (Gakkou ni ikimasu)',
  'men ishlayman': '働いています (Hatarai teimasu)',
  'men o‘qiyman': '勉強しています (Benkyou shiteimasu)',
  'kitob o‘qiyman': '本を読みます (Hon o yomimasu)',
  'uyga ketdim': '家に帰りました (Ie ni kaerimashita)',
  'bugun chiroyli kun': '今日は良い天気です (Kyou wa ii tenki desu)',
  'ertaga yomg‘ir yog‘adi': '明日は雨です (Ashita wa ame desu)',
  'men kasalman': '病気です (Byouki desu)',
  'shoshilmayapman': '急いでいません (Isoideimasen)',
  'tezroq': 'もっと早く (Motto hayaku)',
  'sekinroq': 'もっとゆっくり (Motto yukkuri)',
  'ko‘mak bering': '助けてください (Tasukete kudasai)',
  'men yo‘qolib qoldim': '道に迷いました (Michi ni mayoimashita)',
  'men sizni tushunmayapman': 'あなたの言っていることがわかりません (Anata no itte iru koto ga wakarimasen)',
  'iltimos, takrorlang': 'もう一度言ってください (Mou ichido itte kudasai)',
  'meni kechiring': 'ごめんなさい (Gomen nasai)',
  'bu menga yoqdi': 'これが好きです (Kore ga suki desu)',
  'menga yoqmadi': '好きではありません (Suki dewa arimasen)',
  'qani ketdik': '行きましょう (Ikimashou)',
  'marhamat': 'どうぞ (Douzo)',
  'bu juda qimmat': '高すぎます (Takasugimasu)',
  'arzonroq bormi?': 'もっと安いのはありますか？ (Motto yasui no wa arimasu ka?)',
  'men naqd to‘layman': '現金で払います (Genkin de haraimasu)',
  'men karta bilan to‘layman': 'カードで払います (Kaado de haraimasu)',
  'telefonim yo‘q': '携帯がありません (Keitai ga arimasen)',
  'wi-fi bormi?': 'Wi-Fiはありますか？ (Wi-Fi wa arimasu ka?)',
  'ruxsat bormi?': '許可はありますか？ (Kyoka wa arimasu ka?)',
  'sizga savolim bor': '質問があります (Shitsumon ga arimasu)',
  'tushunarlimi?': 'わかりましたか？ (Wakarimashita ka?)',
  'yozib bering': '書いてください (Kaite kudasai)',
  'o‘qing': '読んでください (Yonde kudasai)',
  'qayerda hojatxona?': 'トイレはどこですか？ (Toire wa doko desu ka?)',
  'men kutyapman': '待っています (Matteimasu)',
  'meni kuzating': '見送ってください (Miokutte kudasai)',
  'bugun yakshanba': '今日は日曜日です (Kyou wa nichiyoubi desu)',
  'dam olish kuni': '休日です (Kyuujitsu desu)',
  'tinchlikmi?': '平気ですか？ (Heiki desu ka?)',
  'xavotir olmang': '心配しないでください (Shinpai shinaide kudasai)',
  'qo‘rqmayman': '怖くないです (Kowakunai desu)',
  'men buni bilmayman': '知りません (Shirimasen)',
  'men buni bilaman': '知っています (Shitteimasu)',
  'u mening do‘stim': '彼は私の友達です (Kare wa watashi no tomodachi desu)',
  'sizni hurmat qilaman': 'あなたを尊敬します (Anata o sonkei shimasu)',
  'tez orada ko‘rishamiz': 'またすぐに会いましょう (Mata sugu ni aimashou)',
  'ha, mumkin': 'はい、可能です (Hai, kanou desu)',
  'yo‘q, mumkin emas': 'いいえ、不可能です (Iie, fukanou desu)',
  'kelganingiz uchun rahmat': '来てくれてありがとう (Kite kurete arigatou)',
  'men boraman': '行きます (Ikimasu)',
  'qaytib kelaman': '戻ってきます (Modotte kimasu)',
  'ko‘rishguncha xayr': 'またお会いしましょう (Mata oaishimashou)',
  'va albatta': 'もちろん (Mochiron)',
  'bilmayman': '知りません (Shirimasen)',
  'javob bering': '答えてください (Kotaete kudasai)',
  'o‘ylayman': '考えています (Kangaeteimasu)',
  'bu qiziq': '面白いですね (Omoshiroi desu ne)',
};

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    ` Salom, ${msg.from.first_name}!\n\nMen Yapon tili tarjimon botiman.\n\n Siz matn yuborsangiz, men uni yapon tiliga tarjima qilaman.\n\nAgar matn faqat bitta so‘z bo‘lsa (masalan: "salom", "kitob"), men uni o‘z lug‘atimdan tarjima qilaman.\n\nYuboring!`
  );
});


bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim().toLowerCase();

  
  if (!text || text.startsWith('/')) return;


  if (dictionary[text]) {
    bot.sendMessage(chatId, ` So‘z tarjimasi:\n<b>${text}</b> → ${dictionary[text]}`, {
      parse_mode: 'HTML',
    });
    return;
  }


  try {
    const res = await translate(text, { to: 'ja' });
    bot.sendMessage(chatId, `🇯🇵 Yaponcha tarjima:\n${res.text}`);
  } catch (error) {
    console.error('Tarjima xatosi:', error);
    bot.sendMessage(chatId, ' Tarjima qilishda xatolik yuz berdi');
  }
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/translate', async (req, res) => {
  const word = req.query.word?.toLowerCase()?.trim();

  if (!word) {
    return res.status(400).json({ error: 'So‘z yuboring: /translate?word=salom' });
  }

  if (dictionary[word]) {
    return res.json({
      type: 'dictionary',
      input: word,
      translation: dictionary[word]
    });
  }
  try {
    const result = await translate(word, { to: 'ja' });
    return res.json({
      type: 'google',
      input: word,
      translation: result.text
    });
  } catch (err) {
    console.error('API tarjima xatosi:', err);
    return res.status(500).json({ error: 'Tarjima qilishda xatolik yuz berdi' });
  }
});

app.listen(PORT, () => {
  console.log(` API server http://localhost:${PORT} da ishga tushdi`);
});
