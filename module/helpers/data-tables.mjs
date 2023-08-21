//----distance-------------------
const distance_meters_values = [
    0.15,
    0.50,
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    125,
    250,
    500,
    1000,
    2000,
    4000,
    8000,
    16000,
    32000,
    64000,
    125000,
    250000,
    500000,
    1000000,
    2000000,
    4000000,
    8000000,
    16000000,
    32000000,
    64000000,
    125000000,
    250000000,
    500000000,
    1000000000,
    2000000000,
    4000000000,
    8000000000
];
const distance_meters_display = [
    "15 cm",
    "50 cm",
    "1 m",
    "2 m",
    "4 m",
    "8 m",
    "16 m",
    "32 m",
    "64 m",
    "125 m",
    "250 m",
    "500 m",
    "1 km",
    "2 km",
    "4 km",
    "8 km",
    "16 km",
    "32 km",
    "64 km",
    "125 km",
    "250 km",
    "500 km",
    "1,000 km",
    "2,000 km",
    "4,000 km",
    "8,000 km",
    "16,000 km",
    "32,000 km",
    "64,000 km",
    "125,000 km",
    "250,000 km",
    "500,000 km",
    "1 million km",
    "2 million km",
    "4 million km",
    "8 million km"
];
const distance_miles_values = [
    0.5,
    1,
    3,
    6,
    15,
    30,
    60,
    120,
    250,
    500,
    900,
    1800,
    2640,
    5280,
    10560,
    21120,
    42240,
    84480,
    158400,
    316800,
    633600,
    1320000,
    2640000,
    5280000,
    10560000,
    21120000,
    42240000,
    84480000,
    168960000,
    337920000,
    660000000,
    1320000000,
    2640000000,
    5280000000,
    10560000000,
    21120000000,
];
const distance_miles_display = [
    "6 inches",
    "1 foot",
    "3 feet",
    "6 feet",
    "15 feet",
    "30 feet",
    "60 feet",
    "120 feet",
    "250 feet",
    "500 feet",
    "900 feet",
    "1,800 feet",
    "1/2 mile",
    "1 mile",
    "2 miles",
    "4 miles",
    "8 miles",
    "16 miles",
    "30 miles",
    "60 miles",
    "120 miles",
    "250 miles",
    "500 miles",
    "1,000 miles",
    "2,000 miles",
    "4,000 miles",
    "8,000 miles",
    "16,000 miles",
    "32,000 miles",
    "64,000 miles",
    "125,000 miles",
    "250,000 miles",
    "500,000 miles",
    "1 million miles",
    "2 million miles",
    "4 million miles"
];
//----mass----------------------
const mass_pounds_values = [
    1.5,
    3,
    6,
    12,
    25,
    50,
    100,
    200,
    400,
    800,
    1600,
    3200,
    6000,
    12000,
    24000,
    50000,
    100000,
    200000,
    400000,
    800000,
    1600000,
    3200000,
    6400000,
    12000000,
    24000000,
    50000000,
    100000000,
    200000000,
    400000000,
    800000000,
    1600000000,
    3200000000,
    6400000000,
    12800000000,
    25000000000,
    50000000000,
];
const mass_pounds_display = [
    "1.5 lb.",
    "3 lbs.",
    "6 lbs.",
    "12 lbs.",
    "25 lbs.",
    "50 lbs.",
    "100 lbs.",
    "200 lbs.",
    "400 lbs.",
    "800 lbs.",
    "1,600 lbs.",
    "3,200 lbs.",
    "3 tons",
    "6 tons",
    "12 tons",
    "25 tons",
    "50 tons",
    "100 tons",
    "200 tons",
    "400 tons",
    "800 tons",
    "1,600 tons",
    "3.2 ktons",
    "6 ktons",
    "12 ktons",
    "25 ktons",
    "50 ktons",
    "100 ktons",
    "200 ktons",
    "400 ktons",
    "800 ktons",
    "1,600 ktons",
    "3,200 ktons",
    "6,400 ktons",
    "12,500 ktons",
    "25,000 ktons"
];
const mass_kilograms_values = [
    0.75,
    1.5,
    3,
    6,
    12,
    24,
    50,
    100,
    200,
    400,
    800,
    1600,
    3200,
    6000,
    12000,
    25000,
    50000,
    100000,
    200000,
    400000,
    800000,
    1600000,
    3200000,
    6000000,
    1200000,
    2500000,
    5000000,
    10000000,
    20000000,
    40000000,
    80000000,
    160000000,
    320000000,
    640000000,
    1250000000,
    2500000000
];
const mass_kilograms_display = [
    "750 grams",
    "1.5 kg",
    "3 kg",
    "6 kg",
    "12 kg",
    "24 kg",
    "50 kg",
    "100 kg",
    "200 kg",
    "400 kg",
    "800 kg",
    "1600 kg",
    "3.2 kg",
    "6 tons",
    "12 tons",
    "25 tons",
    "50 tons",
    "100 tons",
    "200 tons",
    "400 tons",
    "800 tons",
    "1,600 tons",
    "3.2 ktons",
    "6 ktons",
    "12 ktons",
    "25 ktons",
    "50 ktons",
    "100 ktons",
    "200 ktons",
    "400 ktons",
    "800 ktons",
    "1,600 ktons",
    "3,200 ktons",
    "6,400 ktons",
    "12,500 ktons",
    "25,000 ktons"
];
//----time----------------------
const time_display = [
    "1/8 second",
    "1/4 second",
    "1/2 second",
    "1 second",
    "3 seconds",
    "6 seconds",
    "12 seconds",
    "30 seconds",
    "1 minute",
    "2 minutes",
    "4 minutes",
    "8 minutes",
    "15 minutes",
    "30 minutes",
    "1 hour",
    "2 hours",
    "4 hours",
    "8 hours",
    "16 hours",
    "1 day",
    "2 days",
    "4 days",
    "1 week",
    "2 weeks",
    "1 month",
    "2 months",
    "4 months",
    "8 months",
    "1.5 years",
    "3 years",
    "6 years",
    "12 years",
    "25 years",
    "50 years",
    "100 years",
    "200 years"
];
const time_value = [
    0.125,
    0.25,
    0.5,
    1,
    3,
    6,
    12,
    30,
    60,
    120,
    240,
    480,
    900,
    1800,
    3600,
    7200,
    14400,
    28800,
    57600,
];
//----volume----------------------
const volume_cft_display = [
    "1/32 cft.",
    "1/16 cft.",
    "1/8 cft.",
    "1/4 cft.",
    "1/2 cft.",
    "1 cft.",
    "2 cft.",
    "4 cft.",
    "8 cft.",
    "15 cft.",
    "30 cft.",
    "60 cft.",
    "125 cft.",
    "250 cft.",
    "500 cft.",
    "1,000 cft.",
    "2,000 cft.",
    "4,000 cft.",
    "8,000 cft.",
    "15,000 cft.",
    "32,000 cft.",
    "65,000 cft.",
    "125,000 cft.",
    "250,000 cft.",
    "500,000 cft.",
    "1 million cft.",
    "2 million cft.",
    "4 million cft.",
    "8 million cft.",
    "15 million cft.",
    "32 million cft.",
    "65 million cft.",
    "125 million cft.",
    "250 million cft.",
    "500 million cft.",
    "1 billion cft."
];
const volume_m3_display = [
    "0.0008 m³",
    "0.0017 m³",
    "0.0035 m³",
    "0.007 m³",
    "0.014 m³",
    "0.025 m³",
    "0.05 m³",
    "0.1 m³",
    "0.2 m³",
    "0.4 m³",
    "0.8 m³",
    "1.7 m³",
    "3.5 m³",
    "7 m³",
    "15 m³",
    "30 m³",
    "60 m³",
    "120 m³",
    "250 m³",
    "500 m³",
    "1,000 m³",
    "2,000 m³",
    "4,000 m³",
    "8,000 m³",
    "15,000 m³",
    "30,000 m³",
    "60,000 m³",
    "120,000 m³",
    "250,000 m³",
    "500,000 m³",
    "1 million m³",
    "2 million m³",
    "4 million m³",
    "8 million m³",
    "15 million m³",
    "30 million m³"
];

var distance_values = distance_miles_values;
var distance_display = distance_miles_display;
var mass_values = mass_pounds_values;
var mass_display = mass_pounds_display;
var volume_display = volume_cft_display;
var scale_array=  
{
    "distance": distance_values,
    "distancedisplay": distance_display,
    "mass": mass_values,
    "massdisplay": mass_display,
    "volume": volume_display,
    "time": time_display,
};

export function SetGameValues(value)
{
    if (value == "meters")
    {
        distance_values = distance_meters_values;
        distance_display = distance_meters_display;
        mass_values = mass_kilograms_values;
        mass_display = mass_kilograms_display;
        volume_display = volume_m3_display;
    }
    else
    {
        distance_values = distance_miles_values;
        distance_display = distance_miles_display;
        mass_values = mass_pounds_values;
        mass_display = mass_pounds_display;
        volume_display = volume_cft_display;
    }
    scale_array = 
    {
        "distance": distance_values,
        "distancedisplay": distance_display,
        "mass": mass_values,
        "massdisplay": mass_display,
        "volume": volume_display,
        "time": time_display,
    }
}

/**
 * a
 * @param {int} value Rank to return. Rank 1 value for Time = 6 second
 * @param {string} type Type of list to get. `distance`, `distancedisplay`, `mass`, `massdisplay`, `volume`, `time`
 * @returns Int or String.
 */
export function GetScale(value, type){
    if (type != null)
    {
        var scale = scale_array[type]
        var returnvalue = 0;
        if (value >= 0 && value <= 35)
        {
            returnvalue = scale[value+5];
        } 
        else if (value > 35)
        {
            returnvalue = GetOverLimit(scale, value);
        }
        else if (value < 0)
        {
            returnvalue = GetUnderLimit(scale, value);
        }
        return returnvalue;
    }
}

function GetOverLimit(array, maxValue){
    var value = array[35]
    for (let i = 35; i < maxValue; i++){
        value *= 2;
    }
    return value;
}

function GetUnderLimit(array, minValue){
    var value = array[0]
    for (let i = 0; i > minValue; i--){
        value /= 2;
    }
    return value;
}