const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

function readExcelAsJson(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json(worksheet, { defval: null });
  return { sheetName, json };
}

(async () => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'sample-data.xlsx');
    if (!fs.existsSync(filePath)) {
      console.error('ERROR: File not found:', filePath);
      process.exit(2);
    }

    const { sheetName, json } = readExcelAsJson(filePath);

    // Sample query to test
    const sampleQuery = 'Cây lúa cần bao nhiêu ngày để hoàn thành một vụ từ gieo đến thu hoạch?';
    const conversationHistory = '';

    const payload = {
      excelDataJson: JSON.stringify(json),
      query: sampleQuery,
      conversationHistory
    };

    console.log('=== Payload to AI prompt ===');
    console.log(JSON.stringify({ sheetName, sampleRows: json.slice(0,5), payload }, null, 2));

    // Also save to a local file for inspection
    const outPath = path.join(process.cwd(), 'scripts', 'last-payload.json');
    fs.writeFileSync(outPath, JSON.stringify({ sheetName, payload, sampleRows: json.slice(0,5) }, null, 2));
    console.log('Saved payload to', outPath);
  } catch (err) {
    console.error('ERROR:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
