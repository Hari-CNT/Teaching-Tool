export const createClockNumbers = (clockFace) => {
  // console.log(clockFace,"clockFace")
  for (let i = 1; i <= 12; i++) {
    const number = document.createElement('div');
    number.className = 'number';
    number.style.transform = `rotate(${i * 30}deg)`;
    // number.style.padding =`padding:0.75rem`
    const numberSpan = document.createElement('span');
    numberSpan.style.display = 'inline-block';
    numberSpan.style.transform = `rotate(${-i * 30}deg)`;
    numberSpan.textContent = i;
    
    number.appendChild(numberSpan);
    clockFace.appendChild(number);
  }
};

// export const validateTimeInput = (input) => {
//   const parts = input.split(':');
//   if (parts.length !== 2) return false;
  
//   const hours = parseInt(parts[0]);
//   const minutes = parseInt(parts[1]);
  
//   if (isNaN(hours) || isNaN(minutes)) return false;
//   if (hours < 1 || hours > 12) return false;
//   if (minutes < 0 || minutes > 59) return false;
  
//   return true;
// };

export const calculateDegrees = (time) => {
  return {
    hourDegrees: (time.hours % 12) * 30 + (time.minutes / 60) * 30,
    minuteDegrees: time.minutes * 6,
    secondDegrees: time.seconds * 6
  };
};

export const timeToWords = (hours, minutes) => {
  const numberWords = [
    'twelve', 'one', 'two', 'three', 'four', 
    'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
    'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four',
    'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine',
    'thirty'
  ];
  // console.log(minutes,"minutes")
  // console.log(hours,"hours")
  const hour = hours % 12;
  const nextHour = (hour + 1) % 12;
  //  console.log(hour,"hour")
  //  console.log(nextHour,"nextHour")
  if (minutes === 0) {
    return `${numberWords[hour]} o'clock`;
  } else if (minutes === 15) {
    return `quarter past ${numberWords[hour]}`;
  } else if (minutes === 30) {
    return `half past ${numberWords[hour]}`;
  } else if (minutes === 45) {
    return `quarter to ${numberWords[nextHour]}`;
  } else if (minutes < 30) {
    return `${numberWords[minutes]} past ${numberWords[hour]}`;
  } else {
    return `${numberWords[60 - minutes]} to ${numberWords[nextHour]}`;
  }
};
