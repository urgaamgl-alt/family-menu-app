import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { foodLibrary, recipeLibrary, defaultFamilyMembers, avatarOptions } from '../lib/data';
import { translations, languages } from '../lib/translations';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [familyMembers, setFamilyMembers] = useState(defaultFamilyMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [foodRatings, setFoodRatings] = useState({});
  const [recipeRatings, setRecipeRatings] = useState({});
  const [customFoods, setCustomFoods] = useState({});
  const [customRecipes, setCustomRecipes] = useState({});
  const [weeklyMenu, setWeeklyMenu] = useState({});
  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState('meatDishes');

  // Issue #6 Fix: Support all 5 recipe categories with custom counts
  const [categoryPreferences, setCategoryPreferences] = useState({
    meatDishes: 2,
    vegetableDishes: 1,
    soupDishes: 1,
    specialtyDishes: 1,
    breakfast: 1
  });

  const [showAddFoodForm, setShowAddFoodForm] = useState(false);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [newFoodData, setNewFoodData] = useState({ foodCategory: 'vegetables', enName: '', zhName: '' });
  const [newRecipeData, setNewRecipeData] = useState({ enName: '', zhName: '', difficulty: 'Easy', cuisine: 'Chinese', category: 'meatDishes' });
  const [newMemberData, setNewMemberData] = useState({ name: '', avatar: avatarOptions[0], age: 'Adult' });
  const [memberEditIds, setMemberEditIds] = useState({});

  const t = (key) => {
    const langObj = translations[language] || translations['en'];
    return langObj[key] || key;
  };

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('familyMenuDataV3');
    if (saved) {
      const data = JSON.parse(saved);
      setFamilyMembers(data.familyMembers || defaultFamilyMembers);
      setFoodRatings(data.foodRatings || {});
      setRecipeRatings(data.recipeRatings || {});
      setCustomFoods(data.customFoods || {});
      setCustomRecipes(data.customRecipes || {});
      setWeeklyMenu(data.weeklyMenu || {});
      setCategoryPreferences(data.categoryPreferences || {
        meatDishes: 2,
        vegetableDishes: 1,
        soupDishes: 1,
        specialtyDishes: 1,
        breakfast: 1
      });
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = {
      familyMembers,
      foodRatings,
      recipeRatings,
      customFoods,
      customRecipes,
      weeklyMenu,
      categoryPreferences
    };
    localStorage.setItem('familyMenuDataV3', JSON.stringify(data));
  }, [familyMembers, foodRatings, recipeRatings, customFoods, customRecipes, weeklyMenu, categoryPreferences]);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const getDateForDay = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  };

  const formatDateDisplay = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = dayNames[date.getDay()];
    const month = date.getMonth() + 1;
    const dateNum = date.getDate();
    return `${day}, ${month}/${dateNum}`;
  };

  const rateFoodByMember = (memberId, category, foodIndex, rating) => {
    const key = `${memberId}-${category}-${foodIndex}`;
    setFoodRatings({ ...foodRatings, [key]: rating });
  };

  const getFoodRating = (memberId, category, foodIndex) => {
    const key = `${memberId}-${category}-${foodIndex}`;
    return foodRatings[key] || 0;
  };

  // Issue #2 Fix: Helper to check if rating should be highlighted (cumulative)
  const isFoodRatingHighlighted = (memberId, category, foodIndex, ratingLevel) => {
    const currentRating = getFoodRating(memberId, category, foodIndex);
    return currentRating >= ratingLevel;
  };

  const rateRecipeByMember = (memberId, recipeId, rating) => {
    const key = `${memberId}-${recipeId}`;
    setRecipeRatings({ ...recipeRatings, [key]: rating });
  };

  const getRecipeRating = (memberId, recipeId) => {
    const key = `${memberId}-${recipeId}`;
    return recipeRatings[key] || 0;
  };

  // Issue #2 Fix: Helper to check if rating should be highlighted (cumulative)
  const isRecipeRatingHighlighted = (memberId, recipeId, ratingLevel) => {
    const currentRating = getRecipeRating(memberId, recipeId);
    return currentRating >= ratingLevel;
  };

  const getRecipeById = (recipeId) => {
    for (const category in recipeLibrary) {
      const found = recipeLibrary[category].find(r => r.id === recipeId);
      if (found) return found;
    }
    for (const recId in customRecipes) {
      if (customRecipes[recId].id === recipeId) return customRecipes[recId];
    }
    return null;
  };

  const addCustomFood = () => {
    if (!newFoodData.enName || !newFoodData.zhName) {
      alert('Please fill in both English and Chinese names');
      return;
    }

    const categoryKey = newFoodData.foodCategory;
    if (!customFoods[categoryKey]) {
      customFoods[categoryKey] = [];
    }

    customFoods[categoryKey].push({
      en: newFoodData.enName,
      zh: newFoodData.zhName
    });

    setCustomFoods({ ...customFoods });
    setNewFoodData({ foodCategory: 'vegetables', enName: '', zhName: '' });
    setShowAddFoodForm(false);
  };

  const addCustomRecipe = () => {
    if (!newRecipeData.enName || !newRecipeData.zhName) {
      alert('Please fill in both English and Chinese names');
      return;
    }

    const recipeId = Math.max(...Object.keys(customRecipes).map(k => customRecipes[k].id || 0), 999) + 1;
    customRecipes[recipeId] = {
      id: recipeId,
      en: newRecipeData.enName,
      zh: newRecipeData.zhName,
      category: newRecipeData.category,
      difficulty: newRecipeData.difficulty,
      cuisine: newRecipeData.cuisine,
      image: '🍽️',
      custom: true
    };

    setCustomRecipes({ ...customRecipes });
    setNewRecipeData({ enName: '', zhName: '', difficulty: 'Easy', cuisine: 'Chinese', category: 'meatDishes' });
    setShowAddRecipeForm(false);
  };

  const deleteCustomRecipe = (recipeId) => {
    delete customRecipes[recipeId];
    setCustomRecipes({ ...customRecipes });
  };

  // Issue #3 Fix: Add function to reassign recipe category
  const changeRecipeCategory = (recipeId, newCategory) => {
    if (customRecipes[recipeId]) {
      customRecipes[recipeId].category = newCategory;
      setCustomRecipes({ ...customRecipes });
    }
  };

  const addFamilyMember = () => {
    if (!newMemberData.name) {
      alert('Please enter a name');
      return;
    }
    const newId = Math.max(...familyMembers.map(m => m.id), 0) + 1;
    setFamilyMembers([...familyMembers, { id: newId, ...newMemberData }]);
    setNewMemberData({ name: '', avatar: avatarOptions[0], age: 'Adult' });
  };

  const deleteFamilyMember = (memberId) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== memberId));
  };

  // Issue #1 Fix: Use useCallback to stabilize the edit function and prevent keyboard dismissal
  const editFamilyMemberName = useCallback((memberId, newName) => {
    setFamilyMembers(prevMembers =>
      prevMembers.map(m => m.id === memberId ? { ...m, name: newName } : m)
    );
  }, []);

  const editFamilyMemberAvatar = (memberId, newAvatar) => {
    setFamilyMembers(familyMembers.map(m => m.id === memberId ? { ...m, avatar: newAvatar } : m));
  };

  // Issue #7 Fix: Add export function
  const exportData = () => {
    const data = {
      familyMembers,
      foodRatings,
      recipeRatings,
      customFoods,
      customRecipes,
      weeklyMenu,
      categoryPreferences
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `family-menu-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Issue #7 Fix: Add import function
  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setFamilyMembers(imported.familyMembers || defaultFamilyMembers);
          setFoodRatings(imported.foodRatings || {});
          setRecipeRatings(imported.recipeRatings || {});
          setCustomFoods(imported.customFoods || {});
          setCustomRecipes(imported.customRecipes || {});
          setWeeklyMenu(imported.weeklyMenu || {});
          setCategoryPreferences(imported.categoryPreferences || {
            meatDishes: 2,
            vegetableDishes: 1,
            soupDishes: 1,
            specialtyDishes: 1,
            breakfast: 1
          });
          alert('Data imported successfully!');
        } catch (err) {
          alert('Error importing data: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // ============================================
  // SMART MENU SUGGESTION ALGORITHM (REWRITTEN)
  // ============================================

  const generateSmartMenu = () => {
    const menus = {};
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (let day = 0; day < 7; day++) {
      const dateStr = getDateForDay(day);
      const dayName = dayNames[day];

      // Get all recipes organized by category
      const allCategories = {
        breakfast: [...(recipeLibrary.breakfast || []), ...Object.values(customRecipes).filter(r => r.category === 'breakfast')],
        meatDishes: [...(recipeLibrary.meatDishes || []), ...Object.values(customRecipes).filter(r => r.category === 'meatDishes')],
        vegetableDishes: [...(recipeLibrary.vegetableDishes || []), ...Object.values(customRecipes).filter(r => r.category === 'vegetableDishes')],
        soupDishes: [...(recipeLibrary.soupDishes || []), ...Object.values(customRecipes).filter(r => r.category === 'soupDishes')],
        specialtyDishes: [...(recipeLibrary.specialtyDishes || []), ...Object.values(customRecipes).filter(r => r.category === 'specialtyDishes')]
      };

      // Sort each category by average rating
      const sortByRating = (recipes) => {
        return recipes.sort((a, b) => {
          const avgA = familyMembers.length > 0
            ? familyMembers.reduce((sum, m) => sum + getRecipeRating(m.id, a.id), 0) / familyMembers.length
            : 0;
          const avgB = familyMembers.length > 0
            ? familyMembers.reduce((sum, m) => sum + getRecipeRating(m.id, b.id), 0) / familyMembers.length
            : 0;
          return avgB - avgA;
        });
      };

      const sortedCategories = {
        breakfast: sortByRating(allCategories.breakfast),
        meatDishes: sortByRating(allCategories.meatDishes),
        vegetableDishes: sortByRating(allCategories.vegetableDishes),
        soupDishes: sortByRating(allCategories.soupDishes),
        specialtyDishes: sortByRating(allCategories.specialtyDishes)
      };

      // Select breakfast (rotate)
      const breakfastRecipes = sortedCategories.breakfast;
      const breakfast = breakfastRecipes.length > 0 ? breakfastRecipes[day % breakfastRecipes.length] : null;

      // For lunch & dinner, collect recipes from all non-breakfast categories based on preferences
      const lunch = selectMealByPreference(sortedCategories, day, 'lunch');
      const dinner = selectMealByPreference(sortedCategories, day, 'dinner');

      menus[dateStr] = {
        breakfast: { recipe: breakfast?.id, notes: '' },
        lunch: { recipe: lunch?.id, notes: '' },
        dinner: { recipe: dinner?.id, notes: '' },
        dayName: dayName
      };
    }

    setWeeklyMenu(menus);
    setCurrentScreen('menu');
  };

  const selectMealByPreference = (sortedCategories, day, mealType) => {
    // Create a list of recipes respecting category preferences
    const mealRecipes = [];

    for (const [category, count] of Object.entries(categoryPreferences)) {
      if (category === 'breakfast') continue; // Skip breakfast for lunch/dinner

      const recipes = sortedCategories[category] || [];
      const offset = mealType === 'lunch' ? day : day + 100;

      for (let i = 0; i < count && i < recipes.length; i++) {
        const recipeIndex = (offset + i) % recipes.length;
        mealRecipes.push(recipes[recipeIndex]);
      }
    }

    // If no recipes found, return null
    if (mealRecipes.length === 0) {
      return null;
    }

    // Select recipe for this day
    const recipeIndex = (day * 2 + (mealType === 'lunch' ? 0 : 1)) % mealRecipes.length;
    return mealRecipes[recipeIndex];
  };

  // ============================================
  // SCREENS
  // ============================================

  const HomeScreen = () => (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🍽️ {t('familyMenu')}</h1>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.languageSelect}>
          {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
        </select>
      </div>

      <div style={styles.buttonGrid}>
        <button onClick={() => setCurrentScreen('foodLibrary')} style={styles.screenButton}>🥗 {t('rateFood')}</button>
        <button onClick={() => setCurrentScreen('recipes')} style={styles.screenButton}>📖 {t('recipes')}</button>
        <button onClick={() => setCurrentScreen('family')} style={styles.screenButton}>👨‍👩‍👧 {t('manageMembers')}</button>
        <button onClick={generateSmartMenu} style={styles.screenButton}>📅 {t('weeklyMenu')}</button>
      </div>

      <div style={styles.shareSection}>
        <h3>💾 {t('shareSync') || 'Share & Sync'}</h3>
        <div style={styles.shareButtons}>
          <button onClick={exportData} style={styles.shareButton}>📥 Export Data</button>
          <button onClick={importData} style={styles.shareButton}>📤 Import Data</button>
        </div>
      </div>
    </div>
  );

  const FoodLibraryScreen = () => (
    <div style={styles.container}>
      <button onClick={() => setCurrentScreen('home')} style={styles.backButton}>{t('back')} Home</button>
      <h2>🥗 {t('foodPreferences')}</h2>

      <div style={styles.memberSelector}>
        <label>{t('whosRating')}:</label>
        <select value={selectedMember || ''} onChange={(e) => setSelectedMember(Number(e.target.value))} style={styles.select}>
          <option value="">-- {t('whosRating')} --</option>
          {familyMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      {selectedMember && (
        <div>
          {Object.entries(foodLibrary).map(([categoryKey, category]) => (
            <div key={categoryKey} style={styles.foodCategory}>
              <h3>{language === 'zh' ? category.zh : category.en}</h3>
              <div style={styles.foodGrid}>
                {[...category.foods, ...(customFoods[categoryKey] || [])].map((food, idx) => (
                  <div key={idx} style={styles.foodItem}>
                    <span>{language === 'zh' ? food.zh : food.en}</span>
                    <div style={styles.ratingButtons}>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => rateFoodByMember(selectedMember, categoryKey, idx, rating)}
                          style={{
                            ...styles.ratingButton,
                            backgroundColor: isFoodRatingHighlighted(selectedMember, categoryKey, idx, rating) ? '#4CAF50' : '#ddd'
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={styles.addSection}>
            <h3>➕ {t('add')} Food</h3>
            {!showAddFoodForm ? (
              <button onClick={() => setShowAddFoodForm(true)} style={styles.addButton}>Add Custom Food</button>
            ) : (
              <div style={styles.form}>
                <select value={newFoodData.foodCategory} onChange={(e) => setNewFoodData({...newFoodData, foodCategory: e.target.value})} style={styles.input}>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="meatPoultryEggs">Meat/Poultry</option>
                  <option value="seafood">Seafood</option>
                </select>
                <input
                  type="text"
                  placeholder="English name"
                  value={newFoodData.enName}
                  onChange={(e) => setNewFoodData({...newFoodData, enName: e.target.value})}
                  style={styles.input}
                />
                <input
                  type="text"
                  placeholder="中文名称"
                  value={newFoodData.zhName}
                  onChange={(e) => setNewFoodData({...newFoodData, zhName: e.target.value})}
                  style={styles.input}
                />
                <button onClick={addCustomFood} style={styles.saveButton}>{t('done')}</button>
                <button onClick={() => setShowAddFoodForm(false)} style={{...styles.saveButton, backgroundColor: '#999'}}>{t('back')}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const RecipeLibraryScreen = () => {
    const categoryDisplayNames = {
      meatDishes: t('meatDishes'),
      vegetableDishes: t('vegetableDishes'),
      soupDishes: t('soupDishes'),
      specialtyDishes: t('specialtyDishes'),
      breakfast: t('breakfast')
    };

    const currentRecipes = [
      ...(recipeLibrary[selectedRecipeCategory] || []),
      ...Object.values(customRecipes).filter(r => r.category === selectedRecipeCategory)
    ];

    return (
      <div style={styles.container}>
        <button onClick={() => setCurrentScreen('home')} style={styles.backButton}>{t('back')} Home</button>
        <h2>📖 {t('recipes')}</h2>

        <div style={styles.categoryTabs}>
          {Object.keys(recipeLibrary).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedRecipeCategory(cat)}
              style={{
                ...styles.tab,
                backgroundColor: selectedRecipeCategory === cat ? '#4CAF50' : '#ddd'
              }}
            >
              {categoryDisplayNames[cat]}
            </button>
          ))}
        </div>

        <div style={styles.memberSelector}>
          <label>{t('whosRating')}:</label>
          <select value={selectedMember || ''} onChange={(e) => setSelectedMember(Number(e.target.value))} style={styles.select}>
            <option value="">-- {t('whosRating')} --</option>
            {familyMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        <div style={styles.recipeGrid}>
          {currentRecipes.map(recipe => (
            <div key={recipe.id} style={styles.recipeCard}>
              <div style={styles.recipeHeader}>
                <span style={styles.recipeTitle}>{language === 'zh' ? recipe.zh : recipe.en}</span>
                <span style={styles.recipeImage}>{recipe.image}</span>
              </div>
              <div style={styles.recipeInfo}>
                <small>{recipe.difficulty} • {recipe.cuisine}</small>
              </div>

              {/* Issue #3 Fix: Add category reassignment dropdown for custom recipes */}
              {recipe.custom && (
                <div style={styles.categorySelector}>
                  <label>Category:</label>
                  <select
                    value={recipe.category}
                    onChange={(e) => changeRecipeCategory(recipe.id, e.target.value)}
                    style={styles.categorySelect}
                  >
                    <option value="meatDishes">{categoryDisplayNames.meatDishes}</option>
                    <option value="vegetableDishes">{categoryDisplayNames.vegetableDishes}</option>
                    <option value="soupDishes">{categoryDisplayNames.soupDishes}</option>
                    <option value="specialtyDishes">{categoryDisplayNames.specialtyDishes}</option>
                    <option value="breakfast">{categoryDisplayNames.breakfast}</option>
                  </select>
                </div>
              )}

              {selectedMember && (
                <div style={styles.ratingButtons}>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => rateRecipeByMember(selectedMember, recipe.id, rating)}
                      style={{
                        ...styles.ratingButton,
                        backgroundColor: isRecipeRatingHighlighted(selectedMember, recipe.id, rating) ? '#4CAF50' : '#ddd'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              )}
              {recipe.custom && (
                <button onClick={() => deleteCustomRecipe(recipe.id)} style={styles.deleteButton}>{t('delete')}</button>
              )}
            </div>
          ))}
        </div>

        <div style={styles.addSection}>
          <h3>➕ {t('addRecipe')}</h3>
          {!showAddRecipeForm ? (
            <button onClick={() => setShowAddRecipeForm(true)} style={styles.addButton}>{t('addRecipe')}</button>
          ) : (
            <div style={styles.form}>
              <input
                type="text"
                placeholder="English name"
                value={newRecipeData.enName}
                onChange={(e) => setNewRecipeData({...newRecipeData, enName: e.target.value})}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="中文名称"
                value={newRecipeData.zhName}
                onChange={(e) => setNewRecipeData({...newRecipeData, zhName: e.target.value})}
                style={styles.input}
              />
              <select value={newRecipeData.difficulty} onChange={(e) => setNewRecipeData({...newRecipeData, difficulty: e.target.value})} style={styles.input}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <select value={newRecipeData.cuisine} onChange={(e) => setNewRecipeData({...newRecipeData, cuisine: e.target.value})} style={styles.input}>
                <option value="Chinese">Chinese</option>
                <option value="Western">Western</option>
              </select>
              <select value={newRecipeData.category} onChange={(e) => setNewRecipeData({...newRecipeData, category: e.target.value})} style={styles.input}>
                <option value="meatDishes">{categoryDisplayNames.meatDishes}</option>
                <option value="vegetableDishes">{categoryDisplayNames.vegetableDishes}</option>
                <option value="soupDishes">{categoryDisplayNames.soupDishes}</option>
                <option value="specialtyDishes">{categoryDisplayNames.specialtyDishes}</option>
                <option value="breakfast">{categoryDisplayNames.breakfast}</option>
              </select>
              <button onClick={addCustomRecipe} style={styles.saveButton}>{t('done')}</button>
              <button onClick={() => setShowAddRecipeForm(false)} style={{...styles.saveButton, backgroundColor: '#999'}}>{t('back')}</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MenuScreen = () => {
    const categoryDisplayNames = {
      meatDishes: t('meatDishes'),
      vegetableDishes: t('vegetableDishes'),
      soupDishes: t('soupDishes'),
      specialtyDishes: t('specialtyDishes'),
      breakfast: t('breakfast')
    };

    const days = Array.from({length: 7}, (_, i) => getDateForDay(i));

    return (
      <div style={styles.container}>
        <button onClick={() => setCurrentScreen('home')} style={styles.backButton}>{t('back')} Home</button>
        <h2>📅 {t('weeklyMenu')}</h2>

        {/* Issue #6 Fix: Show all 5 category preferences instead of just 2 */}
        <div style={styles.preferenceControl}>
          <h3 style={{marginTop: 0}}>Recipe Preferences:</h3>
          {Object.entries(categoryPreferences).filter(([cat]) => cat !== 'breakfast').map(([category, count]) => (
            <label key={category} style={styles.preferenceLabel}>
              {categoryDisplayNames[category]}:
              <input
                type="number"
                min="0"
                max="5"
                value={count}
                onChange={(e) => setCategoryPreferences({...categoryPreferences, [category]: Number(e.target.value)})}
                style={styles.numberInput}
              />
            </label>
          ))}
          <button onClick={generateSmartMenu} style={styles.suggestButton}>{t('recommendedMenu')}</button>
        </div>

        <div style={styles.weeklyMenuContainer}>
          {days.map((dateStr, dayIdx) => {
            const dayMenu = weeklyMenu[dateStr] || { breakfast: {}, lunch: {}, dinner: {}, dayName: '' };
            const breakfastRecipe = dayMenu.breakfast?.recipe ? getRecipeById(dayMenu.breakfast.recipe) : null;
            const lunchRecipe = dayMenu.lunch?.recipe ? getRecipeById(dayMenu.lunch.recipe) : null;
            const dinnerRecipe = dayMenu.dinner?.recipe ? getRecipeById(dayMenu.dinner.recipe) : null;

            return (
              <div key={dateStr} style={styles.dayCard}>
                <h3 style={styles.dayTitle}>{formatDateDisplay(dateStr)}</h3>

                <div style={styles.mealSection}>
                  <strong>🌅 {t('morningMeal')}:</strong>
                  <select value={dayMenu.breakfast?.recipe || ''} onChange={(e) => setWeeklyMenu({...weeklyMenu, [dateStr]: {...dayMenu, breakfast: {...dayMenu.breakfast, recipe: Number(e.target.value) || null}}})} style={styles.select}>
                    <option value="">-- Select --</option>
                    {(recipeLibrary.breakfast || []).map(r => <option key={r.id} value={r.id}>{language === 'zh' ? r.zh : r.en}</option>)}
                    {Object.values(customRecipes).filter(r => r.category === 'breakfast').map(r => <option key={r.id} value={r.id}>{language === 'zh' ? r.zh : r.en}</option>)}
                  </select>
                  {breakfastRecipe && <small>{breakfastRecipe.image} {language === 'zh' ? breakfastRecipe.zh : breakfastRecipe.en}</small>}
                </div>

                <div style={styles.mealSection}>
                  <strong>🍽️ {t('middayMeal')}:</strong>
                  <select value={dayMenu.lunch?.recipe || ''} onChange={(e) => setWeeklyMenu({...weeklyMenu, [dateStr]: {...dayMenu, lunch: {...dayMenu.lunch, recipe: Number(e.target.value) || null}}})} style={styles.select}>
                    <option value="">-- Select --</option>
                    {[...(recipeLibrary.meatDishes || []), ...(recipeLibrary.vegetableDishes || []), ...(recipeLibrary.soupDishes || []), ...(recipeLibrary.specialtyDishes || [])].map(r => <option key={r.id} value={r.id}>{language === 'zh' ? r.zh : r.en}</option>)}
                    {Object.values(customRecipes).filter(r => r.category !== 'breakfast').map(r => <option key={r.id} value={r.id}>{language === 'zh' ? r.zh : r.en}</option>)}
                  </select>
                  {lunchRecipe && <small style={styles.mealDisplayText}>{lunchRecipe.image} {language === 'zh' ? lunchRecipe.zh : lunchRecipe.en}</small>}
                </div>

                <div style={styles.mealSection}>
                  <strong>🌙 {t('eveningMeal')}:</strong>
                  <select value={dayMenu.dinner?.recipe || ''} onChange={(e) => setWeeklyMenu({...weeklyMenu, [dateStr]: {...dayMenu, dinner: {...dayMenu.dinner, recipe: Number(e.target.value) || null}}})} style={styles.select}>
                    <option value="">-- Select --</option>
                    {[...(recipeLibrary.meatDishes || []), ...(recipeLibrary.vegetableDishes || []), ...(recipeLibrary.soupDishes || []), ...(recipeLibrary.specialtyDishes || [])].map(r => <option key={r.id} value={r.id}>{language === 'zh' ? r.zh : r.en}</option>)}
                    {Object.values(customRecipes).filter(r => r.category !== 'breakfast').map(r => <option key={r.id} value={r.id}>{language === 'zh' ? r.zh : r.en}</option>)}
                  </select>
                  {dinnerRecipe && <small style={styles.mealDisplayText}>{dinnerRecipe.image} {language === 'zh' ? dinnerRecipe.zh : dinnerRecipe.en}</small>}
                </div>

                <div style={styles.notesSection}>
                  <label>{t('familyNotes')}:</label>
                  <textarea
                    value={dayMenu.notes || ''}
                    onChange={(e) => setWeeklyMenu({...weeklyMenu, [dateStr]: {...dayMenu, notes: e.target.value}})}
                    style={styles.notesInput}
                    placeholder="Add notes for this day..."
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const FamilyScreen = () => (
    <div style={styles.container}>
      <button onClick={() => setCurrentScreen('home')} style={styles.backButton}>{t('back')} Home</button>
      <h2>👨‍👩‍👧 {t('familyMembers')}</h2>

      <div style={styles.membersList}>
        {familyMembers.map(member => (
          <div key={member.id} style={styles.memberCard}>
            <div style={styles.memberInfo}>
              <button onClick={() => editFamilyMemberAvatar(member.id, avatarOptions[(avatarOptions.indexOf(member.avatar) + 1) % avatarOptions.length])} style={styles.avatarButton}>{member.avatar}</button>
              {/* Issue #1 Fix: Use key prop and stable callback to prevent keyboard dismissal */}
              <input
                key={`name-${member.id}`}
                type="text"
                value={member.name}
                onChange={(e) => editFamilyMemberName(member.id, e.target.value)}
                style={styles.memberNameInput}
              />
              <small>{member.age}</small>
            </div>
            <button onClick={() => deleteFamilyMember(member.id)} style={styles.deleteButton}>{t('delete')}</button>
          </div>
        ))}
      </div>

      <div style={styles.addSection}>
        <h3>➕ {t('addFamilyMember')}</h3>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Member name"
            value={newMemberData.name}
            onChange={(e) => setNewMemberData({...newMemberData, name: e.target.value})}
            style={styles.input}
          />
          <select value={newMemberData.age} onChange={(e) => setNewMemberData({...newMemberData, age: e.target.value})} style={styles.input}>
            <option value="Adult">Adult</option>
            <option value="Teen">Teen</option>
            <option value="Kid">Kid</option>
          </select>
          <button onClick={addFamilyMember} style={styles.saveButton}>{t('addFamilyMember')}</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Family Menu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4CAF50" />
      </Head>

      <div style={styles.appContainer}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'foodLibrary' && <FoodLibraryScreen />}
        {currentScreen === 'recipes' && <RecipeLibraryScreen />}
        {currentScreen === 'menu' && <MenuScreen />}
        {currentScreen === 'family' && <FamilyScreen />}
      </div>
    </>
  );
}

// ============================================
// STYLES
// ============================================

const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '10px'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  languageSelect: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
    cursor: 'pointer'
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '15px'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  },
  screenButton: {
    padding: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  shareSection: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px'
  },
  shareButtons: {
    display: 'flex',
    gap: '10px'
  },
  shareButton: {
    flex: 1,
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  memberSelector: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px'
  },
  select: {
    width: '100%',
    padding: '8px',
    marginTop: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  numberInput: {
    width: '50px',
    padding: '5px',
    marginLeft: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  foodCategory: {
    marginBottom: '20px'
  },
  foodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '8px'
  },
  foodItem: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '13px'
  },
  ratingButtons: {
    display: 'flex',
    gap: '3px',
    marginTop: '6px',
    justifyContent: 'center'
  },
  ratingButton: {
    padding: '3px 6px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  categoryTabs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '5px',
    marginBottom: '15px'
  },
  tab: {
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  recipeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '10px',
    marginBottom: '20px'
  },
  recipeCard: {
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  recipeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: '16px'
  },
  recipeImage: {
    fontSize: '20px'
  },
  recipeInfo: {
    marginBottom: '8px',
    fontSize: '11px'
  },
  categorySelector: {
    marginTop: '8px',
    padding: '8px',
    backgroundColor: '#e8f5e9',
    borderRadius: '4px',
    fontSize: '12px'
  },
  categorySelect: {
    width: '100%',
    padding: '4px',
    marginTop: '4px',
    border: '1px solid #ddd',
    borderRadius: '3px',
    fontSize: '12px'
  },
  weeklyMenuContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '15px'
  },
  dayCard: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },
  dayTitle: {
    marginTop: '0',
    color: '#333',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '8px',
    fontSize: '16px'
  },
  mealSection: {
    marginBottom: '12px',
    fontSize: '15px'
  },
  mealDisplayText: {
    fontSize: '15px',
    fontWeight: 'bold'
  },
  notesSection: {
    marginTop: '12px',
    fontSize: '14px'
  },
  notesInput: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    resize: 'vertical',
    fontSize: '13px'
  },
  preferenceControl: {
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    marginBottom: '15px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    alignItems: 'center'
  },
  preferenceLabel: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  suggestButton: {
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  membersList: {
    display: 'grid',
    gap: '10px',
    marginBottom: '20px'
  },
  memberCard: {
    padding: '12px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1
  },
  avatarButton: {
    fontSize: '28px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  },
  memberNameInput: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '15px',
    flex: 1
  },
  addSection: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px'
  },
  addButton: {
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  },
  saveButton: {
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};
