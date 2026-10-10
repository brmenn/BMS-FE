import { Wallet } from 'lucide-react'

interface TabunganSummaryProps {
    onSetorClick: () => void
}

export function TabunganSummary({
    onSetorClick,
}: TabunganSummaryProps) {
  return (
    <div className="saving-summary-card">

      <div className="saving-summary-top">

        <div>
          <p className="saving-label">
            Saldo Tabungan
          </p>

          <h2>
            Rp 4.500.000
          </h2>

          <p className="saving-account">
            Rekening: GKR-001234
            <span>▣</span>
          </p>
        </div>

        <div className="active-account">
          ● &nbsp; Akun Aktif
        </div>

      </div>


      <div className="saving-wallet" aria-hidden="true">
        <Wallet strokeWidth={1} />
      </div>


      <div className="saving-line" />


      <div className="saving-buttons">

        <button 
        className="deposit-button"
        onClick={onSetorClick}
        >
          ⊕ &nbsp; Setor Tabungan
        </button>


      </div>


      <div className="saving-security">
        ◉ &nbsp; Diasuransikan LPS & Audit Mutu
      </div>

    </div>
  )
}