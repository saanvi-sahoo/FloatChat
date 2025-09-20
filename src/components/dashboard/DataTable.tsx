import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, ArrowUpDown } from 'lucide-react';

interface DataTableProps {
  filters: any;
}

const DataTable: React.FC<DataTableProps> = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;

  // Sample ARGO float data
  const sampleData = [
    { id: 'ARGO_001', lat: 20.5, lng: -157.8, temp: 24.5, salinity: 35.2, pressure: 1013.2, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_002', lat: 35.7, lng: -75.4, temp: 18.3, salinity: 36.1, pressure: 1015.8, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_003', lat: -10.2, lng: 142.8, temp: 28.1, salinity: 34.8, pressure: 1011.5, date: '2024-01-14', status: 'Inactive' },
    { id: 'ARGO_004', lat: 55.3, lng: -12.6, temp: 8.7, salinity: 35.0, pressure: 1018.3, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_005', lat: -35.8, lng: 18.4, temp: 15.2, salinity: 35.5, pressure: 1016.7, date: '2024-01-14', status: 'Active' },
    { id: 'ARGO_006', lat: 40.7, lng: -74.0, temp: 20.1, salinity: 35.8, pressure: 1014.2, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_007', lat: 25.3, lng: 55.4, temp: 26.8, salinity: 36.5, pressure: 1012.9, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_008', lat: -20.1, lng: -40.3, temp: 22.4, salinity: 36.2, pressure: 1013.8, date: '2024-01-14', status: 'Inactive' },
    { id: 'ARGO_009', lat: 45.2, lng: 2.3, temp: 12.6, salinity: 35.3, pressure: 1017.1, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_010', lat: -5.8, lng: 105.2, temp: 29.3, salinity: 34.6, pressure: 1010.8, date: '2024-01-15', status: 'Active' },
    { id: 'ARGO_011', lat: 60.1, lng: -150.4, temp: 6.2, salinity: 34.9, pressure: 1019.5, date: '2024-01-14', status: 'Active' },
    { id: 'ARGO_012', lat: -40.3, lng: 145.7, temp: 14.8, salinity: 35.4, pressure: 1015.3, date: '2024-01-15', status: 'Active' },
  ];

  const filteredData = sampleData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortDirection === 'asc') {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const columns = [
    { key: 'id', label: 'Float ID', sortable: true },
    { key: 'lat', label: 'Latitude', sortable: true },
    { key: 'lng', label: 'Longitude', sortable: true },
    { key: 'temp', label: 'Temperature (°C)', sortable: true },
    { key: 'salinity', label: 'Salinity (PSU)', sortable: true },
    { key: 'pressure', label: 'Pressure (hPa)', sortable: true },
    { key: 'date', label: 'Last Update', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">ARGO Float Data Table</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Float ID or Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-300">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
          </p>
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-left text-sm font-semibold text-white ${
                      column.sortable ? 'cursor-pointer hover:bg-white/5' : ''
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && (
                        <ArrowUpDown className="w-4 h-4 text-gray-400" />
                      )}
                      {sortField === column.key && (
                        <span className="text-blue-400">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedData.map((row, index) => (
                <tr key={row.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-blue-400">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{row.lat.toFixed(2)}°</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{row.lng.toFixed(2)}°</td>
                  <td className="px-6 py-4 text-sm text-red-400">{row.temp}°C</td>
                  <td className="px-6 py-4 text-sm text-cyan-400">{row.salinity} PSU</td>
                  <td className="px-6 py-4 text-sm text-purple-400">{row.pressure} hPa</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{row.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white/5 border-t border-white/10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/15'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;