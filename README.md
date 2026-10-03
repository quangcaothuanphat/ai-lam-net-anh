# AI Làm Nét Ảnh

Ứng dụng web/PWA tiếng Việt để phóng to và phục hồi ảnh bằng Real-ESRGAN ngay trên thiết bị.

## Tính năng hiện tại
- Real-ESRGAN general x4 ONNX.
- 2x, 4x AI và 8x (hai lượt 4x).
- Chia tile để giảm nguy cơ hết RAM khi xử lý ảnh lớn.
- Chế độ Bảng hiệu / Ảnh thường / Ít xử lý.
- PNG hoặc JPG.
- Nhập khổ in cm và DPI để tham khảo kích thước pixel.
- PWA, giao diện mobile-first.
- Ảnh đầu vào không được gửi lên máy chủ ứng dụng.

## Mô hình
Mặc định dùng `realesr-general-x4v3.onnx` từ Heliosoph/realesrgan-onnx. Model này có input RGB NCHW, float32 0..1 và output 4x; giấy phép BSD-3-Clause.

## Chạy
GitHub Pages có thể phục vụ trực tiếp `index.html`. Trình duyệt cần HTTPS để PWA hoạt động đầy đủ.

## Ghi chú
Hiệu năng phụ thuộc thiết bị và trình duyệt. Nếu iPhone báo thiếu bộ nhớ, giảm Tile xuống 192 hoặc dùng ảnh đầu vào nhỏ hơn.
