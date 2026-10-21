import {
  RomancePartner,
  RomanceDateEvent,
  PartnerAffectionState,
  EquippedFashion,
  FashionItem,
  ItemRarity,
} from '../types';
import { FASHION_ITEMS_CATALOG } from './gameData';

export const ROMANCE_PARTNERS: RomancePartner[] = [
  // ================= 1. 水無月 葵 (AOI MINAZUKI) - ツンデレ幼馴染 (Female for Male Player) =================
  {
    id: 'aoi',
    name: '水無月 葵',
    romajiName: 'Aoi Minazuki',
    title: 'ツンデレ幼馴染',
    gender: 'female',
    preferredPlayerGender: 'male',
    age: '17歳（同級生）',
    personality: '強がりだけど実はピュア。お風呂上がりのあなたのいい香りに胸の高鳴りを隠せない。',
    description: 'いつも「ちゃんとお風呂入りなさいよ！」と口うるさい幼馴染。あなたがキレイになると急に照れ始める。',
    favoriteScentCategory: 'citrus',
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-500/20 via-pink-500/10 to-amber-500/10',
    avatarTheme: {
      hairColor: '#e11d48',
      eyeColor: '#be123c',
      themeColor: '#fb7185',
    },
    dialogues: {
      greeting: [
        'な、何よ…？アンタと話す時間くらい、作ってあげてもいいけど…！',
        '今日もちゃんとお風呂入る準備してる？…清潔な男の子の方が、その…好きだし。',
        'べ、別にアンタの顔が見たくて待ってたわけじゃないんだからねっ！',
      ],
      freshBathReaction: [
        'っ…！お風呂上がり…？ふわってすごくいい匂いがして…ドキッとしちゃったじゃない…バカ…///',
        'お、お肌つるつるじゃん…！なんかいつもよりカッコよく見えて…悔しいけど見惚れちゃう…！',
        'いい香り…柑橘系と石鹸の爽やかな香り…もう、急に顔近づけないでよ…胸が苦しい…♡',
      ],
      stinkyReaction: [
        'きゃっ…！ちょっと待って！アンタ、お風呂サボったでしょ！？',
        'うぅ…汗っぽくて近寄れないよ…！早くお湯に浸かってピカピカになってきて！待ってるから…！',
        'そんなボサボサな姿見せられたら悲しいよ…早くお風呂入って…？お願い。',
      ],
      touchHeadReaction: [
        'な、何急に頭ぽんぽんしてんのよ…！？子ども扱いしないで…（でも…ちょっと嬉しいかも…）',
        'あ…アンタの手、お風呂上がりの石鹸の香りがして…落ち着くかも…///',
      ],
      touchBodyReaction: [
        'ひゃっ！？ど、どこ触ってんのよエッチ…！…でも、アンタになら…別に嫌じゃないけど…///',
      ],
      highRarityFashionPraise: {
        hair_mens_god: 'その髪型…『神聖のシャインフェード』！？眩しすぎて直視できない…カッコよすぎ…///',
        hair_mens_wolf: 'わ…『スタイリッシュウルフ』似合いすぎでしょ！思わずドキッとしちゃったじゃん…！',
        royal_scent_robe: 'その『至高のアロマローブ』…オーラがすごくて、まるで王子様みたい…隣歩くの照れるよ…！',
        angel_bubble_aura: '天使のオーラ…！？アンタ、どんだけお風呂極めてるのよ…神々しくてドキドキする…♡',
        sacred_bath_staff: 'そのステッキ、めちゃくちゃレアなやつじゃん！すごい…自慢の幼馴染なんだから！',
      },
      generalFashionPraise: [
        'ふ、ふーん…その服、なかなかセンスいいんじゃない？…結構似合ってるし、好きかも。',
        'おしゃれに気を使う男の子って素敵よね…今日のアンタ、いつもよりずっと魅力的よ！',
      ],
      intimacyLevelUp: [
        'アンタといると、なんだか胸がずっとぽかぽかするの…これって…お風呂のせいだけじゃないよね？',
        'もう…！アンタがどんどん素敵になるから、目が離せなくなっちゃったじゃない…責任取ってよね！',
      ],
      confession: '…あのね、ずっと言えなかったんだけど…アンタが毎日頑張ってお風呂入って、カッコよくなっていくの、一番近くで見てたんだよ。…私、アンタのことが…大好き。これからもずっと、隣にいてね…？♡',
    },
  },

  // ================= 2. 橘 雫 (SHIZUKU TACHIBANA) - 癒やし系お姉さん (Female for Male Player) =================
  {
    id: 'shizuku',
    name: '橘 雫',
    romajiName: 'Shizuku Tachibana',
    title: '癒やしの清楚系お姉さん',
    gender: 'female',
    preferredPlayerGender: 'male',
    age: '20歳（アロマセラピスト見習い）',
    personality: '優しく包容力があり、お風呂や香りにとても詳しい。あなたを褒めて癒やすのが大好き。',
    description: '穏やかな笑顔で迎えてくれるお姉さん。お風呂上がりのあなたに優しく寄り添ってくれる。',
    favoriteScentCategory: 'floral',
    accentColor: '#06b6d4',
    bgGradient: 'from-cyan-500/20 via-sky-500/10 to-indigo-500/10',
    avatarTheme: {
      hairColor: '#0284c7',
      eyeColor: '#0369a1',
      themeColor: '#38bdf8',
    },
    dialogues: {
      greeting: [
        'ふふっ、いらっしゃい。今日も一日お疲れ様でした。ゆっくりお話ししましょうね♪',
        'あなたのお顔を見たら、なんだかほっと心が温かくなっちゃいました。',
        '今日はお気に入りの入浴剤、使ってみましたか？あなたの癒やしの時間になりますように…',
      ],
      freshBathReaction: [
        'まあ…！とっても清潔で素敵な香り…♡ 思わずぎゅって抱きしめたくなっちゃいます…♪',
        'お肌が透き通るように綺麗…！毎日の入浴の成果ですね。触れてみても…いいですか？',
        'ふふ、お風呂上がりのあなた、とっても色っぽくて素敵ですよ…私、ドキドキしちゃってます♡',
      ],
      stinkyReaction: [
        'あらら…今日は少しお疲れでお風呂サボっちゃいましたか？',
        '無理しないでくださいね。でも、温かい湯船に浸かれば、きっと心も体も軽くなりますよ…待ってますね。',
      ],
      touchHeadReaction: [
        'ふふっ、甘えん坊さんですね♪ あなたの髪、ふわふわでとっても良い香りがします…',
      ],
      touchBodyReaction: [
        'あっ…ふふ、私のことそんなに見つめられたら…照れちゃいますよ？♡',
      ],
      highRarityFashionPraise: {
        hair_mens_god: '神聖な輝き…！まるで神話の主人公のようで、胸がキュンとしてしまいました…♡',
        hair_mens_center: 'センターパート、すごく大人っぽくて色気がありますね…見惚れちゃいます。',
        royal_scent_robe: 'なんて気品に溢れたお衣装…！私をエスコートしてくださる王子様のようです♪',
        angel_bubble_aura: '天使の泡オーラが優しく包んでいて…あなたから幸せな光が溢れていますね。',
      },
      generalFashionPraise: [
        '今日のコーディネート、とっても爽やかでお似合いですよ。あなたのセンス、大好きです♪',
      ],
      intimacyLevelUp: [
        'あなたと過ごす時間が、私にとって一番の癒やしになりました…もっと近くにいてもいいですか？',
      ],
      confession: 'いつも私を笑顔にしてくれるあなた…もう弟のように見ることなんてできません。私、あなたが心から好きです。これからは恋人として、あなたの一番近くで癒やしてあげたいな…♡',
    },
  },

  // ================= 3. 一条 蓮 (REN ICHIJO) - クール系一途男子 (Male for Female Player) =================
  {
    id: 'ren',
    name: '一条 蓮',
    romajiName: 'Ren Ichijo',
    title: 'クールな一途男子',
    gender: 'male',
    preferredPlayerGender: 'female',
    age: '17歳（同級生）',
    personality: '口数は少ないが誠実で一途。あなたの湯上がりの可愛さやお洒落な姿に人一倍ドキドキしている。',
    description: '普段は冷静沈着だが、あなたの前では照れ隠しで視線を逸らしてしまう純情なイケメン。',
    favoriteScentCategory: 'soap',
    accentColor: '#6366f1',
    bgGradient: 'from-indigo-500/20 via-violet-500/10 to-sky-500/10',
    avatarTheme: {
      hairColor: '#1e1b4b',
      eyeColor: '#4338ca',
      themeColor: '#818cf8',
    },
    dialogues: {
      greeting: [
        '…よ。待ってた。…べつに早く会いたかったわけじゃないけど。',
        'お前が来ると…なんか落ち着く。今日もちゃんと話していけよ。',
        '…風邪ひいてないか？今日もしっかり湯船で温まってこいよな。',
      ],
      freshBathReaction: [
        'っ…！お前、風呂上がりか…？髪からすげぇいい匂いして…顔、近すぎて直視できねぇ…///',
        '肌…めちゃくちゃツヤツヤだな。湯上がりのお前、反則なくらい可愛いから…他の奴に見せるなよ？',
        'ふっ…いい香りだな。石鹸の優しい香り…抱きしめたら怒るか…？…冗談だよ、バカ。///',
      ],
      stinkyReaction: [
        'おい…今日風呂入ってないだろ。目の下にクマできてるぞ。',
        '疲れてるなら俺が背中押してやるから、今すぐシャワー浴びてこい。待っててやるからさ。',
      ],
      touchHeadReaction: [
        '…なにしてんだよ。頭撫でられるの、嫌いじゃねぇけど…男としてのプライドが…///',
      ],
      touchBodyReaction: [
        'おい…急に触るな。…お前が無防備だと、俺だって理性保つの大変なんだからな…？',
      ],
      highRarityFashionPraise: {
        hair_aurora_long: 'その『オーロラシャインロング』…ヤバいな。息を呑むくらい綺麗で見惚れた。',
        spa_dress: 'そのドレス…すごく似合ってる。綺麗すぎて…誰にも見せたくないくらいだ。',
        rainbow_tiara: 'ティアラ、めちゃくちゃ輝いてるな。…俺だけのプリンセスになってくれないか？',
        angel_bubble_aura: '天使のオーラ…本物の天使かと思った。お前、本当に綺麗だよ。',
      },
      generalFashionPraise: [
        'その格好、似合ってるよ。お前のセンス、俺は好きだけどな。',
      ],
      intimacyLevelUp: [
        '…気づいてるか？俺、お前の前だと全然クールでいられないんだよ。お前のせいだからな。',
      ],
      confession: '…もう誤魔化すのやめる。俺はお前のことが好きだ。お前が風呂に入って綺麗になっていく姿も、笑う顔も、全部俺だけのものにしたい。…俺の彼女になってくれ。',
    },
  },

  // ================= 4. 皇 颯太 (SOTA SUMERAGI) - 爽やか年下わんこ系 (Male for Female Player) =================
  {
    id: 'sota',
    name: '皇 颯太',
    romajiName: 'Sota Sumeragi',
    title: '爽やか年下後輩男子',
    gender: 'male',
    preferredPlayerGender: 'female',
    age: '16歳（部活の後輩）',
    personality: '素直で人懐っこく、感情がすぐ顔に出る。「先輩が一番可愛い！」と全力でアピールしてくる。',
    description: 'あなたのことが大好きな後輩。お風呂上がりのピカピカな先輩に目を輝かせて駆け寄ってくる。',
    favoriteScentCategory: 'marine',
    accentColor: '#0284c7',
    bgGradient: 'from-sky-500/20 via-teal-500/10 to-amber-500/10',
    avatarTheme: {
      hairColor: '#075985',
      eyeColor: '#0284c7',
      themeColor: '#38bdf8',
    },
    dialogues: {
      greeting: [
        '先輩〜っ！会いたかったです！今日も一緒にいっぱいお話ししてくださいね！✨',
        '先輩の笑顔見られたから、今日の部活も絶好調でした！',
        '先輩、今日のお風呂ミッションはなんですか？僕も一緒に応援しますっ！',
      ],
      freshBathReaction: [
        'わあぁっ…！先輩、お風呂上がりですか！？すっごくイイ匂いでクラクラしちゃいます…っ！♡',
        '先輩のお肌、赤ちゃんみたいにぷるぷるです…！眩しすぎて好きが溢れちゃいますよぉ…！',
        'えへへ、お風呂上がりの先輩とこんなに近くにいられるなんて…夢みたいですっ！ギュッてしていいですか！？',
      ],
      stinkyReaction: [
        '先輩…？もしかしてお風呂サボっちゃいましたか…？',
        '先輩が元気ないと僕も寂しいです…！温かいお風呂でリフレッシュしてきてください！ずっと待ってますから！',
      ],
      touchHeadReaction: [
        'えへへっ、先輩に撫でられるの大好きです〜！もっといっぱい撫でてくださいっ♪',
      ],
      touchBodyReaction: [
        'わわっ！先輩、急に触られたら心臓バクバクで爆発しちゃいますっ…！でも…嬉しいです…♡',
      ],
      highRarityFashionPraise: {
        hair_aurora_long: '先輩の髪、キラキラでオーロラみたい…！世界で一番美しいお姫様ですっ！✨',
        spa_dress: 'そのドレス、ものすごく可愛いです…！先輩に見惚れすぎて倒れそうでした…！',
        rainbow_tiara: 'ティアラが最高に輝いてます！僕が一生先輩の騎士（ナイト）としてお守りしますっ！',
        angel_bubble_aura: '天使の羽が生えてるみたいです…！天使先輩、僕をお風呂の天国に連れてってください〜！',
      },
      generalFashionPraise: [
        '先輩、今日の服もすっごくおしゃれで可愛いです！さすが僕の大好きな先輩ですっ！',
      ],
      intimacyLevelUp: [
        '先輩といると毎日がキラキラしてて…僕、先輩なしの毎日は考えられません！',
      ],
      confession: '先輩！僕、もう後輩のフリするのやめます。僕を男として見てください。先輩のことが世界で一番大好きです！絶対に幸せにするので、僕と付き合ってくださいっ…！♡',
    },
  },
];

// ================= DATING EVENTS (ROMANCE SCENARIOS) =================
export const ROMANCE_DATE_EVENTS: RomanceDateEvent[] = [
  // AOI DATES
  {
    id: 'aoi_date_1',
    partnerId: 'aoi',
    title: '湯上がりの夕暮れ帰り道',
    requiredIntimacyLevel: 2,
    description: 'お風呂上がりのほてった体で、二人きりの帰り道を歩くドキドキのひととき。',
    icon: '🌇',
    location: '夕焼けの通学路',
    rewardExp: 150,
    rewardTickets: 2,
    script: [
      { speaker: '水無月 葵', text: '…夕風が気持ちいいね。アンタとお風呂上がりにこうして歩くの、久しぶりかも。', expression: 'normal' },
      { speaker: '水無月 葵', text: 'ていうか…アンタ、さっきから石鹸のすっごくいい匂いさせてるから…意識しちゃうじゃん…バカ…///', expression: 'blushing' },
      {
        speaker: 'あなた',
        text: '葵の髪もいい匂いするよ',
        isChoice: true,
        choices: [
          { text: '葵の髪もすごくいい匂いするよ', affectionBonus: 30, reply: 'な、何言ってんのよ急に…！アンタの好みのシトラスシャンプー使っただけなんだからね…///' },
          { text: 'お風呂に入ると気持ちいいよね！', affectionBonus: 20, reply: 'ふふっ、そうね。アンタが毎日ちゃんとお風呂入ってくれて、なんだか嬉しいよ。' },
        ],
      },
      { speaker: '水無月 葵', text: '…あのね、これからも…こうやって一緒に帰ってくれる…？', expression: 'loving' },
    ],
  },
  {
    id: 'aoi_date_2',
    partnerId: 'aoi',
    title: '週末の温泉足湯カフェ',
    requiredIntimacyLevel: 3,
    description: '二人きりで足湯カフェへ。隣に座る葵の距離が近すぎて…！？',
    icon: '☕',
    location: '足湯テラスカフェ',
    rewardExp: 250,
    rewardTickets: 3,
    script: [
      { speaker: '水無月 葵', text: 'わあ…！足湯、すっごく温かくて気持ちいい〜！お肌すべすべになりそう！', expression: 'happy' },
      { speaker: '水無月 葵', text: '…ねえ、ちょっと距離近くない？アンタの肩が触れてるんだけど…///', expression: 'blushing' },
      {
        speaker: 'あなた',
        text: 'もっと近くに寄ってもいい？',
        isChoice: true,
        choices: [
          { text: '葵の手、繋いでもいい？', affectionBonus: 40, reply: 'っ…！だ、ダメって言ったら…怒る？…ぎゅって握っててよ…離さないでね///' },
          { text: '二人で来られて嬉しいよ', affectionBonus: 25, reply: 'わ、私も…アンタと来られて…すっごく幸せだよ。' },
        ],
      },
      { speaker: '水無月 葵', text: 'お風呂も足湯も…アンタと一緒だから、こんなに特別に感じるんだと思う…♡', expression: 'loving' },
    ],
  },
  {
    id: 'aoi_date_3',
    partnerId: 'aoi',
    title: '運命の告白〜湯煙の星空の下で〜',
    requiredIntimacyLevel: 5,
    description: '親密度MAX！満天の星空の下、葵からの真剣で甘い告白イベント。',
    icon: '💍',
    location: '星空の展望露天風呂テラス',
    rewardExp: 500,
    rewardTickets: 5,
    script: [
      { speaker: '水無月 葵', text: '星空…すっごく綺麗だね。湯煙に星の光が反射して、まるで魔法みたい…', expression: 'normal' },
      { speaker: '水無月 葵', text: '…ねえ。私ね、アンタがどんどん垢抜けて、カッコよくなっていく姿をずっと見てきたの。', expression: 'blushing' },
      { speaker: '水無月 葵', text: '最初は幼馴染だったのに…いつの間にか、アンタの笑顔や香りに、胸が締め付けられるようになって…', expression: 'blushing' },
      { speaker: '水無月 葵', text: 'もう幼馴染のままじゃいられないよ。…私、アンタのことが誰よりも大好き。私の彼氏になってくれますか…？♡', expression: 'loving' },
    ],
  },

  // REN DATES
  {
    id: 'ren_date_1',
    partnerId: 'ren',
    title: '湯上がりのアイスクリーム',
    requiredIntimacyLevel: 2,
    description: 'お風呂上がりに待ち合わせ。アイスを食べながら見せる蓮の素顔。',
    icon: '🍨',
    location: '夜風のベンチ',
    rewardExp: 150,
    rewardTickets: 2,
    script: [
      { speaker: '一条 蓮', text: '…はい、お前の好きなアイス。風呂上がりに食べると美味いんだろ。', expression: 'normal' },
      { speaker: '一条 蓮', text: '…それにしても、お前、湯上がりだといつもより目がキラキラしてて…可愛いな。', expression: 'blushing' },
      {
        speaker: 'あなた',
        text: '蓮のおかげでお風呂がんばれてるよ',
        isChoice: true,
        choices: [
          { text: '蓮も一口食べる？', affectionBonus: 35, reply: '…間接キス、気にしてないのか？…じゃあ、遠慮なくもらう。…甘くて美味しいよ。' },
          { text: '蓮に褒められると嬉しい！', affectionBonus: 25, reply: '…バカ。本当のこと言っただけだろ。照れるなよ…///' },
        ],
      },
      { speaker: '一条 蓮', text: 'お前が綺麗になっていくの…嬉しいけど、他の男に取られないか心配になるよ。', expression: 'loving' },
    ],
  },
  {
    id: 'ren_date_2',
    partnerId: 'ren',
    title: '二人きりのアロマリラクゼーション',
    requiredIntimacyLevel: 3,
    description: 'アロマの香りに包まれながら、蓮があなたの手を取って…！？',
    icon: '🕯️',
    location: 'キャンドルナイトカフェ',
    rewardExp: 250,
    rewardTickets: 3,
    script: [
      { speaker: '一条 蓮', text: 'いい香りだな。お前の好きなラベンダーの香り…落ち着く。', expression: 'normal' },
      { speaker: '一条 蓮', text: '…なあ、手貸して。お風呂上がりでお前の手、温かくてすべすべだな。', expression: 'blushing' },
      {
        speaker: 'あなた',
        text: '蓮の手も温かいね',
        isChoice: true,
        choices: [
          { text: '恋人繋ぎにしてもいい…？', affectionBonus: 40, reply: '…自分から誘うなんて、生意気。…ギュッて離さないから覚悟しろよ。' },
          { text: '蓮といると安心するな', affectionBonus: 25, reply: '俺もだよ。お前といる時が、一番自然体でいられる。' },
        ],
      },
      { speaker: '一条 蓮', text: '…もう、お前のこと友達として見られない。覚悟しとけよ。', expression: 'loving' },
    ],
  },
  {
    id: 'ren_date_3',
    partnerId: 'ren',
    title: '運命の誓い〜夜景とアロマの光の中で〜',
    requiredIntimacyLevel: 5,
    description: '親密度MAX！クールな蓮が感情を溢れさせる情熱的な告白イベント。',
    icon: '💖',
    location: '夜景の見えるスカイラウンジ',
    rewardExp: 500,
    rewardTickets: 5,
    script: [
      { speaker: '一条 蓮', text: '今日はお前と二人きりで来られて良かった。…夜景より、お前の方がずっと綺麗だ。', expression: 'normal' },
      { speaker: '一条 蓮', text: 'お前が毎日お風呂入って、どんどん美しくなっていく姿…ずっと隣で見てきた。', expression: 'blushing' },
      { speaker: '一条 蓮', text: '…俺、お前を誰にも渡したくない。世界で一番お前を愛してる。', expression: 'blushing' },
      { speaker: '一条 蓮', text: '俺だけの恋人になってくれ。一生、お前を大切にする。…いいか？♡', expression: 'loving' },
    ],
  },
];

// ================= HELPER FUNCTIONS =================

export function getPartner(partnerId: string): RomancePartner {
  return (
    ROMANCE_PARTNERS.find((p) => p.id === partnerId) || ROMANCE_PARTNERS[0]
  );
}

export function getDefaultPartnerForGender(gender: 'female' | 'male' | 'style_a' | 'style_b'): RomancePartner {
  if (gender === 'male' || gender === 'style_b') {
    // Male player -> Female partner Aoi
    return ROMANCE_PARTNERS[0];
  }
  // Female player -> Male partner Ren
  return ROMANCE_PARTNERS[2];
}

export function getDefaultPartnerAffectionMap(): { [partnerId: string]: PartnerAffectionState } {
  const map: { [partnerId: string]: PartnerAffectionState } = {};
  ROMANCE_PARTNERS.forEach((p) => {
    map[p.id] = {
      partnerId: p.id,
      intimacyPoints: 50, // Initial friendly starting intimacy
      intimacyLevel: 1,
      unlockedDateEventIds: [],
      completedDateEventIds: [],
    };
  });
  return map;
}

export const INTIMACY_LEVEL_THRESHOLDS = [
  { level: 1, minPoints: 0, title: '知り合い・友達', icon: '🌱', bonusMultiplier: 1.0 },
  { level: 2, minPoints: 100, title: '気になる存在', icon: '🌸', bonusMultiplier: 1.2 },
  { level: 3, minPoints: 250, title: 'ドキドキ両想い', icon: '💓', bonusMultiplier: 1.5 },
  { level: 4, minPoints: 500, title: '特別な絆・恋人未満', icon: '✨', bonusMultiplier: 1.8 },
  { level: 5, minPoints: 800, title: '運命の恋人・最愛', icon: '💍', bonusMultiplier: 2.2 },
];

export function calculateIntimacyLevel(points: number): {
  level: number;
  title: string;
  icon: string;
  nextThreshold: number;
  progressPercent: number;
  bonusMultiplier: number;
} {
  let currentTier = INTIMACY_LEVEL_THRESHOLDS[0];
  for (let i = INTIMACY_LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= INTIMACY_LEVEL_THRESHOLDS[i].minPoints) {
      currentTier = INTIMACY_LEVEL_THRESHOLDS[i];
      break;
    }
  }

  const currentLevel = currentTier.level;
  const nextTier = INTIMACY_LEVEL_THRESHOLDS.find((t) => t.level === currentLevel + 1);
  const nextThreshold = nextTier ? nextTier.minPoints : currentTier.minPoints;
  const prevThreshold = currentTier.minPoints;

  let progressPercent = 100;
  if (nextTier) {
    const range = nextThreshold - prevThreshold;
    const currentInRange = points - prevThreshold;
    progressPercent = Math.min(100, Math.max(0, Math.round((currentInRange / range) * 100)));
  }

  return {
    level: currentLevel,
    title: currentTier.title,
    icon: currentTier.icon,
    nextThreshold,
    progressPercent,
    bonusMultiplier: currentTier.bonusMultiplier,
  };
}

/**
 * Calculates fashion charm score based on equipped items.
 * High rarity items (SR / UR) grant massive fashion charm, boosting conversation intimacy and unlocking special romance dialogue!
 */
export function calculateFashionCharm(
  equipped: EquippedFashion,
  catalog: FashionItem[] = FASHION_ITEMS_CATALOG
): {
  totalCharm: number;
  charmRank: ItemRarity;
  praisePillText: string;
  bonusAffectionMultiplier: number;
  highlightItem?: FashionItem;
} {
  const equippedIds = [
    equipped.head,
    equipped.outfit,
    equipped.accessory,
    equipped.hand,
    equipped.hair,
  ].filter(Boolean) as string[];

  let totalScore = 0;
  let highestItem: FashionItem | undefined;

  equippedIds.forEach((id) => {
    const item = catalog.find((i) => i.id === id);
    if (item) {
      const rarityScoreMap: { [key in ItemRarity]: number } = {
        N: 10,
        R: 25,
        SR: 60,
        UR: 120,
      };
      const score = (rarityScoreMap[item.rarity] || 10) + item.starLevel * 5;
      totalScore += score;

      if (!highestItem || item.starLevel > highestItem.starLevel) {
        highestItem = item;
      }
    }
  });

  let charmRank: ItemRarity = 'N';
  let bonusAffectionMultiplier = 1.0;
  let praisePillText = 'ナチュラル';

  if (totalScore >= 200) {
    charmRank = 'UR';
    bonusAffectionMultiplier = 2.0; // +100% Affection Boost!
    praisePillText = '👑 カリスマ至高コーデ (好感度2倍!)';
  } else if (totalScore >= 120) {
    charmRank = 'SR';
    bonusAffectionMultiplier = 1.6; // +60% Affection Boost!
    praisePillText = '✨ 憧れのモデル級コーデ (+60%)';
  } else if (totalScore >= 60) {
    charmRank = 'R';
    bonusAffectionMultiplier = 1.3; // +30% Affection Boost!
    praisePillText = '🌸 爽やかお洒落コーデ (+30%)';
  } else {
    charmRank = 'N';
    bonusAffectionMultiplier = 1.0;
    praisePillText = '🧼 素朴な湯上がりスタイル';
  }

  return {
    totalCharm: totalScore,
    charmRank,
    praisePillText,
    bonusAffectionMultiplier,
    highlightItem: highestItem,
  };
}

export const DEFAULT_PARTNER_AFFECTION_MAP: { [partnerId: string]: PartnerAffectionState } = {
  aoi: {
    partnerId: 'aoi',
    intimacyPoints: 50,
    intimacyLevel: 1,
    unlockedDateEventIds: ['date_aoi_1'],
    completedDateEventIds: [],
  },
  shizuku: {
    partnerId: 'shizuku',
    intimacyPoints: 40,
    intimacyLevel: 1,
    unlockedDateEventIds: ['date_shizuku_1'],
    completedDateEventIds: [],
  },
  ren: {
    partnerId: 'ren',
    intimacyPoints: 50,
    intimacyLevel: 1,
    unlockedDateEventIds: ['date_ren_1'],
    completedDateEventIds: [],
  },
  sota: {
    partnerId: 'sota',
    intimacyPoints: 40,
    intimacyLevel: 1,
    unlockedDateEventIds: ['date_sota_1'],
    completedDateEventIds: [],
  },
};


