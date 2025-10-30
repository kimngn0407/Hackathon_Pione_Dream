const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet, { defval: null });
}

function normalizeText(s) {
  if (!s) return '';
  return s
    .toString()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ') // remove punctuation, keep letters/numbers
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenOverlap(a, b) {
  const ta = new Set(normalizeText(a).split(' ').filter(Boolean));
  const tb = new Set(normalizeText(b).split(' ').filter(Boolean));
  let common = 0;
  for (const t of ta) if (tb.has(t)) common++;
  return common;
}

function findMatches(rows, query) {
  const normQ = normalizeText(query);
  const exact = [];
  const contains = [];
  const tokenMatches = [];

  for (const row of rows) {
    const q = row['CÂU HỎI'] || row['CÂU HOI'] || row['Question'] || '';
    const normRowQ = normalizeText(q);
    if (!normRowQ) continue;
    if (normRowQ === normQ) exact.push(row);
    else if (normRowQ.includes(normQ) || normQ.includes(normRowQ)) contains.push(row);
    else {
      const common = tokenOverlap(q, query);
      if (common >= 3) tokenMatches.push({row, common});
    }
  }

  if (exact.length) return {type: 'exact', rows: exact};
  if (contains.length) return {type: 'contains', rows: contains};
  if (tokenMatches.length) {
    tokenMatches.sort((a,b) => b.common - a.common);
    return {type: 'token', rows: tokenMatches.map(x=>x.row)};
  }
  return {type: 'none', rows: []};
}

function buildAnswer(matchResult, query) {
  if (matchResult.type === 'none') {
    const answer = `Trả lời: Không tìm thấy câu trả lời tương ứng trong dữ liệu; dựa trên kiến thức chung, lúa thường cần 90–180 ngày tùy giống và điều kiện canh tác.\nNguồn dữ liệu: Không có\nKhuyến nghị/next steps: 1) Thêm câu hỏi chi tiết về giống vào Excel; 2) Ghi rõ điều kiện (vùng, mùa) để trả lời chính xác.\nĐộ tin cậy: Trung bình (dựa trên kiến thức chuyên môn, không có dữ liệu trực tiếp).`;
    return {answer, sources: [], recommendations: ['Thêm câu hỏi chi tiết về giống vào Excel','Ghi rõ điều kiện khu vực/vụ mùa'], confidence: 'Trung bình'};
  }

  // Use the first few rows as sources
  const sources = matchResult.rows.map(r => r['STT']);
  // Combine their answers
  const answers = matchResult.rows
    .map(r => (r['CÂU TRẢ LỜI'] || r['CÂU_TRA_LOI'] || r['Answer'] || '').toString().trim())
    .filter(Boolean);

  const combined = answers.length ? answers.join(' \n---\n ') : 'Không có câu trả lời văn bản trong dữ liệu.';

  const recs = [];
  recs.push('Kiểm tra giống và giai đoạn sinh trưởng cụ thể');
  recs.push('Theo dõi thực tế  và điều chỉnh lịch bón/tưới theo giai đoạn');

  const confidence = matchResult.type === 'exact' ? 'Cao' : 'Trung bình';

  const answerText = `Trả lời: ${combined}\nNguồn dữ liệu: STT: ${sources.join(', ')}\nKhuyến nghị/next steps: 1) ${recs[0]}; 2) ${recs[1]}\nĐộ tin cậy: ${confidence} (dựa trên dữ liệu trong Excel).`;

  return {answer: answerText, sources, recommendations: recs, confidence};
}

(async () => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'sample-data.xlsx');
    if (!fs.existsSync(filePath)) {
      console.error('ERROR: sample-data.xlsx not found at', filePath);
      process.exit(2);
    }

    const rows = readExcel(filePath);

    const argv = process.argv.slice(2);
    const query = argv.join(' ') || 'Cây lúa cần bao nhiêu ngày để hoàn thành một vụ từ gieo đến thu hoạch?';

    const matchResult = findMatches(rows, query);
    const output = buildAnswer(matchResult, query);

    const out = { query, matchType: matchResult.type, result: output };
    const outPath = path.join(process.cwd(), 'scripts', 'last-answer.json');
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

    console.log('=== Mock AI Response ===');
    console.log(JSON.stringify(out, null, 2));
    console.log('Saved mock answer to', outPath);
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
