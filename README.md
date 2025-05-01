<h1 align="center"> ai-face-detect </h1>

<p align="center">
<img src="./public/assets/brain.png"></img>
</p>

<p align="center">
🧠 AI Face recognition and image description web app built in React.js
</p>

<div align="center">
  <img src="./public/assets/1.png" height="350px">
  <img src="./public/assets/2.png" height="350px">
  <img src="./public/assets/3.png" height="350px">
  <img src="./public/assets/4.png" height="350px">
</div>

<br></br>

## 💾 Installation & Setup

### Backend

```sh
# 📥 Clone the repository
git clone https://github.com/nady4/ai-face-detect-api.git

# 📂 Move to the project folder
cd ai-face-detect-api

# 📦 Install dependencies
npm install

# 🛠️ Create .env file
cat <<EOF > .env
DB_URL=postgres://postgres:1369@localhost:5432/ai-face-detect
PORT=3000
JWT_SECRET=yoursecret
EOF

# 🔧 Ensure your database server is running
npm run prisma:migrate

# 🚀 Run the development server
npm run dev
```

### Frontend

```sh
# 📥 Clone the repository
git clone https://github.com/nady4/ai-face-detect.git

# 📂 Move to the project folder
cd ai-face-detect

# 📦 Install dependencies
npm install

# 🚀 Run the development server (you'll need a backend first)
npm run dev
```

<br></br>

## 🚀 Tech Stack

| Technology       | Version |
| ---------------- | ------- |
| React            | ~18.3   |
| React DOM        | ~18.3   |
| React Router DOM | ~7.5    |
| React Toastify   | ~11.0   |
| Sass             | ~1.87   |
| Vite             | ~6.3    |
| TypeScript       | ~5.6    |
| face-api.js      | ~0.20   |

<br></br>

## 📬 Contact

- 💌 Email: **nadyajerochim@gmail.com**
- 💼 LinkedIn: [/nady4](https://www.linkedin.com/in/nady4)
- 👩🏻‍💻 GitHub: [@nady4](https://github.com/nady4)
