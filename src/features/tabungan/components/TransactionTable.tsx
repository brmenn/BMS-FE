import { useState } from 'react'
import { Banknote, Download, Landmark } from 'lucide-react'
import { ExportModal } from './ExportModal'

export type Transaction = {
  code: string
  date: string
  month: string
  type: string
  method: string
  amount: string
  status: string
  typeClass: 'deposit' | 'withdraw'
}

const transactions: Transaction[] = [
  { code: 'TRX-00123', date: '01 Okt 2026', month: '2026-10', type: 'Setoran', method: 'Transfer', amount: '+Rp 500.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00120', date: '25 Sep 2026', month: '2026-09', type: 'Penarikan', method: 'Tunai', amount: '-Rp 300.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00115', date: '10 Sep 2026', month: '2026-09', type: 'Setoran', method: 'Tunai', amount: '+Rp 1.000.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00108', date: '28 Agu 2026', month: '2026-08', type: 'Penarikan', method: 'Transfer', amount: '-Rp 500.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00101', date: '21 Agu 2026', month: '2026-08', type: 'Setoran', method: 'Tunai', amount: '+Rp 750.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00095', date: '14 Agu 2026', month: '2026-08', type: 'Penarikan', method: 'Tunai', amount: '-Rp 150.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00088', date: '07 Agu 2026', month: '2026-08', type: 'Setoran', method: 'Transfer', amount: '+Rp 250.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00081', date: '31 Jul 2026', month: '2026-07', type: 'Penarikan', method: 'Transfer', amount: '-Rp 900.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00074', date: '24 Jul 2026', month: '2026-07', type: 'Setoran', method: 'Tunai', amount: '+Rp 1.500.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00067', date: '17 Jul 2026', month: '2026-07', type: 'Penarikan', method: 'Tunai', amount: '-Rp 200.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00060', date: '10 Jul 2026', month: '2026-07', type: 'Setoran', method: 'Transfer', amount: '+Rp 350.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00053', date: '03 Jul 2026', month: '2026-07', type: 'Penarikan', method: 'Transfer', amount: '-Rp 450.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00046', date: '26 Jun 2026', month: '2026-06', type: 'Setoran', method: 'Tunai', amount: '+Rp 2.000.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00039', date: '19 Jun 2026', month: '2026-06', type: 'Penarikan', method: 'Transfer', amount: '-Rp 100.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00032', date: '12 Jun 2026', month: '2026-06', type: 'Setoran', method: 'Tunai', amount: '+Rp 800.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00025', date: '05 Jun 2026', month: '2026-06', type: 'Penarikan', method: 'Tunai', amount: '-Rp 650.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00018', date: '29 Mei 2026', month: '2026-05', type: 'Setoran', method: 'Transfer', amount: '+Rp 1.250.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00011', date: '22 Mei 2026', month: '2026-05', type: 'Penarikan', method: 'Transfer', amount: '-Rp 400.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00004', date: '15 Mei 2026', month: '2026-05', type: 'Setoran', method: 'Tunai', amount: '+Rp 175.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00003', date: '08 Mei 2026', month: '2026-05', type: 'Penarikan', method: 'Tunai', amount: '-Rp 275.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00002', date: '01 Mei 2026', month: '2026-05', type: 'Setoran', method: 'Transfer', amount: '+Rp 975.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00001', date: '24 Apr 2026', month: '2026-04', type: 'Penarikan', method: 'Tunai', amount: '-Rp 125.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00000', date: '17 Apr 2026', month: '2026-04', type: 'Setoran', method: 'Transfer', amount: '+Rp 425.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00999', date: '10 Apr 2026', month: '2026-04', type: 'Penarikan', method: 'Tunai', amount: '-Rp 550.000', status: 'Selesai', typeClass: 'withdraw' },
]

const PER_PAGE = 4

type TypeFilter = 'semua' | 'setoran' | 'penarikan'

const monthOptions = Array.from(new Set(transactions.map((t) => t.month)))
  .sort()
  .reverse()
  .map((value) => ({
    value,
    label: new Date(
      Number(value.slice(0, 4)),
      Number(value.slice(5, 7)) - 1,
      1,
    ).toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    }),
  }))

  interface TransactionTableProps {
  onReceiptClick: (transaction: Transaction) => void
}

export function TransactionTable({
  onReceiptClick,
}: TransactionTableProps) {

  const [typeFilter, setTypeFilter] = useState<TypeFilter>('semua')
  const [monthFilter, setMonthFilter] = useState('semua')
  const [page, setPage] = useState(1)
  const [showExportModal, setShowExportModal] = useState(false)

  const visible = transactions.filter(
    (tx) =>
      (typeFilter === 'semua' ||
        tx.typeClass === (typeFilter === 'setoran' ? 'deposit' : 'withdraw')) &&
      (monthFilter === 'semua' || tx.month === monthFilter),
  )
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE))
  const pageRows = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <section className="transaction-card">

      {/* HEADER TABLE */}
      <div className="transaction-header">

        <div>
          <h3>
            Riwayat Transaksi Tabungan
          </h3>

          <p>
            Daftar mutasi kredit dan debit rekening tabungan Anda.
          </p>
        </div>


        <div className="transaction-actions">

          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            >
            <Download size={12} aria-hidden="true" />
            &nbsp; Ekspor Data
            </button>

        </div>

      </div>


      {/* FILTER */}
      <div className="transaction-filter">

        <div className="search-input">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Cari transaksi..."
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) => {
            setTypeFilter(event.target.value as TypeFilter)
            setPage(1)
          }}
          aria-label="Filter jenis transaksi"
        >
          <option value="semua">
            Semua Transaksi
          </option>
          <option value="setoran">
            Setoran
          </option>
          <option value="penarikan">
            Penarikan
          </option>
        </select>

        <select
          value={monthFilter}
          onChange={(event) => {
            setMonthFilter(event.target.value)
            setPage(1)
          }}
          aria-label="Filter bulan transaksi"
        >
          <option value="semua">
            Semua Bulan
          </option>
          {monthOptions.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

      </div>


      {/* TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>KODE TRANSAKSI</th>
              <th>TANGGAL</th>
              <th>JENIS</th>
              <th>METODE</th>
              <th>NOMINAL</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>

          <tbody>

            {pageRows.length === 0 && (
              <tr>
                <td colSpan={7} className="table-empty">
                  Tidak ada transaksi
                </td>
              </tr>
            )}

            {pageRows.map((transaction) => (

              <tr key={transaction.code}>

                <td>
                  <span className="code">
                    {transaction.code}
                  </span>
                </td>

                <td>
                  {transaction.date}
                </td>

                <td>
                  <span
                    className={`transaction-type ${transaction.typeClass}`}
                  >
                    {transaction.typeClass === 'deposit'
                      ? '↑'
                      : '↓'}

                    &nbsp;

                    {transaction.type}
                  </span>
                </td>

                <td>
                  <span className="method">
                    {transaction.method === 'Transfer'
                      ? <Landmark size={11} aria-hidden="true" />
                      : <Banknote size={11} aria-hidden="true" />}

                    &nbsp;

                    {transaction.method}
                  </span>
                </td>

                <td>

                  <strong
                    className={
                      transaction.typeClass === 'deposit'
                        ? 'amount-positive'
                        : 'amount-negative'
                    }
                  >
                    {transaction.amount}
                  </strong>

                </td>

                <td>
                  <span className="status">
                    {transaction.status}
                  </span>
                </td>

                <td>
                  <button
                className="receipt-small"
                type="button"
                onClick={() => onReceiptClick(transaction)}
                >
                ▣ &nbsp; Resi
                </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* FOOTER TABLE */}
      <div className="table-footer">

        <span>
          {pageRows.length === 0
            ? 'Tidak ada transaksi'
            : `Menampilkan ${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, visible.length)} dari ${visible.length} transaksi`}
        </span>

        <div className="pagination">

          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={page === n ? 'page-active' : ''}
              aria-current={page === n ? 'page' : undefined}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Selanjutnya
          </button>

        </div>

      </div>

      {showExportModal && (
        <ExportModal
            onClose={() => setShowExportModal(false)}
        />
        )}

    </section>
  )
}
