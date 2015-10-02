var _ = require('lodash')
module.exports = function roundRobin (input) {
  var output = [];
  var nextMatch = input;
  if (nextMatch.length%2!==0) {
    nextMatch.push('(none)');
  }
  for (var i = 0; i < input.length-1; i++) {
    output.push(generateMatches(nextMatch));
    nextMatch = rotateArray(nextMatch);
  }
  return output;
}


var input = [1,2,3,4,5,6];

  function generateMatches(array) {
    var arr1 = _.slice(array, [start=0], [end=array.length/2]);
    var arr2 = _.slice(array, [start=array.length/2], [end=array.length]);
    var output = [];
    for (var i = 0, k = arr1.length-1; i < arr1.length; i++, k--) {
      output.push([arr1[i],arr2[k]])
    }
    return output;
  }

  function rotateArray (match) {
    var matchArr = match;
    var lastNum = _.last(matchArr);
    var slicedArr = _.slice(matchArr, [start=0], [end=matchArr.length-1]);
    slicedArr.splice(1,0,lastNum);
    return slicedArr;
  }