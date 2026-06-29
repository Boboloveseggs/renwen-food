const fallbackFoods = [
  {
    id: "food-001",
    name: "烧猪头",
    source: "金瓶梅",
    chapter: "第二十三回",
    intro: "一根柴禾，烧出宋蕙莲的本事。",
    story: "这盘烧猪头不只是肉菜，也是宋蕙莲在西门府里证明自己的方式。她没有地位，却有手艺；没有权力，却能让一桌人服气。",
    gua: "乾为天",
    qian: "乾为天，主主动、开局、显能。",
    lucky: "宜主动掌局，把手里的事做出分量。",
    image: "./assets/images/food-001.webp"
  },
  {
    id: "food-002",
    name: "炊饼",
    source: "金瓶梅",
    chapter: "第二回",
    intro: "一笼炊饼，撑着小人物的活路。",
    story: "炊饼不是宴席菜，而是武大郎赖以谋生的街头食物。武松因公出差前，叮嘱武大郎少做、早回，不要和人吃酒。这里的炊饼连着武大郎的生计，也连着武松对哥哥的担忧。",
    gua: "坤为地",
    qian: "坤为地，主承载、养成、厚实。",
    lucky: "宜先稳根基，把日子踏实托住。",
    image: "./assets/images/food-002.webp"
  },
  {
    id: "food-003",
    name: "鲜鲊",
    source: "金瓶梅",
    chapter: "第三回",
    intro: "一碟鲜鲊，摆开王婆的局。",
    story: "鲜鲊出现在王婆设局的早期场景里。王婆为西门庆和潘金莲牵线，置办下酒之物，其中就有熟肉鲜鲊。它是桌上的食物，也是王婆局里的一枚钉子。",
    gua: "水雷屯",
    qian: "屯为初生，主开端、积蓄、未成。",
    lucky: "宜耐心养成，不可急着开坛。",
    image: "./assets/images/food-003.webp"
  },
  {
    id: "food-004",
    name: "王瓜拌辽东金虾",
    source: "金瓶梅",
    chapter: "第三十四回",
    intro: "王瓜清脆，金虾来自远方。",
    story: "这道菜出现在西门庆陪应伯爵吃酒的一席午餐中。王瓜清脆，辽东金虾鲜咸，一个来自园中时令，一个带着远方物产的意味，显出西门府餐桌的讲究。",
    gua: "山水蒙",
    qian: "蒙为未明，主启发、求教、开窍。",
    lucky: "宜先学明白，不懂之处正可开蒙。",
    image: "./assets/images/food-004.webp"
  },
  {
    id: "food-005",
    name: "柳蒸糟鲥鱼",
    source: "金瓶梅",
    chapter: "第三十四回",
    intro: "时鲜压席，糟香入骨。",
    story: "柳蒸糟鲥鱼不是一开席就上，而是放在后面压席。前面的冷碟和下饭已经铺开排场，糟鲥鱼一出，才是真正的好东西。",
    gua: "水天需",
    qian: "需为等待，主养时、蓄力、候成。",
    lucky: "宜等火候，好事正在锅中。",
    image: "./assets/images/food-005.webp"
  },
  {
    id: "food-006",
    name: "八宝攒汤",
    source: "金瓶梅",
    chapter: "第四十二回",
    intro: "一碗热汤，攒起元宵夜的热闹。",
    story: "八宝攒汤出现在元宵赏灯的热闹场面中。主人摆的是场面，帮闲吃的是实惠，一碗热汤把灯、酒、笑声和人情都盛进去了。",
    gua: "天水讼",
    qian: "讼为口舌，主争执、分辩、不平。",
    lucky: "宜转念求和，别把酸意熬成怨气。",
    image: "./assets/images/food-006.webp"
  },
  {
    id: "food-007",
    name: "螃蟹鲜",
    source: "金瓶梅",
    chapter: "第六十一回",
    intro: "四十只螃蟹，酿成一份人情。",
    story: "螃蟹鲜背后不是普通吃饭，而是一份还人情的礼。常二哥受了西门庆好处，不能空口道谢，于是让妻子做出极费工的螃蟹鲜。",
    gua: "地水师",
    qian: "师为行阵，主纪律、调度、组织。",
    lucky: "宜理清队形，众事归阵便可推进。",
    image: "./assets/images/food-007.webp"
  },
  {
    id: "food-008",
    name: "白糖万寿糕",
    source: "金瓶梅",
    chapter: "第三十九回",
    intro: "甜的是糕，送的是人情。",
    story: "白糖万寿糕不是正席大菜，而是带着人情意味的小点心。它洁白、甜润，名字吉祥，祝寿、庆贺、馈赠、讨好，都能装进一块糕里。",
    gua: "水地比",
    qian: "比为亲近，主相依、结伴、同心。",
    lucky: "宜靠近良伴，同味相成胜过独行。",
    image: "./assets/images/food-008.webp"
  }
];

const state = {
  foods: []
};

const els = {
  grid: document.querySelector("[data-food-grid]"),
  modal: document.querySelector("[data-detail-modal]"),
  detailImage: document.querySelector("[data-detail-image]"),
  detailId: document.querySelector("[data-detail-id]"),
  detailName: document.querySelector("[data-detail-name]"),
  detailIntro: document.querySelector("[data-detail-intro]"),
  detailSource: document.querySelector("[data-detail-source]"),
  detailChapter: document.querySelector("[data-detail-chapter]"),
  detailGua: document.querySelector("[data-detail-gua]"),
  detailStory: document.querySelector("[data-detail-story]"),
  detailQian: document.querySelector("[data-detail-qian]"),
  detailLucky: document.querySelector("[data-detail-lucky]")
};

document.addEventListener("DOMContentLoaded", () => {
  bindActions();
  loadFoods();
});

function bindActions() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-close-detail]").forEach((button) => {
    button.addEventListener("click", closeDetail);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDetail();
    }
  });
}

async function loadFoods() {
  if (window.location.protocol === "file:") {
    state.foods = fallbackFoods;
    renderFoodCards(state.foods);
    return;
  }

  try {
    const response = await fetch("./data/foods.json", { cache: "no-store" });
    if (!response.ok) throw new Error("foods.json not found");
    state.foods = await response.json();
  } catch (error) {
    state.foods = fallbackFoods;
    console.warn("Using fallback food data:", error);
  }

  renderFoodCards(state.foods);
}

function renderFoodCards(foods) {
  if (!els.grid) return;

  els.grid.innerHTML = "";

  foods.forEach((food, index) => {
    const card = document.createElement("button");
    card.className = "food-card";
    card.type = "button";
    card.setAttribute("aria-label", `查看${food.name}详情`);
    card.innerHTML = `
      <div class="food-card__image">
        <img src="${food.image}" alt="${food.name}" loading="lazy" />
      </div>
      <div class="food-card__body">
        <p class="food-card__meta">DISH ${String(index + 1).padStart(2, "0")} · 《${food.source}》${food.chapter}</p>
        <h3>${food.name}</h3>
        <p>${food.intro}</p>
      </div>
    `;

    const imageWrap = card.querySelector(".food-card__image");
    const image = card.querySelector("img");
    image.addEventListener("error", () => {
      image.remove();
      imageWrap.classList.add("is-missing");
    });

    card.addEventListener("click", () => openDetail(food, index));
    els.grid.appendChild(card);
  });
}

function openDetail(food, index) {
  els.detailId.textContent = `DISH ${String(index + 1).padStart(2, "0")}`;
  els.detailName.textContent = food.name || "待补";
  els.detailIntro.textContent = food.intro || "待补";
  els.detailSource.textContent = `《${food.source || "待补"}》`;
  els.detailChapter.textContent = food.chapter || "待补";
  els.detailGua.textContent = food.gua || "待补";
  els.detailStory.textContent = food.story || "待补";
  els.detailQian.textContent = food.qian || "待补";
  els.detailLucky.textContent = food.lucky || "待补";

  els.detailImage.src = food.image || "";
  els.detailImage.alt = food.name || "";
  els.detailImage.onerror = () => {
    els.detailImage.removeAttribute("src");
    els.detailImage.alt = "图片待补";
  };

  els.modal.classList.add("is-open");
  els.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDetail() {
  els.modal.classList.remove("is-open");
  els.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
