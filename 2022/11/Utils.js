// source:
// https://www.tutorialspoint.com/calculating-the-lcm-of-multiple-numbers-in-javascript
const calculateLCM = (arr) => {
  const gcd2 = (a, b) => {
     // Greatest common divisor of 2 integers
     if(!b) return b===0 ? a : NaN;
        return gcd2(b, a%b);
  };
  const lcm2 = (a, b) => {
     // Least common multiple of 2 integers
     return a * b / gcd2(a, b);
  }
  // Least common multiple of a list of integers
  let n = 1;
  for(let i = 0; i < arr.length; ++i){
     n = lcm2(arr[i], n);
  }
  return n;
};

module.exports = {
   calculateLCM
}