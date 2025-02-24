# Update
## Before
### Structure of the project
```
line-chatbot/
│── node_modules/ ***    # Dependencies ที่ติดตั้งผ่าน npm
│── src/                 # โค้ดหลักของ Backend
│   ├── config/          # เก็บค่า config
│   │   ├── index.js     # โหลดค่า config
│   ├── controllers/     # จัดการ Webhook
│   │   ├── reply.js     # ฟังก์ชันสำหรับตอบกลับข้อความ
│   │   ├── webhook.js   # Webhook handler
│   ├── liff-react/         # 📌 **React LIFF Web App**
│   │   ├── src/            # โค้ดของ React App
│   │   │   ├── assets/     # static files
│   │   │   |   ├── css/    
│   │   │   |   ├── icons/  
│   │   │   |   ├── variables.jsx
│   │   │   ├── core/       # core components
│   │   │   |   ├── App.jsx 
│   │   │   |   ├── Inform.jsx
│   │   │   |   ├── Map.jsx
│   │   │   ├── main.jsx    # ไฟล์ที่ใช้ในการ render React App
│   │   ├── .env            # Hardlink ไปยัง .env ใน root directory
│   │   ├── index.html      # ไฟล์ HTML ของ React App
│   │   ├── package.json    # ข้อมูลของ React App
│   │   ├── vite.config.js  # Config ของ Vite
│   ├── app.js           # สร้าง Express App
├── .env                 # ไฟล์ที่เก็บค่า Environment Variables
├── .gitignore           # ไฟล์ที่บอก Git ว่าจะไม่ต้องเก็บไฟล์อะไร
├── package.json         # ข้อมูลของ Project
├── README.md            # ไฟล์นี้
```

## After
### Structure of the project
```
backend/            # 📌 **Backend**
line-bot/           # 📌 **Line Chatbot**
liff-service/       # 📌 **React LIFF Web App**
nginx/              # directory config Nginx
docker-compose.yml
```

#### 📌 **Line Chatbot**
```
line-bot/
  ├── node_modules/ ***    # Dependencies
  ├── src/
  │    ├── handlers/       # Handlers for Line Webhook
  │    │    ├── default-message.ts
  │    └── index.ts        # Main file
  ├── .env                 # Environment Variables
  ├── Dockerfile           # Dockerfile for Line Chatbot
  ├── package-lock.json    # Package-lock.json
  ├── package.json         # Package.json
  ├── README.md            # README.md
  └── tsconfig.json        # Typescript config
```
#### 📌 **React LIFF Web App**
```
liff-service/
  ├── node_modules/ ***    # Dependencies
  ├── public/              # Public files
  │    └── liff-icons/
  ├── src/
  │    ├── assets/         # Static files
  │    │    ├── messages.tsx
  │    │    └── variables.tsx
  │    ├── components/     # Components
  │    │    └── Map.tsx
  │    ├── pages/          # Pages
  │    │    └── Inform.tsx
  │    └── App.tsx         # Main file
  ├── .env                 # Environment Variables
  ├── Dockerfile           # Dockerfile for LIFF Service
  ├── index.html           # HTML file
  ├── package-lock.json    # Package-lock.json
  ├── package.json         # Package.json
  ├── README.md            # README.md
  ├── tsconfig.json        # Typescript config
  └── vite.config.ts       # Vite config
  ```