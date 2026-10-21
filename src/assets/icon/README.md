# Ikon SVG

Semua ikon vektor. Penamaan: `kebab-case`, tanpa prefix `icon-` (nama folder sudah menggantikan konteks), variasi warna pakai suffix (`-gray`, `-blue`). Ikon sidebar di-render sebagai mask `currentColor` oleh `DashboardSidebar`, sehingga `fill` di file mana pun diabaikan di konteks itu.

## nav/
Menu sidebar & navigasi antar halaman.

`dashboard` · `tabungan` · `penarikan` · `pinjaman` · `pembayaran-pinjaman` (siswa/guru) · `laporan-arus-kas` · `laporan-petugas-piket` · `wallet-plus` (menu laporan tabungan, admin)

## report/
Komponen visual khusus halaman laporan (Laporan Arus Kas, Laporan Petugas Piket).

`filter-kas` · `filter-period` · `search` · `dot-calendar` · `panel` · `audit` · `cash` · `atm` · `student-fund` · `staff-fund` · `grand-total` · `pemasukan` · `pengeluaran` · `recap` · `recap-gray`
Catatan: `arus-kas`, `dot-calendar`, `panel` belum direferensikan di kode (cadangan).

## misc/
Ikon dekorasi & dukungan di luar navigasi/laporan.

`arrow-bottom-right` · `arrow-top-right` (tombol/kanan-atas kartu) · `calendar-clock` · `calendar-clock-money` · `calendar-x` (chip tanggal/status) · `building` · `briefcase` · `user-board` (kartu ringkasan dashboard admin) · `resi-tabungan` (mask resi via CSS) · `wallet-plus-blue` (watermark kartu saldo)
