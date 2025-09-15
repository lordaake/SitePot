// save this as collectCodeFiles.js and run with: node collectCodeFiles.js

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname); // adjust root - e.g. your project root folder
const OUTPUT_FILE = path.resolve(__dirname, 'all-code.txt');

const EXCLUDE_DIRS = new Set(['node_modules', 'dist']);

// Collect contents of all .js and .jsx files
function collectCode(dir) {
    let collected = '';

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const itemPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            if (!EXCLUDE_DIRS.has(item.name)) {
                collected += collectCode(itemPath);
            }
        } else if (item.isFile()) {
            // Check for .js or .jsx extension
            const ext = path.extname(item.name).toLowerCase();
            if (ext === '.js' || ext === '.jsx') {
                // Read file content
                const content = fs.readFileSync(itemPath, 'utf8');
                // Add a separator comment for readability
                collected += `\n\n/* ==== FILE: ${path.relative(ROOT_DIR, itemPath)} ==== */\n\n`;
                collected += content;
            }
        }
    }
    return collected;
}

// Run
try {
    const allCode = collectCode(ROOT_DIR);
    fs.writeFileSync(OUTPUT_FILE, allCode, 'utf8');
    console.log(`Successfully wrote all JS and JSX code to ${OUTPUT_FILE}`);
} catch (err) {
    console.error('Error collecting files:', err);
}