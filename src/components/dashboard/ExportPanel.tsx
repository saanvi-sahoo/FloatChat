import React, { useState } from 'react';
import { X, Download, FileText, Database, Code } from 'lucide-react';

interface ExportPanelProps {
  onClose: () => void;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    {
      id: 'csv',
      label: 'CSV',
      description: 'Comma-separated values for spreadsheet applications',
      icon: FileText,
      color: 'text-green-400'
    },
    {
      id: 'json',
      label: 'JSON',
      description: 'JavaScript Object Notation for web applications',
      icon: Code,
      color: 'text-blue-400'
    },
    {
      id: 'netcdf',
      label: 'NetCDF',
      description: 'Network Common Data Form for scientific data',
      icon: Database,
      color: 'text-purple-400'
    },
    {
      id: 'ascii',
      label: 'ASCII',
      description: 'Plain text format for universal compatibility',
      icon: FileText,
      color: 'text-yellow-400'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create sample data based on format
    let data: string;
    let filename: string;
    let mimeType: string;

    switch (selectedFormat) {
      case 'csv':
        data = `Float_ID,Latitude,Longitude,Temperature,Salinity,Pressure,Date,Status
ARGO_001,20.5,-157.8,24.5,35.2,1013.2,2024-01-15,Active
ARGO_002,35.7,-75.4,18.3,36.1,1015.8,2024-01-15,Active
ARGO_003,-10.2,142.8,28.1,34.8,1011.5,2024-01-14,Inactive`;
        filename = 'argo_data.csv';
        mimeType = 'text/csv';
        break;
      
      case 'json':
        data = JSON.stringify([
          { id: 'ARGO_001', lat: 20.5, lng: -157.8, temp: 24.5, salinity: 35.2, pressure: 1013.2, date: '2024-01-15', status: 'Active' },
          { id: 'ARGO_002', lat: 35.7, lng: -75.4, temp: 18.3, salinity: 36.1, pressure: 1015.8, date: '2024-01-15', status: 'Active' },
          { id: 'ARGO_003', lat: -10.2, lng: 142.8, temp: 28.1, salinity: 34.8, pressure: 1011.5, date: '2024-01-14', status: 'Inactive' }
        ], null, 2);
        filename = 'argo_data.json';
        mimeType = 'application/json';
        break;
      
      case 'ascii':
        data = `# ARGO Float Data Export
# Generated: ${new Date().toISOString()}
# Format: ASCII Text
#
# Columns: Float_ID, Latitude, Longitude, Temperature(°C), Salinity(PSU), Pressure(hPa), Date, Status
#
ARGO_001    20.50  -157.80    24.5    35.2   1013.2   2024-01-15   Active
ARGO_002    35.70   -75.40    18.3    36.1   1015.8   2024-01-15   Active
ARGO_003   -10.20   142.80    28.1    34.8   1011.5   2024-01-14   Inactive`;
        filename = 'argo_data.txt';
        mimeType = 'text/plain';
        break;
      
      default:
        data = 'NetCDF export would generate binary data file';
        filename = 'argo_data.nc';
        mimeType = 'application/octet-stream';
    }

    // Create and trigger download
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    onClose();
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Download className="w-5 h-5 text-green-400" />
          Export Data
        </h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-gray-300 text-sm">
          Choose your preferred format to export the current dataset:
        </p>
        
        {exportFormats.map((format) => (
          <label
            key={format.id}
            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedFormat === format.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <input
              type="radio"
              name="exportFormat"
              value={format.id}
              checked={selectedFormat === format.id}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="mt-1 w-4 h-4 text-blue-500 bg-white/10 border-white/20 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <format.icon className={`w-4 h-4 ${format.color}`} />
                <span className="font-medium text-white">{format.label}</span>
              </div>
              <p className="text-sm text-gray-400">{format.description}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-4 border-t border-white/10">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export {exportFormats.find(f => f.id === selectedFormat)?.label}
            </>
          )}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-3 bg-white/10 text-gray-300 rounded-lg font-medium hover:bg-white/15 transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200 text-xs">
          <strong>Note:</strong> Export includes data based on current filters and view settings. 
          Large datasets may take longer to process.
        </p>
      </div>
    </div>
  );
};

export default ExportPanel;