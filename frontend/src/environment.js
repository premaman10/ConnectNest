let IS_PROD = false; // Change to true when deploying to production
const server = IS_PROD ?
    "https://connectnest.onrender.com" :
    "http://localhost:5000"

export default server;
