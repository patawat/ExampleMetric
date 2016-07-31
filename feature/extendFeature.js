"use strict";

var fs = require('fs');
var espree = require("espree");
/**
 * @constructor
 */
function extendFeature(text){
    this.text = text;
//try {
    this.ast = espree.parse(text);
// } catch (e) {
// }
}

extendFeature.prototype = {

    AvgParem : function(){
        var result = 0;
        var numOfFun = 0;
        var sumOfParems = 0;
        if(this.ast === undefined){
            return 0;
        }

        for (var i = 0; i < this.ast.body.length; i++) {
            if (this.ast.body[i].type === 'FunctionDeclaration' || this.ast.body[i].type === 'ArrowFunctionExpression' || this.ast.body[i].type === 'FunctionExpression') {
                //console.log(ast.body[0].params);
                sumOfParems += this.ast.body[i].params.length;
                numOfFun += 1;
            }
        }
        if (numOfFun === 0) {
            return 0;
        }
        return sumOfParems/numOfFun;
    },
    getAvgCharline : function(){
        var SourceCode = require("eslint").SourceCode;

        var code = this.text;
        if (code === undefined) {
            console.log("test");
        }
        // split code into an array
        var codeLines = SourceCode.splitLines(code);

        var lengthOfCode = 0;
        for (var count = 0; count < codeLines.length; count++) {
            lengthOfCode += codeLines[count].length;
            //console.log(codeLines[count]);

        }
        var result = lengthOfCode / codeLines.length;

        return result;
    },
    identifiers(){
        var result = countVar(this.ast);
        return result;
    },
    identifiersLength(){
        var result = countVarLength(this.ast);
        return result;
    },
    loop(){
        var result = countLoop(this.ast);
        return result;
    },
    Branch(){
        var result = countBranch(this.ast);
        return result;
    },
    ExpressionStatement(){
        var result = countExpression(this.ast);
        return result;
    },
    mostDepth(){
        var result = countDepth(this.ast);
        return result;

    }


};
function countVar(ast){
    var result = 0;
    if (ast.body !== undefined) {
        for (var i = 0; i < ast.body.length; i++) {
            if (ast.body[i].consequent !== undefined) {
                result += countVar(ast.body[i].consequent);
            }
            else if(ast.body[i].body !== undefined){
                result += countVar(ast.body[i].body);
            }
            else if(ast.body[i].type === "VariableDeclaration" && ast.body[i].declarations !== undefined){
                result += ast.body[i].declarations.length;
            }
            else if (ast.body[i].type === "VariableDeclaration") {
                result += 1;
            }

            if (ast.body[i].alternate !== undefined && ast.body[i].alternate !== null) {

                result += countVar(ast.body[i].alternate);
            }
        }
    }else{
        if (ast.alternate !== undefined && ast.alternate !== null) {
            result += countVar(ast.alternate);
        }
        if(ast.consequent !== undefined && ast.consequent !== null){
            result += countVar(ast.consequent);
        }
    }

    return result;
}

function countVarLength(ast){

    var numOfVar = 0;
    var sumOfLength = 0;


    if (ast.body !== undefined) {
        for (var i = 0; i < ast.body.length; i++) {
            if (ast.body[i].consequent !== undefined) {
                sumOfLength += countVarLength(ast.body[i].consequent);
                numOfVar += 1;
            }
            else if(ast.body[i].body !== undefined){
                sumOfLength += countVarLength(ast.body[i].body);
                numOfVar += 1;
            }
            else if(ast.body[i].type === "VariableDeclaration" && ast.body[i].declarations !== undefined){
                numOfVar += ast.body[i].declarations.length;
                for (var count = 0; count < ast.body[i].declarations.length; count++) {
                    sumOfLength += ast.body[i].declarations[count].id.name.length;
                }
            }

            if (ast.body[i].alternate !== undefined && ast.body[i].alternate !== null) {

                sumOfLength += countVarLength(ast.body[i].alternate);
                numOfVar += 1;
            }
        }
    }else{
        if (ast.alternate !== undefined && ast.alternate !== null) {
            sumOfLength += countVarLength(ast.alternate);
            numOfVar += 1;
        }
        if(ast.consequent !== undefined && ast.consequent !== null){
            sumOfLength += countVarLength(ast.consequent);
            numOfVar += 1;
        }
    }
    if (sumOfLength === 0) {
        return 0;
    }
    return sumOfLength/numOfVar;

}

function countLoop(ast){
    var result = 0;

    if (ast.body !== undefined) {
        for (var i = 0; i < ast.body.length; i++) {
            if (ast.body[i].consequent !== undefined) {
                result += countLoop(ast.body[i].consequent);
            }
            else if(ast.body[i].body !== undefined){
                result += countLoop(ast.body[i].body);
            }
            if(ast.body[i].type === "ForStatement" || ast.body[i].type === "WhileStatement"){
                result += 1;
            }

            if (ast.body[i].alternate !== undefined && ast.body[i].alternate !== null) {

                result += countLoop(ast.body[i].alternate);
            }
        }
    }else{
        if (ast.alternate !== undefined && ast.alternate !== null) {
            result += countLoop(ast.alternate);
        }
        if(ast.consequent !== undefined && ast.consequent !== null){
            result += countLoop(ast.consequent);
        }
    }

     return result;
}

function countBranch(ast){
    var result = 0;

    if (ast.body !== undefined) {
        for (var i = 0; i < ast.body.length; i++) {
            if (ast.body[i].consequent !== undefined) {
                result += countBranch(ast.body[i].consequent);
            }
            else if(ast.body[i].body !== undefined){
                result += countBranch(ast.body[i].body);
            }
            if(ast.body[i].type === "IfStatement"){
                result += 1;
            }

            if (ast.body[i].alternate !== undefined && ast.body[i].alternate !== null) {

                result += countBranch(ast.body[i].alternate);
            }
        }
    }else{
        if(ast.type === "IfStatement"){
            result += 1;
        }
        if (ast.alternate !== undefined && ast.alternate !== null) {
            result += countBranch(ast.alternate);
        }
        if(ast.consequent !== undefined && ast.consequent !== null){
            result += countBranch(ast.consequent);
        }
    }

     return result;

}

function countExpression(ast){
    var result = 0;
    if (ast.body !== undefined) {
        for (var i = 0; i < ast.body.length; i++) {
            if (ast.body[i].consequent !== undefined) {
                result += countExpression(ast.body[i].consequent);
            }
            else if(ast.body[i].body !== undefined){
                result += countExpression(ast.body[i].body);
            }

            if (ast.body[i].type === "ExpressionStatement") {

                result += 1;
            }

            if (ast.body[i].alternate !== undefined && ast.body[i].alternate !== null) {

                result += countExpression(ast.body[i].alternate);
            }
        }
    }else{
        if (ast.body[i].type === "ExpressionStatement") {

            result += 1;
        }

        if (ast.alternate !== undefined && ast.alternate !== null) {
            result += countExpression(ast.alternate);
        }
        if(ast.consequent !== undefined && ast.consequent !== null){
            result += countExpression(ast.consequent);
        }
    }

    return result;
}

function countDepth(ast){
    var result = 1;
    for (var i = 0; i < ast.body.length; i++) {
        if (ast.body[i].consequent !== undefined) {
            if (result < countDepth(ast.body[i].consequent)+1) {
                result = countDepth(ast.body[i].consequent)+1;
            }
        }
    }
    return result;
}

module.exports = extendFeature;
