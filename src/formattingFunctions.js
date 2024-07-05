export function formatMacroNutrients(foodData) {
    const { foodNutrients } = foodData;
    let nutrientsInfo = [];
    let data = [];

    const macrosList = ['Water', 'Ash', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Fiber, total dietary', 'Sugars, Total', 'Total Sugars', 'Sugars, added']

    if (foodNutrients) {
        for (let i of foodNutrients) {
            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;
            if (macrosList.includes(name)) {
                nutrientsInfo.push({ id, name, amount, unitName });
                data.push({ name, y: amount })

            }
        }
    }
    return data;
}



export function formatCarbsOrLipids(foodData, nutrientList) {
    const { foodNutrients } = foodData;
    let nutrientsInfo = [];

    if (foodNutrients) {
        for (let i of foodNutrients) {
            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;
            if (nutrientList.includes(name) && amount > 0) {
                nutrientsInfo.push({ id, name, amount, unitName });
            }
        }
    }

    const data = nutrientsInfo.map(i => {
        const { name, amount, unitName } = i;
        if (unitName === 'g') return { name, y: amount };
        if (unitName === 'mg') {
            return { name, y: i.amount * 0.001 }
        };
        if (unitName === 'µg') {
            return { name, y: i.amount * 0.000001 }
        }
    });
    console.log(data)
    return data;
}



export function formatAminos(foodData, nutrientList) {
    const { foodNutrients } = foodData;
    let nutrientsInfo = [];

    if (foodNutrients) {
        for (let i of foodNutrients) {
            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;
            if (nutrientList.includes(name) && amount > 0) {
                nutrientsInfo.push({ id, name, amount, unitName });
            }
        }
    }

    const data = nutrientsInfo.map(i => {
        const { name, amount, unitName } = i;
        if (unitName === 'mg') return { name, y: amount };
        if (unitName === 'g') {
            return { name, y: i.amount * 1000 }
        };
        if (unitName === 'µg') {
            return { name, y: i.amount * 0.001 }
        }
    });

    return data;
}


export function formatOtherNutrients(foodData, nutrientList) {
    const { foodNutrients } = foodData;
    let nutrientsInfo = [];


    if (foodNutrients) {

        for (let i of foodNutrients) {
            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;
            if (nutrientList.includes(name)) {
                nutrientsInfo.push({ id, name, amount, unitName });
            }
        }
    }

    
    const data = nutrientsInfo.map(i => {
        const { name, amount, unitName } = i;
        
        if (unitName === 'mg') return { name, y: amount };
        if (unitName === 'g') {
            return { name, y: i.amount * 1000 }
        };
        if (unitName === 'µg') {
            return { name, y: i.amount * 0.001 }
        }
        if (unitName === 'IU') {
            let converted = convertIntUnitsMg(i.name, i.amount);
            return converted;
        }

    });
   


    const categories = nutrientsInfo.map(i => i.name);
    
    function convertIntUnitsMg(name, amount) {
        if (name.includes('Vitamin E')) {
            return { name: 'd-alpha tocopherol (Vitamin E)', y: amount * 0.67 }
        }
        if (name.includes('Vitamin D')) {
            return { name: 'Vitamin D3', y: amount * 0.000025 }
        }
        if (name.includes('Vitamin A')) {
            return { name: 'Retinal Activity Equivalent Vitamin A', y: amount * 0.0003 }
        }
    }

    console.log(data)
    return { data, categories };
}


export function formatNutrientsForColumnChart(foodData, nutrientList) {
    if (foodData) {
        const categories = foodData.map(i => i.description);

        const series = nutrientList.map(targetNutrient => {
            let name = targetNutrient;
            let data = foodData.map(singleFoodData => {
                const {foodNutrients} = singleFoodData;
                let singleFoodAmount = foodNutrients.filter(i => {
                    if(i.nutrient.name === name){
                        
                        return i.amount
                    }
                })
                if(singleFoodAmount) {
                    return singleFoodAmount[0];
                } else {
                    return 0;
                }
            })
            return {name, data}
        })
        
    }
}


export const macros = ['Water', 'Ash', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Fiber, total dietary', 'Sugars, Total', 'Total Sugars', 'Sugars, added']


export const vitamins = [
    'Vitamin C, total ascorbic acid',
    'Thiamin',
    'Riboflavin',
    'Niacin',
    'Pantothenic acid',
    'Vitamin B-6',
    'Biotin',
    'Folate, total',
    'Folic acid',
    'Folate, food',
    'Folate, DFE',
    'Choline, total',
    'Choline, free',
    'Choline, from phosphocholine',
    'Choline, from phosphotidyl choline',
    'Choline, from glycerophosphocholine',
    'Choline, from sphingomyelin',
    'Betaine',
    'Vitamin B-12',
    'Vitamin B-12, added',
    'Vitamin A, RAE',
    'Retinol',
    'Carotene, beta',
    'cis-beta-Carotene',
    'trans-beta-Carotene',
    'Carotene, alpha',
    'Carotene, gamma',
    'Cryptoxanthin, beta',
    'Cryptoxanthin, alpha',
    'Vitamin A, IU',
    'Lycopene',
    'cis-Lycopene',
    'trans-Lycopene',
    'Lutein + zeaxanthin',
    'cis-Lutein/Zeaxanthin',
    'Lutein',
    'Zeaxanthin',
    'Phytoene',
    'Phytofluene',
    'Vitamin E (mcg_RE)',
    'Vitamin E (alpha-tocopherol)',
    'Vitamin E, added',
    'Tocopherol, beta',
    'Tocopherol, gamma',
    'Tocopherol, delta',
    'Tocotrienol, alpha',
    'Tocotrienol, beta',
    'Tocotrienol, gamma',
    'Tocotrienol, delta',
    'Vitamin D (D2 + D3), International Units',
    'Vitamin D (D2 + D3)',
    'Vitamin D2 (ergocalciferol)',
    'Vitamin D3 (cholecalciferol)',
    '25-hydroxycholecalciferol',
    'Vitamin D4',
    'Vitamin K (phylloquinone)',
    'Vitamin K (Dihydrophylloquinone)',
    'Vitamin K (Menaquinone-4)',
    'Vitamin E (label entry primarily)'

]

export const fibersAndSugars = [
    'Fiber, soluble',
    'Fiber, insoluble',
    'Fiber, total dietary', 
    'Sugars, Total',
    'Sugars, total including NLEA',
    'Total Sugars', 
    'Sugars, added',
    'High Molecular Weight Dietary Fiber (HMWDF)',
    'Low Molecular Weight Dietary Fiber (LMWDF)',
    'Beta-glucan',
    'Sucrose',
    'Glucose',
    'Fructose',
    'Lactose',
    'Maltose',
    'Galactose',
    'Starch',
    'Raffinose',
    'Stachyose',
    'Verbascose',
    'Sorbitol',
    'Xylitol',
    'Inositol',
    'Carbohydrate, other',
]

export const minerals = [
    'Calcium, Ca',
    'Iron, Fe',
    'Magnesium, Mg',
    'Phosphorus, P',
    'Potassium, K',
    'Sodium, Na',
    'Zinc, Zn',
    'Copper, Cu',
    'Manganese, Mn',
    'Iodine, I',
    'Selenium, Se',
    'Fluoride, F',
    'Sulfur, S',
    'Nickel, Ni',
    'Molybdenum, Mo',
    'Cobalt, Co',
    'Boron, B',
    'Chromium, Cr',
]

export const aminos = [
    'Ergothioneine',
    'Tryptophan',
    'Threonine',
    'Isoleucine',
    'Leucine',
    'Lysine',
    'Methionine',
    'Cystine',
    'Phenylalanine',
    'Tyrosine',
    'Valine',
    'Arginine',
    'Histidine',
    'Alanine',
    'Aspartic acid',
    'Glutamic acid',
    'Glycine',
    'Proline',
    'Serine',
    'Hydroxyproline',
    'Cysteine',
    'Glutamine',
    'Taurine',
    'Glutathione'
]

export const otherNutrients = [
    'Alcohol, ethyl',
    'Caffeine',
    'Theobromine',
    'Daidzein',
    'Genistein',
    'Daidzin',
    'Genistin',
    'Glycitin',
    'Epigallocatechin-3-gallate',
    'Ribose',
    'Total sugar alcohols',
    'Chlorine, Cl',
    '5-methyl tetrahydrofolate (5-MTHF)',
    '10-Formyl folic acid (10HCOFA)',
    ' 5-Formyltetrahydrofolic acid (5-HCOH4',
    'Phenolic acids, total',
    'Inulin',
    'Acetic acid',
    'Citric acid',
    'Lactic acid',
    'Malic acid',
    'Oxalic acid',
    'Pyruvic acid',
    'Quinic acid'
]

export const lipids = [
    'SFA 4:0',
    'SFA 5:0',
    'SFA 6:0',
    'SFA 7:0',
    'SFA 8:0',
    'SFA 9:0',
    'SFA 10:0',
    'SFA 11:0',
    'SFA 12:0',
    'SFA 13:0',
    'SFA 14:0',
    'SFA 15:0',
    'SFA 16:0',
    'SFA 17:0',
    'SFA 18:0',
    'SFA 20:0',
    'SFA 21:0',
    'SFA 22:0',
    'SFA 23:0',
    'SFA 24:0',
    'MUFA 12:1',
    'MUFA 14:1',
    'MUFA 14:1 c',
    'MUFA 15:1',
    'MUFA 16:1',
    'MUFA 16:1 c',
    'MUFA 17:1',
    'MUFA 17:1 c',
    'MUFA 18:1',
    'MUFA 18:1 c',
    'MUFA 18:1-11 t (18:1t n-7)',
    'MUFA 20:1',
    'MUFA 20:1 c',
    'MUFA 22:1',
    'MUFA 22:1 c',
    'MUFA 22:1 n-9',
    'MUFA 22:1 n-11',
    'MUFA 24:1 c',
    'PUFA 18:2',
    'PUFA 18:2 c',
    'PUFA 18:2 n-6 c,c',
    'PUFA 18:2 CLAs',
    'PUFA 18:2 i',
    'PUFA 18:3',
    'PUFA 18:3 c',
    'PUFA 18:3 n-3 c,c,c (ALA)',
    'PUFA 18:3 n-6 c,c,c',
    'PUFA 18:3i',
    'PUFA 18:4',
    'PUFA 20:2 c',
    'PUFA 20:2 n-6 c,c',
    'PUFA 20:3',
    'PUFA 20:3 c',
    'PUFA 20:3 n-3',
    'PUFA 20:3 n-6',
    'PUFA 20:3 n-9',
    'PUFA 22:3',
    'PUFA 20:4',
    'PUFA 20:4c',
    'PUFA 20:4 n-6',
    'PUFA 20:5c',
    'PUFA 20:5 n-3 (EPA)',
    'PUFA 22:2',
    'PUFA 21:5',
    'PUFA 22:5 c',
    'PUFA 22:4',
    'PUFA 22:5 n-3 (DPA)',
    'PUFA 22:6 c',
    'PUFA 22:6 n-3 (DHA)',
    'Fatty acids, total trans',
    'Fatty acids, total trans-monoenoic',
    'TFA 14:1 t',
    'TFA 16:1 t',
    'TFA 18:1 t',
    'TFA 20:1 t',
    'TFA 22:1 t',
    'Fatty acids, total trans-dienoic',
    'TFA 18:2 t not further defined',
    'TFA 18:2 t',
    'TFA 18:2 t,t',
    'Fatty acids, total trans-polyenoic',
    'TFA 18:3 t',
    'Cholesterol',
    'Phytosterols',
    'Stigmastadiene',
    'Stigmasterol',
    'Campesterol',
    'Brassicasterol',
    'Beta-sitosterol',
    'Ergosta-7-enol',
    'Ergosta-7,22-dienol',
    'Ergosta-5,7-dienol',
    'Ergosterol',
    'Campestanol',
    'Beta-sitostanol',
    'Delta-5-avenasterol',
    'Delta-7-Stigmastenol',
    'Phytosterols, other'
]