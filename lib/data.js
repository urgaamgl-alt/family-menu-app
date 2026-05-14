// Food Library with Chinese and English names
export const foodLibrary = {
  meatPoultryEggs: {
    en: "Meat / Poultry / Eggs",
    zh: "肉类/家禽/鸡蛋",
    foods: [
      { en: "Chicken", zh: "鸡肉" },
      { en: "Pork", zh: "猪肉" },
      { en: "Beef", zh: "牛肉" },
      { en: "Duck", zh: "鸭肉" },
      { en: "Lamb", zh: "羊肉" },
      { en: "Eggs", zh: "鸡蛋" },
      { en: "Ground pork", zh: "猪肉末" },
      { en: "Ground beef", zh: "牛肉末" },
      { en: "Bacon", zh: "培根" },
      { en: "Ham", zh: "火腿" }
    ]
  },
  seafood: {
    en: "Seafood",
    zh: "海鲜/鱼类",
    foods: [
      { en: "Salmon", zh: "三文鱼" },
      { en: "Shrimp", zh: "虾" },
      { en: "Fish", zh: "鱼" },
      { en: "Crab", zh: "螃蟹" },
      { en: "Squid", zh: "鱿鱼" },
      { en: "Clams", zh: "蛤蜊" },
      { en: "Oysters", zh: "生蚝" },
      { en: "Mussels", zh: "淡菜" },
      { en: "Scallops", zh: "扇贝" },
      { en: "Tilapia", zh: "罗非鱼" }
    ]
  },
  vegetablesBeanProducts: {
    en: "Vegetables / Bean Products",
    zh: "蔬菜/豆制品",
    foods: [
      { en: "Broccoli", zh: "西兰花" },
      { en: "Spinach", zh: "菠菜" },
      { en: "Carrots", zh: "胡萝卜" },
      { en: "Bell peppers", zh: "灯笼椒" },
      { en: "Tomatoes", zh: "番茄" },
      { en: "Cucumber", zh: "黄瓜" },
      { en: "Cabbage", zh: "卷心菜" },
      { en: "Chinese cabbage", zh: "白菜" },
      { en: "Bok choy", zh: "小白菜" },
      { en: "Mushrooms", zh: "蘑菇" },
      { en: "Onions", zh: "洋葱" },
      { en: "Garlic", zh: "大蒜" },
      { en: "Ginger", zh: "生姜" },
      { en: "Tofu", zh: "豆腐" },
      { en: "Bean sprouts", zh: "豆芽" },
      { en: "Snap peas", zh: "雪豌豆" },
      { en: "Zucchini", zh: "冬瓜" },
      { en: "Eggplant", zh: "茄子" },
      { en: "Corn", zh: "玉米" },
      { en: "Peas", zh: "豌豆" }
    ]
  },
  fruits: {
    en: "Fruits",
    zh: "水果",
    foods: [
      { en: "Apples", zh: "苹果" },
      { en: "Bananas", zh: "香蕉" },
      { en: "Oranges", zh: "橙子" },
      { en: "Strawberries", zh: "草莓" },
      { en: "Grapes", zh: "葡萄" },
      { en: "Watermelon", zh: "西瓜" },
      { en: "Mangoes", zh: "芒果" },
      { en: "Pineapple", zh: "菠萝" },
      { en: "Peaches", zh: "桃子" },
      { en: "Pears", zh: "梨" },
      { en: "Blueberries", zh: "蓝莓" },
      { en: "Kiwi", zh: "猕猴桃" }
    ]
  }
};

// Recipe Library - Chinese recipes first, then Western
export const recipeLibrary = [
  // CHINESE RECIPES (Most common)
  {
    id: 1,
    en: "Fried Rice with Egg",
    zh: "蛋炒饭",
    labels: ["Rice Dish", "Quick", "Versatile"],
    labelsZh: ["米饭", "快手菜", "百搭"],
    ingredients: ["Eggs", "Rice", "Vegetables", "Soy sauce"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🍚"
  },
  {
    id: 2,
    en: "Chicken Stir-fry with Broccoli",
    zh: "西兰花炒鸡肉",
    labels: ["Meat Dish", "Healthy", "Quick"],
    labelsZh: ["肉类菜", "健康", "快手菜"],
    ingredients: ["Chicken", "Broccoli", "Garlic", "Soy sauce"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🥘"
  },
  {
    id: 3,
    en: "Mapo Tofu",
    zh: "麻婆豆腐",
    labels: ["Vegetarian", "Spicy", "Classic"],
    labelsZh: ["素菜", "辛辣", "经典"],
    ingredients: ["Tofu", "Garlic", "Ginger", "Pork"],
    difficulty: "Medium",
    cuisine: "Chinese",
    image: "🍲"
  },
  {
    id: 4,
    en: "Egg Drop Soup",
    zh: "蛋花汤",
    labels: ["Soup", "Quick", "Comfort"],
    labelsZh: ["汤类", "快手菜", "舒适"],
    ingredients: ["Eggs", "Broth", "Corn starch"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🥣"
  },
  {
    id: 5,
    en: "Sweet and Sour Pork",
    zh: "糖醋里脊",
    labels: ["Meat Dish", "Sweet", "Popular"],
    labelsZh: ["肉类菜", "甜味", "受欢迎"],
    ingredients: ["Pork", "Tomatoes", "Vinegar", "Sugar"],
    difficulty: "Medium",
    cuisine: "Chinese",
    image: "🍖"
  },
  {
    id: 6,
    en: "Kung Pao Chicken",
    zh: "宫保鸡丁",
    labels: ["Meat Dish", "Spicy", "Quick"],
    labelsZh: ["肉类菜", "辛辣", "快手菜"],
    ingredients: ["Chicken", "Peanuts", "Chili peppers", "Soy sauce"],
    difficulty: "Medium",
    cuisine: "Chinese",
    image: "🌶️"
  },
  {
    id: 7,
    en: "Hot Pot",
    zh: "火锅",
    labels: ["Interactive", "Vegetable Dish", "Social"],
    labelsZh: ["互动菜", "蔬菜菜", "社交"],
    ingredients: ["Broth", "Various meats", "Vegetables", "Tofu"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🍲"
  },
  {
    id: 8,
    en: "Fried Spring Rolls",
    zh: "炸春卷",
    labels: ["Appetizer", "Quick", "Crispy"],
    labelsZh: ["开胃菜", "快手菜", "脆"],
    ingredients: ["Rice wrapper", "Vegetables", "Meat"],
    difficulty: "Medium",
    cuisine: "Chinese",
    image: "🥟"
  },
  {
    id: 9,
    en: "Chow Mein",
    zh: "炒面",
    labels: ["Noodle Dish", "Quick", "Versatile"],
    labelsZh: ["面类", "快手菜", "百搭"],
    ingredients: ["Noodles", "Vegetables", "Meat", "Soy sauce"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🍜"
  },
  {
    id: 10,
    en: "Steamed Fish",
    zh: "清蒸鱼",
    labels: ["Seafood", "Healthy", "Classic"],
    labelsZh: ["海鲜", "健康", "经典"],
    ingredients: ["Fish", "Ginger", "Green onions", "Soy sauce"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🐟"
  },
  {
    id: 11,
    en: "Peking Duck",
    zh: "北京烤鸭",
    labels: ["Meat Dish", "Special", "Classic"],
    labelsZh: ["肉类菜", "特殊", "经典"],
    ingredients: ["Duck", "Hoisin sauce", "Pancakes"],
    difficulty: "Hard",
    cuisine: "Chinese",
    image: "🦆"
  },
  {
    id: 12,
    en: "Wontons in Soup",
    zh: "馄饨汤",
    labels: ["Soup", "Comfort", "Quick"],
    labelsZh: ["汤类", "舒适", "快手菜"],
    ingredients: ["Wontons", "Broth", "Green onions"],
    difficulty: "Medium",
    cuisine: "Chinese",
    image: "🥣"
  },
  {
    id: 13,
    en: "Vegetable Fried Rice",
    zh: "蔬菜炒饭",
    labels: ["Rice Dish", "Vegetable Dish", "Quick"],
    labelsZh: ["米饭", "蔬菜菜", "快手菜"],
    ingredients: ["Rice", "Vegetables", "Eggs", "Soy sauce"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🍚"
  },
  {
    id: 14,
    en: "Braised Pork Belly",
    zh: "红烧肉",
    labels: ["Meat Dish", "Rich", "Classic"],
    labelsZh: ["肉类菜", "浓郁", "经典"],
    ingredients: ["Pork belly", "Soy sauce", "Sugar", "Star anise"],
    difficulty: "Medium",
    cuisine: "Chinese",
    image: "🍖"
  },
  {
    id: 15,
    en: "Shrimp with Garlic",
    zh: "蒜蓉虾",
    labels: ["Seafood", "Healthy", "Quick"],
    labelsZh: ["海鲜", "健康", "快手菜"],
    ingredients: ["Shrimp", "Garlic", "Oil", "Salt"],
    difficulty: "Easy",
    cuisine: "Chinese",
    image: "🦐"
  },

  // WESTERN RECIPES
  {
    id: 16,
    en: "Pasta Carbonara",
    zh: "意大利面条卡邦尼",
    labels: ["Pasta Dish", "Quick", "Classic"],
    labelsZh: ["意面", "快手菜", "经典"],
    ingredients: ["Pasta", "Bacon", "Eggs", "Cheese"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🍝"
  },
  {
    id: 17,
    en: "Grilled Salmon",
    zh: "烤三文鱼",
    labels: ["Seafood", "Healthy", "Elegant"],
    labelsZh: ["海鲜", "健康", "优雅"],
    ingredients: ["Salmon", "Lemon", "Herbs"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🐟"
  },
  {
    id: 18,
    en: "Beef Steak",
    zh: "牛排",
    labels: ["Meat Dish", "Elegant", "Classic"],
    labelsZh: ["肉类菜", "优雅", "经典"],
    ingredients: ["Beef", "Salt", "Pepper", "Butter"],
    difficulty: "Medium",
    cuisine: "Western",
    image: "🥩"
  },
  {
    id: 19,
    en: "Caesar Salad",
    zh: "凯撒沙拉",
    labels: ["Salad", "Light", "Healthy"],
    labelsZh: ["沙拉", "清淡", "健康"],
    ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar dressing"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🥗"
  },
  {
    id: 20,
    en: "Tomato Soup",
    zh: "番茄汤",
    labels: ["Soup", "Comfort", "Classic"],
    labelsZh: ["汤类", "舒适", "经典"],
    ingredients: ["Tomatoes", "Cream", "Onion"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🍲"
  },
  {
    id: 21,
    en: "Grilled Chicken Breast",
    zh: "烤鸡胸肉",
    labels: ["Meat Dish", "Healthy", "Quick"],
    labelsZh: ["肉类菜", "健康", "快手菜"],
    ingredients: ["Chicken breast", "Herbs", "Olive oil"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🍗"
  },
  {
    id: 22,
    en: "Fish and Chips",
    zh: "炸鱼和薯条",
    labels: ["Seafood", "Comfort", "Popular"],
    labelsZh: ["海鲜", "舒适", "受欢迎"],
    ingredients: ["Fish", "Potatoes", "Flour"],
    difficulty: "Medium",
    cuisine: "Western",
    image: "🍟"
  },
  {
    id: 23,
    en: "Beef Lasagna",
    zh: "牛肉千层面",
    labels: ["Meat Dish", "Hearty", "Classic"],
    labelsZh: ["肉类菜", "饱满", "经典"],
    ingredients: ["Pasta sheets", "Beef", "Tomato sauce", "Cheese"],
    difficulty: "Medium",
    cuisine: "Western",
    image: "🍝"
  },
  {
    id: 24,
    en: "Roasted Vegetables",
    zh: "烤蔬菜",
    labels: ["Vegetable Dish", "Healthy", "Quick"],
    labelsZh: ["蔬菜菜", "健康", "快手菜"],
    ingredients: ["Mixed vegetables", "Olive oil", "Herbs"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🥗"
  },
  {
    id: 25,
    en: "Chicken Soup",
    zh: "鸡汤",
    labels: ["Soup", "Comfort", "Healthy"],
    labelsZh: ["汤类", "舒适", "健康"],
    ingredients: ["Chicken", "Broth", "Vegetables"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🍲"
  },
  {
    id: 26,
    en: "BBQ Ribs",
    zh: "烧烤肋排",
    labels: ["Meat Dish", "Hearty", "Popular"],
    labelsZh: ["肉类菜", "饱满", "受欢迎"],
    ingredients: ["Pork ribs", "BBQ sauce"],
    difficulty: "Medium",
    cuisine: "Western",
    image: "🍖"
  },
  {
    id: 27,
    en: "Meatballs",
    zh: "肉丸子",
    labels: ["Meat Dish", "Quick", "Versatile"],
    labelsZh: ["肉类菜", "快手菜", "百搭"],
    ingredients: ["Ground meat", "Bread crumbs", "Onion", "Egg"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🍖"
  },
  {
    id: 28,
    en: "Mushroom Risotto",
    zh: "蘑菇烩饭",
    labels: ["Vegetable Dish", "Elegant", "Creamy"],
    labelsZh: ["蔬菜菜", "优雅", "奶油"],
    ingredients: ["Rice", "Mushrooms", "Broth", "Cream"],
    difficulty: "Medium",
    cuisine: "Western",
    image: "🍚"
  },
  {
    id: 29,
    en: "Shrimp Scampi",
    zh: "意式虾",
    labels: ["Seafood", "Quick", "Elegant"],
    labelsZh: ["海鲜", "快手菜", "优雅"],
    ingredients: ["Shrimp", "Garlic", "White wine", "Butter"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🦐"
  },
  {
    id: 30,
    en: "Vegetable Stir-fry",
    zh: "蔬菜炒菜",
    labels: ["Vegetable Dish", "Healthy", "Quick"],
    labelsZh: ["蔬菜菜", "健康", "快手菜"],
    ingredients: ["Mixed vegetables", "Oil", "Garlic", "Soy sauce"],
    difficulty: "Easy",
    cuisine: "Western",
    image: "🥦"
  }
];

// Default family members
export const defaultFamilyMembers = [
  { id: 1, name: "Alex", avatar: "👨", age: "Adult" },
  { id: 2, name: "Jordan", avatar: "👧", age: "Teen" },
  { id: 3, name: "Sam", avatar: "👦", age: "Kid" }
];

// Avatar options
export const avatarOptions = ["👨", "👩", "👧", "👦", "👶", "👴", "👵", "🧑", "👱", "🧔"];

// Meal types
export const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
