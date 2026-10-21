# Daftar Endpoint yang Dibutuhkan Frontend (berdasarkan flow)

Sumber rute: backend `routes/api.php` (111 endpoint API v1). Field request dari FormRequest, field response dari Resource. Contoh JSON adalah rekonstruksi (nilai placeholder).

Catatan flow tabungan (terbaru): setoran dilakukan melalui loket; siswa/guru/karyawan hanya melihat saldo & riwayat, Admin mencatat setoran (nominal + metode CASH/TRANSFER). Endpoint `POST /tabungan/setoran` (izin `SAVINGS.DEPOSIT`) dipakai untuk pencatatan loket.

Catatan: path pada dokumen ini sudah diterjemahkan ke Bahasa Indonesia. Path asli backend (English) tercantum pada pemetaan di bawah.

| Path asli (English) | Path Indonesia |
|---|---|
| `/account` | `/akun` |
| `/accounts` | `/akun` |
| `/active` | `/aktif` |
| `/activity` | `/aktivitas` |
| `/admin` | `/admin` |
| `/approve` | `/setujui` |
| `/approvals` | `/persetujuan` |
| `/attachments` | `/lampiran` |
| `/audit-logs` | `/log-audit` |
| `/auth` | `/autentikasi` |
| `/balance` | `/saldo` |
| `/balance-adjustments` | `/penyesuaian-saldo` |
| `/categories` | `/kategori` |
| `/cash-flow` | `/arus-kas` |
| `/complete` | `/selesai` |
| `/confirm` | `/konfirmasi` |
| `/dashboard` | `/dasbor` |
| `/deposits` | `/setoran` |
| `/disburse` | `/cairkan` |
| `/download` | `/unduh` |
| `/employee` | `/karyawan` |
| `/expense` | `/pengeluaran` |
| `/expenses` | `/pengeluaran` |
| `/export` | `/ekspor` |
| `/export-now` | `/ekspor-sekarang` |
| `/history` | `/riwayat` |
| `/image` | `/gambar` |
| `/income` | `/pemasukan` |
| `/incomes` | `/pemasukan` |
| `/installments` | `/cicilan` |
| `/journals` | `/jurnal` |
| `/loan-schedule` | `/jadwal-pinjaman` |
| `/loan-types` | `/jenis-pinjaman` |
| `/loans` | `/pinjaman` |
| `/login` | `/masuk` |
| `/logout` | `/keluar` |
| `/logout-all` | `/keluar-semua` |
| `/me` | `/profil` |
| `/mutation` | `/mutasi` |
| `/notifications` | `/notifikasi` |
| `/otp` | `/kode-otp` |
| `/overdue` | `/jatuh-tempo` |
| `/password` | `/kata-sandi` |
| `/payment-methods` | `/metode-pembayaran` |
| `/payment-types` | `/jenis-pembayaran` |
| `/payments` | `/pembayaran` |
| `/pending` | `/menunggu` |
| `/permissions` | `/izin` |
| `/print` | `/cetak` |
| `/read` | `/baca` |
| `/read-all` | `/baca-semua` |
| `/register` | `/daftar` |
| `/reject` | `/tolak` |
| `/receipts` | `/resi` |
| `/reports` | `/laporan` |
| `/request` | `/permintaan` |
| `/reset` | `/atur-ulang` |
| `/reset-password` | `/atur-ulang-kata-sandi` |
| `/role` | `/peran` |
| `/roles` | `/peran` |
| `/savings` | `/tabungan` |
| `/savings-slip` | `/slip-tabungan` |
| `/status` | `/status` |
| `/student` | `/siswa` |
| `/students` | `/siswa` |
| `/summary` | `/ringkasan` |
| `/super-admin` | `/super-admin` |
| `/transaction-types` | `/jenis-transaksi` |
| `/transactions` | `/transaksi` |
| `/unread-count` | `/belum-dibaca` |
| `/users` | `/pengguna` |
| `/verify` | `/verifikasi` |
| `/webhooks` | `/webhook` |
| `/whatsapp` | `/whatsapp` |
| `/withdrawals` | `/penarikan` |
| `/{account}` | `/{akun}` |
| `/{category}` | `/{kategori}` |
| `/{dataId}` | `/{idData}` |
| `/{dataType}` | `/{tipeData}` |
| `/{export}` | `/{ekspor}` |
| `/{loan}` | `/{pinjaman}` |
| `/{paymentId}` | `/{idPembayaran}` |
| `/{student}` | `/{siswa}` |
| `/{transactionCode}` | `/{kodeTransaksi}` |

Base URL: `/api/v1`. Envelope: `{ success, data, meta?, request_id }`. Money selalu string.

## approvals

### GET `/persetujuan`
- Izin: `APPROVAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `approval_flow_id`, `reference_type`, `reference_id`, `requested_by`, `processed_by`, `decision`, `decision_label`, `notes`, `processed_at`, `created_at`, `flow`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "approval_flow_id": 1,
      "reference_type": "string",
      "reference_id": 1,
      "requested_by": "string",
      "processed_by": "string",
      "decision": "string",
      "decision_label": "string",
      "notes": "string",
      "processed_at": "2026-10-21T10:00:00Z",
      "created_at": "2026-10-21T10:00:00Z",
      "flow": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/persetujuan/menunggu`
- Izin: `APPROVAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `approval_flow_id`, `reference_type`, `reference_id`, `requested_by`, `processed_by`, `decision`, `decision_label`, `notes`, `processed_at`, `created_at`, `flow`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "approval_flow_id": 1,
      "reference_type": "string",
      "reference_id": 1,
      "requested_by": "string",
      "processed_by": "string",
      "decision": "string",
      "decision_label": "string",
      "notes": "string",
      "processed_at": "2026-10-21T10:00:00Z",
      "created_at": "2026-10-21T10:00:00Z",
      "flow": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/persetujuan/{id}`
- Izin: `APPROVAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `approval_flow_id`, `reference_type`, `reference_id`, `requested_by`, `processed_by`, `decision`, `decision_label`, `notes`, `processed_at`, `created_at`, `flow`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "approval_flow_id": 1,
      "reference_type": "string",
      "reference_id": 1,
      "requested_by": "string",
      "processed_by": "string",
      "decision": "string",
      "decision_label": "string",
      "notes": "string",
      "processed_at": "2026-10-21T10:00:00Z",
      "created_at": "2026-10-21T10:00:00Z",
      "flow": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

## attachments

### DELETE `/lampiran/{id}`
- Izin: `ATTACHMENT.MANAGE`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/lampiran/{id}/unduh`
- Izin: `ATTACHMENT.MANAGE,LOAN_PAYMENT.READ,JOURNAL.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## audit-logs

### GET `/log-audit`
- Izin: `AUDIT.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `user_id`, `action`, `data_type`, `data_id`, `before_data`, `after_data`, `amount`, `ip_address`, `user_agent`, `request_id`, `created_at`, `user`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "action": "string",
      "data_type": "string",
      "data_id": 1,
      "before_data": "string",
      "after_data": "string",
      "amount": "100000.00",
      "ip_address": "string",
      "user_agent": "string",
      "request_id": 1,
      "created_at": "2026-10-21T10:00:00Z",
      "user": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/log-audit/{id}`
- Izin: `AUDIT.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `user_id`, `action`, `data_type`, `data_id`, `before_data`, `after_data`, `amount`, `ip_address`, `user_agent`, `request_id`, `created_at`, `user`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "action": "string",
      "data_type": "string",
      "data_id": 1,
      "before_data": "string",
      "after_data": "string",
      "amount": "100000.00",
      "ip_address": "string",
      "user_agent": "string",
      "request_id": 1,
      "created_at": "2026-10-21T10:00:00Z",
      "user": "string"
    },
    "request_id": "uuid"
  }
  ```

## auth

### POST `/auth/login`
- Izin: (publik/auth saja)
- Field body request: `identifier`, `password`
  ```json
  {
    "identifier": "string",
    "password": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/auth/logout`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### POST `/auth/logout-all`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/auth/me`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### POST `/auth/otp/request`
- Izin: (publik/auth saja)
- Field body request: `otp`, `purpose`, `purpose`
  ```json
  {
    "otp": "string",
    "purpose": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/auth/otp/verify`
- Izin: (publik/auth saja)
- Field body request: `otp`, `purpose`, `purpose`
  ```json
  {
    "otp": "string",
    "purpose": "string"
  }
  ```
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### POST `/auth/password/reset/confirm`
- Izin: (publik/auth saja)
- Field body request: `reset_token`, `password`
  ```json
  {
    "reset_token": "string",
    "password": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/auth/password/reset/request`
- Izin: (publik/auth saja)
- Field body request: `email`, `otp`, `email`
  ```json
  {
    "email": "user@example.com",
    "otp": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/auth/password/reset/verify`
- Izin: (publik/auth saja)
- Field body request: `email`, `otp`, `email`
  ```json
  {
    "email": "user@example.com",
    "otp": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/auth/register`
- Izin: (publik/auth saja)
- Field body request: `username`, `email`, `password`, `full_name`, `phone`, `role`, `student_number`, `class`, `academic_year`, `guardian_name`, `guardian_phone`, `employee_number`, `position`, `department`
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string",
    "full_name": "string",
    "phone": "08123456789",
    "role": "string",
    "student_number": "string",
    "class": "string",
    "academic_year": "string",
    "guardian_name": "string",
    "guardian_phone": "08123456789",
    "employee_number": "string",
    "position": "string",
    "department": "string"
  }
  ```
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

## balance-adjustments

### GET `/penyesuaian-saldo`
- Izin: (publik/auth saja)
- Field body request: `saving_account_id`, `user_id`, `adjustment_type`
  ```json
  {
    "saving_account_id": 1,
    "user_id": 1,
    "adjustment_type": "string"
  }
  ```
- Field data response: `id`, `saving_account_id`, `performed_by`, `transaction_code`, `amount`, `direction`, `adjustment_type`, `adjustment_type_label`, `reason`, `created_at`, `account`, `performer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "performed_by": "string",
      "transaction_code": "CODE",
      "amount": "100000.00",
      "direction": "string",
      "adjustment_type": "string",
      "adjustment_type_label": "string",
      "reason": "string",
      "created_at": "2026-10-21T10:00:00Z",
      "account": 1,
      "performer": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/penyesuaian-saldo/akun/{akun}`
- Izin: `SAVINGS.MANAGE`
- Field body request: `amount`, `adjustment_type`, `reason`
  ```json
  {
    "amount": "100000.00",
    "adjustment_type": "string",
    "reason": "string"
  }
  ```
- Field data response: `id`, `saving_account_id`, `performed_by`, `transaction_code`, `amount`, `direction`, `adjustment_type`, `adjustment_type_label`, `reason`, `created_at`, `account`, `performer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "performed_by": "string",
      "transaction_code": "CODE",
      "amount": "100000.00",
      "direction": "string",
      "adjustment_type": "string",
      "adjustment_type_label": "string",
      "reason": "string",
      "created_at": "2026-10-21T10:00:00Z",
      "account": 1,
      "performer": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/penyesuaian-saldo/{id}`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Field data response: `id`, `saving_account_id`, `performed_by`, `transaction_code`, `amount`, `direction`, `adjustment_type`, `adjustment_type_label`, `reason`, `created_at`, `account`, `performer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "performed_by": "string",
      "transaction_code": "CODE",
      "amount": "100000.00",
      "direction": "string",
      "adjustment_type": "string",
      "adjustment_type_label": "string",
      "reason": "string",
      "created_at": "2026-10-21T10:00:00Z",
      "account": 1,
      "performer": "string"
    },
    "request_id": "uuid"
  }
  ```

## cash-flow

### GET `/arus-kas`
- Izin: `CASH_FLOW.READ`
- Field body request: `flow_type`, `category_id`, `payment_method_id`, `is_automatic`, `start_date`, `end_date`, `page`, `per_page`
  ```json
  {
    "flow_type": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "is_automatic": "string",
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "page": 1,
    "per_page": 1
  }
  ```
- Field data response: `id`, `category_id`, `user_id`, `transaction_code`, `amount`, `flow_type`, `flow_type_label`, `description`, `is_automatic`, `transaction_at`, `category`, `code`, `name`, `payment_method`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "category_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "flow_type": "string",
      "flow_type_label": "string",
      "description": "string",
      "is_automatic": "string",
      "transaction_at": "2026-10-21T10:00:00Z",
      "category": "string",
      "code": "CODE",
      "name": "string",
      "payment_method": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/arus-kas/kategori`
- Izin: `CASH_FLOW.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `flow_type`, `is_system`, `is_active`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "flow_type": "string",
      "is_system": "string",
      "is_active": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/arus-kas/kategori`
- Izin: `CASH_FLOW.CATEGORY_MANAGE`
- Field body request: `code`, `name`, `flow_type`, `is_active`
  ```json
  {
    "code": "CODE",
    "name": "string",
    "flow_type": "string",
    "is_active": "string"
  }
  ```
- Field data response: `id`, `code`, `name`, `flow_type`, `is_system`, `is_active`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "flow_type": "string",
      "is_system": "string",
      "is_active": "string"
    },
    "request_id": "uuid"
  }
  ```

### PATCH `/arus-kas/kategori/{kategori}`
- Izin: `CASH_FLOW.CATEGORY_MANAGE`
- Field body request: `code`, `name`, `flow_type`, `is_active`
  ```json
  {
    "code": "CODE",
    "name": "string",
    "flow_type": "string",
    "is_active": "string"
  }
  ```
- Field data response: `id`, `code`, `name`, `flow_type`, `is_system`, `is_active`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "flow_type": "string",
      "is_system": "string",
      "is_active": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/arus-kas/pengeluaran`
- Izin: `CASH_FLOW.CREATE`
- Field body request: `category_id`, `amount`, `description`, `payment_method_id`, `transaction_at`
  ```json
  {
    "category_id": 1,
    "amount": "100000.00",
    "description": "string",
    "payment_method_id": 1,
    "transaction_at": "2026-10-21T10:00:00Z"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/arus-kas/pemasukan`
- Izin: `CASH_FLOW.CREATE`
- Field body request: `category_id`, `amount`, `description`, `payment_method_id`, `transaction_at`
  ```json
  {
    "category_id": 1,
    "amount": "100000.00",
    "description": "string",
    "payment_method_id": 1,
    "transaction_at": "2026-10-21T10:00:00Z"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/arus-kas/ringkasan`
- Izin: `CASH_FLOW.READ`
- Field body request: `flow_type`, `category_id`, `payment_method_id`, `is_automatic`, `start_date`, `end_date`, `page`, `per_page`
  ```json
  {
    "flow_type": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "is_automatic": "string",
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "page": 1,
    "per_page": 1
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/arus-kas/{id}`
- Izin: `CASH_FLOW.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `category_id`, `user_id`, `transaction_code`, `amount`, `flow_type`, `flow_type_label`, `description`, `is_automatic`, `transaction_at`, `category`, `code`, `name`, `payment_method`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "category_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "flow_type": "string",
      "flow_type_label": "string",
      "description": "string",
      "is_automatic": "string",
      "transaction_at": "2026-10-21T10:00:00Z",
      "category": "string",
      "code": "CODE",
      "name": "string",
      "payment_method": "string"
    },
    "request_id": "uuid"
  }
  ```

## dashboard

### GET `/dasbor/admin`
- Izin: `DASHBOARD.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/dasbor/karyawan`
- Izin: `DASHBOARD.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/dasbor/siswa`
- Izin: `DASHBOARD.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/dasbor/super-admin`
- Izin: `DASHBOARD.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## journals

### GET `/jurnal`
- Izin: `JOURNAL.READ`
- Field body request: `student_id`, `class`, `status`, `recorded_by`
  ```json
  {
    "student_id": 1,
    "class": "string",
    "status": "active",
    "recorded_by": "string"
  }
  ```
- Field data response: `id`, `student_id`, `officer_id`, `title`, `description`, `status`, `status_label`, `recorded_by`, `recorded_at`, `has_image`, `image_url`, `journal`, `student`, `officer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "student_id": 1,
      "officer_id": 1,
      "title": "string",
      "description": "string",
      "status": "active",
      "status_label": "active",
      "recorded_by": "string",
      "recorded_at": "2026-10-21T10:00:00Z",
      "has_image": "string",
      "image_url": "string",
      "journal": "string",
      "student": "string",
      "officer": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/jurnal`
- Izin: `JOURNAL.CREATE`
- Field body request: `student_id`, `title`, `description`, `status`, `recorded_at`, `image`
  ```json
  {
    "student_id": 1,
    "title": "string",
    "description": "string",
    "status": "active",
    "recorded_at": "2026-10-21T10:00:00Z",
    "image": "string"
  }
  ```
- Field data response: `id`, `student_id`, `officer_id`, `title`, `description`, `status`, `status_label`, `recorded_by`, `recorded_at`, `has_image`, `image_url`, `journal`, `student`, `officer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "student_id": 1,
      "officer_id": 1,
      "title": "string",
      "description": "string",
      "status": "active",
      "status_label": "active",
      "recorded_by": "string",
      "recorded_at": "2026-10-21T10:00:00Z",
      "has_image": "string",
      "image_url": "string",
      "journal": "string",
      "student": "string",
      "officer": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/jurnal/siswa/{siswa}/riwayat`
- Izin: `JOURNAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `student_id`, `officer_id`, `title`, `description`, `status`, `status_label`, `recorded_by`, `recorded_at`, `has_image`, `image_url`, `journal`, `student`, `officer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "student_id": 1,
      "officer_id": 1,
      "title": "string",
      "description": "string",
      "status": "active",
      "status_label": "active",
      "recorded_by": "string",
      "recorded_at": "2026-10-21T10:00:00Z",
      "has_image": "string",
      "image_url": "string",
      "journal": "string",
      "student": "string",
      "officer": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/jurnal/{id}`
- Izin: `JOURNAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `student_id`, `officer_id`, `title`, `description`, `status`, `status_label`, `recorded_by`, `recorded_at`, `has_image`, `image_url`, `journal`, `student`, `officer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "student_id": 1,
      "officer_id": 1,
      "title": "string",
      "description": "string",
      "status": "active",
      "status_label": "active",
      "recorded_by": "string",
      "recorded_at": "2026-10-21T10:00:00Z",
      "has_image": "string",
      "image_url": "string",
      "journal": "string",
      "student": "string",
      "officer": "string"
    },
    "request_id": "uuid"
  }
  ```

### PATCH `/jurnal/{id}`
- Izin: `JOURNAL.UPDATE`
- Field body request: `title`, `description`, `status`, `recorded_at`, `student_id`
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "active",
    "recorded_at": "2026-10-21T10:00:00Z",
    "student_id": 1
  }
  ```
- Field data response: `id`, `student_id`, `officer_id`, `title`, `description`, `status`, `status_label`, `recorded_by`, `recorded_at`, `has_image`, `image_url`, `journal`, `student`, `officer`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "student_id": 1,
      "officer_id": 1,
      "title": "string",
      "description": "string",
      "status": "active",
      "status_label": "active",
      "recorded_by": "string",
      "recorded_at": "2026-10-21T10:00:00Z",
      "has_image": "string",
      "image_url": "string",
      "journal": "string",
      "student": "string",
      "officer": "string"
    },
    "request_id": "uuid"
  }
  ```

### DELETE `/jurnal/{id}`
- Izin: `JOURNAL.DELETE`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/jurnal/{id}/gambar`
- Izin: `JOURNAL.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## loan-types

### GET `/jenis-pinjaman`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `default_interest_rate`, `maximum_tenor_months`, `maximum_limit`, `is_active`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "default_interest_rate": "string",
      "maximum_tenor_months": "string",
      "maximum_limit": "string",
      "is_active": "string"
    },
    "request_id": "uuid"
  }
  ```

## loans

### GET `/pinjaman`
- Izin: `LOAN.READ,LOAN_PAYMENT.READ`
- Field body request: `status`, `user_id`, `loan_type_id`
  ```json
  {
    "status": "active",
    "user_id": 1,
    "loan_type_id": 1
  }
  ```
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### POST `/pinjaman`
- Izin: `LOAN.CREATE`
- Field body request: `loan_type_id`, `amount`, `tenor_months`, `payment_method_id`
  ```json
  {
    "loan_type_id": 1,
    "amount": "100000.00",
    "tenor_months": "string",
    "payment_method_id": 1
  }
  ```
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/aktif`
- Izin: `LOAN.READ,LOAN_PAYMENT.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/{id}`
- Izin: `LOAN.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### POST `/pinjaman/{id}/setujui`
- Izin: `LOAN.APPROVE`
- Field body request: `reason`, `notes`
  ```json
  {
    "reason": "string",
    "notes": "string"
  }
  ```
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/{id}/saldo`
- Izin: `LOAN.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### POST `/pinjaman/{id}/cairkan`
- Izin: `LOAN.DISBURSE`
- Field body request: `reason`, `notes`
  ```json
  {
    "reason": "string",
    "notes": "string"
  }
  ```
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/{id}/pembayaran`
- Izin: `LOAN_PAYMENT.READ,LOAN.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `loan_id`, `user_id`, `transaction_code`, `amount`, `principal_amount`, `interest_amount`, `status`, `status_label`, `rejection_reason`, `payment_date`, `confirmed_at`, `confirmed_by`, `loan`, `payment_method`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "principal_amount": "100000.00",
      "interest_amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "payment_date": "2026-10-21T10:00:00Z",
      "confirmed_at": "2026-10-21T10:00:00Z",
      "confirmed_by": "string",
      "loan": "string",
      "payment_method": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/pinjaman/{id}/pembayaran`
- Izin: `LOAN_PAYMENT.CREATE`
- Field body request: `amount`, `payment_method_id`, `payment_date`
  ```json
  {
    "amount": "100000.00",
    "payment_method_id": 1,
    "payment_date": "2026-10-21T10:00:00Z"
  }
  ```
- Field data response: `id`, `loan_id`, `user_id`, `transaction_code`, `amount`, `principal_amount`, `interest_amount`, `status`, `status_label`, `rejection_reason`, `payment_date`, `confirmed_at`, `confirmed_by`, `loan`, `payment_method`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "principal_amount": "100000.00",
      "interest_amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "payment_date": "2026-10-21T10:00:00Z",
      "confirmed_at": "2026-10-21T10:00:00Z",
      "confirmed_by": "string",
      "loan": "string",
      "payment_method": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

### DELETE `/pinjaman/{id}/pembayaran/{idPembayaran}`
- Izin: `LOAN_PAYMENT.READ,LOAN.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `loan_id`, `user_id`, `transaction_code`, `amount`, `principal_amount`, `interest_amount`, `status`, `status_label`, `rejection_reason`, `payment_date`, `confirmed_at`, `confirmed_by`, `loan`, `payment_method`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "principal_amount": "100000.00",
      "interest_amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "payment_date": "2026-10-21T10:00:00Z",
      "confirmed_at": "2026-10-21T10:00:00Z",
      "confirmed_by": "string",
      "loan": "string",
      "payment_method": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/pinjaman/{id}/pembayaran/{idPembayaran}/konfirmasi`
- Izin: `LOAN_PAYMENT.CONFIRM`
- Field body request: `reason`, `notes`
  ```json
  {
    "reason": "string",
    "notes": "string"
  }
  ```
- Field data response: `id`, `user_id`, `loan_type_id`, `transaction_code`, `principal_amount`, `interest_rate`, `interest_amount`, `total_amount`, `total_paid`, `remaining_amount`, `tenor_months`, `loan_limit`, `due_date`, `status`, `status_label`, `rejection_reason`, `requested_at`, `approved_at`, `disbursed_at`, `paid_at`, `loan_type`, `code`, `name`, `user`, `saving_account`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "loan_type_id": 1,
      "transaction_code": "CODE",
      "principal_amount": "100000.00",
      "interest_rate": "string",
      "interest_amount": "100000.00",
      "total_amount": "100000.00",
      "total_paid": "100000.00",
      "remaining_amount": "100000.00",
      "tenor_months": "string",
      "loan_limit": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "approved_at": "2026-10-21T10:00:00Z",
      "disbursed_at": "2026-10-21T10:00:00Z",
      "paid_at": "2026-10-21T10:00:00Z",
      "loan_type": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1
    },
    "request_id": "uuid"
  }
  ```

### POST `/pinjaman/{id}/pembayaran/{idPembayaran}/tolak`
- Izin: `LOAN_PAYMENT.REJECT`
- Field body request: `reason`, `notes`
  ```json
  {
    "reason": "string",
    "notes": "string"
  }
  ```
- Field data response: `id`, `loan_id`, `user_id`, `transaction_code`, `amount`, `principal_amount`, `interest_amount`, `status`, `status_label`, `rejection_reason`, `payment_date`, `confirmed_at`, `confirmed_by`, `loan`, `payment_method`, `code`, `name`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "principal_amount": "100000.00",
      "interest_amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "rejection_reason": "string",
      "payment_date": "2026-10-21T10:00:00Z",
      "confirmed_at": "2026-10-21T10:00:00Z",
      "confirmed_by": "string",
      "loan": "string",
      "payment_method": "string",
      "code": "CODE",
      "name": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/{pinjaman}/cicilan`
- Izin: `LOAN.READ,LOAN_PAYMENT.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `loan_id`, `installment_number`, `period`, `due_date`, `principal`, `interest`, `total_due`, `paid`, `outstanding`, `status`, `status_label`, `is_late`, `days_late`, `whatsapp_warning_sent_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "installment_number": "string",
      "period": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "principal": "string",
      "interest": "string",
      "total_due": "100000.00",
      "paid": "string",
      "outstanding": "string",
      "status": "active",
      "status_label": "active",
      "is_late": "string",
      "days_late": "string",
      "whatsapp_warning_sent_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/{pinjaman}/cicilan/jatuh-tempo`
- Izin: `LOAN.READ,LOAN_PAYMENT.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `loan_id`, `installment_number`, `period`, `due_date`, `principal`, `interest`, `total_due`, `paid`, `outstanding`, `status`, `status_label`, `is_late`, `days_late`, `whatsapp_warning_sent_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "installment_number": "string",
      "period": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "principal": "string",
      "interest": "string",
      "total_due": "100000.00",
      "paid": "string",
      "outstanding": "string",
      "status": "active",
      "status_label": "active",
      "is_late": "string",
      "days_late": "string",
      "whatsapp_warning_sent_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### GET `/pinjaman/{pinjaman}/cicilan/{id}`
- Izin: `LOAN.READ,LOAN_PAYMENT.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `loan_id`, `installment_number`, `period`, `due_date`, `principal`, `interest`, `total_due`, `paid`, `outstanding`, `status`, `status_label`, `is_late`, `days_late`, `whatsapp_warning_sent_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "loan_id": 1,
      "installment_number": "string",
      "period": "string",
      "due_date": "2026-10-21T10:00:00Z",
      "principal": "string",
      "interest": "string",
      "total_due": "100000.00",
      "paid": "string",
      "outstanding": "string",
      "status": "active",
      "status_label": "active",
      "is_late": "string",
      "days_late": "string",
      "whatsapp_warning_sent_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

## notifications

### GET `/notifikasi`
- Izin: `NOTIFICATION.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `type`, `title`, `message`, `data_type`, `data_id`, `is_read`, `read_at`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "type": "string",
      "title": "string",
      "message": "string",
      "data_type": "string",
      "data_id": 1,
      "is_read": "string",
      "read_at": "2026-10-21T10:00:00Z",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### PATCH `/notifikasi/baca-semua`
- Izin: `NOTIFICATION.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/notifikasi/belum-dibaca`
- Izin: `NOTIFICATION.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### DELETE `/notifikasi/{id}`
- Izin: `NOTIFICATION.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### PATCH `/notifikasi/{id}/baca`
- Izin: `NOTIFICATION.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `type`, `title`, `message`, `data_type`, `data_id`, `is_read`, `read_at`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "type": "string",
      "title": "string",
      "message": "string",
      "data_type": "string",
      "data_id": 1,
      "is_read": "string",
      "read_at": "2026-10-21T10:00:00Z",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

## payment-methods

### GET `/metode-pembayaran`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## payment-types

### GET `/jenis-pembayaran`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## permissions

### GET `/izin`
- Izin: `PERMISSION.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `module`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "module": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/izin/{id}`
- Izin: `PERMISSION.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `module`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "module": "string"
    },
    "request_id": "uuid"
  }
  ```

## receipts

### GET `/resi/{kodeTransaksi}`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/resi/{kodeTransaksi}/cetak`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## reports

### GET `/laporan`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/laporan/aktivitas`
- Izin: `REPORT.READ,AUDIT.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/arus-kas`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/pengeluaran`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/laporan/ekspor`
- Izin: `REPORT.EXPORT`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/laporan/ekspor-sekarang`
- Izin: `REPORT.EXPORT`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/ekspor/{ekspor}`
- Izin: `REPORT.EXPORT`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/laporan/ekspor/{ekspor}/unduh`
- Izin: `REPORT.EXPORT`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/laporan/pemasukan`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/jurnal`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/jadwal-pinjaman`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/pinjaman`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/mutasi`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/tabungan`
- Izin: `REPORT.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/slip-tabungan`
- Izin: `REPORT.READ,CASH_FLOW.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### GET `/laporan/penarikan`
- Izin: `REPORT.READ`
- Field body request: `start_date`, `end_date`, `period`, `user_id`, `class`, `category_id`, `payment_method_id`, `kas_group`, `status`, `action`, `limit`, `loan_id`, `academic_year`, `report_type`, `format`
  ```json
  {
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "period": "string",
    "user_id": 1,
    "class": "string",
    "category_id": 1,
    "payment_method_id": 1,
    "kas_group": "string",
    "status": "active",
    "action": "string",
    "limit": "string",
    "loan_id": 1,
    "academic_year": "string",
    "report_type": "string",
    "format": "string"
  }
  ```
- Response: hanya envelope / file / redirect

## roles

### GET `/peran`
- Izin: `ROLE.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `description`, `is_system`, `permissions`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "description": "string",
      "is_system": "string",
      "permissions": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/peran`
- Izin: `ROLE.MANAGE`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `description`, `is_system`, `permissions`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "description": "string",
      "is_system": "string",
      "permissions": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/peran/{id}`
- Izin: `ROLE.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `description`, `is_system`, `permissions`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "description": "string",
      "is_system": "string",
      "permissions": "string"
    },
    "request_id": "uuid"
  }
  ```

### PATCH `/peran/{id}`
- Izin: `ROLE.MANAGE`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `description`, `is_system`, `permissions`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "description": "string",
      "is_system": "string",
      "permissions": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/peran/{id}/izin`
- Izin: `ROLE.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `module`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "module": "string"
    },
    "request_id": "uuid"
  }
  ```

### PUT `/peran/{id}/izin`
- Izin: `ROLE.MANAGE`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `code`, `name`, `description`, `is_system`, `permissions`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "code": "CODE",
      "name": "string",
      "description": "string",
      "is_system": "string",
      "permissions": "string"
    },
    "request_id": "uuid"
  }
  ```

## savings

### GET `/tabungan/akun`
- Izin: `SAVINGS.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `user_id`, `account_number`, `current_balance`, `status`, `status_label`, `opened_at`, `closed_at`, `user`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "account_number": 1,
      "current_balance": "100000.00",
      "status": "active",
      "status_label": "active",
      "opened_at": "2026-10-21T10:00:00Z",
      "closed_at": "2026-10-21T10:00:00Z",
      "user": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/tabungan/setoran`
- Izin: `SAVINGS.READ`
- Field body request: `status`, `payment_method_id`, `transaction_type_id`, `start_date`, `end_date`, `page`, `per_page`
  ```json
  {
    "status": "active",
    "payment_method_id": 1,
    "transaction_type_id": 1,
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "page": 1,
    "per_page": 1
  }
  ```
- Response: hanya envelope / file / redirect

### POST `/tabungan/setoran`
- Izin: `SAVINGS.DEPOSIT`
- Field body request: `amount`, `payment_method_id`, `description`
  ```json
  {
    "amount": "100000.00",
    "payment_method_id": 1,
    "description": "string"
  }
  ```
- Field data response: `id`, `user_id`, `account_number`, `current_balance`, `status`, `status_label`, `opened_at`, `closed_at`, `user`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "user_id": 1,
      "account_number": 1,
      "current_balance": "100000.00",
      "status": "active",
      "status_label": "active",
      "opened_at": "2026-10-21T10:00:00Z",
      "closed_at": "2026-10-21T10:00:00Z",
      "user": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/tabungan/setoran/{id}`
- Izin: `SAVINGS.READ`
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

### GET `/tabungan/transaksi`
- Izin: `SAVINGS.READ`
- Field body request: `status`, `payment_method_id`, `transaction_type_id`, `start_date`, `end_date`, `page`, `per_page`
  ```json
  {
    "status": "active",
    "payment_method_id": 1,
    "transaction_type_id": 1,
    "start_date": "2026-10-21T10:00:00Z",
    "end_date": "2026-10-21T10:00:00Z",
    "page": 1,
    "per_page": 1
  }
  ```
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `balance_before`, `balance_after`, `status`, `status_label`, `description`, `transaction_at`, `transaction_type`, `code`, `name`, `direction`, `payment_method`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "balance_before": "100000.00",
      "balance_after": "100000.00",
      "status": "active",
      "status_label": "active",
      "description": "string",
      "transaction_at": "2026-10-21T10:00:00Z",
      "transaction_type": "string",
      "code": "CODE",
      "name": "string",
      "direction": "string",
      "payment_method": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/tabungan/transaksi/{id}`
- Izin: `SAVINGS.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `balance_before`, `balance_after`, `status`, `status_label`, `description`, `transaction_at`, `transaction_type`, `code`, `name`, `direction`, `payment_method`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "balance_before": "100000.00",
      "balance_after": "100000.00",
      "status": "active",
      "status_label": "active",
      "description": "string",
      "transaction_at": "2026-10-21T10:00:00Z",
      "transaction_type": "string",
      "code": "CODE",
      "name": "string",
      "direction": "string",
      "payment_method": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/tabungan/penarikan`
- Izin: `WITHDRAWAL.READ`
- Field body request: `status`, `user_id`, `saving_account_id`
  ```json
  {
    "status": "active",
    "user_id": 1,
    "saving_account_id": 1
  }
  ```
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `status`, `status_label`, `reason`, `destination`, `requested_at`, `processed_at`, `processed_by`, `transaction_id`, `payment_method`, `code`, `name`, `user`, `saving_account`, `transaction`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "reason": "string",
      "destination": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "processed_at": "2026-10-21T10:00:00Z",
      "processed_by": "string",
      "transaction_id": 1,
      "payment_method": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1,
      "transaction": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/tabungan/penarikan`
- Izin: `WITHDRAWAL.CREATE`
- Field body request: `amount`, `payment_method_id`, `reason`, `destination`
  ```json
  {
    "amount": "100000.00",
    "payment_method_id": 1,
    "reason": "string",
    "destination": "string"
  }
  ```
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `status`, `status_label`, `reason`, `destination`, `requested_at`, `processed_at`, `processed_by`, `transaction_id`, `payment_method`, `code`, `name`, `user`, `saving_account`, `transaction`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "reason": "string",
      "destination": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "processed_at": "2026-10-21T10:00:00Z",
      "processed_by": "string",
      "transaction_id": 1,
      "payment_method": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1,
      "transaction": "string"
    },
    "request_id": "uuid"
  }
  ```

### GET `/tabungan/penarikan/{id}`
- Izin: `WITHDRAWAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `status`, `status_label`, `reason`, `destination`, `requested_at`, `processed_at`, `processed_by`, `transaction_id`, `payment_method`, `code`, `name`, `user`, `saving_account`, `transaction`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "reason": "string",
      "destination": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "processed_at": "2026-10-21T10:00:00Z",
      "processed_by": "string",
      "transaction_id": 1,
      "payment_method": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1,
      "transaction": "string"
    },
    "request_id": "uuid"
  }
  ```

### DELETE `/tabungan/penarikan/{id}`
- Izin: `WITHDRAWAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `status`, `status_label`, `reason`, `destination`, `requested_at`, `processed_at`, `processed_by`, `transaction_id`, `payment_method`, `code`, `name`, `user`, `saving_account`, `transaction`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "reason": "string",
      "destination": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "processed_at": "2026-10-21T10:00:00Z",
      "processed_by": "string",
      "transaction_id": 1,
      "payment_method": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1,
      "transaction": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/tabungan/penarikan/{id}/setujui`
- Izin: `WITHDRAWAL.APPROVE`
- Field body request: `notes`
  ```json
  {
    "notes": "string"
  }
  ```
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `status`, `status_label`, `reason`, `destination`, `requested_at`, `processed_at`, `processed_by`, `transaction_id`, `payment_method`, `code`, `name`, `user`, `saving_account`, `transaction`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "reason": "string",
      "destination": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "processed_at": "2026-10-21T10:00:00Z",
      "processed_by": "string",
      "transaction_id": 1,
      "payment_method": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1,
      "transaction": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/tabungan/penarikan/{id}/selesai`
- Izin: `WITHDRAWAL.COMPLETE`
- Field body request: `notes`
  ```json
  {
    "notes": "string"
  }
  ```
- Field data response: `id`, `saving_account_id`, `user_id`, `transaction_code`, `amount`, `status`, `status_label`, `reason`, `destination`, `requested_at`, `processed_at`, `processed_by`, `transaction_id`, `payment_method`, `code`, `name`, `user`, `saving_account`, `transaction`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "saving_account_id": 1,
      "user_id": 1,
      "transaction_code": "CODE",
      "amount": "100000.00",
      "status": "active",
      "status_label": "active",
      "reason": "string",
      "destination": "string",
      "requested_at": "2026-10-21T10:00:00Z",
      "processed_at": "2026-10-21T10:00:00Z",
      "processed_by": "string",
      "transaction_id": 1,
      "payment_method": "string",
      "code": "CODE",
      "name": "string",
      "user": "string",
      "saving_account": 1,
      "transaction": "string"
    },
    "request_id": "uuid"
  }
  ```

## transaction-types

### GET `/jenis-transaksi`
- Izin: (publik/auth saja)
- Body request: tidak ada / path atau query params
- Response: hanya envelope / file / redirect

## users

### GET `/pengguna`
- Izin: `USER.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### POST `/pengguna`
- Izin: `USER.CREATE`
- Field body request: `username`, `email`, `password`, `full_name`, `phone`, `role_code`, `status`, `student_number`, `class`, `academic_year`, `employee_number`, `position`, `department`
  ```json
  {
    "username": "string",
    "email": "user@example.com",
    "password": "string",
    "full_name": "string",
    "phone": "08123456789",
    "role_code": "CODE",
    "status": "active",
    "student_number": "string",
    "class": "string",
    "academic_year": "string",
    "employee_number": "string",
    "position": "string",
    "department": "string"
  }
  ```
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### GET `/pengguna/{id}`
- Izin: `USER.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### PATCH `/pengguna/{id}`
- Izin: `USER.READ,USER.UPDATE`
- Field body request: `full_name`, `email`, `phone`, `username`, `status`, `role_code`
  ```json
  {
    "full_name": "string",
    "email": "user@example.com",
    "phone": "08123456789",
    "username": "string",
    "status": "active",
    "role_code": "CODE"
  }
  ```
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### POST `/pengguna/{id}/atur-ulang-kata-sandi`
- Izin: `USER.RESET_PASSWORD`
- Field body request: `password`
  ```json
  {
    "password": "string"
  }
  ```
- Response: hanya envelope / file / redirect

### PATCH `/pengguna/{id}/peran`
- Izin: `ROLE.MANAGE`
- Field body request: `role_code`, `status`
  ```json
  {
    "role_code": "CODE",
    "status": "active"
  }
  ```
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

### PATCH `/pengguna/{id}/status`
- Izin: `USER.DISABLE`
- Field body request: `role_code`, `status`
  ```json
  {
    "role_code": "CODE",
    "status": "active"
  }
  ```
- Field data response: `id`, `username`, `email`, `full_name`, `phone`, `status`, `last_login_at`, `role`, `code`, `name`, `student_profile`, `employee_profile`, `permissions`, `created_at`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "string",
      "email": "user@example.com",
      "full_name": "string",
      "phone": "08123456789",
      "status": "active",
      "last_login_at": "2026-10-21T10:00:00Z",
      "role": "string",
      "code": "CODE",
      "name": "string",
      "student_profile": "string",
      "employee_profile": "string",
      "permissions": "string",
      "created_at": "2026-10-21T10:00:00Z"
    },
    "request_id": "uuid"
  }
  ```

## {dataType}

### GET `/{tipeData}/{idData}/lampiran`
- Izin: `ATTACHMENT.MANAGE,LOAN_PAYMENT.READ,JOURNAL.READ,WITHDRAWAL.READ`
- Body request: tidak ada / path atau query params
- Field data response: `id`, `data_type`, `data_id`, `original_name`, `mime_type`, `size_bytes`, `uploaded_by`, `created_at`, `download_url`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "data_type": "string",
      "data_id": 1,
      "original_name": "string",
      "mime_type": "string",
      "size_bytes": "string",
      "uploaded_by": "string",
      "created_at": "2026-10-21T10:00:00Z",
      "download_url": "string"
    },
    "request_id": "uuid"
  }
  ```

### POST `/{tipeData}/{idData}/lampiran`
- Izin: `ATTACHMENT.MANAGE`
- Field body request: `file`
  ```json
  {
    "file": "string"
  }
  ```
- Field data response: `id`, `data_type`, `data_id`, `original_name`, `mime_type`, `size_bytes`, `uploaded_by`, `created_at`, `download_url`
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "data_type": "string",
      "data_id": 1,
      "original_name": "string",
      "mime_type": "string",
      "size_bytes": "string",
      "uploaded_by": "string",
      "created_at": "2026-10-21T10:00:00Z",
      "download_url": "string"
    },
    "request_id": "uuid"
  }
  ```
