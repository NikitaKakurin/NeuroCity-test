const fs = require('fs')
const path = require('path')
const os = require('node:os');
// конечно лучше делать через потоки, но как успел)

fs.writeFile('testFile.txt', "Some text for test", (err) => {
    if(err) throw err;
});
const filePath = path.resolve(__dirname,'testFile.txt')

fs.readFile(filePath,'utf-8', (err, data) => {
  if (err) throw err;
  reverseText(data);
});

function reverseText(data){
  const reverseData = data.split('').reverse().join('');
  // так как непонятно что делать по условию я дописал текст, если надо переписать текст то fs.writeFile
  fs.appendFile(filePath, reverseData, (err) => {
    if(err) throw err;
  });
}

// ------------------------------------------
console.log(os.homedir());
console.log(os.platform());



