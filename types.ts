
export interface IELTSWord {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
}

export type Category = 'Academic' | 'General' | 'Common';
