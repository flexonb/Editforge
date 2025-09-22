import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Scissors, Plus, Layers } from 'lucide-react';

interface PDFFile {
  id: string;
  name: string;
  file: File;
  pages: number;
}

export function PDFTools() {
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<'merge' | 'split' | 'extract'>('merge');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    for (const file of files) {
      if (file.type === 'application/pdf') {
        // In a real implementation, you'd use pdf-lib to get page count
        const pdfFile: PDFFile = {
          id: crypto.randomUUID(),
          name: file.name,
          file,
          pages: Math.floor(Math.random() * 20) + 1, // Mock page count
        };
        setPdfs(prev => [...prev, pdfFile]);
      }
    }
  };

  const mergePDFs = async () => {
    if (pdfs.length < 2) {
      alert('Please select at least 2 PDF files to merge');
      return;
    }

    // In a real implementation, this would use pdf-lib
    alert(`Merging ${pdfs.length} PDFs... This would be implemented with pdf-lib library`);
  };

  const splitPDF = (pdf: PDFFile) => {
    // In a real implementation, this would use pdf-lib
    alert(`Splitting ${pdf.name} into individual pages... This would be implemented with pdf-lib library`);
  };

  const extractPages = (pdf: PDFFile, startPage: number, endPage: number) => {
    // In a real implementation, this would use pdf-lib
    alert(`Extracting pages ${startPage}-${endPage} from ${pdf.name}... This would be implemented with pdf-lib library`);
  };

  const removePDF = (id: string) => {
    setPdfs(prev => prev.filter(pdf => pdf.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-slate-900">PDF Tools</h2>
        </div>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload PDFs</span>
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Operation Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Operation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedOperation('merge')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedOperation === 'merge'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Layers className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium text-slate-900">Merge PDFs</h4>
              <p className="text-sm text-slate-600">Combine multiple PDFs into one</p>
            </button>
            
            <button
              onClick={() => setSelectedOperation('split')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedOperation === 'split'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Scissors className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium text-slate-900">Split PDF</h4>
              <p className="text-sm text-slate-600">Split PDF into individual pages</p>
            </button>
            
            <button
              onClick={() => setSelectedOperation('extract')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedOperation === 'extract'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Plus className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-medium text-slate-900">Extract Pages</h4>
              <p className="text-sm text-slate-600">Extract specific page ranges</p>
            </button>
          </div>
        </div>

        {/* PDF List */}
        {pdfs.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                Uploaded PDFs ({pdfs.length})
              </h3>
              
              {selectedOperation === 'merge' && (
                <button
                  onClick={mergePDFs}
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  <Layers className="w-4 h-4" />
                  <span>Merge All PDFs</span>
                </button>
              )}
            </div>
            
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-red-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">{pdf.name}</h4>
                      <p className="text-sm text-slate-600">{pdf.pages} pages</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedOperation === 'split' && (
                      <button
                        onClick={() => splitPDF(pdf)}
                        className="flex items-center space-x-1 px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                      >
                        <Scissors className="w-4 h-4" />
                        <span>Split</span>
                      </button>
                    )}
                    
                    {selectedOperation === 'extract' && (
                      <button
                        onClick={() => extractPages(pdf, 1, Math.min(5, pdf.pages))}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Extract 1-5</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => removePDF(pdf.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              PDF Tools
            </h3>
            <p className="text-slate-600 mb-4">
              Merge, split, and extract pages from PDF documents.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-lg hover:from-purple-700 hover:to-teal-700 transition-all"
            >
              Upload PDF Files
            </button>
          </div>
        )}

        {/* Implementation Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This tool demonstrates the interface for PDF operations. 
            Full functionality would be implemented using the pdf-lib library for client-side PDF manipulation.
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}