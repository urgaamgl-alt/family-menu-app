import React, { useState, useEffect } from 'react';
import { translations, languages } from '../lib/translations';
import { foodLibrary, recipeLibrary, defaultFamilyMembers, avatarOptions, mealTypes } from '../lib/data';

export default function FamilyMenuApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [language, setLanguage] = useState('en');
  const [familyMembers, setFamilyMembers] = useState(defaultFamilyMembers);
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]?.id || 1);
  const [foodRatings, setFoodRatings] = useState({});
  const [recipeRatings, setRecipeRatings] = useState({});
  const [customRecipes, setCustomRecipes] = useState([]);
  const [menuLunches, setMenuLunches] = useState(2);
  const [menuDinners, setMenuDinners] = useState(2);
  const [generatedMenu, setGeneratedMenu] = useState(null);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAvatar, setNewMemberAvatar] = useState('👨');
  const [showCustomRecipeForm, setShowCustomRecipeForm] = useState(false);
  const [customRecipeName, setCustomRecipeName] = useState('');
  const [customRecipeNameCn, setCustomRecipeNameCn] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) setLanguage(savedLanguage);

    const savedFamily = localStorage.getItem('familyMembers');
    if (savedFamily) setFamilyMembers(JSON.parse(savedFamily));

    const savedFoodRatings = localStorage.getItem('foodRatings');
    if (savedFoodRatings) setFoodRatings(JSON.parse(savedFoodRatings));

    const savedRecipeRatings = localStorage.getItem('recipeRatings');
    if (savedRecipeRatings) setRecipeRatings(JSON.parse(savedRecipeRatings));

    const savedCustomRecipes = localStorage.getItem('customRecipes');
    if (savedCustomRecipes) setCustomRecipes(JSON.parse(savedCustomRecipes));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('foodRatings', JSON.stringify(foodRatings));
  }, [foodRatings]);

  useEffect(() => {
    localStorage.setItem('recipeRatings', JSON.stringify(recipeRatings));
  }, [recipeRatings]);

  useEffect(() => {
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
  }, [customRecipes]);

  const t = (key, vars = {}) => {
    let text = translations[language][key] || translations['en'][key] || key;
    Object.keys(vars).forEach(varKey => {
      text = text.replace(`{${varKey}}`, vars[varKey]);
    });
    return text;
  };

  const getRecipeName = (recipe) => {
    return language === 'zh' ? recipe.zh : recipe.en;
  };

  const getFoodName = (food) => {
    return language === 'zh' ? food.zh : food.en;
  };

  const addFamilyMember = () => {
    if (newMemberName.trim() && familyMembers.length < 6) {
      const newMember = {
        id: Math.max(...familyMembers.map(m => m.id), 0) + 1,
        name: newMemberName,
        avatar: newMemberAvatar,
        age: 'Adult'
      };
      setFamilyMembers([...familyMembers, newMember]);
      setNewMemberName('');
      setShowAddMemberForm(false);
    }
  };

  const removeFamilyMember = (id) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
    if (selectedMember === id) {
      setSelectedMember(familyMembers[0]?.id || null);
    }
  };

  const updateFamilyMemberName = (id, newName) => {
    setFamilyMembers(familyMembers.map(m =>
      m.id === id ? { ...m, name: newName } : m
    ));
  };

  const updateFamilyMemberAvatar = (id, newAvatar) => {
    setFamilyMembers(familyMembers.map(m =>
      m.id === id ? { ...m, avatar: newAvatar } : m
    ));
  };

  const rateFoodByMember = (memberId, foodKey, rating) => {
    const ratingKey = `${memberId}-${foodKey}`;
    setFoodRatings(prev => ({
      ...prev,
      [ratingKey]: rating
    }));
  };

  const getRatingByMember = (memberId, foodKey) => {
    return foodRatings[`${memberId}-${foodKey}`] || 0;
  };

  const rateRecipeByMember = (memberId, recipeId, rating) => {
    const ratingKey = `${memberId}-${recipeId}`;
    setRecipeRatings(prev => ({
      ...prev,
      [ratingKey]: rating
    }));
  };

  const getRecipeRatingByMember = (memberId, recipeId) => {
    return recipeRatings[`${memberId}-${recipeId}`] || 0;
  };

  const addCustomRecipe = () => {
    if (customRecipeName.trim()) {
      const newRecipe = {
        id: Math.max(...recipeLibrary.map(r => r.id), ...customRecipes.map(r => r.id), 0) + 1,
        en: customRecipeName,
        zh: customRecipeNameCn || customRecipeName,
        labels: ["Custom"],
        labelsZh: ["自定义"],
        ingredients: [],
        difficulty: "Easy",
        cuisine: "Custom",
        image: "🍽️",
        isCustom: true
      };
      setCustomRecipes([...customRecipes, newRecipe]);
      setCustomRecipeName('');
      setCustomRecipeNameCn('');
      setShowCustomRecipeForm(false);
    }
  };

  const deleteCustomRecipe = (id) => {
    setCustomRecipes(customRecipes.filter(r => r.id !== id));
  };

  const generateMenu = () => {
    const allRecipes = [...recipeLibrary, ...customRecipes];
    const chineseRecipes = allRecipes.filter(r => r.cuisine === 'Chinese');
    const westernRecipes = allRecipes.filter(r => r.cuisine === 'Western');
    const customRecipes_ = allRecipes.filter(r => r.isCustom);

    let selectedRecipes = [];

    // Prioritize Chinese recipes
    selectedRecipes.push(...chineseRecipes.slice(0, menuLunches + menuDinners));

    // Fill remaining with Western
    if (selectedRecipes.length < menuLunches + menuDinners) {
      const remaining = (menuLunches + menuDinners) - selectedRecipes.length;
      selectedRecipes.push(...westernRecipes.slice(0, remaining));
    }

    setGeneratedMenu(selectedRecipes.slice(0, menuLunches + menuDinners));
  };

  const currentMember = familyMembers.find(m => m.id === selectedMember);

  // HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto', fontFamily: 'system-ui' }}>
        <style>{`* { box-sizing: border-box; } body { margin: 0; background: #f9fafb; }`}</style>

        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1.5rem', borderRadius: '0 0 24px 24px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '28px', fontWeight: 600 }}>{t('familyMenu')}</h1>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>{familyMembers.length} {t('familyMembers')}</p>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="mn">Монгол</option>
            </select>
          </div>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '2rem' }}>
            <button onClick={() => setCurrentScreen('foodLibrary')} style={{ padding: '1.5rem 1rem', background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🥗</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Food Library</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Rate foods</div>
            </button>
            <button onClick={() => setCurrentScreen('recipeLibrary')} style={{ padding: '1.5rem 1rem', background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📖</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Recipes</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Rate & manage</div>
            </button>
            <button onClick={() => setCurrentScreen('familyManagement')} style={{ padding: '1.5rem 1rem', background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👨‍👩‍👧</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Family</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Add/Edit members</div>
            </button>
            <button onClick={() => setCurrentScreen('generateMenu')} style={{ padding: '1.5rem 1rem', background: 'white', border: '0.5px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>Menu</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Generate</div>
            </button>
          </div>

          <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 600 }}>Quick Stats</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Family Members</div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>{familyMembers.length}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Recipes</div>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>{recipeLibrary.length + customRecipes.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FOOD LIBRARY SCREEN
  if (currentScreen === 'foodLibrary') {
    const categories = Object.keys(foodLibrary);
    const selectedCategory = categories[0];
    const foods = foodLibrary[selectedCategory].foods;

    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>Food Library</h2>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '6px 8px', background: 'white', color: '#111827', border: '0.5px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="mn">Монгол</option>
          </select>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '1rem' }}>Who's rating?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
              {familyMembers.map(member => (
                <button key={member.id} onClick={() => setSelectedMember(member.id)} style={{ padding: '12px 8px', background: selectedMember === member.id ? '#667eea' : '#f3f4f6', color: selectedMember === member.id ? 'white' : '#111827', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{member.avatar}</div>
                  <div style={{ fontSize: '11px' }}>{member.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '16px', fontWeight: 600 }}>{language === 'zh' ? foodLibrary[selectedCategory].zh : foodLibrary[selectedCategory].en}</h3>

            <div style={{ display: 'grid', gap: '10px' }}>
              {foods.map((food, idx) => {
                const rating = getRatingByMember(selectedMember, `${selectedCategory}-${idx}`);
                return (
                  <div key={idx} style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '0.5px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{getFoodName(food)}</div>
                      <span style={{ color: rating > 0 ? '#10B981' : '#9CA3AF', fontSize: '13px', fontWeight: 500 }}>{rating}/5</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[1, 2, 3, 4, 5].map(r => (
                        <button key={r} onClick={() => rateFoodByMember(selectedMember, `${selectedCategory}-${idx}`, r)} style={{ flex: 1, padding: '8px', background: r <= rating ? '#10B981' : '#E5E7EB', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 500, color: r <= rating ? 'white' : '#6B7280' }}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RECIPE LIBRARY SCREEN
  if (currentScreen === 'recipeLibrary') {
    const allRecipes = [...recipeLibrary, ...customRecipes];

    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>Recipes</h2>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '6px 8px', background: 'white', color: '#111827', border: '0.5px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            <option value="en">English</option>
            <option value="zh">中文</option>
            <option value="mn">Монгол</option>
          </select>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <button onClick={() => setShowCustomRecipeForm(true)} style={{ width: '100%', marginBottom: '1.5rem', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
            + Add Custom Recipe
          </button>

          {showCustomRecipeForm && (
            <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="Recipe name (English)" value={customRecipeName} onChange={(e) => setCustomRecipeName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '0.5px solid #d1d5db', fontSize: '14px' }} />
              <input type="text" placeholder="Recipe name (Chinese)" value={customRecipeNameCn} onChange={(e) => setCustomRecipeNameCn(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '0.5px solid #d1d5db', fontSize: '14px' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={addCustomRecipe} style={{ flex: 1, padding: '10px', background: '#10B981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Save</button>
                <button onClick={() => setShowCustomRecipeForm(false)} style={{ flex: 1, padding: '10px', background: '#9CA3AF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: '12px' }}>
            {allRecipes.map(recipe => {
              const avgRating = familyMembers.length > 0
                ? Math.round(familyMembers.reduce((sum, m) => sum + (getRecipeRatingByMember(m.id, recipe.id) || 0), 0) / familyMembers.length)
                : 0;

              return (
                <div key={recipe.id} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600 }}>{getRecipeName(recipe)} {recipe.image}</div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                        {language === 'zh' ? recipe.labelsZh?.join(', ') : recipe.labels.join(', ')}
                      </div>
                    </div>
                    {recipe.isCustom && (
                      <button onClick={() => deleteCustomRecipe(recipe.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '16px' }}>✕</button>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    {[1, 2, 3, 4, 5].map(r => (
                      <button key={r} onClick={() => rateRecipeByMember(selectedMember, recipe.id, r)} style={{ flex: 1, padding: '8px', background: r <= avgRating ? '#667eea' : '#E5E7EB', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: r <= avgRating ? 'white' : '#6B7280', fontWeight: 500 }}>
                        {r}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Family avg: {avgRating}/5</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // FAMILY MANAGEMENT SCREEN
  if (currentScreen === 'familyManagement') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>Family Members</h2>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <button onClick={() => setShowAddMemberForm(true)} style={{ width: '100%', marginBottom: '1.5rem', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }} disabled={familyMembers.length >= 6}>
            + Add Family Member ({familyMembers.length}/6)
          </button>

          {showAddMemberForm && (
            <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="Member name" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '0.5px solid #d1d5db', fontSize: '14px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '10px' }}>
                {avatarOptions.map(avatar => (
                  <button key={avatar} onClick={() => setNewMemberAvatar(avatar)} style={{ padding: '12px', background: newMemberAvatar === avatar ? '#667eea' : '#ffffff', border: '0.5px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontSize: '24px' }}>
                    {avatar}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={addFamilyMember} style={{ flex: 1, padding: '10px', background: '#10B981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Add</button>
                <button onClick={() => setShowAddMemberForm(false)} style={{ flex: 1, padding: '10px', background: '#9CA3AF', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: '12px' }}>
            {familyMembers.map(member => (
              <div key={member.id} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', border: selectedMember === member.id ? '2px solid #667eea' : '0.5px solid #d1d5db' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '32px', cursor: 'pointer' }} onClick={() => {
                    const newAvatar = avatarOptions[(avatarOptions.indexOf(member.avatar) + 1) % avatarOptions.length];
                    updateFamilyMemberAvatar(member.id, newAvatar);
                  }}>
                    {member.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input type="text" value={member.name} onChange={(e) => updateFamilyMemberName(member.id, e.target.value)} style={{ width: '100%', padding: '8px', fontSize: '16px', fontWeight: 600, border: '0.5px solid #d1d5db', borderRadius: '4px' }} />
                  </div>
                  <button onClick={() => removeFamilyMember(member.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '20px' }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // GENERATE MENU SCREEN
  if (currentScreen === 'generateMenu') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>Generate Menu</h2>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Lunches per week: {menuLunches}</label>
              <input type="range" min="1" max="7" value={menuLunches} onChange={(e) => setMenuLunches(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Dinners per week: {menuDinners}</label>
              <input type="range" min="1" max="7" value={menuDinners} onChange={(e) => setMenuDinners(parseInt(e.target.value))} style={{ width: '100%' }} />
            </div>

            <button onClick={generateMenu} style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
              Generate Menu ({menuLunches + menuDinners} dishes)
            </button>
          </div>

          {generatedMenu && (
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '16px', fontWeight: 600 }}>Your Menu</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {generatedMenu.map((recipe, idx) => (
                  <div key={idx} style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ fontSize: '24px' }}>{recipe.image}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '15px', fontWeight: 600 }}>{getRecipeName(recipe)}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Day {idx + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
