# hieungocdinh-graduation

Thiệp mời dự lễ tốt nghiệp – tĩnh, không cần server, deploy được ngay lên GitHub Pages.

---

## Cập nhật nội dung

Mọi thông tin hiển thị trên thiệp đều nằm trong **block `config`** ở đầu file `script.js`:

```js
const config = {
  graduateName:  "Đinh Ngọc Hiếu",
  academicYear:  "Năm học 2021-2026",
  schoolName:    "Học viện Công nghệ Bưu chính Viễn thông",
  venueName:     "Hội trường A",
  date:          "Thứ Bảy, 16.05.2026",
  time:          "08:30",
  mapsUrl:       "https://maps.app.goo.gl/...",
  calendarStart: "20260516T083000",  // YYYYMMDDTHHMMSS
  calendarEnd:   "20260516T110000",
  timezone:      "Asia/Ho_Chi_Minh",
  photoSrc:      "./assets/graduation-hieungocdinh.png",
};
```

> Các thẻ Open Graph / Twitter trong `index.html` phải được cập nhật **thủ công** vì crawler của Facebook / Zalo không chạy JavaScript.

---

## Chạy local

Mở thẳng file `index.html` bằng trình duyệt (hoặc dùng Live Server trong VS Code).

---

## Deploy lên GitHub Pages

1. Tạo repo `hieungocdinh-graduation` (hoặc tên bất kỳ).
2. Push toàn bộ file lên branch `main`.
3. Vào **Settings → Pages → Deploy from branch → `main` / `root`**.
4. GitHub sẽ cấp link dạng `https://<username>.github.io/<repo-name>/`.

---

## Sau khi deploy

1. Cập nhật `og:image` và `twitter:image` trong `index.html` với URL thật của ảnh OG.
2. Đặt file `og-hieungocdinh-graduation.png` (kích thước **1200 × 630**) vào thư mục `assets/`.
3. Kiểm tra preview bằng [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) và [Zalo Share Debugger](https://developers.zalo.me/tools/share-validator).
4. Nếu nền tảng cache ảnh cũ, đổi tên file (ví dụ `...-v2.png`) và cập nhật lại meta tag tương ứng.
