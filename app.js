// var _ = require('lodash')
// module.exports = function roundRobin (input) {
//   var output = [];
//   var nextMatch = input;
//   if (nextMatch.length%2!==0) {
//     nextMatch.push('(none)');
//   }
//   for (var i = 0; i < input.length-1; i++) {
//     output.push(generateMatches(nextMatch));
//     nextMatch = rotateArray(nextMatch);
//   }
//   return output;
// }


// var input = [1,2,3,4,5,6];

//   function generateMatches(array) {
//     var arr1 = _.slice(array, [start=0], [end=array.length/2]);
//     var arr2 = _.slice(array, [start=array.length/2], [end=array.length]);
//     var output = [];
//     for (var i = 0, k = arr1.length-1; i < arr1.length; i++, k--) {
//       output.push([arr1[i],arr2[k]])
//     }
//     return output;
//   }

//   function rotateArray (match) {
//     var matchArr = match;
//     var lastNum = _.last(matchArr);
//     var slicedArr = _.slice(matchArr, [start=0], [end=matchArr.length-1]);
//     slicedArr.splice(1,0,lastNum);
//     return slicedArr;
//   }

// Second Approach /w JQuery

// define your round-robin function here
$(document).ready(function() {
  function zipToPair(array1, array2) {
    function go(array1, array2, output) {
      if (array1.length == 0 || array2.length == 0) { return output; }
      output.push(pair(_.first(array1), _.first(array2)));
      return go(_.rest(array1), _.rest(array2), output);
    }
    return go(array1, array2, []);
  }
  function pair(a, b) {
    return [a, b];
  }

  function rotateTail(array) {
    var output = _.rest(array);
    output.unshift(output.pop());
    output.unshift(_.first(array));
    return output;
  }

  function roundRobin(array) {
    var output = [];
    var tmpArr = [];
    if (array.length == 0) { return []; }
    if (array.length % 2 == 1) {
      array.push('(none)');
    }
    while (output.length < array.length - 1) {
      tmpArr = _.chunk(array, (array.length / 2));
      array1 = tmpArr[0]; // first half
      array2 = tmpArr[1].reverse(); // second half
      output.push(zipToPair(array1, array2));
      array = rotateTail(array);
    }
    return output;
  }
  $('#generateBtn').on('click', function() {
    var rounds = roundRobin($('#teamNames').val().split('\n'));
    var counter = 0;
    $('.pulled-right').html('');
    for (var i = 0 ; i < rounds.length ; i++) {
      $('.pulled-right').append('<div style="margin-left:2%;">Round ' +
      String(i + 1) + '</div><div><table style="border:2px solid black;">' +
      genRoundTables(i) + '</table></div>');
    }
    function genRoundTables(roundNum) {
      var output = '';
      output += '<tr><th>Team 1</th><th>Team 2</th></tr>';
      for (var j = 0; j < rounds[roundNum].length ; j++) {
        output += '<tr><td style="border:2px solid black;">' + rounds[roundNum][j][0] + '</td><td style="border:2px solid black;">' +
          rounds[roundNum][j][1] + '</td></tr>';
      }
      return output;
    }
  });
});
