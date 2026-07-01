const ASSETS = {
  background: "assets/bg-base.webp",
  storyBackground: "assets/story-bg.webp",
  storyPaper: "assets/story-paper-panel.webp",
  storySideFrame: "assets/story-side-frame.webp",
  storyCornerFrame: "assets/story-corner-frame.webp",
  storyTabsFrame: "assets/story-tabs-frame-transparent.webp",
  firstDish: "assets/dish-home-01.webp",
  decorations: [
    { src: "assets/deco-left-top.webp", className: "deco-left-top", introClass: "intro-ornament-left-top" },
    { src: "assets/deco-right-top.webp", className: "deco-right-top", introClass: "intro-ornament-right-top" },
    { src: "assets/deco-left-bottom.webp", className: "deco-left-bottom", introClass: "intro-ornament-left-bottom" },
    { src: "assets/deco-right-bottom.webp", className: "deco-right-bottom", introClass: "intro-ornament-right-bottom" },
  ],
};

const PRIORITY_DISH_COUNT = 0;
const FORWARD_PRELOAD_COUNT = 1;
const DECORATION_LOAD_GROUPS = [
  ["deco-left-top", "deco-right-bottom"],
  ["deco-right-top", "deco-left-bottom"],
];
const PRIMARY_DECORATION_GROUP = ["deco-left-top", "deco-right-bottom"];
const imageLoadCache = new Map();

const HOME_DISH_IMAGES = [
  "assets/dish-home-01.webp",
  "assets/dish-home-02.webp",
  "assets/dish-home-03.webp",
  "assets/dish-home-04.webp",
  "assets/dish-home-05.webp",
  "assets/dish-home-06.webp",
  "assets/dish-home-07.webp",
  "assets/dish-home-08.webp",
];

const DISHES = [
  {
    number: "DISH 01",
    title: "烧猪头",
    subtitle: "一根柴禾，烧出宋蕙莲的本事。",
    image: "assets/dish-01.webp",
    source: "《金瓶梅》第二十三回",
    scene: "这道菜出现在西门府内宅。宋蕙莲到大厨灶上，把猪首、蹄子刷洗干净，只用一根长柴禾，一大碗油酱，配上茴香大料，把猪头烧得皮脱肉化、五味俱全。她端给众人品尝，潘金莲、李瓶儿等人都惊讶她竟有这样的手艺。",
    intro: "烧猪头本来不是稀罕菜，妙处全在火候。猪头皮厚、骨重、胶质多，火候不到便腥腻粗硬；火候一到，就皮糯肉烂、酱香入骨。所谓“一根柴禾”，不是夸张它省柴，而是写宋蕙莲懂火、懂锅、懂日子。",
    books: "《金瓶梅》饮食大观把这道菜的重点放在“宋蕙莲的厨艺”上：她能用极少的柴火烧出极好的火候，是因为懂得密闭蒸煮和控制火力。《金瓶梅饮食谱》则把它复原成一道烧、焖、卤相结合的菜，强调猪头蹄的处理、老卤汁、葱姜香料和小火温焙。",
    story: "这盘烧猪头不只是肉菜，也是宋蕙莲在西门府里证明自己的方式。她没有地位，却有手艺；没有权力，却能让一桌人服气。在《金瓶梅》里，饮食常常是人的另一张脸。宋蕙莲端出来的不是一盘猪头，而是她会过日子、会做事、会讨人眼色的本事。",
    method: "猪头和蹄子洗净焯水，去血沫和腥气。再以酱、酒、葱姜、茴香、花椒等调味，用小火久烧。关键是盖严、火稳、焖透，让皮肉慢慢软化，最后收汁上色，做到肥而不腻、皮糯肉香。",
    ingredients: "猪头、猪蹄、油酱、黄酒、葱、姜、茴香、大料、花椒。",
    aroma: "先是酱香，再是脂香，最后是柴火慢烧后的温厚香气。",
    share: "一根柴禾烧透猪头，也烧出宋蕙莲在西门府里的短暂光亮。",
  },
  {
    number: "DISH 02",
    title: "炊饼",
    subtitle: "一笼炊饼，撑着小人物的活路。",
    image: "assets/dish-02.webp",
    source: "《金瓶梅》第二回",
    scene: "炊饼不是宴席菜，而是武大郎赖以谋生的街头食物。武松因公出差前，叮嘱武大郎：如果平日卖十扇笼炊饼，从明日起只做五扇笼，每日迟出早归，不要和人吃酒。这里的炊饼连着武大郎的生计，也连着武松对哥哥的担忧。",
    intro: "炊饼是一种蒸制面食，朴素、耐饥、便于售卖。它没有富户宴席的华丽，也没有珍馐的稀罕，却最贴近普通人的日常。它是蒸笼里的热气，是街巷里的叫卖声，也是底层人一天一天活下去的本钱。",
    books: "《金瓶梅》饮食大观重点解释“炊饼不是烧饼”。它指出炊饼本是蒸制面食，原与“蒸饼”有关，后来因避讳改称炊饼。《金瓶梅饮食谱》则把它复原为一种蒸制面饼，写到发面、椒盐、芝麻、香油等做法，突出层次和麦香。",
    story: "炊饼在《金瓶梅》里最动人的地方，是它太普通了。它不像西门府的酒席那样奢华，却能让人一眼看见武大郎的生活：每天出门，挑着担子，靠一笼一笼炊饼换钱。武松让他少做、早回，其实已经把危险说得很明白。炊饼越朴素，越衬出这个小家的脆弱。",
    method: "面粉加水和成面团，发酵或醒发后擀开，可抹少许油，撒椒盐、芝麻粉，再折叠成形，上笼蒸熟。成品应有麦香和热气，口感松软耐嚼。",
    ingredients: "麦面、水、酵面、花椒盐、芝麻、香油。",
    aroma: "麦香、蒸汽、竹笼气，一闻就是街头小食。",
    share: "富人吃席，小民卖饼；一笼炊饼，是武大郎的活路，也是他的命。",
  },
  {
    number: "DISH 03",
    title: "鲜鲊",
    subtitle: "一碟鲜鲊，摆开王婆的局。",
    image: "assets/dish-03.webp",
    source: "《金瓶梅》第三回",
    scene: "鲜鲊出现在王婆设局的早期场景里。王婆为西门庆和潘金莲牵线，置办下酒之物，其中就有“熟肉鲜鲊”。这不是正式宴席，而是一场带着算计的小酒局：酒菜摆好，人也就坐下了。",
    intro: "鲜鲊是一种古法腌制食物，多以鱼肉为主，用盐、米饭、酒和香料处理，使鱼肉在腌藏和发酵中产生特殊鲜味。它不是现杀现烹的鲜，而是被时间慢慢转化出来的鲜。",
    books: "《金瓶梅》饮食大观把鲊类食物放在明代饮食技术中解释，认为它体现了古人的腌制、发酵和储藏智慧。《金瓶梅饮食谱》则专门解释鲜鲊的制作原理：腌鱼时加入米饭，借乳酸发酵防腐增味，并给出鱼、盐、酒、红曲、香料等复原做法。",
    story: "鲜鲊在这一回不是主角，却很重要。王婆要让西门庆和潘金莲有机会坐下来，就不能空口说话，必须有茶、有酒、有下酒菜。熟肉鲜鲊这种小菜，不张扬，却刚好能把人留住。它是桌上的食物，也是王婆局里的一枚钉子。",
    method: "鱼肉洗净切块，以盐、酒、姜、香料腌渍，再拌入米饭或米粉，装坛密封，使其慢慢发酵入味。食用时可冷吃，也可略蒸后上桌。",
    ingredients: "鲜鱼、盐、米饭、黄酒、姜、红曲、香料。",
    aroma: "咸鲜、酒气、米香和轻微发酵后的酸香。",
    share: "鲜鲊上桌，酒局开始；酒局开始，人也入局。",
  },
  {
    number: "DISH 04",
    title: "王瓜拌辽东金虾",
    subtitle: "王瓜清脆，金虾来自远方。",
    image: "assets/dish-04.webp",
    source: "《金瓶梅》第三十四回",
    scene: "这道菜出现在西门庆陪应伯爵吃酒的一席午餐中。席上先放四碟菜果，又上四碟案鲜，其中一碟就是“曲弯弯王瓜拌辽东金虾”。它和泰州鸭蛋、油炸烧骨、干蒸劈晒鸡同列，是一组下酒冷盘中的一味。",
    intro: "王瓜就是黄瓜一类瓜蔬，清脆爽口；辽东金虾是干制虾米一类海味，鲜咸有味。一个清，一个鲜，一个来自园中时令，一个带着远方物产的意味。拌在一起，不是大菜，却很显西门府餐桌的讲究。",
    books: "《金瓶梅》饮食大观把这道菜放在西门府请客的席面里看，重点讲它作为下酒冷盘，体现了时令、物产和餐桌排场。《金瓶梅饮食谱》则把它做成具体菜谱：黄瓜切条杀水，金虾泡发切片，再用芝麻酱、蒜、酱油、醋等调味，特点是鲜、酸、脆、嫩、爽口。",
    story: "这道菜的重点不是奢华，而是“会吃”。西门庆请应伯爵吃酒，先上冷盘案鲜，既开胃，又显体面。一盘王瓜金虾，可以看见晚明富户饮食的细节：应时的蔬菜、远方的海味、调得合口的酱汁。它不是最贵的菜，却很能说明西门府的日常排场。",
    method: "王瓜切条或切片，略用盐杀水；金虾泡透，片成薄片或撕碎，铺在王瓜上。芝麻酱、蒜泥、酱油、黄醋、香油调成汁，浇在菜上即可。",
    ingredients: "王瓜、辽东金虾、芝麻酱、蒜、酱油、黄醋、香油。",
    aroma: "瓜香清新，虾味鲜咸，酱香轻轻压住水气。",
    share: "一盘王瓜金虾，吃出西门府餐桌上的季节与远方。",
  },
  {
    number: "DISH 05",
    title: "柳蒸糟鲥鱼",
    subtitle: "时鲜压席，糟香入骨。",
    image: "assets/dish-05.webp",
    source: "《金瓶梅》第三十四回",
    scene: "第三十四回里，西门庆陪应伯爵在莫染轩吃酒，冷碟、下饭铺开之后，才用里外青花白地磁盘盛出一盘柳蒸糟鲥鱼。第五十二回又写黄四送来“四尾冰湃的大鲥鱼”，刘太监回赠内府自造荷花酒和糟鲥鱼。鲥鱼在书里不只是一味菜，而是一种能被看见的资源。",
    intro: "鲥鱼是江南时鲜，季节极短，离水易败，须靠冰一路保鲜。能在北方席上吃到它，本身就不是寻常口福，而是捕捞、藏冰、运河、关卡、商路和人情网络一齐运转的结果。",
    books: "应伯爵夸鲥鱼时说“朝廷还没吃哩”，重点不在夸鱼贵，而在当众点破西门庆的渠道：这种鲜物拿钱未必买得到，得有人在江南第一时间捕捞，有人沿途补冰放行，还得有人愿意把它送到你家。所谓时鲜，鲜的是鱼，也是消息、人脉和调度能力。",
    story: "送钱之前先送时鲜。银子只能说明有钱，鲥鱼却说明你接得上江南、码头、冰窖和权力节点。西门庆吃到的未必是正经御贡名册上的那一尾，却属于同一套“贡品级资源”的外溢：上面要贡鲜如期进京，下面要借这条物流链走人情、通关节、结关系。西门庆不是单纯的食客，他像地方系统里的阀门，能办事、能通融、能遮风挡雨，所以稀缺资源会流到他席上。",
    method: "鲥鱼最讲究时鲜。传统吃法常去肠不去鳞，因为鳞下脂肪丰美，蒸熟后香气才足；若鲜度稍逊，便可用香糟、黄酒、姜葱来提味压腥。柳蒸糟鲥鱼宜轻盐略腌，铺香糟、芽姜、葱丝，上笼清蒸，少量油脂增润，出锅淋原汁。",
    ingredients: "鲥鱼、香糟、芽姜、葱、黄酒、猪板油、鸡油。",
    aroma: "先是江鲜与鱼脂的清香，再是酒糟的温甜，姜丝把腥气轻轻压下去。",
    share: "一条鲥鱼入席，先亮出的不是银子，是渠道。",
  },
  {
    number: "DISH 06",
    title: "八宝攒汤",
    subtitle: "一碗热汤，攒起元宵夜的热闹。",
    image: "assets/dish-06.webp",
    source: "《金瓶梅》第四十二回",
    scene: "八宝攒汤出现在“赏元宵楼上醉花灯”的热闹场面中。众人在楼上赏灯、吃喝、调笑，厨房拿汤饭上来。西门庆只吃了一个包儿、喝了一口汤；应伯爵、谢希大、祝日念、韩道国等人却每人吃了一大深碗八宝攒汤。",
    intro: "八宝攒汤是一种配料丰富的汤饭。“八宝”不一定死指八样，而是强调丰盛、吉祥和多味汇聚。肉、禽、笋、菌、海味、火腿、丸子、时蔬都可入汤，讲究的是料多、汤鲜、层次分明。",
    books: "《金瓶梅》饮食大观把它放在元宵赏灯的场面里看，认为它说明即便在娱乐玩赏中，西门府仍然讲究吃喝。《金瓶梅饮食谱》则解释“攒”有会集之意，把八宝攒汤复原为用海参、鱼皮、鸡肉、火腿、香菇、丸子、青菜等与高汤烩成的汤菜。",
    story: "这一场不是安静吃饭，而是元宵夜里的热闹消遣。灯、酒、笑声、人情，都挤在一处。西门庆只略吃一点，应伯爵等人却一人一大深碗，这个细节很有《金瓶梅》的味道：主人摆的是场面，帮闲吃的是实惠。一碗八宝攒汤，把热闹和世故都盛进去了。",
    method: "先熬清鲜高汤，再将鸡肉、火腿、海参、鱼皮、香菇、笋片、丸子、青菜等分别处理，最后合入汤中调味。汤要鲜，料要清楚，不能煮成杂烩。",
    ingredients: "高汤、鸡肉、火腿、海参、鱼皮、香菇、笋片、丸子、青菜。",
    aroma: "高汤鲜气托底，肉香、菌香、海味一层层浮上来。",
    share: "元宵夜里，一碗八宝攒汤，比灯还热闹。",
  },
  {
    number: "DISH 07",
    title: "螃蟹鲜",
    subtitle: "四十只螃蟹，酿成一份人情。",
    image: "assets/dish-07.webp",
    source: "《金瓶梅》第六十一回",
    scene: "螃蟹鲜出现在常二哥酬谢西门庆的场景里。应伯爵对西门庆说，常二哥蒙他厚情，成了房子，无以为报，便让妻子做了一盒螃蟹鲜送来。西门庆打开盒子，里面是四十个大螃蟹，剔剥干净，蟹壳里酿着肉，又用椒料、姜蒜、团粉、香油、酱油、醋等调制，香喷喷、酥脆好食。",
    intro: "螃蟹鲜不是简单蒸蟹，而是拆蟹、取肉、调馅、酿壳、再烹。它费工、精细，也很适合拿来送礼酬谢。吃的是蟹鲜，也是手艺和心意。",
    books: "《金瓶梅》饮食大观把这道菜看成“酿菜”，重点在剔、剥、酿、裹等工序，认为它“原壳装原味”，巧妙别致。《金瓶梅饮食谱》则把“螃蟹鲜”和“酿螃蟹”联系起来，按高档菜复原：拆蟹取黄取肉，调成馅，装回蟹壳，裹糊炸透，再复炸至酥。",
    story: "这道菜背后不是普通吃饭，而是一份“还人情”的礼。常二哥受了西门庆好处，不能空口道谢，于是让妻子做出极费工的螃蟹鲜。四十个大螃蟹，一个个剔、剥、酿、调，正是用麻烦来表示郑重。西门庆打开盒子的动作，也像是在验收这份人情的分量。",
    method: "螃蟹蒸熟后拆出蟹黄蟹肉，加入姜末、蒜末、椒料、盐、酱油、醋、香油等调味，可拌少量肉馅或团粉增加黏合。再填入蟹壳，裹糊炸至酥香。",
    ingredients: "螃蟹、蟹黄、蟹肉、姜、蒜、椒料、团粉、香油、酱油、醋。",
    aroma: "蟹黄香浓，姜醋清辛，油炸后的酥香最先扑出来。",
    share: "螃蟹鲜不是一道菜，是常二哥递给西门庆的一份人情。",
  },
  {
    number: "DISH 08",
    title: "白糖万寿糕",
    subtitle: "甜的是糕，送的是人情。",
    image: "assets/dish-08.webp",
    source: "《金瓶梅》第三十九回",
    scene: "白糖万寿糕在第三十九回作为礼盒茶点出现。李铭、吴惠两个拿着盒子来，揭开后里面有顶皮饼、白糖万寿糕、松花饼、玫瑰馅卷儿等。这不是正席大菜，而是带着人情意味的小点心。",
    intro: "白糖万寿糕是一种带祝寿意味的甜糕。它洁白、甜润，名字吉祥，可印“寿”字。它不靠复杂味道取胜，而靠寓意明确：祝寿、庆贺、馈赠、讨好，都能装进一块糕里。",
    books: "《金瓶梅》饮食大观没有只把它当点心，而是放在寿面、寿桃、寿糕这类礼俗食品里讲，强调它和祝寿、人情往来有关。《金瓶梅饮食谱》则直接对应第三十九回，解释白糖万寿糕流行于河北一带，以三合面和白糖制成，上印“寿”字，多用于馈赠老人寿诞。",
    story: "这道菜最有意思的地方，是它不是“正席上桌”，而是“拿盒子送来”。《金瓶梅》里的饮食，很多时候不是为了吃本身，而是为了走关系、表心意、做场面。白糖万寿糕正是这种礼俗食品：一块糕不重，重的是它由谁送来，送给谁，在什么关系里出现。",
    method: "用黄豆面、玉米面、黄米面等三合面蒸熟，加入白糖、猪油、桂花汁等拌匀，再包馅入模。表面可撒糖，压出“寿”字或装饰山楂糕片，做成松香甜润的寿糕。",
    ingredients: "三合面、绵白糖、猪板油、桂花汁、馅料、山楂糕、寿字模。",
    aroma: "米面香、白糖甜、桂花气，热气里带着节庆味。",
    share: "白糖万寿糕，甜在口中，重在人情。",
  },
];

const INTRO_STATES = [
  "state-initial-loading",
  "state-assets-loading",
  "state-ready-to-enter",
  "state-enter-explosion",
  "state-main-stage",
];

const SECTION_LABELS = {
  intro: "菜品简介",
  source: "出处与回合",
  method: "味道做法",
  background: "背景故事",
};

const POSTER_KEYWORDS = [
  ["柴火", "火候", "酱香", "席面", "人情"],
  ["街食", "麦香", "生计", "市井", "热气"],
  ["腌鲜", "酒局", "牵线", "发酵", "局中"],
  ["清鲜", "海味", "冷盘", "远方", "时令"],
  ["糟香", "时鲜", "压席", "体面", "软嫩"],
  ["元宵", "热汤", "丰盛", "帮闲", "热闹"],
  ["酿蟹", "人情", "酬谢", "精工", "鲜香"],
  ["寿糕", "甜点", "礼俗", "祝寿", "馈赠"],
];

const HUMAN_SIGNS = [
  {
    number: 1,
    title: "乾为天 · 烧猪头肉",
    line: "乾为天，主主动、开局、显能。",
    meaning: "烧猪头肉讲究掌火候、定分寸，好味不是等来的，是自己上手做出来的。今日所问之事，宜主动掌局，把手里的事做出分量。",
  },
  {
    number: 2,
    title: "坤为地 · 炊饼",
    line: "坤为地，主承载、养成、厚实。",
    meaning: "炊饼朴素耐饥，不争奇味，却能托住一日生计。今日所问之事，宜先稳根基，把日子踏实托住。",
  },
  {
    number: 3,
    title: "水雷屯 · 鲜鲊",
    line: "屯为初生，主开端、积蓄、未成。",
    meaning: "鲜鲊初腌之时，味尚未足，须等时间慢慢成香。今日所问之事，宜耐心养成，不可急着开坛。",
  },
  {
    number: 4,
    title: "山水蒙 · 头脑儿",
    line: "蒙为未明，主启发、求教、开窍。",
    meaning: "头脑儿取醒神之意，一碗入口，混沌处渐渐有光。今日所问之事，宜先学明白，不懂之处正可开蒙。",
  },
  {
    number: 5,
    title: "水天需 · 炖烂鸽子雏儿",
    line: "需为等待，主养时、蓄力、候成。",
    meaning: "炖烂鸽子雏儿，贵在慢火久候，急火反不得真味。今日所问之事，宜等火候，好事正在锅中。",
  },
  {
    number: 6,
    title: "天水讼 · 酽醋滴苔菜",
    line: "讼为口舌，主争执、分辩、不平。",
    meaning: "酽醋味酸而醒，能点破腻处，也能转开僵局。今日所问之事，宜转念求和，别把酸意熬成怨气。",
  },
  {
    number: 7,
    title: "地水师 · 干蒸劈晒鸡",
    line: "师为行阵，主纪律、调度、组织。",
    meaning: "干蒸劈晒鸡，工序分明，先后有序方能成味。今日所问之事，宜理清队形，众事归阵便可推进。",
  },
  {
    number: 8,
    title: "水地比 · 和合汤",
    line: "比为亲近，主相依、结伴、同心。",
    meaning: "和合汤众味入碗，彼此不夺，反能相亲成香。今日所问之事，宜靠近良伴，同味相成胜过独行。",
  },
  {
    number: 9,
    title: "风天小畜 · 糖薄脆",
    line: "小畜为微蓄，主小成、小积、小喜。",
    meaning: "糖薄脆虽轻薄，入口却有甜意，小处也能成欢。今日所问之事，宜珍惜小得，一点积累也是好兆。",
  },
  {
    number: 10,
    title: "天泽履 · 炮炒腰子",
    line: "履为行步，主谨慎、分寸、稳行。",
    meaning: "炮炒腰子讲快火，迟则老，急则过，全在一步分寸。今日所问之事，宜小心落脚，稳稳走过险处。",
  },
  {
    number: 11,
    title: "地天泰 · 柳蒸糟鲥鱼",
    line: "泰为通达，主顺畅、相成、好时。",
    meaning: "柳蒸糟鲥鱼，鱼鲜遇糟香，顺水顺火皆成美味。今日所问之事，宜顺势而行，好味已经入席。",
  },
  {
    number: 12,
    title: "天地否 · 腌蟹",
    line: "否为闭塞，主暂止、封藏、不通。",
    meaning: "腌蟹不可即食，须先封存，让味道在静中入骨。今日所问之事，宜暂且收住，等味成时再开。",
  },
  {
    number: 13,
    title: "天火同人 · 葱花羊肉一寸扁食",
    line: "同人为同席，主同心、同行、相聚。",
    meaning: "葱花羊肉入扁食，热气一上，人与味都容易相亲。今日所问之事，宜共坐同桌，有话可暖，有事可成。",
  },
  {
    number: 14,
    title: "火天大有 · 熊掌",
    line: "大有为丰足，主所得、富厚、盛味。",
    meaning: "熊掌为珍重之味，得之不易，上席便显福分。今日所问之事，宜善用所得，珍味在前不可轻掷。",
  },
  {
    number: 15,
    title: "地山谦 · 摊鸡蛋",
    line: "谦为低处，主朴素、让下、不争。",
    meaning: "摊鸡蛋平常易得，不夸富贵，却能圆满成菜。今日所问之事，宜低调成事，朴味自有安稳。",
  },
  {
    number: 16,
    title: "雷地豫 · 元宵",
    line: "豫为喜悦，主欢欣、游赏、热闹。",
    meaning: "元宵应灯火佳节，圆而有光，喜气自然相照。今日所问之事，宜顺喜而行，让心先亮起来。",
  },
  {
    number: 17,
    title: "泽雷随 · 炉烧鸭",
    line: "随为顺势，主随时、随火、随缘。",
    meaning: "炉烧鸭入炉之后，不宜强催，随火转色便成香。今日所问之事，宜顺着局面，借势比用力更好。",
  },
  {
    number: 18,
    title: "山风蛊 · 肉鲊",
    line: "蛊为旧积，主修治、翻检、转陈。",
    meaning: "肉鲊经腌藏而成，旧味不弃，整理之后反能生香。今日所问之事，宜处理旧事，陈处修好也能成味。",
  },
  {
    number: 19,
    title: "地泽临 · 煎鲜鲥鱼",
    line: "临为来近，主机会、靠近、承接。",
    meaning: "鲥鱼贵在时鲜，鲜味临席，错过便难再得。今日所问之事，宜及时接住，好时机已到眼前。",
  },
  {
    number: 20,
    title: "风地观 · 细脍通印子鱼",
    line: "观为察看，主审视、辨纹、明局。",
    meaning: "细脍看刀工，鱼纹见分明，未入口先要会看。今日所问之事，宜先观后动，看清纹理再下筷。",
  },
  {
    number: 21,
    title: "火雷噬嗑 · 油炸烧骨",
    line: "噬嗑为咬合，主破阻、决断、通关。",
    meaning: "烧骨要啃开硬处，咬得下，路才通得开。今日所问之事，宜果断处理，硬结一破便有通路。",
  },
  {
    number: 22,
    title: "山火贲 · 白糖万寿糕",
    line: "贲为文饰，主礼数、光彩、体面。",
    meaning: "白糖万寿糕，甜中有寿，一上盒便是好意。今日所问之事，宜修饰言行，礼到情也到。",
  },
  {
    number: 23,
    title: "山地剥 · 青冬瓜",
    line: "剥为去繁，主削减、清理、见本。",
    meaning: "青冬瓜去皮去瓤，淡处不薄，剥尽反见清福。今日所问之事，宜减去多余，留下本味便好。",
  },
  {
    number: 24,
    title: "地雷复 · 春饼",
    line: "复为归来，主重启、循环、新生。",
    meaning: "春饼应春时，旧岁已过，新味又从盘中来。今日所问之事，宜重新开始，旧事也能开新局。",
  },
  {
    number: 25,
    title: "天雷无妄 · 白烧笋鸡",
    line: "无妄为自然，主本真、不妄、不添。",
    meaning: "白烧笋鸡取清味，不靠浓料，本色已经可贵。今日所问之事，宜顺其自然，不要多加一层戏。",
  },
  {
    number: 26,
    title: "山天大畜 · 银鱼干",
    line: "大畜为储养，主积蓄、养成、后用。",
    meaning: "银鱼干把鲜味藏住，一时不用，后日仍有余香。今日所问之事，宜存粮蓄力，留待后来更有用。",
  },
  {
    number: 27,
    title: "山雷颐 · 鸡尖汤",
    line: "颐为养口，主饮食、供养、护身。",
    meaning: "鸡尖汤清鲜温润，一口入腹，身心都得滋养。今日所问之事，宜先照顾自己，养足了再向前。",
  },
  {
    number: 28,
    title: "泽风大过 · 火燎羊头",
    line: "大过为过盛，主重压、越界、知止。",
    meaning: "火燎羊头火势猛烈，稍过即焦，有力也须收住。今日所问之事，宜壮而不逞，火旺更要知分寸。",
  },
  {
    number: 29,
    title: "坎为水 · 韭菜酸笋蛤蜊汤",
    line: "坎为水险，主陷中求通、险里存生。",
    meaning: "酸笋蛤蜊入汤，酸水之中，仍有一口鲜活。今日所问之事，宜稳住心气，险处也有生机。",
  },
  {
    number: 30,
    title: "离为火 · 桃花烧卖",
    line: "离为明丽，主光彩、附丽、显现。",
    meaning: "桃花烧卖色相明媚，好看有味，一上席便能照眼。今日所问之事，宜大方亮相，让好意被看见。",
  },
  {
    number: 31,
    title: "泽山咸 · 酥油鲍螺",
    line: "咸为感应，主相触、动心、情意。",
    meaning: "酥油鲍螺香甜柔滑，入口一动，心意便有回应。今日所问之事，宜温柔表达，一点甜香可通心。",
  },
  {
    number: 32,
    title: "雷风恒 · 烙饼",
    line: "恒为长久，主日用、坚持、常成。",
    meaning: "烙饼日日可做，不求惊艳，久做自有香气。今日所问之事，宜持之以恒，常事做到便是功夫。",
  },
  {
    number: 33,
    title: "天山遁 · 糟笋",
    line: "遁为退藏，主避锋、保全、暗养。",
    meaning: "笋入糟中，藏起锋芒，退一步反能入味。今日所问之事，宜暂避其锋，藏住味道再出手。",
  },
  {
    number: 34,
    title: "雷天大壮 · 烧鹿花猪",
    line: "大壮为力盛，主气势、强健、能量。",
    meaning: "烧鹿花猪为大肉大味，气势满盘，盛处最怕失度。今日所问之事，宜有力而稳，不可逞强过火。",
  },
  {
    number: 35,
    title: "火地晋 · 玉米面鹅油蒸饼",
    line: "晋为上行，主进展、渐显、增光。",
    meaning: "蒸饼借热气而起，鹅油润泽，一步一步向上成形。今日所问之事，宜稳步推进，热气足了自然升。",
  },
  {
    number: 36,
    title: "地火明夷 · 腊肉",
    line: "明夷为藏光，主受损、低调、保味。",
    meaning: "腊肉不显鲜亮，却把滋味藏住，经久之后更沉厚。今日所问之事，宜暂敛光芒，把真正的味道留住。",
  },
  {
    number: 37,
    title: "风火家人 · 春不老蒸乳饼",
    line: "家人为内安，主家常、秩序、安顿。",
    meaning: "春不老蒸乳饼温润家常，不求排场，却能安人心口。今日所问之事，宜先安内里，家常处最能养福。",
  },
  {
    number: 38,
    title: "火泽睽 · 托荤素菜",
    line: "睽为相异，主分歧、差别、异中求合。",
    meaning: "托荤素菜在荤素之间成味，看似相背，也能同盘相安。今日所问之事，宜容下不同，分处也可生欢。",
  },
  {
    number: 39,
    title: "水山蹇 · 滑鳅",
    line: "蹇为难行，主阻滞、路滑、缓进。",
    meaning: "滑鳅难捉，越急越脱手，慢些反能得安。今日所问之事，宜缓步行事，不可硬冲险路。",
  },
  {
    number: 40,
    title: "雷水解 · 醋烧白菜",
    line: "解为松开，主化结、解腻、得缓。",
    meaning: "醋烧白菜清口解滞，酸意一到，沉重处便可松动。今日所问之事，宜先解一结，气顺了事便开。",
  },
  {
    number: 41,
    title: "山泽损 · 豆腐",
    line: "损为减去，主删繁、节欲、清省。",
    meaning: "豆腐清淡柔和，少油少负，淡处自有清福。今日所问之事，宜少取少求，减掉反而轻松。",
  },
  {
    number: 42,
    title: "风雷益 · 大包子",
    line: "益为增添，主补益、助力、添实。",
    meaning: "大包子饱满实在，空腹得之，便添一分底气。今日所问之事，宜接住好意，有补便有进。",
  },
  {
    number: 43,
    title: "泽天夬 · 白炸猪肉",
    line: "夬为决断，主切开、明断、不拖。",
    meaning: "白炸猪肉讲爽利，下刀下锅，拖久便失真味。今日所问之事，宜快意决断，清清楚楚做选择。",
  },
  {
    number: 44,
    title: "天风姤 · 蜜润绦环",
    line: "姤为相遇，主偶逢、牵连、知止。",
    meaning: "蜜润绦环甜而缠绕，偶得其香，不可贪恋太久。今日所问之事，宜见好即收，甜处也要有分寸。",
  },
  {
    number: 45,
    title: "泽地萃 · 八宝攒汤",
    line: "萃为聚集，主会合、成席、众味。",
    meaning: "八宝攒汤汇众料为一碗，各味相聚，热闹而不散。今日所问之事，宜聚人聚力，众味合处便圆满。",
  },
  {
    number: 46,
    title: "地风升 · 馒首",
    line: "升为上进，主渐升、发起、向上。",
    meaning: "馒首靠发面蒸起，不疾不徐，慢慢便有高度。今日所问之事，宜一点点推进，日日向上便是吉。",
  },
  {
    number: 47,
    title: "泽水困 · 晒干巴子肉",
    line: "困为受限，主收缩、困守、存力。",
    meaning: "晒干巴子肉失了水分，却留住滋味，困中也能保存元气。今日所问之事，宜守住根本，别把力气耗尽。",
  },
  {
    number: 48,
    title: "水风井 · 软炊红莲香稻",
    line: "井为根本，主供养、源头、不竭。",
    meaning: "软炊红莲香稻，是一碗本分饭，人人赖此得养。今日所问之事，宜回到根基，把最要紧的水米顾好。",
  },
  {
    number: 49,
    title: "泽火革 · 酥鸭",
    line: "革为更新，主改旧、换皮、成新。",
    meaning: "酥鸭经火候改造，旧皮一换，新香便出。今日所问之事，宜改旧法，变过之后更有味。",
  },
  {
    number: 50,
    title: "火风鼎 · 烹龙肝",
    line: "鼎为成味，主烹调、器重、贵成。",
    meaning: "烹龙肝虽是珍奇之味，入鼎成菜，贵气自有其位。今日所问之事，宜郑重安放，好料要入好器。",
  },
  {
    number: 51,
    title: "震为雷 · 炮凤髓",
    line: "震为雷动，主惊起、发动、醒局。",
    meaning: "炮凤髓一“炮”即起火势，惊而不乱，反能开出贵味。今日所问之事，宜借势醒局，动中自有新机。",
  },
  {
    number: 52,
    title: "艮为山 · 粽子",
    line: "艮为止定，主收束、边界、安稳。",
    meaning: "粽子以叶包裹，以绳束形，止而不散，味藏其中。今日所问之事，宜收住边界，定下来便得安。",
  },
  {
    number: 53,
    title: "风山渐 · 麻椒盐荷花细饼",
    line: "渐为渐进，主层层、慢成、有序。",
    meaning: "荷花细饼重层次，麻椒盐入味，也是渐渐才香。今日所问之事，宜慢慢铺开，不可一口求尽。",
  },
  {
    number: 54,
    title: "雷泽归妹 · 托荤裹烧鸭子",
    line: "归妹为安位，主关系、名分、借势。",
    meaning: "托荤裹烧鸭子，妙在托与裹，借形借味而成席。今日所问之事，宜先安其位，借势也能成事。",
  },
  {
    number: 55,
    title: "雷火丰 · 紫驼蹄",
    line: "丰为盛大，主丰足、光亮、满席。",
    meaning: "紫驼蹄珍贵富丽，丰味当前，盛处更要知止。今日所问之事，宜享其丰，也要守其度。",
  },
  {
    number: 56,
    title: "火山旅 · 驼峰",
    line: "旅为在外，主远方、行路、暂居。",
    meaning: "驼峰自带远味，从行旅而来，入席也有他乡气。今日所问之事，宜借远方之缘，行处自有新味。",
  },
  {
    number: 57,
    title: "巽为风 · 香菌",
    line: "巽为入风，主柔入、渗透、细功。",
    meaning: "香菌不靠猛味，以细香入菜，慢慢便能动人。今日所问之事，宜柔和进入，细处自有功夫。",
  },
  {
    number: 58,
    title: "兑为泽 · 玫瑰八仙糕",
    line: "兑为喜悦，主口福、欢喜、好言。",
    meaning: "玫瑰八仙糕香甜悦口，花气入喉，喜意自然生津。今日所问之事，宜说好话，甜处能通人心。",
  },
  {
    number: 59,
    title: "风水涣 · 银丝鲊汤",
    line: "涣为流散，主疏通、散开、复合。",
    meaning: "银丝入汤，看似散开，却在水中重新成味。今日所问之事，宜先使其通，散处也能再合。",
  },
  {
    number: 60,
    title: "水泽节 · 板搭馓子",
    line: "节为分寸，主节制、规矩、有形。",
    meaning: "板搭馓子有节有形，不可乱缠，分寸到了才好看。今日所问之事，宜守规矩，有节便有福。",
  },
  {
    number: 61,
    title: "风泽中孚 · 酿螃蟹与螃蟹鲜",
    line: "中孚为诚，主真心、信意、内实。",
    meaning: "螃蟹鲜须剔壳取肉，再酿回去，费工处最见诚意。今日所问之事，宜以行动表心，真诚会自有香气。",
  },
  {
    number: 62,
    title: "雷山小过 · 菊花饼",
    line: "小过为小修，主细节、小事、轻过。",
    meaning: "菊花饼小巧清雅，不必铺张，小处也能成礼。今日所问之事，宜修好细节，轻轻一过便安。",
  },
  {
    number: 63,
    title: "水火既济 · 水晶膀蹄",
    line: "既济为已成，主完成、调和、守成。",
    meaning: "水晶膀蹄须火候已足，凝冻成形，水火既调方为美。今日所问之事，宜守住成果，最后一步不可松。",
  },
  {
    number: 64,
    title: "火水未济 · 糟鱼",
    line: "未济为未成，主待成、续火、将来。",
    meaning: "糟鱼还须继续入味，不到最后，不算真正成香。今日所问之事，宜再等一程，来日味更足。",
  },
];

const HUMAN_SIGN_SUITABLES = [
  "慢一点下判断",
  "把话说甜",
  "先吃饱再做决定",
  "给自己留个台阶",
  "主动开口",
  "整理一处小角落",
  "把旧事翻热",
  "请人同坐一桌",
];

const HUMAN_SIGN_AVOIDS = [
  "空腹硬撑",
  "把火开太急",
  "为小事拧巴",
  "边吃边生气",
  "把好意说成客套",
  "急着证明自己",
  "用沉默憋坏胃口",
  "让手机吃掉一顿饭",
];

const HUMAN_SIGN_JOYS = [
  "给晚饭加一味香",
  "把喜欢的杯子拿出来用",
  "给自己留十分钟慢慢吃",
  "拍下今天最好看的一口",
  "给在意的人发一句好话",
  "买一份路过时想吃的小点",
  "把桌面收成能坐下喝茶的样子",
  "听一首能让筷子慢下来的歌",
];



const QR_VERSION_INFO = [
  { version: 1, dataCodewords: 19, ecCodewords: 7, byteCapacity: 17 },
  { version: 2, dataCodewords: 34, ecCodewords: 10, byteCapacity: 32 },
  { version: 3, dataCodewords: 55, ecCodewords: 15, byteCapacity: 53 },
  { version: 4, dataCodewords: 80, ecCodewords: 20, byteCapacity: 78 },
  { version: 5, dataCodewords: 108, ecCodewords: 26, byteCapacity: 106 },
];

const QR_GF = createQrGaloisTables();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DISH_FADE_OUT_MS = 220;
const DISH_FADE_IN_DELAY_MS = 40;
const SFX_MASTER_VOLUME = 0.26;
let currentDishIndex = 0;
let activeStorySection = "intro";
let toastTimer = 0;
let introReady = false;
let enteringSite = false;
let posterRenderId = 0;
let dishSwitchToken = 0;
let currentHumanSign = null;
let currentHumanSignFortune = null;
let humanSignRevealTimer = 0;
let sfxContext = null;
let musicAutoplayAttempted = false;

const els = {
  introScreen: document.querySelector(".intro-screen"),
  introBg: document.querySelector(".intro-bg"),
  enterButton: document.querySelector(".enter-button"),
  burstParticles: document.querySelector(".burst-particles"),
  mainStage: document.querySelector(".main-stage"),
  bgBase: document.querySelector(".bg-base"),
  dishHome: document.querySelector(".dish-home"),
  recipePage: document.querySelector(".recipe-page"),
  storyPage: document.querySelector(".dish-story-page"),
  centerPlate: document.querySelector(".center-plate"),
  dishImage: document.querySelector(".dish-image"),
  storyDishImage: document.querySelector(".story-dish-image"),
  homeDishNumber: document.querySelector(".home-dish-number"),
  homeDishTitle: document.querySelector(".home-dish-title"),
  homeDishSubtitle: document.querySelector(".home-dish-subtitle"),
  homeDishSource: document.querySelector(".home-dish-source"),
  dishNumber: document.querySelector(".dish-number"),
  dishTitle: document.querySelector(".dish-title"),
  dishSubtitleMain: document.querySelector(".dish-subtitle-main"),
  dishBookName: document.querySelector(".dish-book-name"),
  dishSourceLine: document.querySelector(".dish-source-line"),
  storyTabs: document.querySelectorAll(".story-tab"),
  storyCornerFrame: document.querySelector(".story-corner-frame"),
  storyContent: document.querySelector(".story-content"),
  storyKicker: document.querySelector(".story-section-kicker"),
  storyHeading: document.querySelector(".story-heading"),
  storyBody: document.querySelector(".story-body"),
  storyNoteText: document.querySelector(".story-note-text"),
  posterModal: document.querySelector(".poster-modal"),
  posterCanvas: document.querySelector(".poster-canvas"),
  posterPreview: document.querySelector(".poster-preview"),
  posterSaveButton: document.querySelector(".poster-save-button"),
  humanSignModal: document.querySelector(".human-sign-modal"),
  humanSignStick: document.querySelector(".human-sign-stick"),
  humanSignReading: document.querySelector(".human-sign-reading"),
  humanSignDraw: document.querySelector(".human-sign-draw"),
  humanSignNumber: document.querySelector(".human-sign-number"),
  humanSignTitle: document.querySelector(".human-sign-title"),
  humanSignCurrent: document.querySelector(".human-sign-current"),
  humanSignLine: document.querySelector(".human-sign-line"),
  humanSignMeaning: document.querySelector(".human-sign-meaning"),
  humanSignSuitable: document.querySelector(".human-sign-suitable"),
  humanSignAvoid: document.querySelector(".human-sign-avoid"),
  humanSignJoy: document.querySelector(".human-sign-joy"),
  humanSignCopy: document.querySelector(".human-sign-copy"),
  humanSignVerticalText: document.querySelector(".human-sign-vertical-text"),
  musicAudio: document.querySelector(".background-music"),
  musicToggleButton: document.querySelector(".music-toggle-button"),
  toast: document.querySelector(".toast"),
};

document.addEventListener("DOMContentLoaded", () => {
  bindInteractions();
  runIntro();
});

let humanSignResizeId = null;
window.addEventListener("resize", () => {
  if (!els.humanSignModal?.classList.contains("is-open")) return;
  cancelAnimationFrame(humanSignResizeId);
  humanSignResizeId = requestAnimationFrame(fitHumanSignText);
});

async function runIntro() {
  setIntroState("initial-loading");
  els.enterButton.disabled = true;

  // Let the pure-code bowl, steam, and tick ring paint before image work starts.
  await delay(reducedMotion ? 0 : 320);

  setIntroState("assets-loading");
  await preloadAssets();
  await setReadyToEnter();
}

async function preloadAssets() {
  const fastIntro = window.matchMedia("(max-width: 720px)").matches;

  els.introBg.classList.add("is-visible");

  window.setTimeout(() => {
    startDeferredStageLoads(fastIntro);
  }, fastIntro ? 900 : 420);
}

function startDeferredStageLoads(fastIntro = false) {
  void loadImage(ASSETS.background, fastIntro ? 1800 : 2600).then((bgLoaded) => {
    if (bgLoaded) {
      els.bgBase.style.backgroundImage = `url("${ASSETS.background}")`;
    }
  });

  void loadFirstDish();

  window.setTimeout(() => {
    void loadDecorationGroup(PRIMARY_DECORATION_GROUP);
  }, fastIntro ? 1200 : 760);

  window.setTimeout(() => {
    void preloadPriorityDishes();
  }, fastIntro ? 2600 : 1800);

  window.setTimeout(() => {
    void loadDecorationGroups();
  }, fastIntro ? 3000 : 1400);
}

async function setReadyToEnter() {
  introReady = false;
  setIntroState("ready-to-enter");
  await delay(reducedMotion ? 0 : 520);
  els.introScreen.classList.add("is-enter-ready");
  els.enterButton.disabled = false;
  introReady = true;
}

async function enterSite() {
  if (!introReady || enteringSite) return;

  playSoundEffect("enter");
  enteringSite = true;
  els.enterButton.disabled = true;
  createBurstParticles();
  setIntroState("enter-explosion");

  await delay(reducedMotion ? 120 : 1080);
  await showMainStage();
  scheduleBackgroundMusicAutoplay();
}

function createBurstParticles() {
  const count = reducedMotion ? 0 : 32;
  const maxDistance = Math.min(Math.max(window.innerWidth, window.innerHeight) * 0.54, 620);

  els.burstParticles.textContent = "";

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    const angle = (360 / count) * index + (Math.random() * 10 - 5);
    const distance = maxDistance * (0.58 + Math.random() * 0.42);
    const size = 2 + Math.random() * 5;
    const duration = 760 + Math.random() * 320;
    const delayMs = Math.random() * 90;

    particle.style.setProperty("--angle", `${angle}deg`);
    particle.style.setProperty("--distance", `${distance}px`);
    particle.style.setProperty("--size", `${size}px`);
    particle.style.setProperty("--dur", `${duration}ms`);
    particle.style.setProperty("--delay", `${delayMs}ms`);
    els.burstParticles.appendChild(particle);
  }
}

async function showMainStage() {
  setIntroState("main-stage");
  els.introScreen.classList.add("is-hidden");
  showDishHome({ instant: true });

  revealBaseBackground();
  const decorationFlow = revealDecorations();
  const plateFlow = revealCenterPlate();

  await delay(reducedMotion ? 0 : 180);
  const glowDone = glowPlate();

  if (els.dishImage) {
    els.dishImage.classList.add("is-visible");
  }
  await delay(reducedMotion ? 0 : 180);
  await enterMainStageUi();
  await Promise.all([decorationFlow, plateFlow, glowDone]);
}

function setIntroState(state) {
  els.introScreen.classList.remove(...INTRO_STATES);
  els.introScreen.classList.remove("is-enter-ready");
  els.introScreen.classList.add(`state-${state}`);
}

function loadDecorationLayer(deco) {
  return loadImage(deco.src, 1500).then((loaded) => {
    if (!loaded) return false;

    const mainOrnament = document.querySelector(`.${deco.className}`);
    const introOrnament = deco.introClass ? document.querySelector(`.${deco.introClass}`) : null;

    if (mainOrnament) {
      mainOrnament.src = deco.src;
    }

    if (introOrnament) {
      introOrnament.src = deco.src;
    }

    return true;
  });
}

async function loadDecorationGroups() {
  for (const group of DECORATION_LOAD_GROUPS) {
    await loadDecorationGroup(group);
    await delay(reducedMotion ? 0 : 180);
  }
}

async function loadDecorationGroup(group) {
  const decorations = getDecorationGroup(group);

  await Promise.all(decorations.map(loadDecorationLayer));
  revealDecorationGroup(decorations);
}

function revealBaseBackground() {
  els.bgBase.classList.add("is-visible");
}

async function revealDecorations() {
  for (const group of DECORATION_LOAD_GROUPS) {
    revealDecorationGroup(getDecorationGroup(group));
    await delay(reducedMotion ? 0 : 150);
  }
}

function getDecorationGroup(classNames) {
  return classNames
    .map((className) => ASSETS.decorations.find((deco) => deco.className === className))
    .filter(Boolean);
}

function revealDecorationGroup(decorations) {
  decorations.forEach((deco) => {
    const layer = document.querySelector(`.${deco.className}`);

    if (layer && layer.getAttribute("src")) {
      layer.classList.add("is-visible");
    }
  });
}

function revealCenterPlate() {
  if (!els.centerPlate) {
    return delay(0);
  }

  els.centerPlate.classList.add("is-visible");
  return delay(reducedMotion ? 0 : 420);
}

function glowPlate() {
  if (!els.centerPlate) {
    return delay(0);
  }

  els.centerPlate.classList.remove("is-glowing");
  void els.centerPlate.offsetWidth;
  els.centerPlate.classList.add("is-glowing");
  return delay(reducedMotion ? 0 : 720);
}

async function loadFirstDish() {
  const loadToken = dishSwitchToken;
  const dish = DISHES[0];
  const homeImage = getHomeDishImage(0);

  renderDishPage(dish);

  if (els.dishImage && !els.dishImage.getAttribute("src")) {
    els.dishImage.src = dish.image;
  }

  const loaded = await loadImage(homeImage, 2200);

  if (dishSwitchToken !== loadToken || currentDishIndex !== 0) {
    return loaded;
  }

  if (els.dishImage) {
    els.dishImage.src = loaded ? homeImage : dish.image;
  }

  queueIdleTask(() => {
    if (els.storyDishImage && !els.storyDishImage.getAttribute("src")) {
      els.storyDishImage.src = dish.image;
    }
  });
  return loaded;
}

async function enterMainStageUi() {
  const uiQueue = [
    document.querySelector(".mobile-home-topbar"),
    document.querySelector(".dish-home-copy"),
    document.querySelector(".dish-home-visual"),
    document.querySelector(".side-actions-left"),
    document.querySelector(".side-actions-right"),
    document.querySelector(".home-bottom-nav"),
  ];

  for (const item of uiQueue) {
    if (item) item.classList.add("is-visible");
    await delay(reducedMotion ? 0 : 170);
  }
}

function loadImage(src, timeout = 2500) {
  if (!src) return Promise.resolve(false);

  const cacheKey = new URL(src, window.location.href).href;
  const cached = imageLoadCache.get(cacheKey);

  if (cached) return cached;

  const promise = new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const timer = window.setTimeout(() => finish(false), timeout);

    function finish(result) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(result);
    }

    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    img.decoding = "async";
    img.src = src;

    if (img.complete && img.naturalWidth > 0) {
      finish(true);
    }
  }).then((loaded) => {
    if (!loaded) {
      imageLoadCache.delete(cacheKey);
    }

    return loaded;
  });

  imageLoadCache.set(cacheKey, promise);
  return promise;
}

function bindInteractions() {
  els.enterButton.addEventListener("click", enterSite);

  document.querySelectorAll(".open-story-button").forEach((button) => {
    button.addEventListener("click", showStoryPage);
  });
  document.querySelector(".return-dish-button").addEventListener("click", () => {
    playSoundEffect("tap");
    showDishHome();
  });
  document.querySelectorAll(".open-recipe-button").forEach((button) => {
    button.addEventListener("click", showRecipePage);
  });
  document.querySelectorAll(".open-poster-button").forEach((button) => {
    button.addEventListener("click", openPosterModal);
  });
  document.querySelectorAll(".close-poster-button").forEach((button) => {
    button.addEventListener("click", closePosterModal);
  });
  document.querySelectorAll(".open-sign-button").forEach((button) => {
    button.addEventListener("click", openHumanSignModal);
  });
  document.querySelectorAll(".close-sign-button").forEach((button) => {
    button.addEventListener("click", closeHumanSignModal);
  });
  document.querySelectorAll(".human-sign-draw").forEach((button) => {
    button.addEventListener("click", drawHumanSign);
  });
  document.querySelectorAll(".human-sign-copy").forEach((button) => {
    button.addEventListener("click", copyHumanSign);
  });
  els.musicToggleButton?.addEventListener("click", toggleBackgroundMusic);
  els.musicAudio?.addEventListener("play", () => updateMusicButtonState(true));
  els.musicAudio?.addEventListener("pause", () => updateMusicButtonState(false));
  els.musicAudio?.addEventListener("error", () => {
    updateMusicButtonState(false);
    showToast("背景音乐暂时无法播放");
  });
  document.querySelectorAll(".recipe-return-button").forEach((button) => {
    button.addEventListener("click", () => {
      playSoundEffect("tap");
      showDishHome();
    });
  });
  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const index = Number(card.dataset.recipeIndex);

      if (!Number.isFinite(index)) return;

      playSoundEffect("switch");
      const switched = await selectDish(index);

      if (switched !== false) {
        showDishHome();
      }
    });
  });

  document.querySelectorAll(".prev-dish-button").forEach((button) => {
    button.addEventListener("click", () => changeDish(-1));
  });

  document.querySelectorAll(".next-dish-button").forEach((button) => {
    button.addEventListener("click", () => changeDish(1));
  });

  els.storyTabs.forEach((button) => {
    button.addEventListener("click", () => {
      playSoundEffect("tap");
      activeStorySection = button.dataset.storySection;
      renderStorySection(DISHES[currentDishIndex], activeStorySection);
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      playSoundEffect("tap");
      showToast(button.dataset.toast);
    });
  });

  document.querySelectorAll(".bottom-nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      const opensPanel = button.classList.contains("open-story-button") || button.classList.contains("open-sign-button");

      if (!opensPanel) {
        playSoundEffect("tap");
      }

      document.querySelectorAll(".bottom-nav-item").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (els.humanSignModal?.classList.contains("is-open")) {
      if (event.key === "Escape") {
        closeHumanSignModal();
      }
      return;
    }

    if (els.posterModal?.classList.contains("is-open")) {
      if (event.key === "Escape") {
        closePosterModal();
      }
      return;
    }

    if (event.key === "ArrowLeft") {
      changeDish(-1);
    }

    if (event.key === "ArrowRight") {
      changeDish(1);
    }
  });
}

async function toggleBackgroundMusic() {
  if (!els.musicAudio || !els.musicToggleButton) return;

  playSoundEffect("tap");

  if (!els.musicAudio.paused) {
    els.musicAudio.pause();
    showToast("背景音乐已暂停");
    return;
  }

  await startBackgroundMusic({ showFeedback: true });
}

async function startBackgroundMusic({ showFeedback = false } = {}) {
  if (!els.musicAudio) return false;

  els.musicAudio.volume = 0.42;

  try {
    await els.musicAudio.play();
    if (showFeedback) {
      showToast("背景音乐已开启");
    }
    return true;
  } catch (error) {
    updateMusicButtonState(false);
    if (showFeedback) {
      showToast("请再次点击开启音乐");
    }
    return false;
  }
}

function scheduleBackgroundMusicAutoplay() {
  if (!els.musicAudio || musicAutoplayAttempted) return;

  musicAutoplayAttempted = true;

  queueIdleTask(async () => {
    const stageStable = await waitForPrimaryStageStable();

    if (!stageStable || !els.musicAudio || !els.musicAudio.paused) return;

    els.musicAudio.preload = "auto";
    els.musicAudio.load();

    const ready = await waitForAudioReady(els.musicAudio, 6500);

    if (!ready || !els.musicAudio.paused) return;

    await startBackgroundMusic({ showFeedback: false });
  }, 2400);
}

function waitForPrimaryStageStable(timeout = 3600) {
  const started = performance.now();

  return new Promise((resolve) => {
    const check = () => {
      const dishReady = !els.dishImage || (els.dishImage.complete && els.dishImage.naturalWidth > 0);
      const dishSrc = els.dishImage?.currentSrc || els.dishImage?.src || "";
      const homeDishReady = !els.dishImage || (dishReady && dishSrc.includes("dish-home"));
      const pageReady = els.introScreen?.classList.contains("is-hidden");

      if (pageReady && homeDishReady) {
        resolve(true);
        return;
      }

      if (performance.now() - started >= timeout) {
        resolve(false);
        return;
      }

      window.setTimeout(check, 160);
    };

    check();
  });
}

function waitForAudioReady(audio, timeout = 6500) {
  if (!audio) return Promise.resolve(false);
  if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) return Promise.resolve(true);

  return new Promise((resolve) => {
    let settled = false;
    const timer = window.setTimeout(() => finish(false), timeout);

    function cleanup() {
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("stalled", onError);
    }

    function finish(result) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      cleanup();
      resolve(result);
    }

    function onReady() {
      finish(true);
    }

    function onError() {
      finish(false);
    }

    audio.addEventListener("canplay", onReady);
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("loadeddata", onReady);
    audio.addEventListener("error", onError);
    audio.addEventListener("stalled", onError);
  });
}

function updateMusicButtonState(isPlaying) {
  if (!els.musicToggleButton) return;

  els.musicToggleButton.classList.toggle("is-playing", isPlaying);
  els.musicToggleButton.setAttribute("aria-pressed", String(isPlaying));
  els.musicToggleButton.setAttribute("aria-label", isPlaying ? "暂停背景音乐" : "播放背景音乐");
}

function getSoundContext() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextCtor) return null;

  if (!sfxContext) {
    try {
      sfxContext = new AudioContextCtor({ latencyHint: "interactive" });
    } catch (error) {
      sfxContext = new AudioContextCtor();
    }
  }

  if (sfxContext.state === "suspended") {
    void sfxContext.resume();
  }

  return sfxContext;
}

function playSoundEffect(name) {
  try {
    const ctx = getSoundContext();

    if (!ctx) return;

    switch (name) {
      case "enter":
        playTone(ctx, 523.25, 0, .3, { type: "triangle", volume: .2 });
        playTone(ctx, 783.99, .08, .34, { volume: .11 });
        playTone(ctx, 1046.5, .18, .38, { volume: .08 });
        playNoiseBurst(ctx, 0, .12, { volume: .025, filterType: "highpass", frequency: 2400 });
        break;
      case "switch":
        playNoiseBurst(ctx, 0, .045, { volume: .13, filterType: "highpass", frequency: 1900 });
        playTone(ctx, 739.99, .012, .09, { type: "triangle", volume: .08 });
        playTone(ctx, 1108.73, .042, .08, { volume: .045 });
        break;
      case "paper":
        playNoiseBurst(ctx, 0, .16, { volume: .07, filterType: "bandpass", frequency: 860, q: .7 });
        playTone(ctx, 246.94, .02, .08, { type: "triangle", volume: .028 });
        break;
      case "draw":
        [0, .07, .14].forEach((start) => {
          playNoiseBurst(ctx, start, .055, { volume: .085, filterType: "bandpass", frequency: 1200, q: .9 });
        });
        playTone(ctx, 185, 0, .2, { type: "sawtooth", volume: .025 });
        break;
      case "reveal":
        playTone(ctx, 880, 0, .16, { type: "triangle", volume: .1 });
        playTone(ctx, 1318.51, .06, .2, { volume: .065 });
        break;
      case "seal":
        playNoiseBurst(ctx, 0, .05, { volume: .085, filterType: "lowpass", frequency: 520 });
        playTone(ctx, 146.83, 0, .12, { type: "sine", volume: .13 });
        playTone(ctx, 659.25, .07, .14, { type: "triangle", volume: .052 });
        break;
      case "confirm":
        playTone(ctx, 659.25, 0, .1, { type: "triangle", volume: .07 });
        playTone(ctx, 987.77, .07, .14, { volume: .055 });
        break;
      default:
        playTone(ctx, 620, 0, .055, { type: "triangle", volume: .04 });
        break;
    }
  } catch (error) {
    // Sound should never block the interaction it decorates.
  }
}

function playTone(ctx, frequency, start, duration, options = {}) {
  const startAt = ctx.currentTime + start;
  const endAt = startAt + duration;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const volume = Math.max((options.volume ?? .06) * SFX_MASTER_VOLUME, .0001);
  const attack = options.attack ?? .008;

  oscillator.type = options.type || "sine";
  oscillator.frequency.setValueAtTime(frequency, startAt);
  gain.gain.setValueAtTime(.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + attack);
  gain.gain.exponentialRampToValueAtTime(.0001, endAt);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(startAt);
  oscillator.stop(endAt + .04);
}

function playNoiseBurst(ctx, start, duration, options = {}) {
  const sampleCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < sampleCount; index += 1) {
    const fade = 1 - index / sampleCount;
    data[index] = (Math.random() * 2 - 1) * fade;
  }

  const startAt = ctx.currentTime + start;
  const endAt = startAt + duration;
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const volume = Math.max((options.volume ?? .06) * SFX_MASTER_VOLUME, .0001);

  source.buffer = buffer;
  filter.type = options.filterType || "bandpass";
  filter.frequency.setValueAtTime(options.frequency || 1000, startAt);
  filter.Q.setValueAtTime(options.q ?? .8, startAt);
  gain.gain.setValueAtTime(.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + .006);
  gain.gain.exponentialRampToValueAtTime(.0001, endAt);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(startAt);
  source.stop(endAt + .02);
}

function renderDishPage(dish) {
  if (els.dishImage) {
    els.dishImage.alt = dish.title;
  }

  if (els.storyDishImage) {
    els.storyDishImage.alt = dish.title;
  }

  const sourceParts = getSourceParts(dish.source);
  renderHomeDishNumber(dish.number);
  els.homeDishTitle.textContent = dish.title;
  els.homeDishSubtitle.textContent = dish.subtitle;
  els.homeDishSource.textContent = dish.source;
  els.dishNumber.textContent = dish.number;
  els.dishTitle.textContent = dish.title;
  els.dishSubtitleMain.textContent = dish.subtitle;
  els.dishBookName.textContent = sourceParts.book;
  els.dishSourceLine.textContent = sourceParts.chapter;
  renderStorySection(dish, activeStorySection);
}

function renderHomeDishNumber(numberText) {
  const match = numberText.match(/^([A-Z]+)\s*(\d+)$/);

  if (!match) {
    els.homeDishNumber.textContent = numberText;
    return;
  }

  els.homeDishNumber.textContent = "";
  const label = document.createElement("span");
  const number = document.createElement("strong");
  label.textContent = match[1];
  number.textContent = match[2];
  els.homeDishNumber.append(label, number);
}

function getHomeDishImage(index) {
  return HOME_DISH_IMAGES[index] || DISHES[index]?.image || ASSETS.firstDish;
}

function normalizeDishIndex(index) {
  if (!DISHES.length) return 0;

  return ((index % DISHES.length) + DISHES.length) % DISHES.length;
}

function queueIdleTask(callback, timeout = 1400) {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, { timeout });
  }

  return window.setTimeout(callback, 80);
}

function getPriorityDishIndexes() {
  const count = Math.min(PRIORITY_DISH_COUNT, DISHES.length);

  return Array.from({ length: count }, (_, index) => index);
}

function preloadPriorityDishes() {
  return Promise.all(getPriorityDishIndexes().map((dishIndex) => (
    loadImage(getHomeDishImage(dishIndex), 3600)
  )));
}

function preloadUpcomingDishes(index) {
  if (!DISHES.length) return;

  const targetIndexes = [];

  for (let offset = 1; offset <= FORWARD_PRELOAD_COUNT; offset += 1) {
    const nextIndex = index + offset;

    if (nextIndex < DISHES.length) {
      targetIndexes.push(nextIndex);
    }
  }

  if (!targetIndexes.length) return;

  queueIdleTask(() => {
    targetIndexes.forEach((dishIndex) => {
      void loadImage(getHomeDishImage(dishIndex), 3600);
    });
  });
}

async function selectDish(index) {
  const nextDishIndex = normalizeDishIndex(index);
  const switchToken = ++dishSwitchToken;

  currentDishIndex = nextDishIndex;
  const dish = DISHES[currentDishIndex];
  const homeImage = getHomeDishImage(currentDishIndex);
  const homeImageUrl = new URL(homeImage, window.location.href).href;
  const storyImageUrl = new URL(dish.image, window.location.href).href;

  if (els.dishImage) {
    els.dishImage.classList.add("is-switching");
  }

  if (els.storyDishImage) {
    els.storyDishImage.classList.add("is-switching");
  }

  await delay(reducedMotion ? 0 : DISH_FADE_OUT_MS);

  if (switchToken !== dishSwitchToken) return false;

  renderDishPage(dish);

  if (els.dishImage && els.dishImage.src !== homeImageUrl) {
    const loaded = await loadImage(homeImage, 2400);

    if (switchToken !== dishSwitchToken) return false;

    els.dishImage.src = loaded ? homeImage : dish.image;
    await decodeElementImage(els.dishImage);
  }

  if (switchToken !== dishSwitchToken) return false;

  if (els.storyDishImage && els.storyDishImage.src !== storyImageUrl) {
    els.storyDishImage.src = dish.image;
    if (els.storyPage?.classList.contains("is-active")) {
      await decodeElementImage(els.storyDishImage);
    } else {
      void decodeElementImage(els.storyDishImage);
    }
  }

  await delay(reducedMotion ? 0 : DISH_FADE_IN_DELAY_MS);

  if (switchToken !== dishSwitchToken) return false;

  if (els.dishImage) {
    els.dishImage.classList.remove("is-switching");
  }

  if (els.storyDishImage) {
    els.storyDishImage.classList.remove("is-switching");
  }

  preloadUpcomingDishes(currentDishIndex);
  return true;
}

async function decodeElementImage(image) {
  if (!image?.decode) return;

  try {
    await image.decode();
  } catch (error) {
    // The preload path already decides the fallback; decode can reject if a request is interrupted.
  }
}

function renderStorySection(dish, sectionKey) {
  const section = getStorySection(dish, sectionKey);

  els.storyKicker.textContent = section.label;
  els.storyHeading.textContent = section.heading;
  els.storyNoteText.textContent = section.note;
  els.storyBody.textContent = "";

  section.paragraphs.filter(Boolean).forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    els.storyBody.appendChild(paragraph);
  });

  els.storyTabs.forEach((button) => {
    const selected = button.dataset.storySection === sectionKey;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function getStorySection(dish, sectionKey) {
  const sections = {
    intro: {
      label: SECTION_LABELS.intro,
      heading: `${dish.title}是一道怎样的菜？`,
      paragraphs: [dish.intro],
      note: dish.share,
    },
    source: {
      label: SECTION_LABELS.source,
      heading: `${dish.title}的出处与回合`,
      paragraphs: [dish.scene, dish.books],
      note: "它先属于文本，再进入餐桌。",
    },
    method: {
      label: SECTION_LABELS.method,
      heading: `怎么复原${dish.title}的味道？`,
      paragraphs: [dish.method, `主要食材：${dish.ingredients}`, `气味：${dish.aroma}`],
      note: "火候与香气，是古典餐席的另一种叙事。",
    },
    background: {
      label: SECTION_LABELS.background,
      heading: "这道菜背后有什么人情？",
      paragraphs: [dish.story, dish.books],
      note: "有人做菜，有人点菜，也有人借菜说话。",
    },
  };

  return sections[sectionKey] || sections.intro;
}

function getSourceParts(source) {
  const match = source.match(/^(《[^》]+》)(.+)$/);

  if (!match) {
    return { book: "《金瓶梅》", chapter: source };
  }

  return {
    book: match[1],
    chapter: match[2],
  };
}

async function changeDish(direction) {
  const nextIndex = normalizeDishIndex(currentDishIndex + direction);
  const dish = DISHES[nextIndex];

  playSoundEffect("switch");
  const switched = await selectDish(nextIndex);

  if (switched !== false) {
    showToast(`${dish.title}已上桌`);
  }
}

function showRecipePage() {
  playSoundEffect("paper");
  els.bgBase.style.backgroundImage = `url("${ASSETS.background}")`;
  els.mainStage.classList.remove("is-story-view");
  els.mainStage.classList.add("is-recipe-view");
  els.dishHome.classList.remove("is-active");
  els.storyPage.classList.remove("is-active");
  els.storyPage.setAttribute("aria-hidden", "true");
  els.recipePage.classList.add("is-active");
  els.recipePage.setAttribute("aria-hidden", "false");

  document.querySelectorAll(".recipe-page .stage-ui").forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), reducedMotion ? 0 : index * 80);
  });
}

function showStoryPage() {
  playSoundEffect("paper");
  const dish = DISHES[currentDishIndex];

  if (els.storyDishImage && dish?.image && els.storyDishImage.src !== new URL(dish.image, window.location.href).href) {
    els.storyDishImage.src = dish.image;
  }

  els.bgBase.style.backgroundImage = `url("${ASSETS.storyBackground}")`;
  els.mainStage.classList.remove("is-recipe-view");
  els.mainStage.classList.add("is-story-view");
  els.dishHome.classList.remove("is-active");
  els.recipePage.classList.remove("is-active");
  els.recipePage.setAttribute("aria-hidden", "true");
  els.storyPage.classList.add("is-active");
  els.storyPage.setAttribute("aria-hidden", "false");

  document.querySelectorAll(".dish-story-page .stage-ui").forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), reducedMotion ? 0 : index * 90);
  });
}

function showDishHome({ instant = false } = {}) {
  els.bgBase.style.backgroundImage = `url("${ASSETS.background}")`;
  els.mainStage.classList.remove("is-story-view", "is-recipe-view");
  els.recipePage.classList.remove("is-active");
  els.recipePage.setAttribute("aria-hidden", "true");
  els.storyPage.classList.remove("is-active");
  els.storyPage.setAttribute("aria-hidden", "true");
  els.dishHome.classList.add("is-active");

  if (instant) return;

  document.querySelectorAll(".dish-home .stage-ui").forEach((item) => {
    item.classList.add("is-visible");
  });
}

function openHumanSignModal() {
  playSoundEffect("tap");
  loadDeferredImages(els.humanSignModal);
  populateHumanSignContent();
  resetHumanSignAnimation();
  els.humanSignModal.classList.add("is-open");
  els.humanSignModal.setAttribute("aria-hidden", "false");
}

function loadDeferredImages(root = document) {
  if (!root) return;

  root.querySelectorAll("img[data-src]").forEach((image) => {
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
  });
}

function closeHumanSignModal() {
  playSoundEffect("tap");
  els.humanSignModal.classList.remove("is-open");
  els.humanSignModal.setAttribute("aria-hidden", "true");
  resetHumanSignAnimation();
}

function populateHumanSignContent() {
  const sign = pickHumanSign();
  const fortune = getHumanSignFortune(sign);
  const signDish = getHumanSignDishName(sign);

  currentHumanSign = sign;
  currentHumanSignFortune = fortune;

  els.humanSignNumber.textContent = `第 ${String(sign.number).padStart(2, "0")} 签`;
  els.humanSignTitle.textContent = sign.title;
  els.humanSignCurrent.textContent = `今日应味：${signDish}`;
  els.humanSignLine.textContent = sign.line;
  els.humanSignMeaning.textContent = sign.meaning;
  els.humanSignSuitable.textContent = `宜：${fortune.suitable}`;
  els.humanSignAvoid.textContent = `忌：${fortune.avoid}`;
  els.humanSignJoy.textContent = `开心小事：${fortune.joy}`;

  requestAnimationFrame(fitHumanSignText);
}

function pickHumanSign() {
  if (HUMAN_SIGNS.length < 2 || !currentHumanSign) {
    return HUMAN_SIGNS[Math.floor(Math.random() * HUMAN_SIGNS.length)];
  }

  let nextSign = currentHumanSign;
  while (nextSign.number === currentHumanSign.number) {
    nextSign = HUMAN_SIGNS[Math.floor(Math.random() * HUMAN_SIGNS.length)];
  }

  return nextSign;
}

function getHumanSignDishName(sign) {
  const titleParts = sign.title.split(" · ");
  return titleParts[1]?.trim() || sign.title;
}

function getHumanSignFortune(sign) {
  const index = Math.max(sign.number - 1, 0);

  return {
    suitable: HUMAN_SIGN_SUITABLES[index % HUMAN_SIGN_SUITABLES.length],
    avoid: HUMAN_SIGN_AVOIDS[(index + 2) % HUMAN_SIGN_AVOIDS.length],
    joy: HUMAN_SIGN_JOYS[(index + 5) % HUMAN_SIGN_JOYS.length],
  };
}

function buildHumanSignShareText() {
  if (!currentHumanSign || !currentHumanSignFortune) return "";

  const signDish = getHumanSignDishName(currentHumanSign);
  return [
    `我在《金瓶梅》饮食图鉴抽到：第 ${String(currentHumanSign.number).padStart(2, "0")} 签`,
    currentHumanSign.title,
    currentHumanSign.line,
    `今日应味：${signDish}`,
    `宜：${currentHumanSignFortune.suitable}`,
    `忌：${currentHumanSignFortune.avoid}`,
    `开心小事：${currentHumanSignFortune.joy}`,
    currentHumanSign.meaning,
  ].join("\n");
}

function fitHumanSignText() {
  const stick = els.humanSignStick;
  const text = els.humanSignVerticalText;
  if (!stick || !text) return;

  text.style.transform = "";
  const stickRect = stick.getBoundingClientRect();
  // scrollWidth/Height include overflowing columns from vertical writing-mode.
  const textW = Math.max(text.getBoundingClientRect().width, text.scrollWidth);
  const textH = Math.max(text.getBoundingClientRect().height, text.scrollHeight);
  if (!stickRect.width || !stickRect.height || !textW || !textH) return;

  const padX = 10;
  const padY = 14;
  const scale = Math.min(
    (stickRect.width - padX) / Math.max(textW, 1),
    (stickRect.height - padY) / Math.max(textH, 1),
    1
  );

  if (scale < 0.98) {
    text.style.transform = `scale(${scale.toFixed(3)})`;
  }
}

function resetHumanSignAnimation() {
  window.clearTimeout(humanSignRevealTimer);
  if (els.humanSignStick) {
    els.humanSignStick.classList.remove("is-revealed", "is-drawing");
  }
  if (els.humanSignReading) {
    els.humanSignReading.classList.remove("is-visible");
  }
  if (els.humanSignDraw) {
    els.humanSignDraw.textContent = "抽一签";
    els.humanSignDraw.disabled = false;
  }
  if (els.humanSignCopy) {
    els.humanSignCopy.disabled = true;
  }
}

function drawHumanSign() {
  playSoundEffect("draw");
  populateHumanSignContent();

  if (els.humanSignDraw) {
    els.humanSignDraw.textContent = "再抽一签";
    els.humanSignDraw.disabled = true;
  }
  if (els.humanSignCopy) {
    els.humanSignCopy.disabled = true;
  }

  const stick = els.humanSignStick;
  if (!stick) return;

  window.clearTimeout(humanSignRevealTimer);
  const wasRevealed = stick.classList.contains("is-revealed");
  stick.classList.remove("is-revealed", "is-drawing");

  const startDraw = () => {
    requestAnimationFrame(() => {
      stick.classList.add("is-drawing");
      humanSignRevealTimer = window.setTimeout(() => {
        playSoundEffect("reveal");
        stick.classList.add("is-revealed");
        stick.classList.remove("is-drawing");
        if (els.humanSignReading) {
          els.humanSignReading.classList.add("is-visible");
        }
        if (els.humanSignDraw) {
          els.humanSignDraw.disabled = false;
        }
        if (els.humanSignCopy) {
          els.humanSignCopy.disabled = false;
        }
      }, 700);
    });
  };

  if (wasRevealed) {
    humanSignRevealTimer = window.setTimeout(startDraw, 320);
  } else {
    startDraw();
  }
}

async function copyHumanSign() {
  const text = buildHumanSignShareText();
  if (!text) return;

  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      copyTextWithFallback(text);
    }
    playSoundEffect("confirm");
    showToast("签文已复制，带着这口气走");
  } catch (error) {
    console.error(error);
    showToast("复制失败，可以手动选中签文");
  }
}

function copyTextWithFallback(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  if (!copied) {
    throw new Error("Fallback copy command failed");
  }
}

async function openPosterModal() {
  playSoundEffect("paper");
  const dish = DISHES[currentDishIndex];
  const renderId = posterRenderId + 1;
  posterRenderId = renderId;

  els.posterModal.classList.add("is-open");
  els.posterModal.classList.remove("is-ready");
  els.posterModal.setAttribute("aria-hidden", "false");
  els.posterPreview.removeAttribute("src");
  els.posterSaveButton.removeAttribute("href");
  els.posterSaveButton.setAttribute("aria-disabled", "true");

  try {
    const dataUrl = await generatePosterImage(dish, currentDishIndex);

    if (renderId !== posterRenderId) return;

    els.posterPreview.src = dataUrl;
    els.posterSaveButton.href = dataUrl;
    els.posterSaveButton.download = `${dish.title}-名著饮食图鉴.png`;
    els.posterSaveButton.removeAttribute("aria-disabled");
    els.posterModal.classList.add("is-ready");
    playSoundEffect("seal");
  } catch (error) {
    console.error(error);
    closePosterModal();
    showToast(window.location.protocol === "file:" ? "本地文件预览无法导出，请用本地服务器或部署后生成" : "海报生成失败，请稍后再试");
  }
}

function closePosterModal() {
  playSoundEffect("tap");
  posterRenderId += 1;
  els.posterModal.classList.remove("is-open", "is-ready");
  els.posterModal.setAttribute("aria-hidden", "true");
}

async function generatePosterImage(dish, index) {
  const canvas = els.posterCanvas;
  const ctx = canvas.getContext("2d");
  const width = 750;
  const height = 1000;
  const siteInfo = getPosterSiteInfo();

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  const [background, dishImage] = await Promise.all([
    loadDrawableImage(ASSETS.background, 2500),
    loadDrawableImage(getHomeDishImage(index), 3500),
  ]);

  drawPosterBackground(ctx, background, width, height);
  drawPosterFrame(ctx, width, height);
  drawPosterDish(ctx, dishImage, width);
  drawPosterText(ctx, dish, index, siteInfo);

  return canvas.toDataURL("image/png");
}

function drawPosterBackground(ctx, background, width, height) {
  ctx.save();
  ctx.fillStyle = "#070604";
  ctx.fillRect(0, 0, width, height);

  if (background) {
    ctx.globalAlpha = 0.72;
    drawImageCover(ctx, background, 0, 0, width, height);
    ctx.globalAlpha = 1;
  }

  const glow = ctx.createRadialGradient(width / 2, 308, 20, width / 2, 330, 480);
  glow.addColorStop(0, "rgba(210, 154, 65, .32)");
  glow.addColorStop(0.42, "rgba(118, 77, 31, .18)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const shade = ctx.createLinearGradient(0, 0, 0, height);
  shade.addColorStop(0, "rgba(0, 0, 0, .14)");
  shade.addColorStop(0.48, "rgba(0, 0, 0, .04)");
  shade.addColorStop(1, "rgba(0, 0, 0, .58)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawPosterFrame(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(209, 164, 86, .92)";
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 36, width - 84, height - 72);
  ctx.strokeStyle = "rgba(117, 82, 37, .72)";
  ctx.lineWidth = 1;
  ctx.strokeRect(58, 52, width - 116, height - 104);

  drawCorner(ctx, 42, 36, 1, 1);
  drawCorner(ctx, width - 42, 36, -1, 1);
  drawCorner(ctx, 42, height - 36, 1, -1);
  drawCorner(ctx, width - 42, height - 36, -1, -1);

  ctx.fillStyle = "rgba(191, 73, 38, .9)";
  drawDiamond(ctx, width / 2, 946, 12);
  ctx.restore();
}

function drawCorner(ctx, x, y, sx, sy) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sx, sy);
  ctx.strokeStyle = "rgba(222, 176, 92, .9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 58);
  ctx.lineTo(0, 0);
  ctx.lineTo(58, 0);
  ctx.moveTo(14, 46);
  ctx.lineTo(14, 14);
  ctx.lineTo(46, 14);
  ctx.stroke();
  ctx.restore();
}

function drawPosterDish(ctx, dishImage, width) {
  ctx.save();
  const centerX = width / 2;
  const centerY = 318;

  const halo = ctx.createRadialGradient(centerX, centerY, 32, centerX, centerY, 230);
  halo.addColorStop(0, "rgba(222, 174, 88, .38)");
  halo.addColorStop(0.42, "rgba(40, 32, 22, .44)");
  halo.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 230, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(195, 150, 76, .32)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 208, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(195, 150, 76, .18)";
  ctx.beginPath();
  ctx.arc(centerX, centerY, 236, 0, Math.PI * 2);
  ctx.stroke();

  if (dishImage) {
    ctx.shadowColor = "rgba(0, 0, 0, .62)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 18;
    drawImageContain(ctx, dishImage, centerX - 176, centerY - 176, 352, 352);
  }

  ctx.restore();
}

function drawPosterText(ctx, dish, index, siteInfo) {
  const keywords = getPosterKeywords(dish, index);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  ctx.fillStyle = "rgba(206, 158, 83, .92)";
  ctx.font = "20px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  ctx.fillText("金瓶梅饮食图谱", 375, 66);

  ctx.fillStyle = "rgba(242, 219, 171, .98)";
  ctx.font = "34px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  ctx.fillText("《名著饮食图鉴》", 375, 98);

  ctx.fillStyle = "rgba(244, 224, 181, .98)";
  ctx.font = "56px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  ctx.fillText(dish.title, 375, 512);

  ctx.fillStyle = "rgba(209, 164, 90, .9)";
  ctx.font = "24px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  drawWrappedText(ctx, dish.subtitle, 110, 582, 530, 34, 2, "center");

  ctx.fillStyle = "rgba(190, 73, 41, .92)";
  ctx.fillRect(318, 642, 114, 3);

  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(235, 215, 172, .92)";
  ctx.font = "22px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  ctx.fillText("出处回合", 92, 672);

  ctx.fillStyle = "rgba(218, 187, 126, .92)";
  ctx.font = "24px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  drawWrappedText(ctx, dish.source, 92, 706, 566, 34, 2, "left");

  ctx.fillStyle = "rgba(235, 215, 172, .92)";
  ctx.font = "22px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  ctx.fillText("场景说明", 92, 770);

  ctx.fillStyle = "rgba(199, 181, 143, .95)";
  ctx.font = "20px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  drawWrappedText(ctx, dish.scene, 92, 804, 396, 32, 3, "left");

  drawKeywordPills(ctx, keywords, 92, 908, 396);
  drawPosterQr(ctx, siteInfo, 542, 760, 126);

  ctx.restore();
}

function drawKeywordPills(ctx, keywords, x, y, maxWidth) {
  let currentX = x;
  let currentY = y;
  ctx.font = "18px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";

  keywords.forEach((keyword) => {
    const textWidth = ctx.measureText(keyword).width;
    const width = Math.ceil(textWidth + 28);

    if (currentX + width > x + maxWidth) {
      currentX = x;
      currentY += 34;
    }

    ctx.fillStyle = "rgba(20, 15, 10, .72)";
    roundRect(ctx, currentX, currentY, width, 26, 4);
    ctx.fill();
    ctx.strokeStyle = "rgba(168, 119, 55, .58)";
    ctx.stroke();
    ctx.fillStyle = "rgba(225, 194, 130, .94)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(keyword, currentX + width / 2, currentY + 13);
    currentX += width + 10;
  });
}

function drawPosterQr(ctx, siteInfo, x, y, size) {
  ctx.save();
  ctx.fillStyle = "rgba(235, 222, 191, .96)";
  roundRect(ctx, x - 14, y - 14, size + 28, size + 72, 6);
  ctx.fill();

  drawQrCode(ctx, siteInfo.url, x, y, size);

  ctx.fillStyle = "rgba(58, 41, 22, .94)";
  ctx.font = "16px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(siteInfo.domain, x + size / 2, y + size + 14);
  ctx.fillStyle = "rgba(117, 78, 37, .84)";
  ctx.font = "14px 'Noto Serif CJK SC', 'Songti SC', SimSun, serif";
  ctx.fillText("扫码打开网页", x + size / 2, y + size + 36);
  ctx.restore();
}

function getPosterKeywords(dish, index) {
  if (POSTER_KEYWORDS[index]) {
    return POSTER_KEYWORDS[index];
  }

  return dish.ingredients.split(/[、，,。]/).filter(Boolean).slice(0, 5);
}

function getPosterSiteInfo() {
  const hasOrigin = window.location.origin && window.location.origin !== "null" && window.location.protocol !== "file:";
  const domain = hasOrigin ? window.location.host : "mingzhu-food.example";
  const url = hasOrigin ? window.location.origin : "https://mingzhu-food.example/";

  return { domain, url };
}

function loadDrawableImage(src, timeout = 2500) {
  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const timer = window.setTimeout(() => finish(null), timeout);

    function finish(result) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(result);
    }

    image.onload = () => finish(image);
    image.onerror = () => finish(null);
    image.decoding = "async";
    image.src = src;

    if (image.complete && image.naturalWidth > 0) {
      finish(image);
    }
  });
}

function drawImageCover(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawImageContain(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines, align = "left") {
  const lines = [];
  let line = "";

  Array.from(text).forEach((char) => {
    const testLine = line + char;

    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = testLine;
    }
  });

  if (line) {
    lines.push(line);
  }

  const visibleLines = lines.slice(0, maxLines);

  if (lines.length > maxLines) {
    let lastLine = visibleLines[visibleLines.length - 1] || "";
    while (lastLine && ctx.measureText(`${lastLine}…`).width > maxWidth) {
      lastLine = lastLine.slice(0, -1);
    }
    visibleLines[visibleLines.length - 1] = `${lastLine}…`;
  }

  ctx.textAlign = align;
  visibleLines.forEach((lineText, index) => {
    const textX = align === "center" ? x + maxWidth / 2 : x;
    ctx.fillText(lineText, textX, y + index * lineHeight);
  });

  return y + visibleLines.length * lineHeight;
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

function drawDiamond(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.fill();
}

function drawQrCode(ctx, text, x, y, size) {
  const matrix = createQrMatrix(text);
  const quiet = 4;
  const count = matrix.length;
  const moduleSize = Math.max(2, Math.floor(size / (count + quiet * 2)));
  const actualSize = moduleSize * (count + quiet * 2);
  const offsetX = x + Math.floor((size - actualSize) / 2);
  const offsetY = y + Math.floor((size - actualSize) / 2);

  ctx.save();
  ctx.fillStyle = "#f3ead2";
  ctx.fillRect(offsetX, offsetY, actualSize, actualSize);
  ctx.fillStyle = "#1b130c";

  matrix.forEach((row, rowIndex) => {
    row.forEach((dark, colIndex) => {
      if (!dark) return;

      ctx.fillRect(
        offsetX + (colIndex + quiet) * moduleSize,
        offsetY + (rowIndex + quiet) * moduleSize,
        moduleSize,
        moduleSize,
      );
    });
  });

  ctx.restore();
}

function createQrMatrix(text) {
  const encoder = new TextEncoder();
  let bytes = Array.from(encoder.encode(text));
  let info = QR_VERSION_INFO.find((item) => bytes.length <= item.byteCapacity);

  if (!info) {
    bytes = Array.from(encoder.encode(text.slice(0, QR_VERSION_INFO[QR_VERSION_INFO.length - 1].byteCapacity - 8)));
    info = QR_VERSION_INFO[QR_VERSION_INFO.length - 1];
  }

  const size = 17 + info.version * 4;
  const matrix = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction = Array.from({ length: size }, () => Array(size).fill(false));
  const dataCodewords = buildQrDataCodewords(bytes, info);
  const ecCodewords = computeQrErrorCorrection(dataCodewords, info.ecCodewords);
  const allCodewords = dataCodewords.concat(ecCodewords);

  placeQrFunctionPatterns(matrix, isFunction, info.version);
  placeQrDataBits(matrix, isFunction, allCodewords);
  applyQrMask(matrix, isFunction, 0);
  placeQrFormatBits(matrix, isFunction, 0);

  return matrix;
}

function buildQrDataCodewords(bytes, info) {
  const bits = [];
  appendQrBits(bits, 0x4, 4);
  appendQrBits(bits, bytes.length, 8);

  bytes.forEach((byte) => appendQrBits(bits, byte, 8));

  const capacityBits = info.dataCodewords * 8;
  const terminator = Math.min(4, capacityBits - bits.length);
  appendQrBits(bits, 0, terminator);

  while (bits.length % 8 !== 0) {
    bits.push(0);
  }

  const codewords = [];
  for (let index = 0; index < bits.length; index += 8) {
    let value = 0;
    for (let offset = 0; offset < 8; offset += 1) {
      value = (value << 1) | bits[index + offset];
    }
    codewords.push(value);
  }

  let padByte = 0xec;
  while (codewords.length < info.dataCodewords) {
    codewords.push(padByte);
    padByte = padByte === 0xec ? 0x11 : 0xec;
  }

  return codewords;
}

function appendQrBits(bits, value, length) {
  for (let index = length - 1; index >= 0; index -= 1) {
    bits.push((value >>> index) & 1);
  }
}

function placeQrFunctionPatterns(matrix, isFunction, version) {
  const size = matrix.length;

  placeQrFinderPattern(matrix, isFunction, 0, 0);
  placeQrFinderPattern(matrix, isFunction, 0, size - 7);
  placeQrFinderPattern(matrix, isFunction, size - 7, 0);

  for (let index = 8; index < size - 8; index += 1) {
    const dark = index % 2 === 0;
    setQrFunctionModule(matrix, isFunction, 6, index, dark);
    setQrFunctionModule(matrix, isFunction, index, 6, dark);
  }

  if (version > 1) {
    const alignment = [6, size - 7];
    alignment.forEach((row) => {
      alignment.forEach((col) => {
        if (!isFunction[row][col]) {
          placeQrAlignmentPattern(matrix, isFunction, row, col);
        }
      });
    });
  }

  reserveQrFormatModules(isFunction);
  setQrFunctionModule(matrix, isFunction, size - 8, 8, true);
}

function placeQrFinderPattern(matrix, isFunction, row, col) {
  const size = matrix.length;

  for (let r = -1; r <= 7; r += 1) {
    for (let c = -1; c <= 7; c += 1) {
      const yy = row + r;
      const xx = col + c;

      if (yy < 0 || yy >= size || xx < 0 || xx >= size) continue;

      const inPattern = r >= 0 && r <= 6 && c >= 0 && c <= 6;
      const distance = Math.max(Math.abs(r - 3), Math.abs(c - 3));
      const dark = inPattern && distance !== 2;
      setQrFunctionModule(matrix, isFunction, yy, xx, dark);
    }
  }
}

function placeQrAlignmentPattern(matrix, isFunction, row, col) {
  for (let r = -2; r <= 2; r += 1) {
    for (let c = -2; c <= 2; c += 1) {
      const distance = Math.max(Math.abs(r), Math.abs(c));
      setQrFunctionModule(matrix, isFunction, row + r, col + c, distance !== 1);
    }
  }
}

function reserveQrFormatModules(isFunction) {
  const size = isFunction.length;

  for (let index = 0; index < 9; index += 1) {
    if (index !== 6) {
      isFunction[8][index] = true;
      isFunction[index][8] = true;
    }
  }

  for (let index = 0; index < 8; index += 1) {
    isFunction[8][size - 1 - index] = true;
  }

  for (let index = 0; index < 7; index += 1) {
    isFunction[size - 1 - index][8] = true;
  }
}

function setQrFunctionModule(matrix, isFunction, row, col, dark) {
  matrix[row][col] = dark;
  isFunction[row][col] = true;
}

function placeQrDataBits(matrix, isFunction, codewords) {
  const size = matrix.length;
  let bitIndex = 0;
  let upward = true;

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) {
      right -= 1;
    }

    for (let vert = 0; vert < size; vert += 1) {
      const row = upward ? size - 1 - vert : vert;

      for (let col = right; col >= right - 1; col -= 1) {
        if (isFunction[row][col]) continue;

        const codeword = codewords[Math.floor(bitIndex / 8)] || 0;
        const dark = ((codeword >>> (7 - (bitIndex % 8))) & 1) !== 0;
        matrix[row][col] = dark;
        bitIndex += 1;
      }
    }

    upward = !upward;
  }
}

function applyQrMask(matrix, isFunction, mask) {
  matrix.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (isFunction[rowIndex][colIndex]) return;

      if (getQrMaskBit(mask, rowIndex, colIndex)) {
        matrix[rowIndex][colIndex] = !matrix[rowIndex][colIndex];
      }
    });
  });
}

function getQrMaskBit(mask, row, col) {
  if (mask === 0) return (row + col) % 2 === 0;
  if (mask === 1) return row % 2 === 0;
  if (mask === 2) return col % 3 === 0;
  if (mask === 3) return (row + col) % 3 === 0;
  if (mask === 4) return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
  if (mask === 5) return ((row * col) % 2) + ((row * col) % 3) === 0;
  if (mask === 6) return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
  return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
}

function placeQrFormatBits(matrix, isFunction, mask) {
  const size = matrix.length;
  const bits = getQrFormatBits(mask);

  for (let index = 0; index <= 5; index += 1) {
    setQrFunctionModule(matrix, isFunction, index, 8, getQrBit(bits, index));
  }
  setQrFunctionModule(matrix, isFunction, 7, 8, getQrBit(bits, 6));
  setQrFunctionModule(matrix, isFunction, 8, 8, getQrBit(bits, 7));
  setQrFunctionModule(matrix, isFunction, 8, 7, getQrBit(bits, 8));

  for (let index = 9; index < 15; index += 1) {
    setQrFunctionModule(matrix, isFunction, 8, 14 - index, getQrBit(bits, index));
  }

  for (let index = 0; index < 8; index += 1) {
    setQrFunctionModule(matrix, isFunction, 8, size - 1 - index, getQrBit(bits, index));
  }

  for (let index = 8; index < 15; index += 1) {
    setQrFunctionModule(matrix, isFunction, size - 15 + index, 8, getQrBit(bits, index));
  }

  setQrFunctionModule(matrix, isFunction, size - 8, 8, true);
}

function getQrFormatBits(mask) {
  const data = (1 << 3) | mask;
  let bits = data << 10;
  const generator = 0x537;

  for (let index = 14; index >= 10; index -= 1) {
    if (((bits >>> index) & 1) !== 0) {
      bits ^= generator << (index - 10);
    }
  }

  return ((data << 10) | bits) ^ 0x5412;
}

function getQrBit(value, index) {
  return ((value >>> index) & 1) !== 0;
}

function computeQrErrorCorrection(dataCodewords, degree) {
  const generator = createQrGeneratorPolynomial(degree);
  const result = Array(degree).fill(0);

  dataCodewords.forEach((byte) => {
    const factor = byte ^ result.shift();
    result.push(0);

    for (let index = 0; index < degree; index += 1) {
      result[index] ^= qrGfMultiply(generator[index + 1], factor);
    }
  });

  return result;
}

function createQrGeneratorPolynomial(degree) {
  let coefficients = [1];

  for (let index = 0; index < degree; index += 1) {
    const next = Array(coefficients.length + 1).fill(0);

    coefficients.forEach((coefficient, coefficientIndex) => {
      next[coefficientIndex] ^= coefficient;
      next[coefficientIndex + 1] ^= qrGfMultiply(coefficient, QR_GF.exp[index]);
    });

    coefficients = next;
  }

  return coefficients;
}

function createQrGaloisTables() {
  const exp = Array(512).fill(0);
  const log = Array(256).fill(0);
  let value = 1;

  for (let index = 0; index < 255; index += 1) {
    exp[index] = value;
    log[value] = index;
    value <<= 1;

    if (value & 0x100) {
      value ^= 0x11d;
    }
  }

  for (let index = 255; index < 512; index += 1) {
    exp[index] = exp[index - 255];
  }

  return { exp, log };
}

function qrGfMultiply(left, right) {
  if (left === 0 || right === 0) return 0;

  return QR_GF.exp[QR_GF.log[left] + QR_GF.log[right]];
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");

  toastTimer = window.setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 1500);
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
