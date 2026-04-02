import React, { useState } from 'react';
import { Modal, Tabs, Upload, Button, Table, Select, message, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { parseCSV, parseExcel, parseVCard, parseTXT } from '../utils/fileParser';

interface ParsedData {
  headers: string[];
  rows: Array<Record<string, string>>;
}

interface FieldMapping {
  [csvColumn: string]: string;
}

interface ImportContactsModalProps {
  open: boolean;
  onCancel: () => void;
  onImport: (mappedContacts: any[]) => void;
}

const CONTACT_FIELDS = ['name', 'phone', 'email', 'status', 'lastMessage'];

const ImportContactsModal: React.FC<ImportContactsModalProps> = ({ open, onCancel, onImport }) => {
  const [step, setStep] = useState<'upload' | 'mapping'>('upload');
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [fieldMapping, setFieldMapping] = useState<FieldMapping>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pasteData, setPasteData] = useState('');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [loadingGoogleSheet, setLoadingGoogleSheet] = useState(false);

  const handleFileSelect = async (file: File) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      message.error('File size exceeds 5MB limit');
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let parsed: ParsedData | null = null;

    try {
      const fileContent = await file.text();

      switch (fileExtension) {
        case 'csv':
          parsed = parseCSV(fileContent);
          break;
        case 'xlsx':
        case 'xls': {
          // For XLSX, we'd need to read as ArrayBuffer
          // const arrayBuffer = await file.arrayBuffer();
          parsed = parseExcel();
          break;
        }
        case 'vcf':
          parsed = parseVCard(fileContent);
          break;
        case 'txt':
          parsed = parseTXT(fileContent);
          break;
        default:
          message.error('Unsupported file format. Supported: CSV, XLSX, VCF, TXT');
          return;
      }

      if (parsed && parsed.headers.length > 0 && parsed.rows.length > 0) {
        setParsedData(parsed);
        setUploadedFile(file);
        initializeFieldMapping(parsed.headers);
        message.success('File parsed successfully');
      } else {
        message.error('No data found in file');
      }
    } catch (error) {
      message.error(`Error parsing file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handlePasteData = () => {
    if (!pasteData.trim()) {
      message.error('Please paste some data');
      return;
    }

    try {
      // Try to parse as CSV first
      const parsed = parseCSV(pasteData);
      if (parsed.headers.length > 0 && parsed.rows.length > 0) {
        setParsedData(parsed);
        initializeFieldMapping(parsed.headers);
        setStep('mapping');
        message.success('Data parsed successfully');
      } else {
        message.error('No valid data found');
      }
    } catch (error) {
      message.error(`Error parsing data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const initializeFieldMapping = (headers: string[]) => {
    const initialMapping: FieldMapping = {};
    headers.forEach((header) => {
      // Auto-detect common column names
      const lowerHeader = header.toLowerCase();
      if (lowerHeader.includes('name')) initialMapping[header] = 'name';
      else if (lowerHeader.includes('phone') || lowerHeader.includes('mobile') || lowerHeader.includes('number'))
        initialMapping[header] = 'phone';
      else if (lowerHeader.includes('email')) initialMapping[header] = 'email';
      else if (lowerHeader.includes('status')) initialMapping[header] = 'status';
    });
    setFieldMapping(initialMapping);
  };

  const extractSheetIdFromUrl = (url: string): string | null => {
    // Extract sheet ID from Google Sheets URL
    // Supports: https://docs.google.com/spreadsheets/d/{SHEET_ID}/...
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match && match[1] ? match[1] : null;
  };

  const handleGoogleSheetImport = async () => {
    if (!googleSheetUrl.trim()) {
      message.error('Please enter a Google Sheets URL');
      return;
    }

    setLoadingGoogleSheet(true);
    try {
      const sheetId = extractSheetIdFromUrl(googleSheetUrl);
      if (!sheetId) {
        message.error('Invalid Google Sheets URL. Please use the full shareable link.');
        setLoadingGoogleSheet(false);
        return;
      }

      // Convert to CSV export URL
      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

      // Fetch the CSV data using CORS proxy or direct fetch
      const response = await fetch(csvUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/csv',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch sheet: ${response.statusText}`);
      }

      const csvContent = await response.text();
      const parsed = parseCSV(csvContent);

      if (parsed.headers.length > 0 && parsed.rows.length > 0) {
        setParsedData(parsed);
        initializeFieldMapping(parsed.headers);
        setStep('mapping');
        message.success('Google Sheet imported successfully');
      } else {
        message.error('No data found in the Google Sheet');
      }
    } catch (error) {
      console.error('Google Sheets import error:', error);
      message.error(
        `Error importing from Google Sheets: ${error instanceof Error ? error.message : 'Unknown error'}. Make sure the sheet is publicly accessible (Share > Anyone with link).`
      );
    } finally {
      setLoadingGoogleSheet(false);
    }
  };

  const handleFieldMappingChange = (csvColumn: string, value: string | null) => {
    setFieldMapping((prev) => {
      const updated = { ...prev };
      if (value === null) {
        delete updated[csvColumn];
      } else {
        updated[csvColumn] = value;
      }
      return updated;
    });
  };

  const validateMapping = () => {
    // Check if name and phone are mapped
    const mappedFields = Object.values(fieldMapping);
    if (!mappedFields.includes('name')) {
      message.error('Please map at least the "name" field');
      return false;
    }
    if (!mappedFields.includes('phone')) {
      message.error('Please map at least the "phone" field');
      return false;
    }
    return true;
  };

  const handleConfirmImport = () => {
    if (!validateMapping() || !parsedData) return;

    const mappedContacts = parsedData.rows.map((row, index) => {
      const contact: any = {
        key: String(index + 1),
        id: String(index + 1),
        createdDate: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };

      Object.entries(fieldMapping).forEach(([csvColumn, contactField]) => {
        if (contactField) {
          contact[contactField] = row[csvColumn] || '';
        }
      });

      // Set default status if not provided
      if (!contact.status) {
        contact.status = 'Active';
      }

      return contact;
    });

    onImport(mappedContacts);
    resetModal();
  };

  const resetModal = () => {
    setStep('upload');
    setParsedData(null);
    setFieldMapping({});
    setUploadedFile(null);
    setPasteData('');
    setGoogleSheetUrl('');
  };

  const handleCancel = () => {
    resetModal();
    onCancel();
  };

  const previewColumns = parsedData?.headers.map((header) => ({
    title: header,
    dataIndex: header,
    key: header,
    width: 150,
    ellipsis: true,
  })) || [];

  return (
    <Modal
      title="Import Contacts"
      open={open}
      onCancel={handleCancel}
      width={600}
      footer={null}
    >
      {step === 'upload' ? (
        <Tabs
          items={[
            {
              key: 'file',
              label: 'Upload File',
              children: (
                <div className="py-6">
                  <Upload.Dragger
                    maxCount={1}
                    beforeUpload={(file) => {
                      handleFileSelect(file);
                      return false;
                    }}
                    accept=".csv,.xlsx,.xls,.vcf,.txt"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag files to this area</p>
                    <p className="ant-upload-hint">
                      Supported formats: CSV, XLSX, VCF, TXT (Max 5MB)
                    </p>
                  </Upload.Dragger>

                  {uploadedFile && parsedData && (
                    <>
                      <Divider />
                      <div className="mb-4">
                        <p className="font-semibold mb-2">
                          Preview ({parsedData.rows.length} rows)
                        </p>
                        <Table
                          columns={previewColumns}
                          dataSource={parsedData.rows
                            .slice(0, 3)
                            .map((row, idx) => ({ ...row, key: idx }))}
                          pagination={false}
                          size="small"
                          scroll={{ x: 800 }}
                        />
                      </div>
                      <Button
                        type="primary"
                        block
                        onClick={() => setStep('mapping')}
                      >
                        Next: Map Fields
                      </Button>
                    </>
                  )}
                </div>
              ),
            },
            {
              key: 'paste',
              label: 'Paste Data',
              children: (
                <div className="py-6">
                  <textarea
                    className="w-full h-48 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                    placeholder="Paste CSV or tab-separated data here..."
                    value={pasteData}
                    onChange={(e) => setPasteData(e.target.value)}
                  />
                  <p className="text-gray-500 text-sm mt-2 mb-4">
                    Expected format: headers in first row, data in subsequent rows
                  </p>
                  <Button
                    type="primary"
                    block
                    onClick={handlePasteData}
                  >
                    Parse Data
                  </Button>
                </div>
              ),
            },
            {
              key: 'google-sheets',
              label: 'Google Sheets',
              children: (
                <div className="py-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Sheets URL
                    </label>
                    <input
                      type="text"
                      placeholder="Paste your Google Sheets share link here..."
                      value={googleSheetUrl}
                      onChange={(e) => setGoogleSheetUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>How to share your Google Sheet:</strong>
                    <br />
                    1. Open your Google Sheet
                    <br />
                    2. Click "Share" button (top right)
                    <br />
                    3. Change to "Anyone with link" can view
                    <br />
                    4. Copy the link and paste it above
                  </p>
                  <Button
                    type="primary"
                    block
                    loading={loadingGoogleSheet}
                    onClick={handleGoogleSheetImport}
                  >
                    {loadingGoogleSheet ? 'Importing...' : 'Import from Google Sheets'}
                  </Button>
                </div>
              ),
            },
          ]}
        />
      ) : (
        <div className="py-6">
          <h3 className="font-semibold mb-4">Map CSV Columns to Contact Fields</h3>
          <p className="text-gray-600 text-sm mb-4">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>

          <Table
            columns={[
              {
                title: (
                  <>
                    CSV Column <span className="text-red-500">*</span>
                  </>
                ),
                dataIndex: 'header',
                key: 'header',
                width: '40%',
              },
              {
                title: (
                  <>
                    Contact Field <span className="text-red-500">*</span>
                  </>
                ),
                key: 'mapping',
                width: '60%',
                render: (_: any, record: any) => {
                  return (
                    <Select
                      placeholder="Select field"
                      value={fieldMapping[record.header] || null}
                      onChange={(value) => handleFieldMappingChange(record.header, value)}
                      options={[
                        { label: '-- Unmapped --', value: null },
                        ...CONTACT_FIELDS.map((field) => ({
                          label: (
                            <>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                              {['name', 'phone'].includes(field) && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </>
                          ),
                          value: field,
                        })),
                      ]}
                      allowClear
                    />
                  );
                },
              },
            ]}
            dataSource={parsedData?.headers.map((header) => ({ header, key: header })) || []}
            pagination={false}
            size="small"
          />

          <Divider />

          <p className="font-semibold mb-3">Data Preview (First 3 rows)</p>
          <Table
            columns={previewColumns}
            dataSource={parsedData?.rows
              .slice(0, 3)
              .map((row, idx) => ({ ...row, key: idx })) || []}
            pagination={false}
            size="small"
            scroll={{ x: 800 }}
          />

          <Divider />

          <div className="flex gap-3 justify-end">
            <Button onClick={() => setStep('upload')}>Back</Button>
            <Button type="primary" onClick={handleConfirmImport}>
              Import {parsedData?.rows.length || 0} Contacts
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ImportContactsModal;
