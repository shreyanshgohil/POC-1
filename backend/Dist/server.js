"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
// initialization
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const MongoDbStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3000' }));
app.use((0, cookie_parser_1.default)());
const store = new MongoDbStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions',
});
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
    },
}));
// Routes configuration
app.use('/user', routes_1.userRoutes);
mongoose_1.default.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to db');
});
app.listen(process.env.PORT, () => {
    console.log(`Server is started on port ${process.env.PORT}`);
});
