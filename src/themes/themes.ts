import { mixHexColors } from '../utils/weddingUtils';

export type ThemeId =
  | 'kesariya_gulab'
  | 'paithani'
  | 'bandhani_garba'
  | 'alpona'
  | 'madhubani'
  | 'kanjeevaram'
  | 'pochampally'
  | 'mysore_silk'
  | 'kasavu'
  | 'sarson_subah'
  | 'anand_karaj'
  | 'nikah'
  | 'mehfil_e_gulab'
  | 'white_aisle'
  | 'kamal'
  | 'blush_modern';

export type LegacyThemeId =
  | 'punjabi'
  | 'hindi'
  | 'marathi'
  | 'gujarati'
  | 'bengali'
  | 'bhojpuri'
  | 'tamil'
  | 'telugu'
  | 'kannada'
  | 'malayalam'
  | 'urdu'
  | 'english';

export type BloomClusterType = 'marigold' | 'rose' | 'lotus' | 'jasmine';
export type ThemeBloomType = BloomClusterType;

export type ThemeDensity = 'spacious' | 'cosy' | 'compact';

export type ThemeTapSoundToken =
  | 'dhol_thump'
  | 'dhol_tap'
  | 'harmonium_swell'
  | 'rabab_strum'
  | 'sitar_pluck'
  | 'flute_note'
  | 'flute_breath'
  | 'dandiya_clack'
  | 'ektara_pluck'
  | 'dholak_tap'
  | 'temple_bell'
  | 'veena_pluck'
  | 'mridangam_tap'
  | 'soft_chenda'
  | 'santoor_ripple'
  | 'santoor_pluck'
  | 'tabla_tap'
  | 'soft_piano_note'
  | 'soft_bell'
  | 'singing_bowl'
  | 'soft_piano'
  | 'piano_note';
export type ThemeTapSound = ThemeTapSoundToken;

export type MotifType =
  | 'phulkari'
  | 'gold_double_grid'
  | 'mandala_jaali'
  | 'peacock_lotus'
  | 'bandhani_mirror'
  | 'alpona'
  | 'madhubani'
  | 'kolam_temple'
  | 'pochampally_ikat'
  | 'mysore_arch'
  | 'kasavu_lamp'
  | 'mughal_jaali'
  | 'rose_gold_jaali'
  | 'olive_branch'
  | 'lotus_line_art'
  | 'simple_floral';

export type ThemeShapeToken =
  | 'pill_cross_stitch'
  | 'rounded_double_gold_brackets'
  | 'scalloped_corners'
  | 'peacock_top_curve'
  | 'bandhani_dot_square'
  | 'lal_paar_rect'
  | 'madhubani_wobbly'
  | 'temple_stepped'
  | 'ikat_zigzag'
  | 'palace_arch_top'
  | 'kasavu_gold_stripes'
  | 'mughal_ogee_arch'
  | 'mughal_ogee_top'
  | 'tall_arch_sage'
  | 'lotus_scalloped_top'
  | 'rounded_hairline';

export type ThemeDividerToken =
  | 'phulkari_flowers'
  | 'gold_marigold_bloom'
  | 'small_mandala'
  | 'mogra_gajra'
  | 'mirror_circles'
  | 'alpona_leaf'
  | 'fish_chain'
  | 'kolam_row'
  | 'diamond_chain'
  | 'arch_trio'
  | 'nilavilakku_lamp'
  | 'arabesque_knot'
  | 'jaali_knot'
  | 'olive_sprig_rings'
  | 'lotus_buds_row'
  | 'small_floral';

export type ThemeEntranceToken =
  | 'dhol_pop'
  | 'calm_fade_expand'
  | 'unfold_blur'
  | 'curved_ellipse'
  | 'spin_in'
  | 'line_draw_fade'
  | 'wobble_stagger'
  | 'tiered_steps'
  | 'diamond_clip'
  | 'arch_rising'
  | 'kasavu_wipe'
  | 'arabesque_star'
  | 'arch_unfold'
  | 'slow_rise_light_bloom'
  | 'lotus_petal_bloom'
  | 'soft_fade_up';

export type ThemeTransitionToken =
  | 'marigold_swirl_pulse'
  | 'golden_sunrise_wash'
  | 'diya_glow_bloom'
  | 'peacock_fan_sweep'
  | 'garba_rings'
  | 'alpona_line_draw'
  | 'sun_ray_burst'
  | 'kolam_grid_connect'
  | 'expanding_diamond'
  | 'arch_rise_bottom'
  | 'nilavilakku_kasavu_stripes'
  | 'eight_point_star'
  | 'rose_petal_swirl'
  | 'white_flurry_bell'
  | 'lotus_bloom_outward'
  | 'soft_blush_petals';

export type ThemeButtonToken =
  | 'stitched_pill_bounce'
  | 'deep_blue_gold_pill'
  | 'scalloped_glow'
  | 'peacock_curve'
  | 'bandhani_dotted'
  | 'lal_paar_border'
  | 'madhubani_wiggle'
  | 'temple_tier'
  | 'ikat_edge'
  | 'arch_pill'
  | 'kasavu_striped'
  | 'mughal_ogee'
  | 'rose_gold_glow_pill'
  | 'sage_pill'
  | 'lotus_pink_pill'
  | 'hairline_rounded';

export type ThemeParticleType =
  | 'marigold_petals'
  | 'saffron_marigold_petals'
  | 'rose_diya_sparks'
  | 'rose_marigold_petals'
  | 'mogra_floating_up'
  | 'mogra_flowers'
  | 'mirror_sparkles'
  | 'shiuli_zigzag'
  | 'shiuli_flowers'
  | 'mango_leaves'
  | 'jasmine_petals'
  | 'champa_petals'
  | 'jasmine_gold_shimmer'
  | 'rose_petals'
  | 'white_petals_olive'
  | 'lotus_petals_drift'
  | 'soft_petals'
  | 'green_leaves'
  | 'confetti_sparkles'
  | 'gold_dust';

export interface WeddingTheme {
  id: ThemeId;
  name: string;
  nativeName: string;
  langCode: string;
  base: string;
  tint1: string;
  tint2: string;
  tint3: string;
  accent: string;
  goldStart: string;
  goldEnd: string;
  text: string;
  button: string;
  motif: MotifType;
  motifLabel: string;
  shape: ThemeShapeToken;
  divider: ThemeDividerToken;
  latinFont: string;
  particleType: ThemeParticleType;
  entrance: ThemeEntranceToken;
  transitionType: ThemeTransitionToken;
  buttonStyle: ThemeButtonToken;
  emojis: [string, string];
  bloomType: BloomClusterType;
  // Emotion layer tokens
  mood: string;
  greeting: string;
  moodLine: string;
  closingLine: string;
  density: ThemeDensity;
  ornamentLevel: 1 | 2 | 3;
  tapSound: ThemeTapSoundToken;
  audioSrc: string;
}

export const THEME_ORDER: ThemeId[] = [
  'kesariya_gulab',
  'paithani',
  'bandhani_garba',
  'alpona',
  'madhubani',
  'kanjeevaram',
  'pochampally',
  'mysore_silk',
  'kasavu',
  'sarson_subah',
  'anand_karaj',
  'nikah',
  'mehfil_e_gulab',
  'white_aisle',
  'kamal',
  'blush_modern',
];

export const LEGACY_THEME_ID_MAP: Record<string, ThemeId> = {
  punjabi: 'sarson_subah',
  hindi: 'kesariya_gulab',
  marathi: 'paithani',
  gujarati: 'bandhani_garba',
  bengali: 'alpona',
  bhojpuri: 'madhubani',
  tamil: 'kanjeevaram',
  telugu: 'pochampally',
  kannada: 'mysore_silk',
  malayalam: 'kasavu',
  urdu: 'nikah',
  english: 'blush_modern',
};

export const CANONICAL_THEMES: Record<ThemeId, WeddingTheme> = {
  sarson_subah: {
    id: 'sarson_subah',
    name: 'Sarson Subah',
    nativeName: 'ਸਰ੍ਹੋਂ ਸਵੇਰ',
    langCode: 'pa',
    base: '#FFF8EC',
    tint1: '#F9D8BC',
    tint2: '#CBD9C0',
    tint3: '#E2D7EE',
    accent: '#D97C6C',
    goldStart: '#C99A4B',
    goldEnd: '#F1D58A',
    text: '#4E2F3A',
    button: '#7A3E55',
    motif: 'phulkari',
    motifLabel: 'Phulkari Diamonds',
    shape: 'pill_cross_stitch',
    divider: 'phulkari_flowers',
    latinFont: 'Monsieur La Doulaise',
    particleType: 'marigold_petals',
    entrance: 'dhol_pop',
    transitionType: 'marigold_swirl_pulse',
    buttonStyle: 'stitched_pill_bounce',
    emojis: ['🌼', '🥁'],
    bloomType: 'marigold',
    mood: 'dhol aur dhamaal',
    greeting: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    moodLine: 'Under the winter sun and mustard blooms',
    closingLine: 'With love & warmth — The Gill & Randhawa Families',
    density: 'cosy',
    ornamentLevel: 3,
    tapSound: 'dhol_thump',
    audioSrc: '',
  },
  anand_karaj: {
    id: 'anand_karaj',
    name: 'Sunehri Dhoop',
    nativeName: 'ਸੁਨਹਿਰੀ ਧੁੱਪ',
    langCode: 'pa',
    base: '#FFF9EF',
    tint1: '#FBE3B8',
    tint2: '#CFE0F2',
    tint3: '#F3E7D0',
    accent: '#E39A3B',
    goldStart: '#C9963A',
    goldEnd: '#F5DC9C',
    text: '#2F3A4A',
    button: '#1F4E8C',
    motif: 'gold_double_grid',
    motifLabel: 'Fine Gold Double Grid',
    shape: 'rounded_double_gold_brackets',
    divider: 'gold_marigold_bloom',
    latinFont: 'Pinyon Script',
    particleType: 'saffron_marigold_petals',
    entrance: 'calm_fade_expand',
    transitionType: 'golden_sunrise_wash',
    buttonStyle: 'deep_blue_gold_pill',
    emojis: ['🌸', '✨'],
    bloomType: 'marigold',
    mood: 'shaant, sukoon, khushi',
    greeting: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    moodLine: 'Under the winter sun and mustard blooms',
    closingLine: 'With humble gratitude & prayers — The Gill & Randhawa Families',
    density: 'spacious',
    ornamentLevel: 2,
    tapSound: 'harmonium_swell',
    audioSrc: '',
  },
  kesariya_gulab: {
    id: 'kesariya_gulab',
    name: 'Kesariya Gulab',
    nativeName: 'केसरिया गुलाब',
    langCode: 'hi',
    base: '#FFF6EA',
    tint1: '#FFD9A8',
    tint2: '#F4B6C2',
    tint3: '#FBE3B5',
    accent: '#D2573F',
    goldStart: '#C8923B',
    goldEnd: '#F3D27A',
    text: '#4A2A26',
    button: '#A8362E',
    motif: 'mandala_jaali',
    motifLabel: 'Mandala Jaali',
    shape: 'scalloped_corners',
    divider: 'small_mandala',
    latinFont: 'Pinyon Script',
    particleType: 'rose_diya_sparks',
    entrance: 'unfold_blur',
    transitionType: 'diya_glow_bloom',
    buttonStyle: 'scalloped_glow',
    emojis: ['🪔', '🌺'],
    bloomType: 'rose',
    mood: 'rang, roshni, raunak',
    greeting: 'स्वागत है',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'स्नेह और आशीर्वाद सहित — गिल एवं रंधावा परिवार',
    density: 'cosy',
    ornamentLevel: 3,
    tapSound: 'sitar_pluck',
    audioSrc: '',
  },
  paithani: {
    id: 'paithani',
    name: 'Paithani',
    nativeName: 'पैठणी सोहळा',
    langCode: 'mr',
    base: '#FFF9EE',
    tint1: '#BFE0D6',
    tint2: '#F3B7D0',
    tint3: '#F7E0A3',
    accent: '#1F7A6B',
    goldStart: '#C79A42',
    goldEnd: '#F4D88A',
    text: '#3B2A3A',
    button: '#1F6F63',
    motif: 'peacock_lotus',
    motifLabel: 'Peacock Feather',
    shape: 'peacock_top_curve',
    divider: 'mogra_gajra',
    latinFont: 'Parisienne',
    particleType: 'mogra_floating_up',
    entrance: 'curved_ellipse',
    transitionType: 'peacock_fan_sweep',
    buttonStyle: 'peacock_curve',
    emojis: ['🦚', '🌼'],
    bloomType: 'lotus',
    mood: 'mangal aur maaya',
    greeting: 'स्वागत',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'प्रेम आणि आदरासह — गिल आणि रंधावा परिवार',
    density: 'cosy',
    ornamentLevel: 3,
    tapSound: 'flute_note',
    audioSrc: '',
  },
  bandhani_garba: {
    id: 'bandhani_garba',
    name: 'Bandhani Rang',
    nativeName: 'બાંધણી રંગ',
    langCode: 'gu',
    base: '#FFF7E6',
    tint1: '#F8D878',
    tint2: '#F4A9A0',
    tint3: '#A9DCD3',
    accent: '#D6453D',
    goldStart: '#CA963B',
    goldEnd: '#F6D77E',
    text: '#4A2C2A',
    button: '#B23A48',
    motif: 'bandhani_mirror',
    motifLabel: 'Bandhani & Mirror',
    shape: 'bandhani_dot_square',
    divider: 'mirror_circles',
    latinFont: 'Sacramento',
    particleType: 'mirror_sparkles',
    entrance: 'spin_in',
    transitionType: 'garba_rings',
    buttonStyle: 'bandhani_dotted',
    emojis: ['🪘', '✨'],
    bloomType: 'marigold',
    mood: 'josh aur rang',
    greeting: 'સ્વાગત છે',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'સ્નેਹ અને આશીર્વાદ સાથે — ગિલ અને રંધાવા પરિવાર',
    density: 'compact',
    ornamentLevel: 3,
    tapSound: 'dandiya_clack',
    audioSrc: '',
  },
  alpona: {
    id: 'alpona',
    name: 'Lal Paar',
    nativeName: 'লাল পাড়',
    langCode: 'bn',
    base: '#FFFDF7',
    tint1: '#FAD4CE',
    tint2: '#F4E8D0',
    tint3: '#CFE3D2',
    accent: '#D9463E',
    goldStart: '#C69749',
    goldEnd: '#EFEFD6',
    text: '#3E2A28',
    button: '#B83A34',
    motif: 'alpona',
    motifLabel: 'Alpona Line Art',
    shape: 'lal_paar_rect',
    divider: 'alpona_leaf',
    latinFont: 'Tangerine',
    particleType: 'shiuli_zigzag',
    entrance: 'line_draw_fade',
    transitionType: 'alpona_line_draw',
    buttonStyle: 'lal_paar_border',
    emojis: ['🌸', '🌺'],
    bloomType: 'lotus',
    mood: 'kavita jaisa pyaar',
    greeting: 'স্বাগতম',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'ভালোবাসা ও কৃতজ্ঞতায় — গিল ও রন্ধাওয়া পরিবার',
    density: 'spacious',
    ornamentLevel: 2,
    tapSound: 'ektara_pluck',
    audioSrc: '',
  },
  madhubani: {
    id: 'madhubani',
    name: 'Madhubani',
    nativeName: 'मधुबनी आँगन',
    langCode: 'bho',
    base: '#FFF4DC',
    tint1: '#F8DD9A',
    tint2: '#F2B8A2',
    tint3: '#BFD3EC',
    accent: '#D9644A',
    goldStart: '#C48E38',
    goldEnd: '#F2CF78',
    text: '#4A2E24',
    button: '#8C3B2E',
    motif: 'madhubani',
    motifLabel: 'Madhubani Fish & Sun',
    shape: 'madhubani_wobbly',
    divider: 'fish_chain',
    latinFont: 'Caveat',
    particleType: 'mango_leaves',
    entrance: 'wobble_stagger',
    transitionType: 'sun_ray_burst',
    buttonStyle: 'madhubani_wiggle',
    emojis: ['🎨', '🌸'],
    bloomType: 'marigold',
    mood: 'gaon ki mitti, lok-geet ki meethas',
    greeting: 'स्वागत बा',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'नेह आ आभार सहित — गिल आ रंधावा परिवार',
    density: 'cosy',
    ornamentLevel: 3,
    tapSound: 'dholak_tap',
    audioSrc: '',
  },
  kanjeevaram: {
    id: 'kanjeevaram',
    name: 'Kanjeevaram',
    nativeName: 'காஞ்சிபுரம் பட்டு',
    langCode: 'ta',
    base: '#FFF8E8',
    tint1: '#CFE3D2',
    tint2: '#F6D8C4',
    tint3: '#F3E3A9',
    accent: '#2F7A55',
    goldStart: '#C9963E',
    goldEnd: '#F3D684',
    text: '#3A2A2A',
    button: '#7A2E3A',
    motif: 'kolam_temple',
    motifLabel: 'Kolam Dot Grid',
    shape: 'temple_stepped',
    divider: 'kolam_row',
    latinFont: 'Rouge Script',
    particleType: 'jasmine_petals',
    entrance: 'tiered_steps',
    transitionType: 'kolam_grid_connect',
    buttonStyle: 'temple_tier',
    emojis: ['🏛️', '🌼'],
    bloomType: 'lotus',
    mood: 'shaan aur garima',
    greeting: 'வரவேற்கிறோம்',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'அன்பும் நன்றியும் — கில் & ரந்தாவா குடும்பத்தினர்',
    density: 'spacious',
    ornamentLevel: 3,
    tapSound: 'temple_bell',
    audioSrc: '',
  },
  pochampally: {
    id: 'pochampally',
    name: 'Pochampally',
    nativeName: 'పోచంపల్లి ఇక్కత్',
    langCode: 'te',
    base: '#FFF9F0',
    tint1: '#A9DCD8',
    tint2: '#F6D58E',
    tint3: '#F2B3A0',
    accent: '#1C8C8C',
    goldStart: '#C79844',
    goldEnd: '#F1D486',
    text: '#35302E',
    button: '#1F6F78',
    motif: 'pochampally_ikat',
    motifLabel: 'Pochampally Ikat',
    shape: 'ikat_zigzag',
    divider: 'diamond_chain',
    latinFont: 'Alex Brush',
    particleType: 'marigold_petals',
    entrance: 'diamond_clip',
    transitionType: 'expanding_diamond',
    buttonStyle: 'ikat_edge',
    emojis: ['💎', '🌺'],
    bloomType: 'marigold',
    mood: 'rangon ka mel',
    greeting: 'స్వాగతం',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'ప్రేమ మరియు కృతజ్ఞతలతో — గిల్ & రంధావా కుటుంబాలు',
    density: 'cosy',
    ornamentLevel: 2,
    tapSound: 'veena_pluck',
    audioSrc: '',
  },
  mysore_silk: {
    id: 'mysore_silk',
    name: 'Mysore Silk',
    nativeName: 'ಮೈಸೂರು ಸಿಲ್ಕ್',
    langCode: 'kn',
    base: '#FFF8EA',
    tint1: '#EAD3B0',
    tint2: '#BFE0C8',
    tint3: '#F6E1A0',
    accent: '#2E8B6A',
    goldStart: '#C99A45',
    goldEnd: '#F4DA8C',
    text: '#3A3028',
    button: '#2E6B55',
    motif: 'mysore_arch',
    motifLabel: 'Palace Arch Lattice',
    shape: 'palace_arch_top',
    divider: 'arch_trio',
    latinFont: 'Petit Formal Script',
    particleType: 'champa_petals',
    entrance: 'arch_rising',
    transitionType: 'arch_rise_bottom',
    buttonStyle: 'arch_pill',
    emojis: ['👑', '🌹'],
    bloomType: 'jasmine',
    mood: 'shahi shaanti',
    greeting: 'ಸ್ವಾಗತ',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'ಪ್ರೀತಿ ಮತ್ತು ಕೃತಜ್ಞತೆಗಳೊಂದಿಗೆ — ಗಿಲ್ ಮತ್ತು ರಂಧಾವಾ ಕುಟುಂಬ',
    density: 'spacious',
    ornamentLevel: 2,
    tapSound: 'mridangam_tap',
    audioSrc: '',
  },
  kasavu: {
    id: 'kasavu',
    name: 'Kasavu',
    nativeName: 'കസവ്',
    langCode: 'ml',
    base: '#FFFDF5',
    tint1: '#F3EBCB',
    tint2: '#BFD8A8',
    tint3: '#F7E4A8',
    accent: '#B8923F',
    goldStart: '#B8923F',
    goldEnd: '#F2DA8E',
    text: '#34302A',
    button: '#4F7A3A',
    motif: 'kasavu_lamp',
    motifLabel: 'Kasavu Gold Lines',
    shape: 'kasavu_gold_stripes',
    divider: 'nilavilakku_lamp',
    latinFont: 'Great Vibes',
    particleType: 'jasmine_gold_shimmer',
    entrance: 'kasavu_wipe',
    transitionType: 'nilavilakku_kasavu_stripes',
    buttonStyle: 'kasavu_striped',
    emojis: ['🪔', '🌿'],
    bloomType: 'jasmine',
    mood: 'saaf, shaant, sundar',
    greeting: 'സ്വാഗതം',
    moodLine: 'A courtyard of marigolds and music',
    closingLine: 'സ്നേഹത്തോടെ — ഗിൽ & രന്ധാവ കുടുംബം',
    density: 'spacious',
    ornamentLevel: 1,
    tapSound: 'soft_chenda',
    audioSrc: '',
  },
  nikah: {
    id: 'nikah',
    name: 'Zamurrad',
    nativeName: 'زمرد',
    langCode: 'ur',
    base: '#FFFAF2',
    tint1: '#CFE8DC',
    tint2: '#F0CFC2',
    tint3: '#EADFC4',
    accent: '#1F7A63',
    goldStart: '#C59A4B',
    goldEnd: '#EFEFD2',
    text: '#33302B',
    button: '#1F5F4F',
    motif: 'mughal_jaali',
    motifLabel: 'Arabesque Tiles',
    shape: 'mughal_ogee_arch',
    divider: 'arabesque_knot',
    latinFont: 'Allura',
    particleType: 'rose_petals',
    entrance: 'arabesque_star',
    transitionType: 'eight_point_star',
    buttonStyle: 'mughal_ogee',
    emojis: ['🌹', '✨'],
    bloomType: 'rose',
    mood: 'sukoon aur sajaawat',
    greeting: 'خوش آمدید',
    moodLine: 'Beneath a sky of roses and stars',
    closingLine: 'محبت اور خلوص کے ساتھ — گل اور رندھاوا خاندان',
    density: 'spacious',
    ornamentLevel: 2,
    tapSound: 'santoor_ripple',
    audioSrc: '',
  },
  mehfil_e_gulab: {
    id: 'mehfil_e_gulab',
    name: 'Gulabi Jaali',
    nativeName: 'گلابی جالی',
    langCode: 'ur',
    base: '#FFF7F3',
    tint1: '#F4D3CC',
    tint2: '#EBD9C4',
    tint3: '#E3EADF',
    accent: '#B76E79',
    goldStart: '#B76E79',
    goldEnd: '#E8C5B8',
    text: '#3B2A2E',
    button: '#6E2F44',
    motif: 'rose_gold_jaali',
    motifLabel: 'Mughal Floral Jaali',
    shape: 'mughal_ogee_top',
    divider: 'jaali_knot',
    latinFont: 'Allura',
    particleType: 'rose_petals',
    entrance: 'arch_unfold',
    transitionType: 'rose_petal_swirl',
    buttonStyle: 'rose_gold_glow_pill',
    emojis: ['🌹', '🕯️'],
    bloomType: 'rose',
    mood: 'nazakat aur roshni',
    greeting: 'خوش آمدید',
    moodLine: 'Beneath a sky of roses and stars',
    closingLine: 'خلوص اور دعاؤں کے ساتھ — گل اور رندھاوا خاندان',
    density: 'cosy',
    ornamentLevel: 2,
    tapSound: 'tabla_tap',
    audioSrc: '',
  },
  white_aisle: {
    id: 'white_aisle',
    name: 'Ivory Grove',
    nativeName: 'Olive & Ivory',
    langCode: 'en',
    base: '#FFFDFA',
    tint1: '#F3E9E3',
    tint2: '#E4EEE6',
    tint3: '#EAE6F2',
    accent: '#7C9A82',
    goldStart: '#B5A27A',
    goldEnd: '#E6DEC8',
    text: '#343A36',
    button: '#4C6B57',
    motif: 'olive_branch',
    motifLabel: 'Olive Branch Line Art',
    shape: 'tall_arch_sage',
    divider: 'olive_sprig_rings',
    latinFont: 'Pinyon Script',
    particleType: 'white_petals_olive',
    entrance: 'slow_rise_light_bloom',
    transitionType: 'white_flurry_bell',
    buttonStyle: 'sage_pill',
    emojis: ['🕊️', '🤍'],
    bloomType: 'jasmine',
    mood: 'grace aur khushi',
    greeting: 'Welcome',
    moodLine: 'Two hearts, one quiet promise',
    closingLine: 'With love, faith & gratitude — The Gill & Randhawa Families',
    density: 'spacious',
    ornamentLevel: 1,
    tapSound: 'soft_piano_note',
    audioSrc: '',
  },
  kamal: {
    id: 'kamal',
    name: 'Moti Gulabi',
    nativeName: 'मोती गुलाबी',
    langCode: 'hi',
    base: '#FFFCF7',
    tint1: '#FADCE6',
    tint2: '#E5F0E1',
    tint3: '#FFF2CC',
    accent: '#C25B7A',
    goldStart: '#C89B4B',
    goldEnd: '#F5E1A4',
    text: '#3E2F36',
    button: '#7B3B57',
    motif: 'lotus_line_art',
    motifLabel: 'Lotus Line Art',
    shape: 'lotus_scalloped_top',
    divider: 'lotus_buds_row',
    latinFont: 'Parisienne',
    particleType: 'lotus_petals_drift',
    entrance: 'lotus_petal_bloom',
    transitionType: 'lotus_bloom_outward',
    buttonStyle: 'lotus_pink_pill',
    emojis: ['🪷', '✨'],
    bloomType: 'lotus',
    mood: 'sukoon aur taazgi',
    greeting: 'स्वागत है',
    moodLine: 'Pure hearts, sacred vows',
    closingLine: 'मंगल भावना एवं स्नेह सहित — गिल एवं रंधावा परिवार',
    density: 'spacious',
    ornamentLevel: 2,
    tapSound: 'singing_bowl',
    audioSrc: '',
  },
  blush_modern: {
    id: 'blush_modern',
    name: 'Blush Modern',
    nativeName: 'Blush Botanical',
    langCode: 'en',
    base: '#FFF8F3',
    tint1: '#F8D7DA',
    tint2: '#EFE3D1',
    tint3: '#DCE6F2',
    accent: '#C98A8F',
    goldStart: '#C99A4B',
    goldEnd: '#F1D58A',
    text: '#4E2F3A',
    button: '#7A3E55',
    motif: 'simple_floral',
    motifLabel: 'Fine Floral Line',
    shape: 'rounded_hairline',
    divider: 'small_floral',
    latinFont: 'Allura',
    particleType: 'soft_petals',
    entrance: 'soft_fade_up',
    transitionType: 'soft_blush_petals',
    buttonStyle: 'hairline_rounded',
    emojis: ['🥂', '💕'],
    bloomType: 'rose',
    mood: 'soft modern romance',
    greeting: 'Welcome',
    moodLine: 'A celebration of us',
    closingLine: 'With love & gratitude — The Gill & Randhawa Families',
    density: 'spacious',
    ornamentLevel: 1,
    tapSound: 'soft_piano',
    audioSrc: '',
  },
};

/**
 * Export `THEMES` with both the 16 canonical keys and non-enumerable legacy aliases
 * so `Object.keys(THEMES)` has 16 keys while `THEMES[legacyId]` still works if referenced.
 */
export const THEMES: Record<ThemeId, WeddingTheme> & Record<string, WeddingTheme> = (() => {
  const map = { ...CANONICAL_THEMES } as Record<ThemeId, WeddingTheme> &
    Record<string, WeddingTheme>;
  for (const [legacyKey, canonicalKey] of Object.entries(LEGACY_THEME_ID_MAP)) {
    Object.defineProperty(map, legacyKey, {
      value: CANONICAL_THEMES[canonicalKey],
      enumerable: false,
      configurable: true,
    });
  }
  return map;
})();

export function resolveThemeId(rawId: string | null | undefined): ThemeId {
  if (!rawId) return 'sarson_subah';
  const clean = rawId.trim().toLowerCase();
  if (clean in CANONICAL_THEMES) {
    return clean as ThemeId;
  }
  if (clean in LEGACY_THEME_ID_MAP) {
    return LEGACY_THEME_ID_MAP[clean];
  }
  return 'sarson_subah';
}

export const LANGUAGE_TO_THEME: Record<string, ThemeId> = {
  hi: 'kesariya_gulab',
  pa: 'sarson_subah',
  mr: 'paithani',
  gu: 'bandhani_garba',
  bn: 'alpona',
  bho: 'madhubani',
  ta: 'kanjeevaram',
  te: 'pochampally',
  kn: 'mysore_silk',
  ml: 'kasavu',
  ur: 'nikah',
  en: 'blush_modern',
};

export function getThemeForLanguage(langCode: string): WeddingTheme {
  const normalized = (langCode || 'en').toLowerCase().trim();
  const themeId = LANGUAGE_TO_THEME[normalized] || 'sarson_subah';
  return CANONICAL_THEMES[themeId];
}

export function getNextThemeId(currentId: ThemeId | string): ThemeId {
  const canonical = resolveThemeId(currentId);
  const idx = THEME_ORDER.indexOf(canonical);
  if (idx === -1) return THEME_ORDER[0];
  return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
}

export function getRandomDifferentThemeId(
  currentId: ThemeId | string,
  rand = Math.random
): ThemeId {
  const canonical = resolveThemeId(currentId);
  const candidates = THEME_ORDER.filter((id) => id !== canonical);
  if (candidates.length === 0) return canonical;
  const index = Math.floor(rand() * candidates.length) % candidates.length;
  return candidates[index];
}

export function getDensityScale(density: ThemeDensity): number {
  switch (density) {
    case 'spacious':
      return 1.08;
    case 'compact':
      return 0.92;
    case 'cosy':
    default:
      return 1.0;
  }
}

/**
 * Generates a static SVG data-URI pattern for the given theme at ~5-6% opacity.
 * Strictly uses geometric/floral/architectural line art (no sacred symbols).
 */
export function getThemePatternDataUri(theme: WeddingTheme): string {
  const stroke = theme.button;
  const accent = theme.goldStart;
  let svgInner = '';

  switch (theme.id) {
    case 'sarson_subah':
      // Phulkari diamonds
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M28 4 L52 28 L28 52 L4 28 Z" stroke="${stroke}" stroke-width="1.2" stroke-dasharray="3 2"/>
        <path d="M28 14 L42 28 L28 42 L14 28 Z" stroke="${accent}" stroke-width="1"/>
        <circle cx="28" cy="28" r="2.5" fill="${stroke}"/>
      </svg>`;
      break;
    case 'anand_karaj':
      // Fine gold double-line grid at 5%
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <line x1="0" y1="12" x2="56" y2="12" stroke="${accent}" stroke-width="0.9"/>
        <line x1="0" y1="15" x2="56" y2="15" stroke="${accent}" stroke-width="0.6"/>
        <line x1="12" y1="0" x2="12" y2="56" stroke="${accent}" stroke-width="0.9"/>
        <line x1="15" y1="0" x2="15" y2="56" stroke="${accent}" stroke-width="0.6"/>
        <circle cx="13.5" cy="13.5" r="2" fill="${stroke}"/>
      </svg>`;
      break;
    case 'kesariya_gulab':
      // Mandala jaali
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="22" stroke="${stroke}" stroke-width="1"/>
        <circle cx="30" cy="30" r="12" stroke="${accent}" stroke-width="1" stroke-dasharray="2 2"/>
        <path d="M30 8 C35 20 35 40 30 52 C25 40 25 20 30 8 Z M8 30 C20 25 40 25 52 30 C40 35 20 35 8 30 Z" stroke="${stroke}" stroke-width="0.9"/>
      </svg>`;
      break;
    case 'paithani':
      // Tiny peacock-feather eyes
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
        <path d="M27 8 C38 18 38 36 27 46 C16 36 16 18 27 8 Z" stroke="${stroke}" stroke-width="1.1"/>
        <ellipse cx="27" cy="29" rx="6" ry="8" stroke="${accent}" stroke-width="1"/>
        <circle cx="27" cy="30" r="3" fill="${stroke}"/>
      </svg>`;
      break;
    case 'bandhani_garba':
      // Bandhani dots
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="14" cy="14" r="2.2" fill="${stroke}"/>
        <circle cx="34" cy="14" r="2.2" fill="${stroke}"/>
        <circle cx="14" cy="34" r="2.2" fill="${stroke}"/>
        <circle cx="34" cy="34" r="2.2" fill="${stroke}"/>
        <rect x="20" y="20" width="8" height="8" transform="rotate(45 24 24)" stroke="${accent}" stroke-width="1.2"/>
      </svg>`;
      break;
    case 'alpona':
      // White alpona line art
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M10 30 C20 12, 40 12, 50 30 C40 48, 20 48, 10 30 Z" stroke="${stroke}" stroke-width="1.2"/>
        <path d="M30 10 C42 22, 42 38, 30 50 C18 38, 18 22, 30 10 Z" stroke="${accent}" stroke-width="1"/>
        <circle cx="30" cy="30" r="3.5" stroke="${stroke}" stroke-width="1.2"/>
      </svg>`;
      break;
    case 'madhubani':
      // Madhubani fish and sun line art
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="20" cy="20" r="8" stroke="${stroke}" stroke-width="1.2"/>
        <circle cx="20" cy="20" r="4" stroke="${accent}" stroke-width="1"/>
        <path d="M34 44 C42 36, 52 36, 58 44 C52 52, 42 52, 34 44 Z M34 44 L28 39 V49 Z" stroke="${stroke}" stroke-width="1.1"/>
      </svg>`;
      break;
    case 'kanjeevaram':
      // Kolam dot grid
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="12" cy="12" r="1.6" fill="${stroke}"/>
        <circle cx="24" cy="12" r="1.6" fill="${stroke}"/>
        <circle cx="36" cy="12" r="1.6" fill="${stroke}"/>
        <circle cx="12" cy="24" r="1.6" fill="${stroke}"/>
        <circle cx="24" cy="24" r="1.8" fill="${accent}"/>
        <circle cx="36" cy="24" r="1.6" fill="${stroke}"/>
        <circle cx="12" cy="36" r="1.6" fill="${stroke}"/>
        <circle cx="24" cy="36" r="1.6" fill="${stroke}"/>
        <circle cx="36" cy="36" r="1.6" fill="${stroke}"/>
        <path d="M24 6 L42 24 L24 42 L6 24 Z" stroke="${stroke}" stroke-width="0.9"/>
      </svg>`;
      break;
    case 'pochampally':
      // Blur-edged ikat diamonds
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M28 6 L50 28 L28 50 L6 28 Z" stroke="${stroke}" stroke-width="1.4" stroke-dasharray="4 2"/>
        <path d="M28 14 L42 28 L28 42 L14 28 Z" stroke="${accent}" stroke-width="1.2" stroke-dasharray="2 2"/>
      </svg>`;
      break;
    case 'mysore_silk':
      // Palace arch lattice
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M10 48 V26 C10 14 20 8 28 6 C36 8 46 14 46 26 V48" stroke="${stroke}" stroke-width="1.2"/>
        <path d="M18 48 V28 C18 20 23 15 28 13 C33 15 38 20 38 28 V48" stroke="${accent}" stroke-width="0.9"/>
      </svg>`;
      break;
    case 'kasavu':
      // Fine gold kasavu lines
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <line x1="0" y1="10" x2="48" y2="10" stroke="${accent}" stroke-width="1.8"/>
        <line x1="0" y1="14" x2="48" y2="14" stroke="${stroke}" stroke-width="0.8"/>
        <line x1="0" y1="38" x2="48" y2="38" stroke="${accent}" stroke-width="1.2"/>
      </svg>`;
      break;
    case 'nikah':
      // Arabesque tiles
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="14" y="14" width="28" height="28" stroke="${stroke}" stroke-width="1.1"/>
        <rect x="14" y="14" width="28" height="28" transform="rotate(45 28 28)" stroke="${accent}" stroke-width="1.1"/>
        <circle cx="28" cy="28" r="4" stroke="${stroke}" stroke-width="1"/>
      </svg>`;
      break;
    case 'mehfil_e_gulab':
      // Mughal floral jaali in rose-gold
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M30 6 C40 16 48 22 48 34 V52 H12 V34 C12 22 20 16 30 6 Z" stroke="${accent}" stroke-width="1.1"/>
        <path d="M30 16 C35 23 35 33 30 40 C25 33 25 23 30 16 Z M20 28 C27 24 33 24 40 28 C33 32 27 32 20 28 Z" stroke="${stroke}" stroke-width="0.9"/>
      </svg>`;
      break;
    case 'white_aisle':
      // Olive-branch line art
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M12 46 C24 34, 36 26, 48 14" stroke="${stroke}" stroke-width="1.1"/>
        <path d="M22 36 C16 30, 18 22, 26 28 Z" stroke="${accent}" stroke-width="1"/>
        <path d="M34 26 C28 20, 30 12, 38 18 Z" stroke="${accent}" stroke-width="1"/>
        <path d="M28 34 C34 40, 42 38, 36 30 Z" stroke="${accent}" stroke-width="1"/>
      </svg>`;
      break;
    case 'kamal':
      // Lotus line art at 6%
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M30 12 C36 22 36 34 30 42 C24 34 24 22 30 12 Z" stroke="${stroke}" stroke-width="1.1"/>
        <path d="M30 42 C20 38 14 28 18 20 C24 24 27 32 30 42 Z" stroke="${accent}" stroke-width="1"/>
        <path d="M30 42 C40 38 46 28 42 20 C36 24 33 32 30 42 Z" stroke="${accent}" stroke-width="1"/>
      </svg>`;
      break;
    case 'blush_modern':
    default:
      // Fine floral line art
      svgInner = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
        <path d="M12 40 C22 28, 34 28, 44 16" stroke="${stroke}" stroke-width="1"/>
        <path d="M24 28 C20 20, 26 16, 30 22" stroke="${accent}" stroke-width="1"/>
        <path d="M32 28 C38 34, 34 40, 28 34" stroke="${accent}" stroke-width="1"/>
      </svg>`;
      break;
  }

  return `url("data:image/svg+xml,${encodeURIComponent(svgInner.replace(/\s+/g, ' ').trim())}")`;
}

const THEME_FONT_LINK_ID = 'active-theme-latin-font-stylesheet';

/**
 * Dynamically loads ONLY the active theme's Latin script Google Font (display=swap).
 */
export function syncActiveThemeFont(theme: WeddingTheme): void {
  if (typeof document === 'undefined') return;
  const family = theme.latinFont || 'Monsieur La Doulaise';
  document.documentElement.style.setProperty(
    '--font-theme-latin',
    `'${family}', serif`
  );

  let linkEl = document.getElementById(THEME_FONT_LINK_ID) as HTMLLinkElement | null;
  const encodedFamily = encodeURIComponent(family).replace(/%20/g, '+');
  const href = `https://fonts.googleapis.com/css2?family=${encodedFamily}&display=swap`;

  if (!linkEl) {
    linkEl = document.createElement('link');
    linkEl.id = THEME_FONT_LINK_ID;
    linkEl.rel = 'stylesheet';
    document.head.appendChild(linkEl);
  }
  if (linkEl.href !== href) {
    linkEl.href = href;
  }
}

/**
 * Applies a theme's CSS variables, shape/button/density/ornament data attributes,
 * static SVG pattern URI, and active Latin display font onto `document.documentElement`.
 */
export function applyThemeCssVariables(theme: WeddingTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--theme-base', theme.base);
  root.style.setProperty('--theme-tint1', theme.tint1);
  root.style.setProperty('--theme-tint2', theme.tint2);
  root.style.setProperty('--theme-tint3', theme.tint3);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-gold-start', theme.goldStart);
  root.style.setProperty('--theme-gold-end', theme.goldEnd);
  root.style.setProperty('--theme-text', theme.text);
  root.style.setProperty('--theme-button', theme.button);
  root.style.setProperty('--theme-pattern-uri', getThemePatternDataUri(theme));
  root.style.setProperty('--theme-density-scale', String(getDensityScale(theme.density)));
  root.dataset.theme = theme.id;
  root.dataset.themeShape = theme.shape;
  root.dataset.themeButton = theme.buttonStyle;
  root.dataset.themeEntrance = theme.entrance;
  root.dataset.themeDensity = theme.density;
  root.dataset.themeOrnament = String(theme.ornamentLevel);
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme.base);
  }
  syncActiveThemeFont(theme);
}

/**
 * Returns the motion props (initial, whileInView, transition) for a section entrance
 * according to the active theme's `entrance` token.
 * Every motion uses only transform, opacity, filter, or clip-path—never horizontal x.
 */
export function getThemeEntranceMotion(
  theme: WeddingTheme,
  prefersReducedMotion = false,
  delay = 0
): {
  initial: Record<string, string | number>;
  whileInView: Record<string, string | number>;
  transition: Record<string, unknown>;
} {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1 },
      whileInView: { opacity: 1 },
      transition: { duration: 0.2, delay },
    };
  }

  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  switch (theme.entrance) {
    case 'dhol_pop':
      return {
        initial: { opacity: 1, scale: 0.98, y: 8 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        transition: {
          duration: 0.6,
          delay,
          type: 'spring',
          stiffness: 260,
          damping: 18,
        },
      };
    case 'calm_fade_expand':
      return {
        initial: { opacity: 1, y: 8, scale: 0.99 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.65, delay, ease: easeOut },
      };
    case 'unfold_blur':
      return {
        initial: { opacity: 1, scaleY: 0.98 },
        whileInView: { opacity: 1, scaleY: 1 },
        transition: { duration: 0.6, delay, ease: easeOut },
      };
    case 'curved_ellipse':
    case 'spin_in':
    case 'line_draw_fade':
    case 'wobble_stagger':
    case 'tiered_steps':
    case 'diamond_clip':
    case 'arch_rising':
    case 'kasavu_wipe':
    case 'arabesque_star':
    case 'arch_unfold':
    case 'slow_rise_light_bloom':
    case 'lotus_petal_bloom':
    case 'soft_fade_up':
    default:
      return {
        initial: { opacity: 1, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: easeOut },
      };
  }
}

export interface ThemeEventPalette {
  bgFrom: string;
  bgTo: string;
  accent: string;
  particleType: ThemeParticleType;
  swatchHexes: [string, string, string];
}

/**
 * Computes each of the 5 event blocks' gradient and accent colors by rotating through
 * `tint1`, `tint2`, `tint3`, and `accent` of the active theme.
 */
export function getThemeEventPalette(
  theme: WeddingTheme,
  eventIndex: number
): ThemeEventPalette {
  const softAccentTint = mixHexColors(theme.base, theme.accent, 0.28);
  const warmGoldTint = mixHexColors(theme.base, theme.goldEnd, 0.55);

  const rotations: Array<{
    bgFrom: string;
    bgTo: string;
    accent: string;
    particleType: ThemeParticleType;
    swatchHexes: [string, string, string];
  }> = [
    {
      bgFrom: mixHexColors(theme.base, theme.tint1, 0.55),
      bgTo: theme.tint1,
      accent: mixHexColors(theme.accent, theme.button, 0.35),
      particleType: theme.particleType,
      swatchHexes: [theme.tint1, theme.base, theme.accent],
    },
    {
      bgFrom: mixHexColors(theme.base, theme.tint2, 0.55),
      bgTo: theme.tint2,
      accent: theme.button,
      particleType: theme.id === 'sarson_subah' ? 'green_leaves' : theme.particleType,
      swatchHexes: [theme.tint2, theme.tint1, theme.button],
    },
    {
      bgFrom: mixHexColors(theme.base, theme.tint3, 0.6),
      bgTo: mixHexColors(theme.tint3, theme.tint1, 0.4),
      accent: mixHexColors(theme.button, theme.accent, 0.5),
      particleType:
        theme.id === 'bandhani_garba' || theme.id === 'sarson_subah'
          ? 'mirror_sparkles'
          : theme.particleType,
      swatchHexes: [theme.tint3, theme.accent, theme.button],
    },
    {
      bgFrom: mixHexColors(theme.base, softAccentTint, 0.65),
      bgTo: mixHexColors(softAccentTint, theme.tint1, 0.45),
      accent: theme.accent,
      particleType:
        theme.id === 'kesariya_gulab' ? 'rose_diya_sparks' : theme.particleType,
      swatchHexes: [theme.tint1, theme.accent, theme.button],
    },
    {
      bgFrom: warmGoldTint,
      bgTo: mixHexColors(theme.tint2, theme.goldEnd, 0.45),
      accent: theme.goldStart,
      particleType:
        theme.id === 'kasavu' ? 'jasmine_gold_shimmer' : theme.particleType,
      swatchHexes: [theme.goldEnd, theme.base, theme.goldStart],
    },
  ];

  const idx = ((eventIndex % rotations.length) + rotations.length) % rotations.length;
  return rotations[idx];
}

export interface ParticleVisualSpec {
  colors: string[];
  shape:
    | 'petal'
    | 'leaf'
    | 'sparkle'
    | 'rose'
    | 'dust'
    | 'mogra'
    | 'shiuli'
    | 'mango'
    | 'diya_rose'
    | 'jasmine_shimmer'
    | 'lotus';
  motionMode:
    | 'spin_fall'
    | 'rose_and_sparks_up'
    | 'float_up'
    | 'orbit_twinkle'
    | 'zigzag_fall'
    | 'leaf_sway_fall'
    | 'gentle_fall'
    | 'slow_rotate_fall'
    | 'shimmer_fall';
}

export function getParticleVisualSpec(
  particleType: ThemeParticleType,
  theme?: WeddingTheme
): ParticleVisualSpec {
  const base = theme?.base || '#FFF8EC';
  const accent = theme?.accent || '#D97C6C';
  const gold = theme?.goldStart || '#C99A4B';
  const tint1 = theme?.tint1 || '#F9D8BC';
  const tint2 = theme?.tint2 || '#CBD9C0';

  switch (particleType) {
    case 'marigold_petals':
      return {
        colors: ['#F2CF7E', '#E6A832', '#F7B538', base],
        shape: 'petal',
        motionMode: 'spin_fall',
      };
    case 'saffron_marigold_petals':
      return {
        colors: ['#E39A3B', '#FBE3B8', '#F5DC9C', '#FFF9EF'],
        shape: 'petal',
        motionMode: 'gentle_fall',
      };
    case 'rose_diya_sparks':
    case 'rose_marigold_petals':
      return {
        colors: ['#D2573F', '#F4B6C2', '#F7B538', '#FFD9A8'],
        shape: 'diya_rose',
        motionMode: 'rose_and_sparks_up',
      };
    case 'mogra_floating_up':
    case 'mogra_flowers':
      return {
        colors: ['#FFFDF9', '#F7E0A3', '#BFE0D6', '#FFF9EE'],
        shape: 'mogra',
        motionMode: 'float_up',
      };
    case 'mirror_sparkles':
      return {
        colors: ['#FFFDF7', '#F8D878', accent, gold],
        shape: 'sparkle',
        motionMode: 'orbit_twinkle',
      };
    case 'shiuli_zigzag':
    case 'shiuli_flowers':
      return {
        colors: ['#FFFDF7', '#D9463E', '#F89A5B', '#FAD4CE'],
        shape: 'shiuli',
        motionMode: 'zigzag_fall',
      };
    case 'mango_leaves':
      return {
        colors: ['#5E8C52', '#8FAE86', '#D9644A', '#F8DD9A'],
        shape: 'mango',
        motionMode: 'leaf_sway_fall',
      };
    case 'jasmine_petals':
      return {
        colors: ['#FFFDF7', '#F3E3A9', '#CFE3D2', base],
        shape: 'mogra',
        motionMode: 'gentle_fall',
      };
    case 'champa_petals':
      return {
        colors: ['#FFF8EA', '#F6E1A0', '#F2C166', '#EAD3B0'],
        shape: 'petal',
        motionMode: 'gentle_fall',
      };
    case 'jasmine_gold_shimmer':
      return {
        colors: ['#FFFDF5', '#F2DA8E', '#B8923F', '#F3EBCB'],
        shape: 'jasmine_shimmer',
        motionMode: 'shimmer_fall',
      };
    case 'rose_petals':
      return {
        colors: ['#C2413B', '#E8A598', '#B76E79', accent],
        shape: 'rose',
        motionMode: 'slow_rotate_fall',
      };
    case 'white_petals_olive':
      return {
        colors: ['#FFFDFA', '#7C9A82', '#E4EEE6', '#B5A27A'],
        shape: 'leaf',
        motionMode: 'leaf_sway_fall',
      };
    case 'lotus_petals_drift':
      return {
        colors: ['#FADCE6', '#C25B7A', '#FFF2CC', '#FFFCF7'],
        shape: 'lotus',
        motionMode: 'gentle_fall',
      };
    case 'soft_petals':
      return {
        colors: [tint1, tint2, '#F8D7DA', base],
        shape: 'petal',
        motionMode: 'gentle_fall',
      };
    case 'green_leaves':
      return {
        colors: ['#8FAE86', '#9A6B4A', '#CBD9C0', '#709267'],
        shape: 'leaf',
        motionMode: 'leaf_sway_fall',
      };
    case 'confetti_sparkles':
      return {
        colors: [accent, '#F2CF7E', tint1, base],
        shape: 'sparkle',
        motionMode: 'orbit_twinkle',
      };
    case 'gold_dust':
    default:
      return {
        colors: [gold, '#F1D58A', '#B8923F', base],
        shape: 'dust',
        motionMode: 'shimmer_fall',
      };
  }
}
