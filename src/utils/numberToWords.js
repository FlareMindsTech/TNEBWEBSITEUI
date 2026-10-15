/**
 * Convert number to words in Indian Numbering System
 * e.g. 80000 -> "Eighty Thousand"
 *      20000 -> "Twenty Thousand"
 */
const ones = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const tens = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertLessThanThousand(n) {
  let str = '';
  if (n >= 100) {
    str += ones[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n >= 20) {
    str += tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
  } else if (n > 0) {
    str += ones[n];
  }
  return str.trim();
}

export function numberToWords(num) {
  if (num === null || num === undefined || isNaN(num)) return '';
  num = Math.floor(Math.abs(Number(num)));
  if (num === 0) return 'Zero';

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const remainder = num;

  const parts = [];
  if (crore > 0) {
    parts.push(convertLessThanThousand(crore) + ' Crore');
  }
  if (lakh > 0) {
    parts.push(convertLessThanThousand(lakh) + (lakh === 1 ? ' Lakh' : ' Lakhs'));
  }
  if (thousand > 0) {
    parts.push(convertLessThanThousand(thousand) + ' Thousand');
  }
  if (remainder > 0) {
    parts.push(convertLessThanThousand(remainder));
  }

  return parts.join(' ').trim();
}

export function unitsToWords(units) {
  const n = parseInt(units, 10);
  if (isNaN(n) || n <= 0) return '';
  if (n < 20) return ones[n];
  return numberToWords(n);
}
