# Task Management System

Hệ thống quản lý công việc với các tính năng bảo mật nâng cao.

## Cấu trúc dự án

```
task-management/
├── backend/                 # Backend Node.js
│   ├── src/                # Source code
│   ├── config/             # Cấu hình
│   ├── docs/               # Tài liệu
│   ├── seeders/            # Dữ liệu mẫu
│   ├── tests/              # Unit tests
│   ├── coverage/           # Báo cáo test coverage
│   ├── .env               # Biến môi trường
│   ├── package.json       # Dependencies
│   └── index.js           # Entry point
│
└── frontend/               # Frontend React
    ├── public/            # Static files
    ├── src/               # Source code
    │   ├── components/    # React components
    │   ├── contexts/      # React contexts
    │   ├── services/      # API services
    │   ├── utils/         # Utility functions
    │   └── App.js         # Root component
    ├── .env              # Biến môi trường
    └── package.json      # Dependencies
```

## Tính năng

- Xác thực người dùng với JWT
- Xác thực hai yếu tố (2FA)
- Phát hiện đăng nhập bất thường
- Quản lý nhóm và phân quyền
- Quản lý công việc
- Giao diện người dùng thân thiện

## Cài đặt

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Công nghệ sử dụng

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Speakeasy (2FA)

### Frontend

- React
- Material-UI
- React Router
- Axios
- React Hook Form
- Yup
