function ConvertHandler() {
  const splitToNumberAndUnit = (input) => {
    let left = "";
    let right = "";
  
    for (const char of input) {
      if ((char >= 0 && char <= 9) || (char == ".") || (char == "/")) {
        if (!right) {
          left += char;
        }
      } else {
        right += char;
      }
    }
  
    if (left=="") {
      left = "1";
    }

    // count number of "/"
    let count = 0;
    for (const char of left) {
      if (char == "/") {
        count += 1;
      }
    }
  
    if (count > 1) {
      return [undefined, right]
    }
  
    // convert "/" to decimal
    let top = "";
    let bot = "";
    let onLeftSide = true;
    for (const char of left) {
      if (char == "/") {
        onLeftSide = false;
      } else {
        if (onLeftSide) {
          top += char;
        } else {
          bot += char;
        }
      }
    }
    
    if (bot) {
      left = Number(top / bot);
    } else {
      left = Number(top);
    }
    return [left, right];
  }

  this.getNum = function(input) {
    const result = splitToNumberAndUnit(input)[0];

    return result;
  };
  
  this.getUnit = function(input) {
    const result = splitToNumberAndUnit(input)[1].toLowerCase();

    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!units.includes(result)) {
      return undefined;
    }
    
    if (result == "l") {
      return "L";
    } else {
      return result;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    const returnUnits = {};
    returnUnits['gal'] = 'L';
    returnUnits['l'] = 'gal';
    returnUnits['mi'] = 'km';
    returnUnits['km'] = 'mi';
    returnUnits['lbs'] = 'kg';
    returnUnits['kg'] = 'lbs';

    result = returnUnits[initUnit.toLowerCase()];

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    const spellUnits = {};
    spellUnits['gal'] = 'gallons';
    spellUnits['l'] = 'liters';
    spellUnits['mi'] = 'miles';
    spellUnits['km'] = 'kilometers';
    spellUnits['lbs'] = 'pounds';
    spellUnits['kg'] = 'kilograms';

    result = spellUnits[unit.toLowerCase()];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const convertUnits = {};
    convertUnits['gal'] = galToL;
    convertUnits['l'] = 1 / galToL;
    convertUnits['mi'] = miToKm;
    convertUnits['km'] = 1 / miToKm;
    convertUnits['lbs'] = lbsToKg;
    convertUnits['kg'] = 1 / lbsToKg;

    const coef = convertUnits[initUnit.toLowerCase()];
    if (coef) {
      return Math.round(100000*initNum * coef) / 100000;
    } else {
      return undefined;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

// ===================================================
// let convertHandler = new ConvertHandler();
// console.log(convertHandler.getNum("1/2.5kg"));
// console.log(convertHandler.getUnit("2kg"));
// console.log(convertHandler.getReturnUnit("mi"));
// console.log(convertHandler.spellOutUnit("gal"));
// console.log(convertHandler.convert(10, "gal"));
// console.log(convertHandler.convert(100, "gal"));
// console.log(convertHandler.getString(100, "gal", 378, "L"));
// console.log(convertHandler.getString(100, "gal", 378.54100, "L"));