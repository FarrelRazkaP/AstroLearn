import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory and users.json exist
function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function getUsers() {
  ensureDb();
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading users db:', e);
    return [];
  }
}

export function saveUsers(users) {
  ensureDb();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error writing users db:', e);
  }
}

// Find user by email or username
export function findUserByIdentity(identity) {
  const users = getUsers();
  const lower = identity.toLowerCase().trim();
  return users.find(
    (u) =>
      u.email.toLowerCase() === lower ||
      u.username.toLowerCase() === lower ||
      u.fullName.toLowerCase() === lower
  );
}

// Register new user account into Database with 0 starting XP
export function registerUser({ fullName, email, password, role = 'pemula' }) {
  const users = getUsers();
  const lowerEmail = email.toLowerCase().trim();

  if (users.some((u) => u.email.toLowerCase() === lowerEmail)) {
    throw new Error('Email sudah terdaftar! Gunakan email lain.');
  }

  const username = lowerEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    fullName,
    email: lowerEmail,
    username,
    passwordHash: hashPassword(password),
    role,
    points: 0,
    level: 1,
    streak: 0,
    lastStreakDate: '',
    avatarUrl: '',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without passwordHash
  const { passwordHash: _, ...safeUser } = newUser;
  return safeUser;
}

// Authenticate user login against Database
export function authenticateUser(identity, password) {
  const user = findUserByIdentity(identity);
  if (!user) {
    throw new Error('Identitas (email/username) tidak ditemukan!');
  }

  const hash = hashPassword(password);
  if (user.passwordHash !== hash) {
    throw new Error('Kata sandi yang Anda masukkan salah!');
  }

  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}
