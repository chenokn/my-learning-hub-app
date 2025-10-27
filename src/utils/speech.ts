// utils/speech.ts
export type SpeakOptions = {
  lang: string;
  text: string;
  preferredVoices?: string[];
};

export function speak({ lang, text, preferredVoices = [] }: SpeakOptions) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const speakPhrase = () => {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    const voices = window.speechSynthesis.getVoices();
    let voice: SpeechSynthesisVoice | undefined;
    for (const name of preferredVoices) {
      voice = voices.find(v => v.name === name && v.lang === lang && v.localService)
        || voices.find(v => v.name === name && v.lang === lang);
      if (voice) break;
    }
    if (!voice) {
      voice = voices.find(v => v.lang === lang);
    }
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speakPhrase();
      window.speechSynthesis.onvoiceschanged = null;
    };
    window.speechSynthesis.getVoices();
  } else {
    speakPhrase();
  }
}
