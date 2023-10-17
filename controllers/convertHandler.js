function ConvertHandler() {
  const splitToNumberAndMeasure = (input) => {
    let left = "";
    let right = "";
  
    for (const char of input) {
      if ((char >= 0 && char <= 9) || (char == ".") || (char == "/")) {
        left += char;
      } else {
        right += char;
      }
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
    const arr = splitToNumberAndMeasure(input);
    const result = arr[0];

    return result;
  };
  
  this.getUnit = function(input) {
    const arr = splitToNumberAndMeasure(input);
    const result = arr[1];
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
