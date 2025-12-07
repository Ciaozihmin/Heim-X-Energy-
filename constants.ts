
import { ColorDefinition, BrandElement, InstagramSlide, Team } from './types';

export const BRAND_COLORS: ColorDefinition[] = [
  {
    name: 'Fjord Deep Blue',
    hex: '#00344A',
    description: '挪威水電 / 深邃峽灣',
    textColor: 'text-white'
  },
  {
    name: 'Ice Blue',
    hex: '#A7D3E8',
    description: '冰島地熱蒸氣 / 冷靜',
    textColor: 'text-heim-fjord'
  },
  {
    name: 'Aurora Green',
    hex: '#6FFFB0',
    description: '北極光 / 能源啟示',
    textColor: 'text-heim-fjord'
  },
  {
    name: 'Iron Grey',
    hex: '#2B2B2B',
    description: '工程科技 / 堅固基礎',
    textColor: 'text-white'
  }
];

export const BRAND_ELEMENTS: BrandElement[] = [
  {
    id: 'A',
    title: 'Heim (ᚼ)',
    subtitle: '北歐符文',
    description: '象徵「家園」「世界」「文明根源」。以古老符文形態呈現，代表根基與傳承。',
    icon: 'rune'
  },
  {
    id: 'B',
    title: 'Energi',
    subtitle: '極簡字體',
    description: '使用北歐低溫極簡風格（Futura Nord），象徵科技、工程與能源的理性流動。',
    icon: 'type'
  },
  {
    id: 'C',
    title: 'The Spark (×)',
    subtitle: '啟示之光',
    description: '貫穿交叉處的光帶。代表北極光、水電地熱的交匯，以及中國與北歐的文化碰撞。',
    icon: 'cross'
  }
];

export const BRAND_QUOTE = {
  main: "以北歐文明為家園，以能源為對話，以光為啟示。",
  sub: "Using Nordic civilization as home, energy as dialogue, and light as revelation."
};

export const INSTAGRAM_SLIDES: InstagramSlide[] = [
  {
    id: 1,
    layout: 'cover',
    heading: "DEFINITION",
    title: "Heim is the home we inherit.\nEnergi is the power we create.",
    blocks: [
      {
        cn: "Heim（家園）不是一個地點，而是一個共同擁有、共同守護的世界。\nEnergi（能量）不是物理的數字，而是每一位青年面對世界時的創造力、連結力、理解力與行動力。",
      }
    ],
    footer: "Heim × Energi = 青年參與世界的方式。"
  },
  {
    id: 2,
    layout: 'standard',
    heading: "IDENTITY",
    title: "Youth are not observers.\nYouth are participants.",
    blocks: [
      {
        cn: "世界正在快速改變，而我們這一代擁有新的能力、新的語言、也擁有重新定義「家園」的權利。",
        en: "The world is changing rapidly, and our generation carries new abilities, new languages—and the right to redefine what home means."
      }
    ]
  },
  {
    id: 3,
    layout: 'standard',
    heading: "SYNTHESIS",
    title: "When Heritage meets Power.",
    blocks: [
      {
        cn: "單獨的 Heim 只是歷史；單獨的 Energi 只是物理。\n但當兩者結合，我們便擁有了解決問題的路徑。",
        en: "Heim alone is history. Energi alone is physics.\nBut when combined, we possess the path to solve tomorrow's problems."
      },
      {
        cn: "這不只是關於能源轉型，更是關於「文明如何使用能量」的哲學思考。",
        en: "It is not just about energy transition, but a philosophical inquiry into how civilization wields power."
      }
    ]
  },
  {
    id: 4,
    layout: 'standard',
    heading: "PERSPECTIVE",
    subtitle: "Perspective",
    blocks: [
      {
        cn: "我們相信，不同文化、不同專業的青年在彼此相遇時，世界會出現新的可能性。交流不只是理解，更是互補；合作不只是並肩，更是共同設計未來。",
        en: "We believe that when young people of different cultures and different disciplines meet, new possibilities for the world emerge."
      }
    ]
  },
  {
    id: 5,
    layout: 'standard',
    heading: "ACTION",
    subtitle: "Action",
    blocks: [
      {
        cn: "於是我們走向世界，也把世界帶回彼此。用理性的思考、文化的視野、與青年對未來的想像力，一起思考能源、城市、自然與文明的下一個版本。",
        en: "So we step into the world, and bring the world back to one another—rethinking the next version of energy, cities, nature, and human civilization."
      }
    ]
  },
  {
    id: 6,
    layout: 'quote',
    heading: "MANIFESTO",
    title: "Youth are participants.",
    blocks: [
      {
        cn: "因為青年不是旁觀者，而是參與者。\n參與家園、參與未來、參與世界的改變。",
        en: "Because youth are not observers—youth are participants.\nParticipants in our home, participants in our future, participants in shaping our world."
      }
    ]
  },
  {
    id: 7,
    layout: 'final',
    heading: "VISION",
    title: "Heim × Energi",
    subtitle: "啟北之光",
    blocks: [
      {
        cn: "一個屬於青年、可被延續的全球實踐計畫。",
        en: "Heim × Energi | Light of the North\nA global youth initiative meant to be continued."
      }
    ]
  }
];

export const TEAMS: Team[] = [
  {
    id: '01',
    name: '調研組',
    enName: 'Insight',
    role: 'research',
    description: '深入議題核心，挖掘數據背後的真相。如同透鏡，聚焦理性之光。'
  },
  {
    id: '02',
    name: '內聯組',
    enName: 'Cohesion',
    role: 'internal',
    description: '建立團隊連結，鞏固組織結構。如同繩結，編織共同的家園。'
  },
  {
    id: '03',
    name: '外聯組',
    enName: 'Outreach',
    role: 'external',
    description: '開拓外部合作，搭建溝通橋樑。如同羅盤，指引向外的航道。'
  },
  {
    id: '04',
    name: '宣傳組',
    enName: 'Voice',
    role: 'publicity',
    description: '傳遞理念之火，擴大影響漣漪。如同燈塔，發送改變的訊號。'
  }
];
