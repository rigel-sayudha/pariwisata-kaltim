# KaltimExplore

Welcome to the **KaltimExplore** project! This is a web application designed to showcase tourism destinations, news, and bookings for the East Kalimantan. Uses Laravel Filament for the backend administration panel and Next.js / React for the frontend.

---

## 📸 Screencaptures

### Frontend Client
![Frontend Home Capture](https://via.placeholder.com/800x400?text=Frontend+Home+View)

### Admin Panel (Filament)
![Admin Dashboard Capture](https://via.placeholder.com/800x400?text=Admin+Dashboard+View)

---

## 🛠 Installation Guide

Follow these steps to set up the project on your local machine. This project utilizes separate Laravel and Frontend (JavaScript) stacks contained within this monorepo layout.

### Prerequisites
Make sure you have the following installed:
* [PHP >= 8.2](https://www.php.net/)
* [Composer](https://getcomposer.org/)
* [Node.js & npm](https://nodejs.org/en) (latest LTS recommended)
* A local database (MySQL, PostgreSQL, etc.)

---

### Step 1: Clone the Repository

Clone the project to your local machine and navigate into the folder:
```bash
git clone https://github.com/rigel-sayudha/pariwisata-kaltim.git
cd pariwisata-kaltim
```

### Step 2: Backend (Laravel & Filament) Setup

1. **Install PHP Dependencies**
   Run composer to install the required packages:
   ```bash
   composer install
   ```

2. **Environment Configuration**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and configure your database settings (`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

3. **Generate Application Key**
   Generate a new unique application key:
   ```bash
   php artisan key:generate
   ```

4. **Run Database Migrations**
   Migrate the database to create all required tables. If you have seeders ready, append `--seed`.
   ```bash
   php artisan migrate
   ```

5. **Storage Link**
   Create a symbolic link for your public storage. This is necessary for images uploaded via Filament:
   ```bash
   php artisan storage:link
   ```

---

### Step 3: Frontend Setup (Next.js)

Aplikasi frontend utama menggunakan Next.js dan berada di dalam direktori `frontend`.

1. **Jalankan melalui root**
   Anda dapat menjalankan frontend langsung dari root direktori tanpa harus masuk ke folder `frontend`:
   ```bash
   npm run frontend
   ```
   *Halaman frontend (user) akan dapat diakses di: [http://localhost:3000](http://localhost:3000)*

---

### Step 4: Menjalankan Aplikasi

1. **Backend (Laravel):**
   Pastikan Anda berada di root direktori project dan jalankan:
   ```bash
   php artisan serve
   ```
   *Backend (API) akan berjalan di: [http://127.0.0.1:8000](http://127.0.0.1:8000)*

2. **Admin Panel:**
   Panel admin (Filament) dapat diakses di: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

3. **Frontend (User):**
   Pastikan server Next.js di folder `frontend` sudah berjalan (Step 3). Akses di: [http://localhost:3000](http://localhost:3000)

---

## Authors
- [Rigel Sayudha](https://github.com/rigel-sayudha)
