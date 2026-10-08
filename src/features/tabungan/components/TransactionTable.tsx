const transactions = [
  {
    code: 'TRX-00123',
    date: '01 Okt 2026',
    type: 'Setoran',
    method: 'Transfer',
    amount: '+Rp 500.000',
    status: 'Berhasil',
    typeClass: 'deposit',
  },
  {
    code: 'TRX-00120',
    date: '25 Sep 2026',
    method: 'Cash',
    amount: '-Rp 300.000',
    status: 'Selesai',
    typeClass: 'withdraw',
  },
  {
    code: 'TRX-00115',
    date: '10 Sep 2026',
    type: 'Setoran',
    method: 'Cash',
    amount: '+Rp 1.000.000',
    status: 'Berhasil',
    typeClass: 'deposit',
  },
  {
    code: 'TRX-00108',
    date: '28 Agu 2026',
    method: 'Transfer',
    amount: '-Rp 500.000',
    status: 'Selesai',
    typeClass: 'withdraw',
  },
]

export function TransactionTable() {
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

          <button>
            ▣ &nbsp; Cetak Buku
          </button>

          <button>
            ♨ &nbsp; Ekspor Data
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

        <select defaultValue="all">
          <option value="all">
            Semua Transaksi ▼
          </option>
        </select>

        <select defaultValue="october">
          <option value="october">
            Bulan Oktober 2026 ▼
          </option>
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

            {transactions.map((transaction) => (

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
                      ? '♜'
                      : '▣'}

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
                  <button className="receipt-small">
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
          Menampilkan 4 dari 24 transaksi
        </span>

        <div className="pagination">

          <button disabled>
            Sebelumnya
          </button>

          <button className="page-active">
            1
          </button>

          <button>
            2
          </button>

          <button>
            3
          </button>

          <button>
            Selanjutnya
          </button>

        </div>

      </div>

    </section>
  )
}