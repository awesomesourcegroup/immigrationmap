"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface CompareItem {
  id: string;
  name: string;
  flagEmoji: string;
}

interface CompareCtx {
  selected: CompareItem[];
  toggle: (item: CompareItem) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  isFull: boolean;
}

const Ctx = createContext<CompareCtx>({
  selected: [],
  toggle: () => {},
  clear: () => {},
  isSelected: () => false,
  isFull: false,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<CompareItem[]>([]);

  function toggle(item: CompareItem) {
    setSelected(prev => {
      if (prev.some(x => x.id === item.id)) return prev.filter(x => x.id !== item.id);
      if (prev.length >= 3) return prev;
      return [...prev, item];
    });
  }

  function clear() { setSelected([]); }

  return (
    <Ctx.Provider value={{
      selected,
      toggle,
      clear,
      isSelected: (id) => selected.some(x => x.id === id),
      isFull: selected.length >= 3,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCompare() { return useContext(Ctx); }
