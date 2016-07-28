var espree = require("espree");
var ast = espree.parse("if(true){if(true){}else{if(true){}}}");


//console.log(ast.body[0]);
var result = countDepth(ast);
console.log(result);

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


// console.log(ast.body[0].consequent.consequent);
