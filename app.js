"use strict";

var rules = require('./featureList')

var mainEngine= require('./mainEngine.js');
var fs = require('fs');

var result = [];

var codeExtractor = require('./SourceCodeExtract/CodeExtractor/codeExtractor');

codeExtractor.getAllSourceCode('/Users/patawat/Desktop/ExampleMetric/SourceCodeExtract/RosettaCode', (dataArray) => {

    for( var count = 0 ; count < dataArray.length; count++ ){
        for(let i = 0; i < dataArray[count].code.length; i++){
            var engine = new mainEngine(String(dataArray[count].code[i]));
    		let engineResult = engine.getResult();
    		engineResult['Url'] = dataArray[count].url;

            result.push(engineResult);
        }
    }

    convertToCSV(result);
});

function convertToCSV(result){
    var B = [];

    for(var count = 0 ; count < rules.length ; count++){
        B.push(rules[count]);
    }

    var A = [];
    A.push(B);

    for(var count = 0 ; count < result.length ; count++){
        var c = [];
        var map = result[count];
        if (map === undefined) {
            continue;
        }
        for(var count2 = 0 ; count2 < rules.length ; count2++){
            var map = result[count];

            c.push(map[rules[count2]]);
        }

        A.push(c);
    }

    var csvRows = [];
    for(var i=0, l = A.length ; i < l ; ++i){
        csvRows.push( A[i].join(',') ); // unquoted CSV row
    }

    var csvString = csvRows.join('\n');

    fs.writeFile('result.csv',  csvString , function (err) {
        if (err) return console.log(err);
    });
}
