'use client';

import { useState, useEffect } from 'react';

interface RecentSearch {
    query: string;
    timestamp: number;
}

const MAX_RECENT_SEARCHES = 5;
const STORAGE_KEY = 'eloroverde-recent-searches';

export function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setRecentSearches(Array.isArray(parsed) ? parsed : []);
            }
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    }, []);

    const addSearch = (query: string) => {
        if (!query.trim()) return;

        const newSearch: RecentSearch = {
            query: query.trim(),
            timestamp: Date.now(),
        };

        setRecentSearches((prev) => {
            // Remove duplicates and add new search at the beginning
            const filtered = prev.filter((s) => s.query.toLowerCase() !== query.toLowerCase());
            const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);

            // Save to localStorage
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Error saving recent searches:', error);
            }

            return updated;
        });
    };

    const removeSearch = (query: string) => {
        setRecentSearches((prev) => {
            const updated = prev.filter((s) => s.query !== query);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Error removing search:', error);
            }
            return updated;
        });
    };

    const clearAll = () => {
        setRecentSearches([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing searches:', error);
        }
    };

    return {
        recentSearches,
        addSearch,
        removeSearch,
        clearAll,
    };
}
