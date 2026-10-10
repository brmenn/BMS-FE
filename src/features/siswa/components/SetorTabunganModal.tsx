import { useState } from 'react'
import {
  Banknote,
  ChevronDown,
  Info,
  X,
} from 'lucide-react'
import './SetorTabunganModal.css'

interface SetorTabunganModalProps {
  onClose: () => void
}

export function SetorTabunganModal({
  onClose,
}: SetorTabunganModalProps) {
  const [nominal, setNominal] = useState('100000')
  const [metode, setMetode] = useState('tunai')

  const handleNominalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value.replace(/\D/g, '')
    setNominal(value)
  }

  const formatRupiah = (value: string) => {
    if (!value) return '0'

    return Number(value).toLocaleString('id-ID')
  }

  const handleSubmit = () => {
    console.log('Nominal:', nominal)
    console.log('Metode:', metode)

    // Nanti bagian ini bisa disambungkan
    // ke proses simpan transaksi.
  }

  return (
    <div className="setor-modal-overlay">
      <div
        className="setor-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="setor-modal-title"
      >
        {/* HEADER */}
        <div className="setor-modal-header">
          <div className="setor-modal-title-wrap">
            <div className="setor-modal-icon">
              <Banknote size={16} />
            </div>

            <h2
              className="setor-modal-title"
              id="setor-modal-title"
            >
              Setor Tabungan
            </h2>
          </div>

          <button
            type="button"
            className="setor-modal-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="setor-modal-body">

          {/* NOMINAL */}
          <div className="setor-field">
            <label htmlFor="nominal-setoran">
              Nominal Setoran
            </label>

            <div className="setor-nominal-input">
              <span className="setor-rupiah">
                Rp
              </span>

              <input
                id="nominal-setoran"
                type="text"
                inputMode="numeric"
                value={formatRupiah(nominal)}
                onChange={handleNominalChange}
                placeholder="100.000"
              />
            </div>

            <p className="setor-helper">
              Minimal setoran tunai loket sebesar Rp 10.000
            </p>
          </div>

          {/* METODE PEMBAYARAN */}
          <div className="setor-field">
            <label htmlFor="metode-pembayaran">
              Metode Pembayaran
            </label>

            <div className="setor-method-wrapper">
              <div className="setor-method-icon">
                <Banknote size={18} />
              </div>

              <select
                id="metode-pembayaran"
                value={metode}
                onChange={(event) =>
                  setMetode(event.target.value)
                }
              >
                <option value="tunai">
                  Tunai Loket BMS (Sekolah)
                </option>

                <option value="transfer">
                  Transfer Bank
                </option>
              </select>

              <ChevronDown
                className="setor-method-chevron"
                size={16}
              />
            </div>
          </div>

          {/* INFO */}
          <div className="setor-info-box">
            <div className="setor-info-icon">
              <Info size={16} />
            </div>

            <p>
              Setoran loket akan diverifikasi langsung oleh
              petugas teller BMS saat jam operasional sekolah.
            </p>
          </div>

          {/* ACTION */}
          <div className="setor-modal-actions">

            <button
              type="button"
              className="setor-cancel-btn"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="button"
              className="setor-submit-btn"
              onClick={handleSubmit}
              disabled={!nominal || Number(nominal) < 10000}
            >
              Simpan / Lanjutkan
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}