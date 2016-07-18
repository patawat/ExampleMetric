"use strict";


var fs = require('fs');
var CLIEngine = require('./eslint/lib/cli-engine.js');

/**
 * @constructor
 */
function mainEngine(){
}

mainEngine.prototype = {
    getExecuteOnText : function(text){
        var cli = new CLIEngine();
        return cli.executeOnText(text,"test");
    },
    getExecuteOnFile: function(filename){
        var cli = new CLIEngine();
        return cli.executeOnFile(filename);
    },

    calculateScore: function(input, errorMessage){

        var score = 10;
        var messageError = errorMessage.results[0].messages;
        //console.log(messageError);
        for(var countRules = 0 ; countRules < messageError.length ; countRules++){

            if(messageError[countRules].ruleId !== null){
                    score -= dict[messageError[countRules].ruleId];
            }
        }

        if(score<0){
            return 0;
        }
        return score;
    },

    //get dic from ./rules.json
    getDictionary: function (){
        var inputJSON = require("./rules.json");

        var dict = {};

        for(var count = 0 ; count < inputJSON.rules.length ; count++){
            dict[inputJSON.rules[count].key] = inputJSON.rules[count].value;
        }
        return dict;
    },

    //get dict for count number of each rules
    getDictionary2: function(){

        var inputJSON = require("./rules.json");
        var dir = "./eslint/lib/rules";
        var dict = {};

        for(var count = 0 ; count < inputJSON.rules.length ; count++){
            dict[inputJSON.rules[count].key] = 0;
        }
        return dict;

    },

    //print result
     printMessages:function(result, input){

        for(var count = 0 ; count < input.length ; count++){

            var hash = result[count].coutError;
            console.log( "\nInput Text : " + result[count].inputText );
            console.log( result[count].errorMessage.results[0] );

            //console.log(hash);

            //console.log( "Count error : " + hash );
            //console.log("Score : "+  result[count].score);
            //console.log("Result : "+ result[count].countRules);

        }
    },

    // count message form source
    countMessage: function (errorMessage, map){
        var map = {};
        if(errorMessage.results[0].messages.length === 0){
            return;
        }
        //var count = 0;
        for(var count = 0; count < errorMessage.results[0].messages.length ; count++){

            if(map[errorMessage.results[0].messages[count].ruleId] === undefined){
                map[errorMessage.results[0].messages[count].ruleId] = 1;
            }
            else{
                map[errorMessage.results[0].messages[count]] += 1;
            }

        }
        var count = 0;

        return map;

    },

    //Get count in each rules
    getCountRules: function(errorMessage,dict){
        var messageError = errorMessage.results[0].messages;
        //console.log(messageError);
        for(var countRules = 0 ; countRules < messageError.length ; countRules++){
            if(messageError[countRules].ruleId !== null){
                dict[messageError[countRules].ruleId] += 1;
            }
        }
        //console.log(dict);
        return dict;
    },

    //convert to CSV
    convertToCSV : function(result){

        var B = [];
        var inputJSON = require("./rules.json");
        for(var count = 0 ; count < inputJSON.rules.length ; count++){
            B.push(inputJSON.rules[count].key);
        }
        B.push("Label")

        var A = [];
        A.push(B);

        for(var count = 0 ; count < input.length ; count++){
            var c = [];
            console.log(count);
            for(var count2 = 0 ; count2 < inputJSON.rules.length ; count2++){
                c.push(result[count].countRules[inputJSON.rules[count2].key]);
            }
            c.push(result[count].Label);
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

}

module.exports = mainEngine;
