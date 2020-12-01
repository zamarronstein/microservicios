// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Configuración de JWT
// ============================
process.env.SEED = process.env.SEED || 'ZaMaTrix';
process.env.EXPIRATION = '48h'; // 60 segs * 60 min * 24 hrs * 30 days

// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'develop') {
    urlDB = 'mongodb://172.18.0.2:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Google Sing-In Config
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '905942847697-uohc0ureqr3lvf9aqh0vjvm3snks7rao.apps.googleusercontent.com';