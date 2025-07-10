let IS_PROD = true; // Changed to true for production deployment
const server = IS_PROD ?
    "https://connectnest.onrender.com" :
    "http://localhost:5000"

export default server;
