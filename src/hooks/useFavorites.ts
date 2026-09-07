'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'vibe_ui_favorites';
const FAVORITES_EVENT = 'vibe_ui_favorites_updated';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) {
          setFavorites(JSON.parse(saved));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        setFavorites([]);
      }
    };

    loadFavorites();

    const handleCustomEvent = () => loadFavorites();
    window.addEventListener(FAVORITES_EVENT, handleCustomEvent);
    window.addEventListener('storage', handleCustomEvent);

    return () => {
      window.removeEventListener(FAVORITES_EVENT, handleCustomEvent);
      window.removeEventListener('storage', handleCustomEvent);
    };
  }, []);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let next: string[];
    if (favorites.includes(id)) {
      next = favorites.filter((item) => item !== id);
    } else {
      next = [...favorites, id];
    }
    setFavorites(next);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    } catch (err) {}
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
