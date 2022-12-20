"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var database_1 = __importDefault(require("../database"));
var user_1 = require("../models/user");
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../server"));
var product_1 = require("../models/product");
var product_entity = new product_1.productentity();
var request = (0, supertest_1.default)(server_1.default);
var user_entity = new user_1.userentity();
describe('testing product handlers methods', function () {
    var token = '';
    var test_user = {
        id: 9,
        user_name: 'testapi',
        first_name: 'test',
        second_name: '2',
        password: 'secret',
    };
    var test_product = {
        name: 'test2product',
        price: 20,
    };
    // @ts-ignore
    var id;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var prod, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_entity.create(test_user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, product_entity.create(test_product)];
                case 2:
                    prod = _a.sent();
                    id = prod.id;
                    return [4 /*yield*/, request
                            .post('/authenticate')
                            .set('Content-type', 'application/json')
                            .send({
                            username: 'testapi',
                            password: 'secret',
                        })];
                case 3:
                    res = _a.sent();
                    token = res.body.token;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    connection = _a.sent();
                    sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, connection.query(sql)];
                case 2:
                    _a.sent();
                    connection.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing create to create product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/products')
                        .set('Content-type', 'application/json')
                        .set('Authorization', "Bearer ".concat(token))
                        .send({
                        name: 'test_product',
                        price: 20,
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.body.name).toBe('test_product');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing show to get product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        // @ts-ignore
                        .get("/products/".concat(id))
                        .set('Content-type', 'application/json')];
                case 1:
                    res = _a.sent();
                    expect(res.body.name).toBe('test2product');
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing index to get all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/products')
                        .set('Content-type', 'application/json')];
                case 1:
                    res = _a.sent();
                    expect(res.body.length).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
});
