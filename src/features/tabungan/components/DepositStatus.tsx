export function DepositStatus() {
  return (
    <div className="deposit-status-card">

      <div className="deposit-title">

        <div className="success-circle">
          ✓
        </div>

        <strong>
          Setoran Berhasil
        </strong>

        <span>
          Hari ini, 09:41 WIB
        </span>

      </div>


      <div className="deposit-details">

        <div className="deposit-row">
          <span>Nominal Setoran</span>
          <strong className="green">
            + Rp 500.000
          </strong>
        </div>

        <div className="deposit-row">
          <span>Saldo Anda sekarang:</span>
          <strong>
            Rp 5.000.000
          </strong>
        </div>

        <div className="deposit-row">
          <span>Kode transaksi:</span>
          <strong className="transaction-blue">
            TRX-26261801-001
          </strong>
        </div>

      </div>


      <button className="receipt-button">
        ▣ &nbsp; Lihat Resi Tabungan
      </button>

    </div>
  )
}