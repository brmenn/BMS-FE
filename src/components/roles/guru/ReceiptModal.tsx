import {
  X,
  CheckCircle2,
  UserRound,
  WalletCards,
  ArrowDownToLine,
} from 'lucide-react'
import schoolLogo from '@/assets/logo/school-logo.png'
import type { ReceiptData } from './receipt-data'
import { DEFAULT_RECEIPT } from './receipt-data'

interface ReceiptModalProps {
  onClose: () => void
  data?: ReceiptData
}

export function ReceiptModal({ onClose, data = DEFAULT_RECEIPT }: ReceiptModalProps) {
  return (
    <div
      className="receipt-modal-overlay"
      onClick={onClose}
    >
      <div
        className="receipt-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          className="receipt-modal-close"
          onClick={onClose}
          aria-label="Tutup resi"
        >
          <X size={18} />
        </button>

        {/* HEADER */}
        <div className="receipt-official">
          <div className="receipt-brand">
            <img
              src={schoolLogo}
              alt="BMS"
              className="receipt-logo"
            />

            <div>
              <h2>BMS SMKS Muhammadiyah 1 Genteng</h2>
              <p>
                Unit Pengelola Keuangan Siswa - Bank Mini Sekolah (BMS)
              </p>
            </div>
          </div>

          <p className="receipt-address">
            Jl. KH. Agus Salim No. 99, Genteng, Banyuwangi, Jawa Timur 68465
            <br />
            Telp: (0333) 845123
          </p>
        </div>

        {/* STATUS + NOMINAL */}
        <div className="receipt-status">
          <div className="receipt-status-tag">
            <CheckCircle2 size={14} />
            <span>BERHASIL / TRANSAKSI VALID</span>
          </div>

          <span className="receipt-amount-label">
            NOMINAL SETORAN TABUNGAN
          </span>

          <strong className="receipt-amount">
            {data.amount}
          </strong>

          <span className="receipt-spelled">
            # Terbilang: {data.spelled} #
          </span>
        </div>

        {/* METADATA */}
        <div className="receipt-metadata">
          <div>
            <span>No. Referensi Transaksi</span>
            <strong>{data.reference}</strong>
          </div>

          <div>
            <span>Jenis Layanan</span>
            <strong>{data.service}</strong>
          </div>

          <div>
            <span>Waktu & Tanggal Pembukuan</span>
            <strong>{data.datetime}</strong>
          </div>

          <div>
            <span>Kanal Transaksi</span>
            <strong>{data.channel}</strong>
          </div>
        </div>

        {/* DATA NASABAH */}
        <div className="receipt-section">
          <div className="receipt-section-title">
            <UserRound size={14} />
            <strong>DATA NASABAH SISWA</strong>
          </div>

          <div className="receipt-data-grid">
            <span>Nama Lengkap</span>
            <strong>{data.customerName}</strong>

            <span>Nomor Induk Siswa (NISN)</span>
            <strong className="receipt-mono">
              {data.nisn}
            </strong>

            <span>Kelas & Program Keahlian</span>
            <strong>
              {data.classProgram}
            </strong>

            <span>Nomor Rekening BMS</span>
            <strong className="receipt-blue receipt-mono">
              {data.accountNumber}
            </strong>
          </div>
        </div>

        {/* RINCIAN SALDO */}
        <div className="receipt-section">
          <div className="receipt-section-title">
            <WalletCards size={14} />
            <strong>RINCIAN PEMBUKUAN SALDO</strong>
          </div>

          <div className="receipt-balance">
            <div>
              <span>Saldo Awal</span>
              <strong>{data.openingBalance}</strong>
            </div>

            <div className="receipt-green-row">
              <span>
                <ArrowDownToLine size={12} />
                Setoran Masuk (+)
              </span>

              <strong>{data.depositAmount}</strong>
            </div>

            <div>
              <span>Biaya Administrasi Bank</span>
              <strong>Rp 0 (Bebas Biaya)</strong>
            </div>

            <div className="receipt-total">
              <strong>Total Saldo Akhir</strong>
              <strong>{data.closingBalance}</strong>
            </div>
          </div>

          <div className="receipt-memo">
            <strong>Berita Acara / Memo:</strong>
            <p>
              {data.memo}
            </p>
          </div>
        </div>

        {/* PERFORATION */}
        <div className="receipt-perforation">
          <span />
        </div>

        {/* FOOTER */}
        <div className="receipt-footer">
          <div>
            <span>Petugas Teller / Kasir:</span>
            <strong>{data.tellerName}</strong>
            <small>{data.tellerId}</small>
          </div>

          <div className="receipt-verified">
            VERIFIED DIGITAL
            <br />
            SIGNATURE
          </div>
        </div>

        <div className="receipt-note">
          Struk ini merupakan bukti pembayaran dan pembukuan tabungan yang sah
          pada sistem Bank Mini Sekolah SMKS Muhammadiyah 1 Genteng. Harap
          simpan tanda bukti ini sebagai rujukan bila diperlukan pencocokan
          saldo buku rekening.
        </div>
      </div>
    </div>
  )
}