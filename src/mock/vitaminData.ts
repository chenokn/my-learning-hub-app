// Shared category/type data
export const vitaminCategories = {
  /* Vitamins */
  fatSoluble:        { key: 'fatSoluble',        label: 'Fat-Soluble Vitamin' },
  waterSoluble:      { key: 'waterSoluble',      label: 'Water-Soluble Vitamin' },

  /* Minerals */
  macroMineral:      { key: 'macroMineral',      label: 'Macro Mineral' },
  traceMineral:      { key: 'traceMineral',      label: 'Trace Mineral' },
  ultraTraceMineral: { key: 'ultraTraceMineral', label: 'Ultra-Trace Mineral' },
  toxicMineral:      { key: 'toxicMineral',      label: 'Toxic / Non-Essential Mineral' },

  /* Other nutrients */
  essentialFattyAcid:{ key: 'essentialFattyAcid',label: 'Essential Fatty Acid' }
};

export const foodGroupCategories = {
  fruits: { key: 'fruits', label: 'Fruits', icon: '🍎' },
  vegetables: { key: 'vegetables', label: 'Vegetables', icon: '🥕' },
  grains: { key: 'grains', label: 'Grains', icon: '🌾' },
  protein: { key: 'protein', label: 'Protein', icon: '🥩' },
  dairy: { key: 'dairy', label: 'Dairy', icon: '🥛' }
};

// Nutrients data – each object follows the full‑detail pattern used for Vitamin A
// Categories (vitaminCategories) are assumed to include
// fatSoluble, waterSoluble, macroMineral, traceMineral, ultraTraceMineral and toxicMineral
// Units: µg = micrograms, mg = milligrams, IU = International Units

export const vitamins = [
  /* --------------------------------- F A T  S O L U B L E --------------------------------- */
  {
    name: 'Vitamin A',
    symbol: 'A',
    color: 'bg-orange-200',
    category: vitaminCategories.fatSoluble.key,
    sources: ['Carrots', 'Sweet potatoes', 'Spinach', 'Mangoes', 'Pumpkin', 'Eggs', 'Liver'],
    benefits: ['Good vision', 'Healthy skin', 'Immune support', 'Cell growth'],
    deficiency: 'Night blindness, dry skin, poor immunity',
    dailyNeed: '900 µg RAE',
    icon: '/stem-hub/carrots.png',
    molecularFormula: 'C20H30O',
    vision: 'Essential for the formation of rhodopsin, a pigment in the retina that enables vision in low‑light conditions.',
    immuneSystem: 'Supports the production and function of white blood cells, enhancing the body\'s defence against infections.',
    cellGrowthAndDevelopment: 'Plays a key role in cell differentiation and growth, especially in epithelial tissues.',
    sourcesDetail: 'Animal sources (liver, eggs, dairy) provide pre‑formed vitamin A (retinol); plant sources (carrots, sweet potatoes, spinach) provide provitamin A carotenoids.',
    preformed: 'Retinol, found in animal products such as liver, fish oils, eggs and dairy.',
    provitamin: 'β‑carotene, α‑carotene and β‑cryptoxanthin found in colourful fruits and vegetables.',
    deficiencyDetail: 'Night blindness, xerophthalmia, increased susceptibility to infections, impaired growth and development.',
    toxicity: 'Hypervitaminosis A: headache, dizziness, nausea and potential liver damage with chronic excessive intake.',
    recommendedIntake: '900 µg (men), 700 µg (women) RAE per day.',
    antioxidantProperties: 'Carotenoids (especially β‑carotene) have antioxidant properties, helping neutralise free radicals.'
  },
  {
    name: 'Vitamin D',
    symbol: 'D',
    color: 'bg-yellow-500',
    category: vitaminCategories.fatSoluble.key,
    sources: ['Sunlight (UV‑B)', 'Salmon', 'Mackerel', 'Fortified milk', 'Egg yolk'],
    benefits: ['Calcium & phosphorus absorption', 'Bone & teeth health', 'Immune regulation'],
    deficiency: 'Rickets in children, osteomalacia in adults, bone pain, muscle weakness',
    dailyNeed: '15 µg (600 IU)',
    icon: '/stem-hub/sun.png',
    molecularFormula: 'C27H44O',
    boneHealth: 'Facilitates intestinal absorption of calcium and phosphorus, critical for normal mineralisation of bone and teeth.',
    immuneSystem: 'Modulates innate and adaptive immune responses, helping reduce susceptibility to infection.',
    sourcesDetail: 'Synthesised in skin on exposure to UV‑B rays; dietary sources include oily fish, cod‑liver oil, fortified dairy and egg yolks.',
    deficiencyDetail: 'Leads to defective bone mineralisation: rickets (children) or osteomalacia/osteoporosis (adults).',
    toxicity: 'Excess supplement (>100 µg · 4,000 IU/day) may cause hypercalcaemia, nausea, weakness and kidney damage.',
    recommendedIntake: '15 µg (600 IU) for adults; 20 µg (800 IU) if >70 y.',
    antioxidantProperties: 'Active form calcitriol exhibits antioxidant and anti‑inflammatory effects in some tissues.'
  },
  {
    name: 'Vitamin E',
    symbol: 'E',
    color: 'bg-green-300',
    category: vitaminCategories.fatSoluble.key,
    sources: ['Almonds', 'Sunflower seeds', 'Wheat‑germ oil', 'Spinach', 'Avocado'],
    benefits: ['Antioxidant', 'Cell‑membrane protection', 'Immune support'],
    deficiency: 'Peripheral neuropathy, muscle weakness (rare)',
    dailyNeed: '15 mg α‑TE',
    icon: '/stem-hub/spinach.png',
    molecularFormula: 'C29H50O2',
    antioxidantProperties: 'Neutralises lipid peroxyl radicals, protecting polyunsaturated fatty acids in cell membranes from oxidative damage.',
    sourcesDetail: 'Richest sources are plant oils (sunflower, wheat‑germ, safflower), nuts and seeds; green leafy vegetables provide smaller amounts.',
    deficiencyDetail: 'Fat‑malabsorption disorders may produce peripheral neuropathy, ataxia and retinopathy.',
    toxicity: 'Very high supplemental doses (>800 mg) may interfere with vitamin K‑dependent clotting and increase bleeding risk.',
    recommendedIntake: '15 mg α‑tocopherol (adults)',
    cellGrowthAndDevelopment: 'Maintains integrity of reproductive, muscular and nervous tissues.'
  },
  {
    name: 'Vitamin K',
    symbol: 'K',
    color: 'bg-green-400',
    category: vitaminCategories.fatSoluble.key,
    sources: ['Kale', 'Spinach', 'Broccoli', 'Brussels sprouts', 'Fermented soy (natto)'],
    benefits: ['Blood‑clotting factor synthesis', 'Bone metabolism'],
    deficiency: 'Easy bruising, excessive bleeding, impaired bone density',
    dailyNeed: '120 µg',
    icon: '/stem-hub/kale.png',
    molecularFormula: 'C31H46O2',
    bloodClotting: 'Serves as a co‑factor for γ‑carboxylation of glutamic acid residues in clotting factors II, VII, IX & X.',
    boneHealth: 'Activates osteocalcin, a protein essential for binding calcium to bone matrix.',
    sourcesDetail: 'Most leafy greens are rich in phylloquinone (K1); intestinal bacteria produce some menaquinones (K2).',
    deficiencyDetail: 'Rare in adults but may occur with malabsorption or prolonged antibiotic use; newborns receive prophylactic K injection.',
    recommendedIntake: '120 µg (men), 90 µg (women)'
  },

  /* -------------------------- W A T E R  S O L U B L E — B  V I T A M I N S -------------------------- */
  {
    name: 'Vitamin B1 (Thiamine)',
    symbol: 'B1',
    color: 'bg-yellow-200',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Pork', 'Whole grains', 'Legumes', 'Nuts', 'Seeds'],
    benefits: ['Carbohydrate metabolism (TPP co‑enzyme)', 'Nerve function'],
    deficiency: 'Beriberi (fatigue, neuropathy) or Wernicke–Korsakoff syndrome',
    dailyNeed: '1.2 mg',
    icon: '/stem-hub/grain.png',
    molecularFormula: 'C12H17N4OS+',
    energyMetabolism: 'As thiamine pyrophosphate (TPP) it is a co‑enzyme for decarboxylation of pyruvate and α‑ketoglutarate in the Krebs cycle.',
    nerveFunction: 'Involved in synthesis of neurotransmitters and conduction of nerve signals.',
    deficiencyDetail: 'Dry beriberi (peripheral neuropathy), wet beriberi (cardiac failure) or Wernicke encephalopathy (confusion, ataxia, nystagmus).',
    recommendedIntake: '1.2 mg (men), 1.1 mg (women)'
  },
  {
    name: 'Vitamin B2 (Riboflavin)',
    symbol: 'B2',
    color: 'bg-yellow-100',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Milk', 'Eggs', 'Lean meat', 'Green vegetables', 'Fortified cereals'],
    benefits: ['Energy production (FAD/FMN)', 'Skin and eye health'],
    deficiency: 'Ariboflavinosis: angular cheilitis, glossitis, sore throat',
    dailyNeed: '1.3 mg',
    icon: '/stem-hub/milk.png',
    molecularFormula: 'C17H20N4O6',
    energyMetabolism: 'Component of flavin co‑enzymes FMN and FAD involved in redox reactions.',
    deficiencyDetail: 'Lesions at mouth corners, magenta tongue, seborrhoeic dermatitis, photosensitivity.',
    recommendedIntake: '1.3 mg (men), 1.1 mg (women)'
  },
  {
    name: 'Vitamin B3 (Niacin)',
    symbol: 'B3',
    color: 'bg-yellow-300',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Chicken', 'Tuna', 'Whole grains', 'Peanuts', 'Legumes'],
    benefits: ['Energy metabolism (NAD/NADP)', 'Skin & nerve health'],
    deficiency: 'Pellagra: dermatitis, diarrhoea, dementia',
    dailyNeed: '16 mg NE',
    icon: '/stem-hub/chicken.png',
    molecularFormula: 'C6H5NO2',
    energyMetabolism: 'Part of the co‑enzymes NAD and NADP that transfer hydrogen in metabolic reactions.',
    deficiencyDetail: '4 Ds of pellagra: dermatitis, diarrhoea, dementia and, if untreated, death.',
    toxicity: 'Pharmacological doses (>35 mg) may cause flushing, liver toxicity.',
    recommendedIntake: '16 mg NE (men), 14 mg NE (women)'
  },
  {
    name: 'Vitamin B5 (Pantothenic acid)',
    symbol: 'B5',
    color: 'bg-yellow-50',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Beef liver', 'Sunflower seeds', 'Avocado', 'Broccoli', 'Chicken'],
    benefits: ['CoA synthesis', 'Hormone & cholesterol production'],
    deficiency: 'Fatigue, numbness, paraesthesia (rare)',
    dailyNeed: '5 mg',
    icon: '/stem-hub/avocado.png',
    molecularFormula: 'C9H17NO5',
    energyMetabolism: 'Integral part of co‑enzyme A and acyl carrier protein for fatty‑acid metabolism.',
    deficiencyDetail: 'Burning‑feet syndrome, gastrointestinal distress.',
    recommendedIntake: '5 mg (adults)'
  },
  {
    name: 'Vitamin B6 (Pyridoxine)',
    symbol: 'B6',
    color: 'bg-yellow-400',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Bananas', 'Poultry', 'Fish', 'Potatoes', 'Chickpeas'],
    benefits: ['Amino‑acid metabolism (PLP)', 'Neurotransmitter synthesis'],
    deficiency: 'Microcytic anaemia, depression, confusion',
    dailyNeed: '1.3 mg',
    icon: '/stem-hub/banana.png',
    molecularFormula: 'C8H11NO3',
    proteinMetabolism: 'Pyridoxal‑5′‑phosphate (PLP) is a co‑enzyme for transamination and decarboxylation of amino acids.',
    deficiencyDetail: 'Dermatitis, cheilosis, glossitis, peripheral neuropathy.',
    toxicity: 'Chronic high doses (>100 mg/day) may cause sensory neuropathy.',
    recommendedIntake: '1.3 mg (adults 19–50 y); 1.7 mg (men >50 y); 1.5 mg (women >50 y)'
  },
  {
    name: 'Vitamin B7 (Biotin)',
    symbol: 'B7',
    color: 'bg-yellow-200',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Egg yolk', 'Nuts', 'Soybeans', 'Whole grains'],
    benefits: ['Carbohydrate & fat metabolism', 'Hair & skin health'],
    deficiency: 'Hair loss, dermatitis, conjunctivitis',
    dailyNeed: '30 µg',
    icon: '/stem-hub/peanut.png',
    molecularFormula: 'C10H16N2O3S',
    energyMetabolism: 'Functions as a co‑enzyme for carboxylase enzymes involved in gluconeogenesis and fatty‑acid synthesis.',
    deficiencyDetail: 'Rare; raw egg‑white (avidin) consumption can induce deficiency symptoms.',
    recommendedIntake: '30 µg (AI)'
  },
  {
    name: 'Vitamin B9 (Folate)',
    symbol: 'B9',
    color: 'bg-green-200',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Leafy greens', 'Beans', 'Citrus fruit', 'Fortified grains'],
    benefits: ['DNA & RNA synthesis', 'Cell division', 'Prevents neural‑tube defects'],
    deficiency: 'Megaloblastic anaemia, elevated homocysteine, birth‑defect risk',
    dailyNeed: '400 µg DFE',
    icon: '/stem-hub/beans.png',
    molecularFormula: 'C19H19N7O6',
    cellGrowthAndDevelopment: 'Critical for methylation reactions and rapid cell division (e.g. pregnancy, infancy).',
    deficiencyDetail: 'Megaloblastic anaemia, glossitis, impaired immune function; in pregnancy increases neural‑tube‑defect risk.',
    toxicity: 'Excess (>1000 µg) may mask vitamin B12 deficiency.',
    recommendedIntake: '400 µg DFE (adults); 600 µg DFE (pregnancy)'
  },
  {
    name: 'Vitamin B12 (Cobalamin)',
    symbol: 'B12',
    color: 'bg-blue-200',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Meat', 'Fish', 'Dairy', 'Eggs', 'Fortified cereal'],
    benefits: ['Nerve‑cell maintenance', 'Red‑blood‑cell formation', 'DNA synthesis'],
    deficiency: 'Pernicious anaemia, neuropathy, cognitive decline',
    dailyNeed: '2.4 µg',
    icon: '/stem-hub/meat.png',
    molecularFormula: 'C63H88CoN14O14P',
    nerveFunction: 'Maintains myelin sheath and normal neurological function.',
    deficiencyDetail: 'Megaloblastic anaemia, tingling extremities, memory loss; risk rises with vegan diet or malabsorption.',
    recommendedIntake: '2.4 µg (adults)'
  },
  {
    name: 'Vitamin C (Ascorbic acid)',
    symbol: 'C',
    color: 'bg-orange-300',
    category: vitaminCategories.waterSoluble.key,
    sources: ['Oranges', 'Kiwifruit', 'Strawberries', 'Bell peppers', 'Broccoli'],
    benefits: ['Collagen synthesis', 'Antioxidant', 'Immune defence', 'Iron absorption'],
    deficiency: 'Scurvy: bleeding gums, petechiae, fatigue',
    dailyNeed: '90 mg',
    icon: '/stem-hub/orange.png',
    molecularFormula: 'C6H8O6',
    collagenSynthesis: 'Required for hydroxylation of proline and lysine residues, stabilising collagen triple helix.',
    antioxidantProperties: 'Scavenges reactive oxygen species and regenerates other antioxidants (e.g. vitamin E).',
    deficiencyDetail: 'Impaired wound healing, swollen gums, cork‑screw hairs, anaemia.',
    toxicity: 'Large doses (>2 g) may cause gastrointestinal upset and increase risk of kidney stones.',
    recommendedIntake: '90 mg (men), 75 mg (women)'
  },

  /* -------------------------------- M A C R O  M I N E R A L S -------------------------------- */
  {
    name: 'Calcium',
    symbol: 'Ca',
    color: 'bg-blue-200',
    category: vitaminCategories.macroMineral.key,
    sources: ['Dairy', 'Firm tofu', 'Kale', 'Sardines'],
    benefits: ['Bone & teeth strength', 'Muscle contraction', 'Nerve signalling'],
    deficiency: 'Osteoporosis, rickets, muscle cramps',
    dailyNeed: '1000 mg',
    icon: '/stem-hub/milk.png',
    molecularFormula: 'Ca'
  },
  {
    name: 'Phosphorus',
    symbol: 'P',
    color: 'bg-purple-200',
    category: vitaminCategories.macroMineral.key,
    sources: ['Meat', 'Dairy', 'Legumes', 'Nuts'],
    benefits: ['Bone & tooth formation', 'Energy (ATP) production', 'Acid‑base balance'],
    deficiency: 'Weakness, bone pain (rare)',
    dailyNeed: '700 mg',
    icon: '/stem-hub/steak.png',
    molecularFormula: 'P'
  },
  {
    name: 'Magnesium',
    symbol: 'Mg',
    color: 'bg-purple-300',
    category: vitaminCategories.macroMineral.key,
    sources: ['Pumpkin seeds', 'Spinach', 'Whole grains', 'Almonds'],
    benefits: ['Enzyme cofactor (>300 reactions)', 'Muscle & nerve function'],
    deficiency: 'Muscle cramps, tremors, arrhythmia',
    dailyNeed: '420 mg',
    icon: '/stem-hub/almonds.png',
    molecularFormula: 'Mg'
  },
  {
    name: 'Sodium',
    symbol: 'Na',
    color: 'bg-gray-200',
    category: vitaminCategories.macroMineral.key,
    sources: ['Table salt', 'Processed foods'],
    benefits: ['Fluid & electrolyte balance', 'Nerve impulse transmission'],
    deficiency: 'Hyponatraemia: headache, nausea, seizures',
    dailyNeed: '1500 mg',
    icon: '/stem-hub/salt.png',
    molecularFormula: 'Na'
  },
  {
    name: 'Potassium',
    symbol: 'K',
    color: 'bg-yellow-200',
    category: vitaminCategories.macroMineral.key,
    sources: ['Bananas', 'Beans', 'Potatoes', 'Spinach'],
    benefits: ['Heart rhythm', 'Muscle contraction', 'Nerve conduction'],
    deficiency: 'Weakness, arrhythmia',
    dailyNeed: '3400 mg',
    icon: '/stem-hub/sweet-potato.png',
    molecularFormula: 'K'
  },
  {
    name: 'Chloride',
    symbol: 'Cl',
    color: 'bg-gray-300',
    category: vitaminCategories.macroMineral.key,
    sources: ['Table salt', 'Seaweed', 'Olives'],
    benefits: ['Stomach acid (HCl)', 'Fluid balance'],
    deficiency: 'Rare; possible metabolic alkalosis',
    dailyNeed: '2300 mg',
    icon: '/stem-hub/seaweed.png',
    molecularFormula: 'Cl−'
  },
  {
    name: 'Sulfur',
    symbol: 'S',
    color: 'bg-yellow-300',
    category: vitaminCategories.macroMineral.key,
    sources: ['Protein foods', 'Garlic', 'Onions'],
    benefits: ['Component of amino acids & vitamins', 'Detoxification pathways'],
    deficiency: 'Extremely rare (adequate protein covers needs)',
    dailyNeed: 'From dietary protein',
    icon: '/stem-hub/sulfur.png',
    molecularFormula: 'S'
  },

  /* -------------------------------- T R A C E  M I N E R A L S -------------------------------- */
  {
    name: 'Iron',
    symbol: 'Fe',
    color: 'bg-red-200',
    category: vitaminCategories.traceMineral.key,
    sources: ['Lean red meat', 'Lentils', 'Spinach', 'Fortified cereal'],
    benefits: ['Haemoglobin & myoglobin — oxygen transport'],
    deficiency: 'Microcytic anaemia, fatigue',
    dailyNeed: '18 mg',
    icon: '/stem-hub/lamb.png',
    molecularFormula: 'Fe'
  },
  {
    name: 'Zinc',
    symbol: 'Zn',
    color: 'bg-blue-300',
    category: vitaminCategories.traceMineral.key,
    sources: ['Beef', 'Pumpkin seeds', 'Chickpeas'],
    benefits: ['Immune function', 'Wound healing', 'DNA synthesis'],
    deficiency: 'Poor healing, hair loss',
    dailyNeed: '11 mg',
    icon: '/stem-hub/pumpkin-seeds.png',
    molecularFormula: 'Zn'
  },
  {
    name: 'Copper',
    symbol: 'Cu',
    color: 'bg-teal-200',
    category: vitaminCategories.traceMineral.key,
    sources: ['Shellfish', 'Cashews', 'Sesame seeds'],
    benefits: ['Iron metabolism', 'Antioxidant enzyme cofactor'],
    deficiency: 'Anaemia, osteoporosis (rare)',
    dailyNeed: '0.9 mg',
    icon: '/stem-hub/shrimp.png',
    molecularFormula: 'Cu'
  },
  {
    name: 'Manganese',
    symbol: 'Mn',
    color: 'bg-pink-200',
    category: vitaminCategories.traceMineral.key,
    sources: ['Whole grains', 'Pecans', 'Tea'],
    benefits: ['Bone formation', 'Carbohydrate & fat metabolism'],
    deficiency: 'Rare; impaired growth or reproductive function',
    dailyNeed: '2.3 mg',
    icon: '/stem-hub/nut.png',
    molecularFormula: 'Mn'
  },
  {
    name: 'Iodine',
    symbol: 'I',
    color: 'bg-indigo-200',
    category: vitaminCategories.traceMineral.key,
    sources: ['Iodised salt', 'Seaweed', 'Fish'],
    benefits: ['Thyroid hormone (T3, T4) production'],
    deficiency: 'Goitre, hypothyroidism',
    dailyNeed: '150 µg',
    icon: '/stem-hub/seaweed.png',
    molecularFormula: 'I'
  },
  {
    name: 'Selenium',
    symbol: 'Se',
    color: 'bg-orange-200',
    category: vitaminCategories.traceMineral.key,
    sources: ['Brazil nuts', 'Seafood', 'Whole grains'],
    benefits: ['Antioxidant defence (GPx)', 'Thyroid hormone activation'],
    deficiency: 'Keshan disease (cardiomyopathy), weak immunity',
    dailyNeed: '55 µg',
    icon: '/stem-hub/whole-grains.png',
    molecularFormula: 'Se'
  },
  {
    name: 'Chromium',
    symbol: 'Cr',
    color: 'bg-gray-400',
    category: vitaminCategories.traceMineral.key,
    sources: ['Broccoli', 'Whole grains', 'Nuts'],
    benefits: ['Blood‑sugar regulation (insulin potentiation)'],
    deficiency: 'Impaired glucose tolerance (rare)',
    dailyNeed: '35 µg',
    icon: '/stem-hub/broccoli.png',
    molecularFormula: 'Cr'
  },
  {
    name: 'Molybdenum',
    symbol: 'Mo',
    color: 'bg-purple-400',
    category: vitaminCategories.traceMineral.key,
    sources: ['Legumes', 'Nuts', 'Whole grains'],
    benefits: ['Enzyme cofactor (xanthine oxidase, sulfite oxidase)'],
    deficiency: 'Extremely rare; metabolic issues',
    dailyNeed: '45 µg',
    icon: '/stem-hub/bean.png',
    molecularFormula: 'Mo'
  },
  {
    name: 'Fluoride',
    symbol: 'F',
    color: 'bg-cyan-200',
    category: vitaminCategories.traceMineral.key,
    sources: ['Fluoridated water', 'Tea'],
    benefits: ['Tooth enamel remineralisation', 'Bone health'],
    deficiency: 'Dental caries',
    dailyNeed: '4 mg',
    icon: '/stem-hub/fluoridated-water.png',
    molecularFormula: 'F−'
  },
];


export const foodGroups = [
  {
    category: foodGroupCategories.fruits.key,
    examples: ['Apples', 'Bananas'],
    vitamins: ['Vitamin C', 'Vitamin A', 'Folate']
  },
  {
    category: foodGroupCategories.vegetables.key,
    examples: ['Carrots', 'Broccoli', 'Spinach', 'Bell peppers'],
    vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin K', 'Folate']
  },
  // ... (repeat for all food groups, using category keys)
]; 