var fs = require('fs');

function readCodeFile(source) {
	return fs.readFileSync(source, 'utf8');
}

function getAllSourceCode(folderPath, callbackFunc) {
let codeData = [];

	fs.readdir(folderPath, (err, files) => {
		if (err) {
			console.log(err);
			throw err;
		}

		// let codeArray = [];
		files.forEach((file) => {
			if (!file.includes('.DS_Store')) {
				let data = readCodeFile(folderPath + '/' + file)
				let curCodeData = {};
				let parsedData = JSON.parse(data);
				curCodeData.code = parsedData.codeArray;
				curCodeData.url = parsedData.url;
				codeData.push(curCodeData);
			}
		});
		callbackFunc(codeData);
		//console.log("hi");
		//return test;

	});
	// console.log(codeArray);
	// return codeArray;
}

exports.getAllSourceCode = getAllSourceCode;
