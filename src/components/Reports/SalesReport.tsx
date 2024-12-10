import React from 'react';
import { Download } from 'lucide-react';
import { type Sale } from '../../types';
import * as XLSX from 'xlsx';

interface SalesReportProps {
  sales: Sale[];
}

export function SalesReport({ sales }: SalesReportProps) {
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      sales.map(sale => ({
        ID: sale.id,
        Fecha: sale.date,
        Total: sale.total,
        Items: sale.items.map(item => `${item.quantity}x ${item.name}`).join(', ')
      }))
    );
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    
    XLSX.writeFile(workbook, "reporte-ventas.xlsx");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Reporte de Ventas</h3>
        <button
          onClick={downloadExcel}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Download className="w-5 h-5" />
          Descargar Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {sale.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                  ${sale.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}