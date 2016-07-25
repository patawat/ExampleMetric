var codeExtractor = require('./codeExtractor');


// codeExtractor.getAllSourceCode('/Users/patawat/Desktop/SourceCodeExtract/RosettaCode', (codeArray) => {
// 	this.x = codeArray;
// 	console.log(codeArray[0]);
// });

var x;
function getOutPut(test){
	x = test;

	//console.log(test);
}

function mainExtract(){
	var x =[];

	x = codeExtractor.getAllSourceCode('/Users/patawat/Desktop/SourceCodeExtract/RosettaCode', (codeArray) => {
		return codeArray;
		//getOutPut(codeArray);
	});
	console.log(x);
	console.log("test");
}

mainExtract.prototype = {
    getExtract : function(){
		return this.result =[];
    }
};
module.exports = mainExtract;
