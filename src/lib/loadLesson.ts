// Lightweight loader for lesson JSON used by the word-bank-builder page.
// Kept minimal to avoid exporting extra symbols from the page module.
export interface Pronunciation {
  us: string;
  uk: string;
}

export interface Extra {
  synonyms: string[];
  antonyms: string[];
  memory_tip: string;
  tier: number;
  tenses: {
    present: string;
    past: string;
    participle: string;
  } | string[];
  eslLevel: 'easy' | 'medium' | 'hard';
}

export interface VocabWord {
  word: string;
  type: string;
  definition: string;
  pronunciation: Pronunciation;
  examples: string[];
  extra: Extra;
}

export async function loadLesson(lessonId: number): Promise<VocabWord[]> {
  try {
    if (!Number.isInteger(lessonId) || lessonId < 0) {
      throw new Error('Invalid lesson ID');
    }

    // Try the simple lesson path; page.tsx will attempt more specific grade paths itself.
    const path = `/data/lesson${lessonId}.json`;
    const res = await fetch(path);
    if (!res.ok) throw new Error('File not found');
    const data = await res.json();
    return data as VocabWord[];
  } catch (err) {
    console.error('Could not load lesson data (lib):', err);
    return [];
  }
}
