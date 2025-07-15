const api = 'http://localhost:3000';          // URL da sua API Express
let token: string | null = null;

// -------------------- LOGIN --------------------
const btnLogin = document.getElementById('btnLogin') as HTMLButtonElement;
btnLogin.addEventListener('click', async () => {
  const username = (document.getElementById('user') as HTMLInputElement).value;
  const password = (document.getElementById('pass') as HTMLInputElement).value;

  const res = await fetch(`${api}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    token = data.token;
    localStorage.setItem('jwt', token ?? '');
    (document.getElementById('loginSection') as HTMLElement).style.display = 'none';
    (document.getElementById('crudSection') as HTMLElement).style.display = 'block';
    listarProdutos();
  } else {
    (document.getElementById('loginMsg') as HTMLElement).innerText = 'Login inválido';
  }
});

// -------------------- CRUD --------------------
const tabela = document.getElementById('tabelaCorpo') as HTMLTableSectionElement;

// Listar produtos
async function listarProdutos() {
  const res = await fetch(`${api}/produtos`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const produtos = await res.json();
  tabela.innerHTML = '';
  produtos.forEach((p: any) => inserirLinha(p));
}

// Cria uma linha na tabela
function inserirLinha(p: any) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${p.id}</td>
    <td><input value="${p.nome}" data-field="nome"/></td>
    <td><input type="number" step="0.01" value="${p.preco}" data-field="preco"/></td>
    <td>
      <button data-id="${p.id}" class="salvar">💾</button>
      <button data-id="${p.id}" class="excluir">🗑️</button>
    </td>`;
  tabela.appendChild(tr);
}

// Adicionar produto
const btnAdd = document.getElementById('btnAdd') as HTMLButtonElement;
btnAdd.addEventListener('click', async () => {
  const nome = (document.getElementById('nomeProduto') as HTMLInputElement).value;
  const preco = parseFloat((document.getElementById('precoProduto') as HTMLInputElement).value);
  await fetch(`${api}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ nome, preco })
  });
  listarProdutos();
});

// Delegação de eventos para salvar / excluir
tabela.addEventListener('click', async (e) => {
  const alvo = e.target as HTMLElement;
  const id = alvo.getAttribute('data-id');
  if (!id) return;

  if (alvo.classList.contains('excluir')) {
    await fetch(`${api}/produtos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  } else if (alvo.classList.contains('salvar')) {
    // pega valores editados
    const tr = alvo.closest('tr') as HTMLTableRowElement;
    const nome = (tr.querySelector('[data-field="nome"]') as HTMLInputElement).value;
    const preco = parseFloat((tr.querySelector('[data-field="preco"]') as HTMLInputElement).value);

    await fetch(`${api}/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nome, preco })
    });
  }
  listarProdutos();
});
