import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CompareItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating?: number;
  stock?: number;
  colors?: string[];
  sizes?: string[];
}

interface CompareContextType {
  items: CompareItem[];
  addItem: (item: CompareItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: CompareItem) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  count: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('compare');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load compare:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('compare', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (item: CompareItem) => {
    setItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (!existing && prevItems.length < 4) {
        // Limit to 4 items for better comparison view
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const toggleItem = (item: CompareItem) => {
    const exists = items.some((i) => i.id === item.id);
    if (exists) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const isInCompare = (id: string) => {
    return items.some((i) => i.id === id);
  };

  const clearCompare = () => {
    setItems([]);
  };

  const count = items.length;

  return (
    <CompareContext.Provider
      value={{ items, addItem, removeItem, toggleItem, isInCompare, clearCompare, count }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};
