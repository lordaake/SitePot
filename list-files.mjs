// list-files-to-txt.mjs
import fs from 'fs';
import path from 'path';

const outputFilePath = path.resolve('structure.txt'); // writes to current working directory

function listDir(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    let result = '';

    items.forEach((item, index) => {
        const fullPath = path.join(dir, item);
        const isLast = index === items.length - 1;
        const stat = fs.statSync(fullPath);
        const connector = isLast ? '└── ' : '├── ';
        result += prefix + connector + item + '\n';
        if (stat.isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            result += listDir(fullPath, newPrefix);
        }
    });

    return result;
}

const projectDir = 'C:\\Users\\Tord\\Documents\\VS Code Projects\\agentvanguard-fixed';

const treeOutput = `${projectDir}\n${listDir(projectDir)}`;

try {
    fs.writeFileSync(outputFilePath, treeOutput, 'utf8');
    console.log(`Directory structure written successfully to ${outputFilePath}`);
} catch (err) {
    console.error('Error writing to file:', err);
}
