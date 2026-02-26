const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./src/config/db'); // ← src/ because db.js is inside src
const app = require('./src/app');             // ← src/ because app.js is inside src

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});