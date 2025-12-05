import { FeatureItem, Speaker, BundlePricing } from './types';

export const PROGRAM_NAME = "AI APP & VIBE CODING";

// Logic: Đếm ngược đến 19h30 ngày 12/12
const now = new Date();
const currentYear = now.getFullYear();
// Tháng 12 là 11 (0-indexed)
const targetDate = new Date(currentYear, 11, 12, 19, 30, 0);

export const COUNTDOWN_TARGET = targetDate.toISOString();

// Link tham gia nhóm Zalo sau khi thanh toán thành công
export const ZALO_GROUP_URL = "https://zalo.me/g/vzmefh184";

// URL Web App Google Apps Script của bạn
// QUAN TRỌNG: Bạn hãy thay thế URL dưới đây bằng URL mới sau khi Deploy đoạn mã App Script ở trên
export const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxfBzhaTPCVv0wLfMenlNAGn7LZaMS1g5jhJPo53ZR_ew_m5MvbaMtYqZDPQpgQKO8QWA/exec"; 

export const BANK_INFO = {
  bankId: "TCB", // Techcombank
  accountNo: "19036653277011",
  accountName: "NGUYEN PHUOC VINH HUNG",
  template: "compact2" // Giao diện QR
};

export const FEATURES: FeatureItem[] = [
  {
    text: "Module 1: Tài khoản Google AI PRO chính chủ, 6 tháng",
    highlight: "(Veo 3 + NotebookLM Plus + Gemini PRO..)",
    value: "1.500.000đ"
  },
  {
    text: "Module 2: Kỹ Thuật Prompt Nâng Cao",
    highlight: "Dành riêng Nano Banana Pro và Gemini 3.0 Pro",
    value: "1.200.000đ"
  },
  {
    text: "Module 3: Chatbot AI Vibe Coding",
    highlight: "Xây dựng chatbot hỗ trợ lập trình viên",
    value: "1.800.000đ"
  },
  {
    text: "Module 4: Chatbot chuyên sâu",
    highlight: "Tối ưu riêng cho Nano Banana Pro",
    value: "1.800.000đ"
  },
  {
    text: "Module 5: Landing Page AI",
    highlight: "Tự động hóa tạo trang đích chuyển đổi cao",
    value: "2.000.000đ"
  },
  {
    text: "Module 6: Tự Vibe Code Hệ thống",
    highlight: "Email AI Automation",
    value: "1.200.000đ"
  },
  {
    text: "Module 7: App AI Thực Tế",
    highlight: "Định hướng ứng dụng AI Vibe Code cho công việc hàng ngày",
    value: "1.200.000đ"
  },
  {
    text: "Module 8: Video Record Full Buổi Học (4K)",
    highlight: "Xem lại trọn đời + Full Source Code + Tài liệu",
    value: "2.500.000đ"
  }
];

export const SPEAKER_INFO: Speaker = {
  name: "Mr Nguyễn Phước Vĩnh Hưng",
  role: "CEO công ty cổ phần công nghệ Duhava",
  imageUrl: "https://i.imgur.com/HIDog7f.jpeg",
  achievements: [
    "Kinh nghiệm Kinh Doanh Online từ 2016",
    "500.000++ followers trên TikTok về AI, Kinh Doanh & Marketing",
    "Quản Trị Viên Group AI (200.000++ thành viên)",
    "Triển khai Marketing cho nhiều công ty với các ngành hàng khác nhau",
    "Từng đào tạo Inhouse cho Trung Sơn Pharma, Hệ Thống Nhà Thuốc Big Family, Sàn thương mại điện tử tư vấn Droppii, Phương Trường An Group..."
  ]
};

export const PRICING: BundlePricing = {
  // Tổng giá trị thực tế của các module
  originalPrice: 8500000, 
  // Số tiền giảm
  discountAmount: 8103000,
  // Giá cuối cùng: 397k
  finalPrice: 397000
};

export const TARGET_AUDIENCE = [
  "Những ai bán hàng online, làm internet marketing, affiliate, dropship...",
  "Người muốn làm content để xây kênh thu hút khách hàng tiềm năng.",
  "Trainer, Diễn giả, Coach muốn ứng dụng A.I để tối ưu công việc của mình.",
  "Và bất cứ ai không muốn \"phớt lờ\" làn sóng A.I này để bắt kịp sự phát triển 4.0."
];