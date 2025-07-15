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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
var api = 'http://localhost:3000'; // URL da sua API Express
var token = null;
// -------------------- LOGIN --------------------
var btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var username, password, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = document.getElementById('user').value;
                password = document.getElementById('pass').value;
                return [4 /*yield*/, fetch("".concat(api, "/usuarios/login"), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: username, password: password })
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (res.ok) {
                    token = data.token;
                    localStorage.setItem('jwt', token);
                    document.getElementById('loginSection').style.display = 'none';
                    document.getElementById('crudSection').style.display = 'block';
                    listarProdutos();
                }
                else {
                    document.getElementById('loginMsg').innerText = 'Login inválido';
                }
                return [2 /*return*/];
        }
    });
}); });
// -------------------- CRUD --------------------
var tabela = document.getElementById('tabelaCorpo');
// Listar produtos
function listarProdutos() {
    return __awaiter(this, void 0, void 0, function () {
        var res, produtos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(api, "/produtos"), {
                        headers: { Authorization: "Bearer ".concat(token) }
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    produtos = _a.sent();
                    tabela.innerHTML = '';
                    produtos.forEach(function (p) { return inserirLinha(p); });
                    return [2 /*return*/];
            }
        });
    });
}
// Cria uma linha na tabela
function inserirLinha(p) {
    var tr = document.createElement('tr');
    tr.innerHTML = "\n    <td>".concat(p.id, "</td>\n    <td><input value=\"").concat(p.nome, "\" data-field=\"nome\"/></td>\n    <td><input type=\"number\" step=\"0.01\" value=\"").concat(p.preco, "\" data-field=\"preco\"/></td>\n    <td>\n      <button data-id=\"").concat(p.id, "\" class=\"salvar\">\uD83D\uDCBE</button>\n      <button data-id=\"").concat(p.id, "\" class=\"excluir\">\uD83D\uDDD1\uFE0F</button>\n    </td>");
    tabela.appendChild(tr);
}
// Adicionar produto
var btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var nome, preco;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nome = document.getElementById('nomeProduto').value;
                preco = parseFloat(document.getElementById('precoProduto').value);
                return [4 /*yield*/, fetch("".concat(api, "/produtos"), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: "Bearer ".concat(token) },
                        body: JSON.stringify({ nome: nome, preco: preco })
                    })];
            case 1:
                _a.sent();
                listarProdutos();
                return [2 /*return*/];
        }
    });
}); });
// Delegação de eventos para salvar / excluir
tabela.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var alvo, id, tr, nome, preco;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                alvo = e.target;
                id = alvo.getAttribute('data-id');
                if (!id)
                    return [2 /*return*/];
                if (!alvo.classList.contains('excluir')) return [3 /*break*/, 2];
                return [4 /*yield*/, fetch("".concat(api, "/produtos/").concat(id), {
                        method: 'DELETE',
                        headers: { Authorization: "Bearer ".concat(token) }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                if (!alvo.classList.contains('salvar')) return [3 /*break*/, 4];
                tr = alvo.closest('tr');
                nome = tr.querySelector('[data-field="nome"]').value;
                preco = parseFloat(tr.querySelector('[data-field="preco"]').value);
                return [4 /*yield*/, fetch("".concat(api, "/produtos/").concat(id), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', Authorization: "Bearer ".concat(token) },
                        body: JSON.stringify({ nome: nome, preco: preco })
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                listarProdutos();
                return [2 /*return*/];
        }
    });
}); });
