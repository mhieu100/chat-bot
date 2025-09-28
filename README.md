# 🏥 Trợ lý Sức khỏe AI - Health AI Chatbot

Ứng dụng chatbot AI chuyên tư vấn về **sức khỏe và tiêm chủng**, được xây dựng với React frontend và Python FastAPI backend.

## ✨ Tính năng chính

- 🤖 **AI chuyên nghiệp**: Tư vấn chuyên sâu về sức khỏe và tiêm chủng
- 💬 **Giao diện thân thiện**: UI/UX được thiết kế dựa trên Ant Design X
- 🌍 **Hỗ trợ tiếng Việt**: Giao tiếp hoàn toàn bằng tiếng Việt
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị
- 🔒 **Bảo mật**: API key được bảo vệ ở backend
- 📊 **Theo dõi lịch sử**: Lưu trữ cuộc trò chuyện

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    HTTP API    ┌─────────────────┐    Gemini API    ┌─────────────────┐
│   React Frontend│ ──────────────▶│  Python Backend │ ────────────────▶│   Google AI     │
│   (Port 5173)   │                │   (Port 8000)   │                  │                 │
└─────────────────┘                └─────────────────┘                  └─────────────────┘
```

## 🚀 Cách chạy nhanh

### Option 1: Sử dụng script tự động
```bash
# Clone repository
git clone <repo-url>
cd my-chatbot

# Chạy script tự động (Linux/Mac)
./start.sh
```

### Option 2: Chạy thủ công

#### Backend (Python FastAPI)
```bash
cd backend

# Tạo virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Cài đặt dependencies
pip install -r requirements.txt

# Cấu hình environment
cp .env.example .env
# Chỉnh sửa .env với Gemini API key của bạn

# Chạy server
python main.py
```

#### Frontend (React + Vite)
```bash
# Terminal mới
cd my-chatbot

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## 🌐 Truy cập ứng dụng

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## ⚙️ Cấu hình

### Backend (.env)
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:8000
```

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Detailed health status |
| POST | `/chat` | Chat với AI |
| GET | `/suggestions` | Gợi ý câu hỏi |
| GET | `/topics` | Chủ đề sức khỏe |

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18
- 🎨 Ant Design X
- 🚀 Vite
- 💨 CSS-in-JS (antd-style)

### Backend  
- 🐍 Python 3.8+
- ⚡ FastAPI
- 🤖 Google Generative AI
- 🔧 Uvicorn
- 📋 Pydantic

## 🎯 Chuyên môn AI

Bot được train để tư vấn về:

- 💉 **Tiêm chủng**: Lịch tiêm, các loại vaccine, tác dụng phụ
- 👶 **Sức khỏe trẻ em**: Chăm sóc, phát triển, dinh dưỡng
- 👩 **Sức khỏe phụ nữ**: Thai kỳ, sinh sản, tầm soát
- 🛡️ **Phòng ngừa**: Tầm soát, lối sống lành mạnh
- 🍎 **Dinh dưỡng**: Chế độ ăn, vitamin, bổ sung

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch  
5. Create Pull Request

## 📄 License

MIT License - xem file `LICENSE` để biết thêm chi tiết.

---

**⚠️ Lưu ý**: Thông tin từ AI chỉ mang tính chất tham khảo. Luôn tham khảo ý kiến bác sĩ chuyên khoa khi cần thiết.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# chat-bot
