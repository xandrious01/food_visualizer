export function formatMacroNutrients(foodData) {
    const { foodNutrients } = foodData;

    let macrosInfo = [];
    let data = [];

    const macrosList = ['Water', 'Ash', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Fiber, total dietary', 'Total Sugars'];


    if (foodNutrients) {
        for (let i of foodNutrients) {
            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;
            if (macrosList.includes(name)) {
                macrosInfo.push({ id, name, amount, unitName });
                data.push({ name, y: amount })
            }
        }
    }
    return data;
}

export function formatMicroNutrients(foodData) {
    const { foodNutrients } = foodData;

    const nutrientsToExclude = ['Water', 'Ash', 'Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Fiber, total dietary', 'Total Sugars', 'Sugars, total including NLEA', 'Proximates', 'Energy', 'Fatty acids, total saturated', 'Fatty acids, total monounsaturated', 'Fatty acids, total polyunsaturated'];

    let microsInfo = [];

    if (foodNutrients) {
        for (let i of foodNutrients) {
            let { nutrient, amount } = i;
            let { id, name, unitName } = nutrient;
            if (!nutrientsToExclude.includes(name) && amount > 0) {
                microsInfo.push({ id, name, amount, unitName });
            }
        }
    }

    const data = microsInfo.map(i => {
        const { name, amount, unitName } = i;
        if (unitName === 'mg') return {name, y: amount};
        if (unitName === 'g') {
            return { name, y: i.amount*1000}
        };
        if (unitName === 'µg') {
            return { name, y: i.amount/1000}
        };
        if(unitName === 'IU'){
            console.log(i);
            throw "nutrient in International Units found";

        }
    });

    console.log(data);
    return data;
}
