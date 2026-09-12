import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type LanguageCode = "en" | "hi" | "ml" | "te" | "kn" | "gu" | "pa";

export interface Language {
  code: LanguageCode;
  /** Native name, shown in the picker. */
  native: string;
  /** English name, for accessibility labels. */
  english: string;
}

export const languages: Language[] = [
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "ml", native: "മലയാളം", english: "Malayalam" },
  { code: "te", native: "తెలుగు", english: "Telugu" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
];

const en = {
  orderNow: "Order Now",
  home: "Home",
  farmbro: "FarmBro",
  services: "Services",
  gallery: "Gallery",
  about: "About",
  contact: "Contact",
  openNav: "Open navigation",
  closeNav: "Close navigation",
  changeLanguage: "Change language",
  chooseLanguage: "Choose language",
  heroTitleA: "More acres.",
  heroTitleB: "Fewer compromises.",
  heroSub: "Remote-controlled farm machines for growers who need more capacity without adding more complexity.",
  heroCta: "See the machines",
  scrollHint: "Scroll to explore",
  proofAcres: "Acres piloted",
  proofPlatforms: "Platforms engineered",
  proofRemote: "Remote operated",
  proofIndia: "Make in India",
  farmbroTitleB: "Your brother on the field.",
  farmbroEyebrow: "FarmBro UGVs · For farming",
  farmbroSub:
    "Remote-controlled farm machines for growers who need more capacity without adding more complexity. Open any machine for its configuration, gallery, and specifications.",
};

export type UiStrings = typeof en;

/**
 * UI chrome translates on selection. Machine names, specifications, and long
 * descriptions stay English until official translations exist — buyer-facing
 * copy is never machine-guessed.
 */
const strings: Record<LanguageCode, UiStrings> = {
  en,
  hi: {
    ...en,
    orderNow: "अभी ऑर्डर करें",
    home: "होम",
    farmbro: "फ़ार्मब्रो",
    services: "सेवाएँ",
    gallery: "गैलरी",
    about: "हमारे बारे में",
    contact: "संपर्क",
    openNav: "नेविगेशन खोलें",
    closeNav: "नेविगेशन बंद करें",
    changeLanguage: "भाषा बदलें",
    chooseLanguage: "भाषा चुनें",
    heroTitleA: "ज़्यादा ज़मीन।",
    heroTitleB: "कम समझौते।",
    heroSub: "बिना अतिरिक्त जटिलता के ज़्यादा काम — रिमोट-कंट्रोल्ड खेती की मशीनें।",
    heroCta: "मशीनें देखें",
    scrollHint: "नीचे स्क्रॉल करें",
    proofAcres: "एकड़ पर परीक्षित",
    proofPlatforms: "प्लेटफ़ॉर्म विकसित",
    proofRemote: "रिमोट संचालित",
    proofIndia: "मेक इन इंडिया",
    farmbroTitleB: "खेत के आपके भाई।",
    farmbroEyebrow: "फ़ार्मब्रो यूजीवी · खेती के लिए",
    farmbroSub: "बिना अतिरिक्त जटिलता के ज़्यादा क्षमता चाहने वालों के लिए रिमोट-कंट्रोल्ड खेती की मशीनें — किसी भी मशीन का कॉन्फ़िगरेशन, गैलरी और विनिर्देश देखें।",
  },
  ml: {
    ...en,
    orderNow: "ഇപ്പോൾ ഓർഡർ ചെയ്യുക",
    home: "ഹോം",
    farmbro: "ഫാംബ്രോ",
    services: "സേവനങ്ങൾ",
    gallery: "ഗാലറി",
    about: "ഞങ്ങളെക്കുറിച്ച്",
    contact: "ബന്ധപ്പെടുക",
    openNav: "നാവിഗേഷൻ തുറക്കുക",
    closeNav: "നാവിഗേഷൻ അടയ്ക്കുക",
    changeLanguage: "ഭാഷ മാറ്റുക",
    chooseLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    heroTitleA: "കൂടുതൽ ഏക്കർ.",
    heroTitleB: "കുറവ് വിട്ടുവീഴ്ചകൾ.",
    heroSub: "കൂടുതൽ സങ്കീർണ്ണതയില്ലാതെ കൂടുതൽ വിളവിന് — റിമോട്ട് നിയന്ത്രിത കൃഷിയന്ത്രങ്ങൾ.",
    heroCta: "യന്ത്രങ്ങൾ കാണുക",
    scrollHint: "താഴേക്ക് സ്ക്രോൾ ചെയ്യുക",
    proofAcres: "ഏക്കറിൽ പരിശോധിച്ചു",
    proofPlatforms: "പ്ലാറ്റ്ഫോമുകൾ വികസിപ്പിച്ചു",
    proofRemote: "റിമോട്ട് നിയന്ത്രിതം",
    proofIndia: "മേക്ക് ഇൻ ഇന്ത്യ",
    farmbroTitleB: "വയലിന്റെ സഹോദരൻ.",
    farmbroEyebrow: "ഫാംബ്രോ യുജിവി · കൃഷിക്കായി",
    farmbroSub: "കൂടുതൽ സങ്കീർണ്ണതയില്ലാതെ കൂടുതൽ ശേഷി വേണ്ടുന്നവർക്കുള്ള റിമോട്ട് നിയന്ത്രിത കൃഷിയന്ത്രങ്ങൾ — ഏത് യന്ത്രത്തിന്റെയും വിവരങ്ങൾ കാണുക.",
  },
  te: {
    ...en,
    orderNow: "ఇప్పుడే ఆర్డర్ చేయండి",
    home: "హోమ్",
    farmbro: "ఫార్మ్‌బ్రో",
    services: "సేవలు",
    gallery: "గ్యాలరీ",
    about: "మా గురించి",
    contact: "సంప్రదించండి",
    openNav: "నావిగేషన్ తెరవండి",
    closeNav: "నావిగేషన్ మూసివేయండి",
    changeLanguage: "భాష మార్చండి",
    chooseLanguage: "భాషను ఎంచుకోండి",
    heroTitleA: "ఎక్కువ ఎకరాలు.",
    heroTitleB: "తక్కువ రాజీలు.",
    heroSub: "అదనపు సంకీర్ణత లేకుండా ఎక్కువ పంట కోసం రిమోట్ నియంత్రిత వ్యవసాయ యంత్రాలు.",
    heroCta: "యంత్రాలను చూడండి",
    scrollHint: "క్రిందికి స్క్రోల్ చేయండి",
    proofAcres: "ఎకరాల్లో పరీక్షించారు",
    proofPlatforms: "ప్లాట్‌ఫారమ్‌లు రూపొందించారు",
    proofRemote: "రిమోట్ నియంత్రిత",
    proofIndia: "మేక్ ఇన్ ఇండియా",
    farmbroTitleB: "పొలపు సోదరుడు.",
    farmbroEyebrow: "ఫార్మ్‌బ్రో UGV · వ్యవసాయం కోసం",
    farmbroSub: "అదనపు సంకీర్ణత లేకుండా ఎక్కువ సామర్థ్యం కావాల్సిన వారి కోసం రిమోట్ నియంత్రిత వ్యవసాయ యంత్రాలు — ఏ యంత్ర వివరాలైనా చూడండి.",
  },
  kn: {
    ...en,
    orderNow: "ಈಗ ಆರ್ಡರ್ ಮಾಡಿ",
    home: "ಮುಖಪುಟ",
    farmbro: "ಫಾರ್ಮ್‌ಬ್ರೋ",
    services: "ಸೇವೆಗಳು",
    gallery: "ಗ್ಯಾಲರಿ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    openNav: "ನ್ಯಾವಿಗೇಶನ್ ತೆರೆಯಿರಿ",
    closeNav: "ನ್ಯಾವಿಗೇಶನ್ ಮುಚ್ಚಿರಿ",
    changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ",
    chooseLanguage: "ಭಾಷೆ ಆರಿಸಿ",
    heroTitleA: "ಹೆಚ್ಚು ಎಕರೆ.",
    heroTitleB: "ಕಡಿಮೆ ಸಮರಸೌಲ್ಯ.",
    heroSub: "ಹೆಚ್ಚುವರಿ ಸಂಕೀರ್ಣತೆಯಿಲ್ಲದೆ ಹೆಚ್ಚಿನ ಬೆಳೆಗಾಗಿ ರಿಮೋಟ್ ನಿಯಂತ್ರಿತ ಕೃಷಿ ಯಂತ್ರಗಳು.",
    heroCta: "ಯಂತ್ರಗಳನ್ನು ನೋಡಿ",
    scrollHint: "ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
    proofAcres: "ಎಕರೆಗಳಲ್ಲಿ ಪರೀಕ್ಷೆ",
    proofPlatforms: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು",
    proofRemote: "ರಿಮೋಟ್ ನಿಯಂತ್ರಿತ",
    proofIndia: "ಮೇಕ್ ಇನ್ ಇಂಡಿಯಾ",
    farmbroTitleB: "ಹೊಲದ ನಿಮ್ಮ ಸಹೋದರ.",
    farmbroEyebrow: "ಫಾರ್ಮ್‌ಬ್ರೋ UGV · ಕೃಷಿಗಾಗಿ",
    farmbroSub: "ಹೆಚ್ಚುವರಿ ಸಂಕೀರ್ಣತೆಯಿಲ್ಲದೆ ಹೆಚ್ಚಿನ ಸಾಮರ್ಥ್ಯ ಬೇಕಾದವರಿಗೆ ರಿಮೋಟ್ ನಿಯಂತ್ರಿತ ಕೃಷಿ ಯಂತ್ರಗಳು — ಯಾವುದೇ ಯಂತ್ರದ ವಿವರ ನೋಡಿ.",
  },
  gu: {
    ...en,
    orderNow: "હવે ઓર્ડર કરો",
    home: "હોમ",
    farmbro: "ફાર્મબ્રો",
    services: "સેવાઓ",
    gallery: "ગેલેરી",
    about: "અમારા વિશે",
    contact: "સંપર્ક કરો",
    openNav: "નેવિગેશન ખોલો",
    closeNav: "નેવિગેશન બંધ કરો",
    changeLanguage: "ભાષા બદલો",
    chooseLanguage: "ભાષા પસંદ કરો",
    heroTitleA: "વધુ એકર.",
    heroTitleB: "ઓછા સમાધાન.",
    heroSub: "વધુ જટિલતા વિના વધુ ઉત્પાદન માટે રિમોટ નિયંત્રિત ખેતી મશીનો.",
    heroCta: "મશીનો જુઓ",
    scrollHint: "નીચે સ્ક્રોલ કરો",
    proofAcres: "એકરમાં પરીક્ષણ",
    proofPlatforms: "પ્લેટફોર્મ બનાવ્યા",
    proofRemote: "રિમોટ નિયંત્રિત",
    proofIndia: "મેક ઇન ઈન્ડિયા",
    farmbroTitleB: "ખેતરના તમારા ભાઈ.",
    farmbroEyebrow: "ફાર્મબ્રો UGV · ખેતી માટે",
    farmbroSub: "વધુ જટિલતા વિના વધુ ક્ષમતા ઇચ્છનારા માટે રિમોટ નિયંત્રિત ખેતી મશીનો — કોઈપણ મશીનની વિગતો જુઓ.",
  },
  pa: {
    ...en,
    orderNow: "ਹੁਣੇ ਆਰਡਰ ਕਰੋ",
    home: "ਹੋਮ",
    farmbro: "ਫਾਰਮਬਰੋ",
    services: "ਸੇਵਾਵਾਂ",
    gallery: "ਗੈਲਰੀ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    contact: "ਸੰਪਰਕ ਕਰੋ",
    openNav: "ਨੈਵੀਗੇਸ਼ਨ ਖੋਲ੍ਹੋ",
    closeNav: "ਨੈਵੀਗੇਸ਼ਨ ਬੰਦ ਕਰੋ",
    changeLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
    chooseLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    heroTitleA: "ਵੱਧ ਜ਼ਮੀਨ।",
    heroTitleB: "ਘੱਟ ਸਮਝੌਤੇ।",
    heroSub: "ਬਿਨਾਂ ਵਾਧੂ ਗੁੰਝਲ ਦੇ ਵੱਧ ਝਾੜ ਲਈ ਰਿਮੋਟ-ਕੰਟਰੋਲ ਖੇਤੀ ਮਸ਼ੀਨਾਂ।",
    heroCta: "ਮਸ਼ੀਨਾਂ ਵੇਖੋ",
    scrollHint: "ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰੋ",
    proofAcres: "ਏਕੜਾਂ ਤੇ ਪਰਖਿਆ",
    proofPlatforms: "ਪਲੇਟਫਾਰਮ ਬਣਾਏ",
    proofRemote: "ਰਿਮੋਟ ਚਾਲਿਤ",
    proofIndia: "ਮੇਕ ਇਨ ਇੰਡੀਆ",
    farmbroTitleB: "ਖੇਤ ਦਾ ਤੁਹਾਡਾ ਭਰਾ।",
    farmbroEyebrow: "ਫਾਰਮਬਰੋ UGV · ਖੇਤੀ ਲਈ",
    farmbroSub: "ਬਿਨਾਂ ਵਾਧੂ ਗੁੰਝਲ ਦੇ ਵੱਧ ਸਮਰੱਥਾ ਚਾਹੁਨ ਵਾਲਿਆਂ ਲਈ ਰਿਮੋਟ-ਕੰਟਰੋਲ ਖੇਤੀ ਮਸ਼ੀਨਾਂ — ਕਿਸੇ ਵੀ ਮਸ਼ੀਨ ਦੀ ਜਾਣਕਾਰੀ ਵੇਖੋ।",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (code: LanguageCode) => void;
  /** UI strings for the active language. */
  t: UiStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<LanguageCode>("en");

  const setLanguage = useCallback((next: LanguageCode) => setCode(next), []);

  const value = useMemo<LanguageContextValue>(() => {
    const language = languages.find((l) => l.code === code) ?? languages[0];
    return { language, setLanguage, t: strings[code] };
  }, [code, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
