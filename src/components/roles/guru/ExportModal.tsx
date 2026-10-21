import { useState } from 'react'
import {
  CalendarDays,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  X,
} from 'lucide-react'
import './ExportModal.css'

interface ExportModalProps {
  onClose: () => void
}

const DEFAULT_VALUES = {
  period: 'bulan',
  startDate: '2026-10-01',
  endDate: '2026-10-31',
  transactionType: 'semua',
  paymentMethod: 'semua',
  fileFormat: 'pdf',
}

export function ExportModal({ onClose }: ExportModalProps) {
  const [period, setPeriod] = useState(DEFAULT_VALUES.period)
  const [startDate, setStartDate] = useState(DEFAULT_VALUES.startDate)
  const [endDate, setEndDate] = useState(DEFAULT_VALUES.endDate)
  const [transactionType, setTransactionType] = useState(
    DEFAULT_VALUES.transactionType
  )
  const [paymentMethod, setPaymentMethod] = useState(
    DEFAULT_VALUES.paymentMethod
  )
  const [fileFormat, setFileFormat] = useState(DEFAULT_VALUES.fileFormat)

  // Reset semua nilai ke kondisi awal
  const handleReset = () => {
    setPeriod(DEFAULT_VALUES.period)
    setStartDate(DEFAULT_VALUES.startDate)
    setEndDate(DEFAULT_VALUES.endDate)
    setTransactionType(DEFAULT_VALUES.transactionType)
    setPaymentMethod(DEFAULT_VALUES.paymentMethod)
    setFileFormat(DEFAULT_VALUES.fileFormat)
  }

  return (
    <div className="export-overlay">
      <div className="export-modal">

        <div className="export-panel">

          {/* HEADER */}
          <div className="export-header">
            <div className="export-header-title">
              <div className="export-icon-box">
                <FileText size={17} />
              </div>

              <div>
                <div className="export-title">
                  Parameter Laporan
                </div>

              </div>
            </div>

            <button
              type="button"
              className="export-reset"
              onClick={handleReset}
            >
              <RotateCcw size={13} />
              Reset Nilai Default
            </button>
          </div>

          {/* RENTANG WAKTU */}
          <div className="export-section">
            <div className="export-section-title">
              Rentang Waktu & Periode
            </div>

            <div className="export-period-grid">

              <button
                type="button"
                className={`export-period ${
                  period === 'bulan' ? 'active' : ''
                }`}
                onClick={() => setPeriod('bulan')}
              >
                Bulan Ini
                <span>(Okt 2026)</span>
              </button>

              <button
                type="button"
                className={`export-period ${
                  period === 'triwulan' ? 'active' : ''
                }`}
                onClick={() => setPeriod('triwulan')}
              >
                Triwulan Ini
              </button>

              <button
                type="button"
                className={`export-period ${
                  period === 'tahun' ? 'active' : ''
                }`}
                onClick={() => setPeriod('tahun')}
              >
                Tahun Ini
                <span>(2026)</span>
              </button>

              <button
                type="button"
                className={`export-period ${
                  period === 'custom' ? 'active' : ''
                }`}
                onClick={() => setPeriod('custom')}
              >
                Kustom Rentang
                <span>Tanggal</span>
              </button>

            </div>

            {/* TANGGAL */}
            <div className="export-date-row">

              <div className="export-date-field">
                <label>Dari Tanggal</label>

                <div className="export-input">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      setPeriod('custom')
                    }}
                  />

                  <CalendarDays size={16} />
                </div>
              </div>

              <div className="export-date-field">
                <label>Sampai Tanggal</label>

                <div className="export-input">
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => {
                      setEndDate(e.target.value)
                      setPeriod('custom')
                    }}
                  />

                  <CalendarDays size={16} />
                </div>
              </div>

            </div>
          </div>

          {/* FILTER */}
          <div className="export-section export-filter-section">

            {/* JENIS TRANSAKSI */}
            <div className="export-field">
              <label>Jenis Transaksi</label>

              <div className="export-select-wrapper">
                <select
                  className="export-select"
                  value={transactionType}
                  onChange={(e) =>
                    setTransactionType(e.target.value)
                  }
                >
                  <option value="semua">
                    Semua Transaksi
                  </option>

                  <option value="tunai">
                    Tunai
                  </option>

                  <option value="transfer">
                    Transfer
                  </option>
                </select>

                <ChevronDown size={16} />
              </div>
            </div>

            {/* METODE PEMBAYARAN */}
            <div className="export-field">
              <label>Metode Pembayaran</label>

              <div className="export-select-wrapper">
                <select
                  className="export-select"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <option value="semua">
                    Semua Metode
                  </option>

                  <option value="cash">
                    Cash
                  </option>

                  <option value="transfer">
                    Transfer
                  </option>
                </select>

                <ChevronDown size={16} />
              </div>
            </div>

          </div>

          {/* FORMAT FILE */}
          <div className="export-section export-format-section">

            <div className="export-format-header">
              <div className="export-section-title">
                Format File Dokumen
              </div>

              <span className="export-recommended">
                PDF Direkomendasikan
              </span>
            </div>

            <div className="export-format-list">

              {/* PDF */}
              <button
                type="button"
                className={`export-format-option ${
                  fileFormat === 'pdf' ? 'selected' : ''
                }`}
                onClick={() => setFileFormat('pdf')}
              >
                <div className="export-radio">
                  {fileFormat === 'pdf' && <div />}
                </div>

                <div className="export-format-icon pdf">
                  <FileText size={17} />
                </div>

                <div className="export-format-text">
                  <strong>PDF (.pdf)</strong>

                  <span>
                    Rekening Koran Resmi
                  </span>

                  <small>
                    Bertanda tangan digital & QR validasi kasir BMS
                  </small>
                </div>
              </button>

              {/* EXCEL */}
              <button
                type="button"
                className={`export-format-option ${
                  fileFormat === 'excel' ? 'selected' : ''
                }`}
                onClick={() => setFileFormat('excel')}
              >
                <div className="export-radio">
                  {fileFormat === 'excel' && <div />}
                </div>

                <div className="export-format-icon excel">
                  <FileSpreadsheet size={17} />
                </div>

                <div className="export-format-text">
                  <strong>
                    Microsoft Excel (.xlsx)
                  </strong>

                  <span>
                    Cocok untuk pengolahan data
                  </span>
                </div>
              </button>

              {/* CSV */}
              <button
                type="button"
                className={`export-format-option ${
                  fileFormat === 'csv' ? 'selected' : ''
                }`}
                onClick={() => setFileFormat('csv')}
              >
                <div className="export-radio">
                  {fileFormat === 'csv' && <div />}
                </div>

                <div className="export-format-icon csv">
                  <FileSpreadsheet size={17} />
                </div>

                <div className="export-format-text">
                  <strong>
                    Comma Separated Values (.csv)
                  </strong>

                  <span>
                    Format data tabel sederhana
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* FOOTER */}
          <div className="export-footer">

            <button
              type="button"
              className="export-cancel"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="button"
              className="export-submit"
            >
              <FileText size={16} />
              Ekspor Dokumen
            </button>

          </div>

        </div>

        {/* CLOSE */}
        <button
          type="button"
          className="export-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={21} />
        </button>

      </div>
    </div>
  )
}