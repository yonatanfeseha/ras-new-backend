#!/bin/bash

# Project name
read -p "Enter project name: " PROJECT_NAME

echo "Creating project: $PROJECT_NAME"

mkdir $PROJECT_NAME && cd $PROJECT_NAME

npm init -y

# Install dependencies
npm install express dotenv cors morgan mysql2
npm install -D nodemon

# Create folders
mkdir -p src/{controllers,models,routes,middlewares,config,utils}
mkdir -p tests

# Create files
touch src/app.js src/server.js .env .gitignore README.md

touch src/controllers/userController.js
touch src/models/userModel.js
touch src/routes/userRoutes.js
touch src/config/db.js

# .gitignore
echo "node_modules
.env" > .gitignore

# ENV
cat <<EOL > .env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mydb
EOL

# DB connection (MySQL pool)
cat <<EOL > src/config/db.js
import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
EOL

# server.js
cat <<EOL > src/server.js
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
EOL

# app.js
cat <<EOL > src/app.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API running...');
});

export default app;
EOL

# user model
cat <<EOL > src/models/userModel.js
import { db } from '../config/db.js';

export const getUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};
EOL

# controller
cat <<EOL > src/controllers/userController.js
import { getUsers } from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
EOL

# route
cat <<EOL > src/routes/userRoutes.js
import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);

export default router;
EOL

# package.json scripts
node -e "
let pkg = require('./package.json');
pkg.type = 'module';
pkg.scripts = {
  dev: 'nodemon src/server.js',
  start: 'node src/server.js'
};
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "✅ MySQL backend ready!"
echo "👉 Create a MySQL database named 'mydb' and a 'users' table"
echo "👉 Run: cd $PROJECT_NAME && npm run dev"