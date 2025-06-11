
# 📋 Task Management App - Kelompok 5

## 👨‍💻 Tim Pengembang
| Nama Anggota               | NIM         | Peran XP              | Tanggung Jawab Utama                          |
|----------------------------|-------------|-----------------------|-----------------------------------------------|
| Steven David H Malau       | 231111408   | **Developer**         | - Menulis kode produksi<br>- Implementasi fitur<br>- Pair programming |
| Steven Rafael A. Sidauruk  | 231112060   | **Customer** (Product Owner)| - Menyusun user stories<br>- Memprioritaskan backlog<br>- Memberikan feedback |
| Wan Saka Nasa              | 231111488   | **XP Coach**          | - Memandu praktik XP<br>- Memastikan standar kode<br>- Membantu resolusi blocker |

### 🔍 Penjelasan Peran XP:

1. **Developer** 👨‍💻  
   - Bertanggung jawab untuk:  
     - Implementasi teknis user stories  
     - Menulis test cases (TDD)  
     - Refactoring kode  
   - Tools: VS Code, Git, Vue

2. **Customer/Product Owner** 📊  
   - Bertanggung jawab untuk:  
     - Mendefinisikan kriteria penerimaan  
     - Menjembatani kebutuhan bisnis-teknis  
     - Melakukan acceptance testing  
   - Output: User Stories, Prioritas Fitur  

3. **XP Coach** 🏆  
   - Bertangg jawab untuk:  
     - Memonitor praktik XP (pair programming, TDD)  
     - Menjaga ritme pengembangan  
     - Memfasilitasi retrospective meeting  

## 🛠️ Fitur yang Tersedia

| Fitur | Status | Keterangan |
|-------|--------|------------|
| **Menambah/mengedit/menghapus task** | [x] Selesai | Dapat membuat, mengubah, dan menghapus daftar tugas |
| **Melihat daftar task dengan pengurutan prioritas** | [x] Selesai | Penyortiran otomatis (Tinggi > Sedang > Rendah) |
| **Menambahkan deskripsi untuk menampilkan detail dan memperbarui status task** | [x] Selesai | Dilengkapi pilihan status agar bisa dilihat dengan mudah: |
| | | • 🟠 To-do |
| | | • 🔵 In-progress |
| | | • 🟢 Done |
| **Filter task berdasarkan status** | [x] Selesai | Dapat memfilter sesuai kebutuhan |
| **Penyimpanan data permanen (localStorage)** | [x] Selesai | Data tetap tersimpan setelah refresh |
| **Validasi form real-time untuk judul task** | [x] Selesai | Peringatan jika judul tidak sesuai |
| **Antarmuka responsif dan bersih** | [x] Selesai | Tampilan optimal di semua perangkat |

## 🎯 User Stories
Berikut daftar kebutuhan pengguna yang kami implementasikan:

| No | User Story | Story Point | Prioritas |
|----|------------|-------------|-----------|
| 1  | Sebagai pengguna, saya ingin bisa membuat task cepat hanya dengan memasukkan judul agar bisa mencatat ide saya secara instan. | 2 | Tinggi |
| 2  | Sebagai pengguna, saya ingin melihat daftar semua task agar saya tahu apa yang perlu dikerjakan. | 2 | Tinggi |
| 3  | Sebagai pengguna, saya ingin melihat task yang diurutkan berdasarkan prioritas agar bisa fokus pada yang paling penting terlebih dahulu. | 3 | Tinggi |
| 4  | Sebagai pengguna, saya ingin bisa mengklik task untuk melihat atau menambahkan detail (deskripsi dan status) agar bisa melengkapinya nanti. | 3 | Tinggi |
| 5  | Sebagai pengguna, saya ingin bisa menghapus task agar bisa membuang task yang sudah tidak diperlukan. | 2 | Sedang |
| 6  | Sebagai pengguna, saya ingin task saya tersimpan secara permanen agar tidak hilang saat me-refresh halaman. | 5 | Tinggi |
| 7  | Sebagai pengguna, saya ingin melihat pesan error validasi jika mencoba membuat task tanpa judul. | 2 | Sedang |
| 8  | Sebagai pengguna, saya ingin bisa memfilter task berdasarkan status agar mudah melacak progres pekerjaan. | 3 | Sedang |





