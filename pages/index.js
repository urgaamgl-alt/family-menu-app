import React, { useState, useEffect } from 'react';
import { translations, languages } from '../lib/translations';

export default function FamilyMenuApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedFamily, setSelectedFamily] = useState('alex');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key, vars = {}) => {
    let text = translations[language][key] || translations['en'][key] || key;
    Object.keys(vars).forEach(varKey => {
      text = text.replace(`{${varKey}}`, vars[varKey]);
    });
    return text;
  };
  const [families, setFamilies] = useState({
    alex: {
      name: 'Alex',
      age: 'Adult',
      fruitsScore: 4,
      veggiesScore: 2,
      meatsScore: 5,
      foodRatings: { chicken: 5, salmon: 5, apple: 4, broccoli: 2, pasta: 4 }
    },
    jordan: {
      name: 'Jordan',
      age: 'Teen',
      fruitsScore: 3,
      veggiesScore: 5,
      meatsScore: 3,
      foodRatings: { chicken: 4, salmon: 2, apple: 3, broccoli: 5, pasta: 5 }
    },
    sam: {
      name: 'Sam',
      age: 'Kid',
      fruitsScore: 5,
      veggiesScore: 1,
      meatsScore: 4,
      foodRatings: { chicken: 5, salmon: 1, apple: 5, broccoli: 1, pasta: 5 }
    }
  });

  const [showingWeek, setShowingWeek] = useState('current');
  const [showingList, setShowingList] = useState('ingredients');

  const menuPlans = {
    current: [
      { day: 'Monday', meal: 'Grilled Salmon with Roasted Vegetables', cuisine: 'Mediterranean', why: '✓ Loved by Alex & Jordan' },
      { day: 'Tuesday', meal: 'Pasta with Tomato Sauce & Salad', cuisine: 'Italian', why: '✓ Jordan & Sam favorites' },
      { day: 'Wednesday', meal: 'Chicken Stir-fry with Brown Rice', cuisine: 'Asian', why: '✓ Alex & Sam love this' },
      { day: 'Thursday', meal: 'Vegetable Curry with Rice', cuisine: 'Indian', why: '✓ Jordan loves veggies' },
      { day: 'Friday', meal: 'BBQ Chicken with Sweet Potato', cuisine: 'American', why: '✓ Everyone enjoys BBQ' },
      { day: 'Saturday', meal: 'Homemade Pizza Night', cuisine: 'Italian', why: '✓ Fun & customizable' },
      { day: 'Sunday', meal: 'Slow Cooker Beef Stew', cuisine: 'Comfort Food', why: '✓ Family favorite' }
    ],
    next: [
      { day: 'Monday', meal: 'Pan-seared Fish Tacos', cuisine: 'Mexican', why: '✓ Balanced preferences' },
      { day: 'Tuesday', meal: 'Vegetable Fried Rice', cuisine: 'Asian', why: '✓ Jordan approved' },
      { day: 'Wednesday', meal: 'Chicken Soup with Veggies', cuisine: 'Comfort', why: '✓ Nutritious' },
      { day: 'Thursday', meal: 'Spaghetti Carbonara', cuisine: 'Italian', why: '✓ Sam & Jordan love it' },
      { day: 'Friday', meal: 'Grilled Steak with Sides', cuisine: 'American', why: '✓ Alex favorite' },
      { day: 'Saturday', meal: 'Shrimp & Broccoli Bowl', cuisine: 'Asian Fusion', why: '✓ Healthy choice' },
      { day: 'Sunday', meal: 'Roast Chicken with Potatoes', cuisine: 'Classic', why: '✓ Everyone enjoys' }
    ]
  };

  const shoppingLists = {
    ingredients: [
      { name: 'Salmon fillets', category: 'Protein' },
      { name: 'Chicken breasts', category: 'Protein' },
      { name: 'Ground beef', category: 'Protein' },
      { name: 'Eggs', category: 'Protein' },
      { name: 'Broccoli', category: 'Vegetables' },
      { name: 'Bell peppers', category: 'Vegetables' },
      { name: 'Carrots', category: 'Vegetables' },
      { name: 'Spinach', category: 'Vegetables' },
      { name: 'Apples', category: 'Fruits' },
      { name: 'Bananas', category: 'Fruits' },
      { name: 'Olive oil', category: 'Pantry' },
      { name: 'Pasta', category: 'Pantry' }
    ],
    checklist: [
      { name: 'Salmon fillets', done: false },
      { name: 'Chicken breasts', done: true },
      { name: 'Broccoli', done: false },
      { name: 'Apples', done: true },
      { name: 'Pasta', done: false }
    ]
  };

  const currentMember = families[selectedFamily];

  const renderRatingBar = (score) => (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            background: i <= score ? '#10B981' : '#E5E7EB',
            cursor: 'pointer'
          }}
        />
      ))}
    </div>
  );

  // HOME SCREEN
  if (currentScreen === 'home') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; background: #f9fafb; }
        `}</style>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1.5rem', borderRadius: '0 0 24px 24px', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '28px', fontWeight: 600 }}>{t('familyMenu')}</h1>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>{t('weeklyMealPlanner')}</p>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '2rem' }}>
            <button
              onClick={() => setCurrentScreen('preferences')}
              style={{
                padding: '1.5rem 1rem',
                background: 'white',
                border: '0.5px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⭐</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{t('setPreferences')}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{t('rateFood')}</div>
            </button>
            <button
              onClick={() => setCurrentScreen('menu')}
              style={{
                padding: '1.5rem 1rem',
                background: 'white',
                border: '0.5px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📅</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{t('viewMenu')}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{t('thisWeeksMeals')}</div>
            </button>
            <button
              onClick={() => setCurrentScreen('shopping')}
              style={{
                padding: '1.5rem 1rem',
                background: 'white',
                border: '0.5px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛒</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{t('shoppingList')}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{t('ingredientsNeeded')}</div>
            </button>
            <button
              onClick={() => setCurrentScreen('families')}
              style={{
                padding: '1.5rem 1rem',
                background: 'white',
                border: '0.5px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👨‍👩‍👧‍👦</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{t('family')}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{t('manageMembers')}</div>
            </button>
          </div>

          <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 600 }}>{t('thisWeeksVibe')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{t('cuisines')}</div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>Mediterranean, Italian, Asian</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{t('highlights')}</div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{t('balancedForAll')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PREFERENCES SCREEN
  if (currentScreen === 'preferences') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>{t('foodPreferences')}</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '6px 8px',
              background: 'white',
              color: '#111827',
              border: '0.5px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '1rem' }}>{t('whosRating')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {Object.entries(families).map(([key, member]) => (
                <button
                  key={key}
                  onClick={() => setSelectedFamily(key)}
                  style={{
                    padding: '12px',
                    background: selectedFamily === key ? '#667eea' : '#f3f4f6',
                    color: selectedFamily === key ? 'white' : '#111827',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {member.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '16px', fontWeight: 600 }}>{t('howDoesLike', { name: currentMember.name })}</h3>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 500 }}>🍎 {t('fruits')}</label>
                <span style={{ color: '#10B981', fontWeight: 500, fontSize: '13px' }}>{currentMember.fruitsScore}/5</span>
              </div>
              {renderRatingBar(currentMember.fruitsScore)}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 500 }}>🥦 {t('vegetables')}</label>
                <span style={{ color: '#F59E0B', fontWeight: 500, fontSize: '13px' }}>{currentMember.veggiesScore}/5</span>
              </div>
              {renderRatingBar(currentMember.veggiesScore)}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 500 }}>🍗 {t('meats')}</label>
                <span style={{ color: '#10B981', fontWeight: 500, fontSize: '13px' }}>{currentMember.meatsScore}/5</span>
              </div>
              {renderRatingBar(currentMember.meatsScore)}
            </div>

            <div style={{ marginTop: '2rem', borderTop: '0.5px solid #e5e7eb', paddingTop: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 600 }}>{t('favoriteFoods')}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {Object.entries(currentMember.foodRatings).map(([food, score]) => (
                  <div
                    key={food}
                    style={{
                      padding: '12px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '0.5px solid #e5e7eb'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 500, textTransform: 'capitalize' }}>{food}</div>
                    <div style={{ fontSize: '12px', color: score >= 4 ? '#10B981' : score >= 3 ? '#F59E0B' : '#EF4444', marginTop: '4px' }}>
                      {'⭐'.repeat(score)} {score}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MENU SCREEN
  if (currentScreen === 'menu') {
    const currentMenu = menuPlans[showingWeek];
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>{t('weeklyMenu')}</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '6px 8px',
              background: 'white',
              color: '#111827',
              border: '0.5px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setShowingWeek('current')}
              style={{
                flex: 1,
                padding: '10px',
                background: showingWeek === 'current' ? '#667eea' : '#f3f4f6',
                color: showingWeek === 'current' ? 'white' : '#111827',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {t('thisWeek')}
            </button>
            <button
              onClick={() => setShowingWeek('next')}
              style={{
                flex: 1,
                padding: '10px',
                background: showingWeek === 'next' ? '#667eea' : '#f3f4f6',
                color: showingWeek === 'next' ? 'white' : '#111827',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {t('nextWeek')}
            </button>
            <button
              style={{
                padding: '10px 12px',
                background: '#f3f4f6',
                border: '0.5px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              title={t('refresh')}
            >
              {t('refresh')}
            </button>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {currentMenu.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '0.5px solid #e5e7eb',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>{item.day}</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginTop: '4px' }}>{item.meal}</div>
                  </div>
                  <div style={{ fontSize: '20px' }}>🍽️</div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '12px', color: '#6b7280' }}>
                  <span>{item.cuisine}</span>
                  <span>{item.why}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentScreen('shopping')}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              padding: '12px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {t('generateShoppingList')}
          </button>
        </div>
      </div>
    );
  }

  // SHOPPING LIST SCREEN
  if (currentScreen === 'shopping') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>{t('shoppingListTitle')}</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '6px 8px',
              background: 'white',
              color: '#111827',
              border: '0.5px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <button
              onClick={() => setShowingList('ingredients')}
              style={{
                flex: 1,
                padding: '10px',
                background: showingList === 'ingredients' ? '#667eea' : '#f3f4f6',
                color: showingList === 'ingredients' ? 'white' : '#111827',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {t('fullList')}
            </button>
            <button
              onClick={() => setShowingList('checklist')}
              style={{
                flex: 1,
                padding: '10px',
                background: showingList === 'checklist' ? '#667eea' : '#f3f4f6',
                color: showingList === 'checklist' ? 'white' : '#111827',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {t('checklist')}
            </button>
          </div>

          {showingList === 'ingredients' && (
            <div style={{ display: 'grid', gap: '8px' }}>
              {shoppingLists.ingredients.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f3f4f6',
                    padding: '12px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{item.category}</div>
                  </div>
                  <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </div>
              ))}
            </div>
          )}

          {showingList === 'checklist' && (
            <div style={{ display: 'grid', gap: '8px' }}>
              {shoppingLists.checklist.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f3f4f6',
                    padding: '12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: item.done ? 0.6 : 1,
                    textDecoration: item.done ? 'line-through' : 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={item.done}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <div style={{ fontSize: '14px', fontWeight: 500, flex: 1 }}>{item.name}</div>
                  <span style={{ fontSize: '14px' }}>{item.done ? '✓' : ''}</span>
                </div>
              ))}
            </div>
          )}

          <button
            style={{
              width: '100%',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              padding: '12px',
              background: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            {t('shareList')}
          </button>
        </div>
      </div>
    );
  }

  // FAMILIES SCREEN
  if (currentScreen === 'families') {
    return (
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <button onClick={() => setCurrentScreen('home')} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>{t('back')}</button>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, flex: 1 }}>{t('familyMembers')}</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '6px 8px',
              background: 'white',
              color: '#111827',
              border: '0.5px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ padding: '0 1.5rem' }}>
          {Object.entries(families).map(([key, member]) => (
            <div
              key={key}
              style={{
                background: '#f3f4f6',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedFamily(key);
                setCurrentScreen('preferences');
              }}
            >
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600 }}>{member.name}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{member.age}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                  🍎 {member.fruitsScore}/5 | 🥦 {member.veggiesScore}/5 | 🍗 {member.meatsScore}/5
                </div>
              </div>
              <div style={{ fontSize: '28px' }}>👤</div>
            </div>
          ))}

          <button
            style={{
              width: '100%',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              padding: '12px',
              background: '#f3f4f6',
              border: '1px dashed #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#111827'
            }}
          >
            {t('addFamilyMember')}
          </button>
        </div>
      </div>
    );
  }
}
