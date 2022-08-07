const constants = require('../../../constants')
exports.bmi_calculator = (weight, height) => {
    // chỉ số bmi là chi so beo phi
    const heightM = height / 100
    return weight / (heightM * heightM);
}
exports.bmr_calculator = (gender, weight, height, age) => {
    //Mifflin St Jeor
    /// weight (kg), height(cm), age(year)
    //chỉ số bmr được tính thông thông tin hiện tại của user
    if (gender == constants.Gender_male) {
        console.log(constants.Gender_male)
        const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
        return bmr;
    }
    console.log(constants.Gender_female)
    const bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    return bmr;
}
exports.tdee_calculator = (bmr, r) => {
    // chỉ số tdee là calories cần hấp thu với mức cân hiện tại của user
    return bmr * r;
}
exports.calories_target = (tdee, target) => {
    //tính được lượng calo cần hấp thụ theo mục tiêu dựa vào chỉ số tdee
    if (target == constants.Weight_gain) {
        console.log(constants.Weight_gain)
        return tdee + constants.calories_tdee_target
    }
    if (target == constants.Weight_loss) {
        console.log(constants.Weight_loss)
        return tdee - constants.calories_tdee_target
    }
    return tdee
}
exports.fat_value_gram = (tdee_weight_loss) => {
    // gram
    // tính fat cần hấp thu dựa theo tdee đã tính toán theo nhu cầu của user
    return (constants.Fat_percent * tdee_weight_loss) / 9;
}
exports.fat_value_calories = (tdee_weight_loss) => {
    // calories
    // tính fat cần hấp thu dựa theo tdee đã tính toán theo nhu cầu của user
    return (constants.Fat_percent * tdee_weight_loss);
}
exports.protein_value_gram = (weightTarget) => {
    // calories
    // tính lượng protein cần hấp thụ dựa theo vào số cân mục tiêu của user
    return weightTarget * 2.2;
}
exports.protein_value_calories = (weightTarget) => {
    // gram
    // tính lượng protein cần hấp thụ dựa theo vào số cân mục tiêu của user
    return (weightTarget * 2.2) * 4;
}
exports.carb_value_gram = (tdee_weight_loss, protein_calories, fat_calories) => {
    //gram
    // tính lượng card dựa vào chỉ số tdee đã tính toán theo nhu cầu của user và chỉ ố fat , protein
    let carb = tdee_weight_loss - (protein_calories + fat_calories);
    carb = carb / 4;
    return carb;
}

exports.carb_value_calories = (tdee_weight_loss, protein_calories, fat_calories) => {
    //calories
    // tính lượng card dựa vào chỉ số tdee đã tính toán theo nhu cầu của user và chỉ ố fat , protein
    let carb = tdee_weight_loss - (protein_calories + fat_calories);
    return carb;
}
exports.ideal_weight = (height) => {
    return (height - 100) * 0.9
}
exports.min_weight = (height) => {
    return (height - 100) * 0.8
}
exports.max_weight = (height) => {
    return height - 100
}
