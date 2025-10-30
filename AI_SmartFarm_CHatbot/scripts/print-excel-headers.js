const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

try {
  const filePath = path.join(process.cwd(), 'src', 'data', 'sample-data.xlsx');
  if (!fs.existsSync(filePath)) {
    console.error('ERROR: File not found:', filePath);
    process.exit(2);
  }

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json(worksheet, { defval: null });

  const headers = json.length > 0 ? Object.keys(json[0]) : [];
  const preview = json.slice(0, 5);

  console.log(JSON.stringify({ sheetName, headers, preview }, null, 2));
} catch (err) {
  console.error('ERROR while reading excel:', err && err.message ? err.message : err);
  process.exit(1);
}
