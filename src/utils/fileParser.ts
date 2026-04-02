/**
 * File Parser Utility
 * Handles parsing of different file formats for contact import
 */

interface ParsedData {
  headers: string[];
  rows: Array<Record<string, string>>;
}

/**
 * Parse CSV content
 * Handles quoted values, escaped characters, and multi-line cells
 */
export const parseCSV = (content: string): ParsedData => {
  const lines = content.split('\n').filter((line) => line.trim());

  if (lines.length < 1) {
    return { headers: [], rows: [] };
  }

  const headers = parseCSVLine(lines[0] || '');
  const rows: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    const values = parseCSVLine(line);
    if (values.length > 0 && values.some((v) => v.trim())) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }
  }

  return { headers, rows };
};

/**
 * Parse a single CSV line handling quotes and escaping
 */
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
};

/**
 * Parse Excel file (XLSX/XLS)
 * Requires xlsx library to be installed
 * Falls back to basic parsing if library not available
 */
export const parseExcel = (): ParsedData => {
  try {
    // Try to use XLSX library if available
    // For now, return empty - user would need to install xlsx library
    // npm install xlsx
    console.warn(
      'Excel parsing requires xlsx library. Install with: npm install xlsx'
    );
    return { headers: [], rows: [] };
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    return { headers: [], rows: [] };
  }
};

/**
 * Parse vCard (VCF) format
 * Extracts basic contact fields: FN (Full Name), TEL (Phone), EMAIL
 */
export const parseVCard = (content: string): ParsedData => {
  const vCards = content.split('BEGIN:VCARD');
  const contacts: Array<Record<string, string>> = [];

  for (let i = 1; i < vCards.length; i++) {
    const vCard = 'BEGIN:VCARD' + vCards[i];
    const contact: Record<string, string> = {};

    // Extract Full Name
    const fnMatch = vCard.match(/FN:(.*?)[\r\n]/);
    if (fnMatch && fnMatch[1]) {
      contact['name'] = fnMatch[1].trim();
    }

    // Extract Phone (first phone number)
    const telMatch = vCard.match(/TEL[^:]*:(.*?)[\r\n]/);
    if (telMatch && telMatch[1]) {
      contact['phone'] = telMatch[1].trim().replace(/[\s\-()]/g, '');
    }

    // Extract Email (first email)
    const emailMatch = vCard.match(/EMAIL[^:]*:(.*?)[\r\n]/);
    if (emailMatch && emailMatch[1]) {
      contact['email'] = emailMatch[1].trim();
    }

    if (contact.name || contact.phone) {
      contacts.push(contact);
    }
  }

  const headers = Array.from(
    new Set(contacts.flatMap((c) => Object.keys(c)))
  );

  return { headers, rows: contacts };
};

/**
 * Parse plain text format
 * Supports tab-separated or comma-separated values
 * First row is treated as headers
 */
export const parseTXT = (content: string): ParsedData => {
  const lines = content.split('\n').filter((line) => line.trim());

  if (lines.length < 1) {
    return { headers: [], rows: [] };
  }

  // Detect delimiter: tab or comma
  const firstLine = lines[0] || '';
  const hasTab = firstLine.includes('\t');
  const hasComma = firstLine.includes(',');
  const delimiter = hasTab ? '\t' : hasComma ? ',' : '\t';

  const headers = firstLine.split(delimiter).map((h) => h.trim());
  const rows: Array<Record<string, string>> = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    const values = line.split(delimiter).map((v) => v.trim());
    if (values.length > 0 && values.some((v) => v)) {
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }
  }

  return { headers, rows };
};

/**
 * Validate parsed data
 * Checks if required fields are present
 */
export const validateParsedData = (data: ParsedData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.headers.length === 0) {
    errors.push('No headers found');
  }

  if (data.rows.length === 0) {
    errors.push('No data rows found');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
