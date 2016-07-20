"use strict";

var mainEngine = require('./main.js');
var engine = new mainEngine();
var result = [];

var input;
try {
   var input = require("./test.json");
} catch(e){
    console.log(e);
}

//Push result to object....
for( var count = 0 ; count < input.length ; count++ ){
    var errorMessage = engine.getExecuteOnText(input[count].message);
    console.log(errorMessage.results[0]);
    var Label = input[count].Label;
    var Rules = engine.getDictionary2();
    var countRules =  engine.getCountRules(errorMessage,Rules);
    result.push({
        inputText : input[count].message,
        errorMessage: errorMessage,
        coutError: engine.countMessage(errorMessage),
        countRules: countRules,
        Label : Label});
}

//engine.convertToCSV(result, input);
// print the result from eslint
//engine.printMessages(result, input);
