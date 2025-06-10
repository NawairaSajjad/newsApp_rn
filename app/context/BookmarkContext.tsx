import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  source: Source;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

interface BookmarkContextProps {
  bookmarks: Article[];
  addBookmark: (article: Article) => void;
}

const BookmarkContext = createContext<BookmarkContextProps | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  const addBookmark = (article: Article) => {
    const exists = bookmarks.some(b => b.url === article.url);
    if (!exists) {
      setBookmarks(prev => [...prev, article]);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
