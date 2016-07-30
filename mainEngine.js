"use strict";

var fs = require('fs');
var CLIEngine = require("eslint").CLIEngine;
var feature = require("./feature/extendFeature");
var sloc  = require('sloc');
var rules = require('./featureList')

function getDictionary(){
    var dict = {};
    for(var count = 0 ; count < rules.length ; count++){
        dict[rules[count]] = 0;
    }

    return dict;
}

function mapping( errorMessage, sloc, exFeature ){
    var map = getDictionary();
    if(errorMessage.results[0].messages.length === 0){
            return;
        }
        //var count = 0;
        for(var count = 0; count < errorMessage.results[0].messages.length ; count++){

            if (map[errorMessage.results[0].messages[count].ruleId] === undefined) {
                continue;
            }
            else if(map[errorMessage.results[0].messages[count].ruleId] === 0){
                map[errorMessage.results[0].messages[count].ruleId] = 1;
            }
            else{
                //..console.log("test"+);
                map[errorMessage.results[0].messages[count].ruleId] += 1;
            }
        }

        map["LOC"] = sloc.total
        map["SLOC"] = sloc.source;
        map["comment"] = sloc.comment;
        map["mixLOC"] = sloc.mixed;
        map["emptyLine"] = sloc.empty;

        map["codePerLine"] = exFeature.getAvgCharline();
        map["paremeter"] = exFeature.AvgParem();
        map["identifiers"] = exFeature.identifiers();
        map["identifiersLength"] = exFeature.identifiersLength();
    return map;
}

/**
 * @constructor
 */
function mainEngine(text){

    this.text = text;
    var cli = new CLIEngine({"extends": "eslint:recommended"});
    this.result = cli.executeOnText(text,"test");
    this.sloc = sloc(text,'js');
    try {
        var exFeature = new feature(text);
        this.dict = mapping(this.result, this.sloc, exFeature);
    } catch (e) {

    }

}

mainEngine.prototype = {

    getExecuteOnText : function(){
        return this.result;
    },

    getLOC : function(){
        return this.sloc;
    },

    getResult: function(){
        return this.dict;
    }

};

module.exports = mainEngine;
