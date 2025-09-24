"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fontCombinations, type FontStyle } from "@/lib/fonts";

interface FontSwitcherProps {
  onFontChange: (fontStyle: FontStyle) => void;
  currentFont: FontStyle;
}

export function FontSwitcher({ onFontChange, currentFont }: FontSwitcherProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentCombination = fontCombinations[currentFont];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Type className="h-4 w-4" />
          <span className="hidden sm:inline">Fonts</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h3 className="text-sm font-semibold mb-2">Font Combinations</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Choose a font style for your site
          </p>
        </div>
        
        {Object.entries(fontCombinations).map(([key, combination]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onFontChange(key as FontStyle)}
            className="flex items-start gap-3 py-3"
          >
            <div className={`w-4 h-4 rounded-full mt-0.5 ${currentFont === key ? 'bg-primary' : 'border-2 border-muted-foreground'}`} />
            <div className="flex-1">
              <div className="font-medium">{combination.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {combination.description}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}