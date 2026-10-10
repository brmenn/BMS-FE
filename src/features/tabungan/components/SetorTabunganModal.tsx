import { useState } from 'react'
import {
  X,
  WalletCards,
  Banknote,
  Building2,
} from 'lucide-react'

interface SetorTabunganModalProps {
  onClose: () => void
}

export function SetorTabunganModal({
  onClose,
}: SetorTabunganModalProps) {
  const [nominal, setNominal] = useState('500000')
  const [method, setMethod] = useState<'cash' | 'transfer'>('cash')

  const formatRupiah = (value: string) => {
    const number = value.replace(/\D/g, '')

    if (!number) return ''

    return new Intl.NumberFormat('id-ID').format(Number(number))
  }

  const handleNominalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, '')
    setNominal(value)
  }

  const handleConfirm = () => {
    const amount = Number(nominal)

    if (amount < 50000) {
      alert('Minimal setoran adalah Rp 50.000')
      return
    }

    alert('Setoran berhasil dikonfirmasi!')
    onClose()
  }

  return (
    <div
      className="deposit-modal-overlay"
      onClick={onClose}
    >
      <div
        className="deposit-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="deposit-modal-header">

          <div className="deposit-modal-title">
            <div className="deposit-modal-icon">
              <WalletCards size={15} />
            </div>

            <h2>Setor Tabungan</h2>
          </div>

          <button
            className="deposit-modal-close"
            onClick={onClose}
          >
            <X size={15} />
          </button>

        </div>


        {/* CONTENT */}
        <div className="deposit-modal-content">

          {/* NOMINAL */}
          <div className="modal-field">

            <label>
              Nominal Setoran
            </label>

            <div className="nominal-input">

              <span>Rp</span>

              <input
                type="text"
                value={formatRupiah(nominal)}
                onChange={handleNominalChange}
                placeholder="500.000"
              />

            </div>

            <small>
              Minimal setoran tunai atau transfer Rp 50.000
            </small>

          </div>


          {/* METODE */}
          <div className="modal-field">

            <label>
              Pilihan Metode Pembayaran
            </label>


            {/* CASH */}
            <button
              type="button"
              className={`payment-method ${
                method === 'cash' ? 'selected' : ''
              }`}
              onClick={() => setMethod('cash')}
            >

              <div className="method-radio">
                {method === 'cash' && (
                  <span />
                )}
              </div>

              
              <div className="method-text">

                <strong>
                  Cash (Loket Kasir)
                </strong>
                <span>
                  Bayar langsung di loket keuangan SMK Muhi
                </span>

                <div className="method-icon">
                <Banknote size={14} />
              </div>

              </div>

            </button>


            {/* TRANSFER */}
            <button
              type="button"
              className={`payment-method ${
                method === 'transfer' ? 'selected' : ''
              }`}
              onClick={() => setMethod('transfer')}
            >

              <div className="method-radio">
                {method === 'transfer' && (
                  <span />
                )}
              </div>

              <div className="method-icon">
                <Building2 size={14} />
              </div>

              <div className="method-text">

                <strong>
                  Transfer Virtual Account
                </strong>

                <span>
                  Bank Muamalat / BSI Otomatis
                </span>

              </div>

            </button>

          </div>


          {/* REKENING */}
          <div className="account-info">

            <span>
              Tujuan Rekening Pegawai
            </span>

            <strong>
              GKR-001234 (Ahmad Dahlan)
            </strong>

          </div>

        </div>


        {/* FOOTER */}
        <div className="deposit-modal-footer">

          <button
            className="modal-cancel"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            className="modal-confirm"
            onClick={handleConfirm}
          >
            Konfirmasi Setoran
          </button>

        </div>

      </div>
    </div>
  )
}