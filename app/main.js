const fs = require("fs");
const path = require("path");
const zlib = require('zlib')

// You can use print statements as follows for debugging, they'll be visible when running tests.
// console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const command = process.argv[2];
//
switch (command) {
    case "init":
        createGitDirectory();
        break;
        case 'cat-file':
            readFileContents()
            break;
    default:
        throw new Error(`Unknown command ${command}`);
}

function createGitDirectory() {
    fs.mkdirSync(path.join(__dirname, ".git"), { recursive: true });
    fs.mkdirSync(path.join(__dirname, ".git", "objects"), { recursive: true });
    fs.mkdirSync(path.join(__dirname, ".git", "refs"), { recursive: true });

    fs.writeFileSync(path.join(__dirname, ".git", "HEAD"), "ref: refs/heads/master\n");
    console.log("Initialized git directory");
}

function readFileContents() {
        const hash = process.argv[process.argv.length - 1];
        const file = fs.readFileSync(path.join(__dirname, ".git", "objects", hash.slice(0, 2), hash.slice(2)));
        const decompressed = zlib.inflateSync(file);
        const res = decompressed.toString().split("\x00")[1];
    
        process.stdout.write(res);
}