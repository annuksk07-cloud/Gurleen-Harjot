import test from 'node:test';
import assert from 'node:assert/strict';
import { getTranslationDictionary, LANGUAGES } from '../i18n/translations';

test('English dictionary banned word and non-Latin script check', () => {
  const bannedWords = [
    'aap', 'aapka', 'aapke', 'kaun', 'kis', 'kya', 'kaise', 'hum', 'hamare', 'humari', 
    'hain', 'nahi', 'nahin', 'pakka', 'shayad', 'koshish', 'dulhan', 'dulha', 'dulhe', 
    'taraf', 'sheher', 'rishta', 'padav', 'agla', 'jodein', 'parivaar', 'khana', 'masti', 
    'aashirwad', 'din', 'baaki', 'dher', 'saara', 'pyaar', 'kripya', 'darj', 'karein', 
    'tayyar', 'mile', 'wapas', 'dobara', 'naam', 'badlein', 'shaadi', 'utsav', 'kahani', 
    'ji', 'bogie'
  ];

  const enDict = getTranslationDictionary('en');
  
  for (const [key, value] of Object.entries(enDict)) {
    if (typeof value === 'string') {
      // Check for non-Latin script (excluding common emojis)
      const hasNonLatin = /[^\u0000-\u007F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u2000-\u206F\u2700-\u27BF]/.test(value);
      assert.ok(!hasNonLatin, `Non-Latin script found in key "${key}": "${value}"`);

      // Check for banned words
      for (const word of bannedWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        assert.ok(!regex.test(value), `Banned word "${word}" found in key "${key}": "${value}"`);
      }
    }
  }
});
