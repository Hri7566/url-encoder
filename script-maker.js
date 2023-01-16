const fs = require('fs');
const path = require('path');

let index = fs.readFileSync(path.resolve(__dirname, './index.js')).toString();

index = index.split('\n');

for (let line of index) {
    // line = line.split(`\\\"`);
    
    let sp = line.match(/(%..|%..%..|%..%..%..)/i);
    if (!sp) continue;
    let char = line.match(/\\\"/i);
    if (!char) continue;
    
    let en = sp[0];
    let rep = char[0];
    
    try {
        en = decodeURI(en);
        let rest = line.substr(line.indexOf(char[0]), line.length);
        line = line.substr(0, line.indexOf(char[0])) + en + rest;
        line = line.split('\\\"').join('');
        console.log(line);
        fs.appendFileSync(path.resolve(__dirname, './index-out.js'), line);
    } catch (err) {

    }
}

// fs.writeFileSync(path.resolve(__dirname, './index.js'), index.join('\n'));
