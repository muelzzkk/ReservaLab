# Reserva Lab

O **Reserva Lab** é uma aplicação web para agendar salas e laboratórios. Com uma conta, você pode escolher um espaço, marcar uma data e um horário de início e acompanhar seus agendamentos em **Minhas reservas**.

[Acessar o Reserva Lab na Vercel](https://reserva-lab-chi.vercel.app/)

## Funcionalidades

- Cadastro e login por e-mail, com opção de mostrar ou ocultar a senha. O cabeçalho indica se há uma sessão ativa e oferece a opção de sair.
- Criação, edição e exclusão de reservas nos espaços numerados de 1 a 3 para cada categoria, salas e laboratórios.
- Calendário do HeroUI para escolher a data, filtro por espaço, confirmação de exclusão com o nome da reserva e toasts de sucesso ou erro.
- Formulários de login e cadastro em duas colunas no desktop e uma no celular, com temas claro e escuro e suporte à preferência por movimento reduzido.

Cada conta só pode consultar e alterar as próprias reservas. Uma nova reserva precisa ter data igual ou posterior a hoje, no fuso de São Paulo. O mesmo espaço aceita apenas uma reserva por combinação de data e horário de início.

## Como rodar localmente

Use Node.js 24 e um banco no MongoDB Atlas. No Atlas, crie um usuário do banco com permissão de leitura e escrita, autorize o acesso da máquina de desenvolvimento e copie a URI de conexão com o nome do banco, por exemplo `reservalab`.

Clone o repositório e instale as dependências. Os comandos abaixo usam PowerShell no Windows.

```powershell
git clone https://github.com/muelzzkk/ReservaLab.git
cd ReservaLab
cd frontend
npm.cmd ci
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Preencha as variáveis em `frontend/.env.local`.

| Variável | Valor |
| --- | --- |
| `MONGODB_URI` | URI do Atlas com o nome do banco. |
| `NEXTAUTH_SECRET` | Segredo gerado pelo comando acima. |
| `NEXTAUTH_URL` | `http://localhost:3000` para execução local. |

O Git ignora o arquivo `.env.local`. O `.env.example` serve de modelo para cada ambiente.

Dentro de `frontend`, rode `npm.cmd run dev` e abra [localhost:3000](http://localhost:3000). Em outros sistemas, use `npm` no lugar de `npm.cmd`.

Se o DNS local recusar as consultas SRV do Atlas (`ECONNREFUSED querySrv`), adicione `MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8` ao `.env.local` e reinicie o servidor. Essa opção configura o resolvedor DNS do processo do Node.js.

Para validar o código, execute `npm.cmd run lint` e `npm.cmd run build` dentro de `frontend`.

## Arquitetura

- O App Router em `frontend/src/app` organiza as páginas, o layout privado e a rota dinâmica `/reservas/[id]`. A interface usa TypeScript, Tailwind CSS, HeroUI v2 e navegação com `next/link`.
- O NextAuth.js usa credenciais e sessão JWT. O cadastro aplica hash Bcrypt à senha. O layout e as páginas verificam a sessão, e as Server Actions verificam a sessão e a propriedade das reservas antes de editar ou excluir.
- O Mongoose reutiliza uma promessa de conexão por processo, inclusive durante hot reload. Os modelos têm índices únicos para e-mail e horário por espaço.
- As páginas leem os dados no servidor. As Server Actions chamam `revalidatePath` após alterações. O Zustand guarda apenas o filtro de espaço na interface.

| Pasta | Responsabilidade |
| --- | --- |
| `frontend/src/app` | Páginas, layouts, Server Actions e endpoint de autenticação. |
| `frontend/src/components` | Formulários, cartões, navegação e elementos da interface. |
| `frontend/src/lib` | Conexão com o banco, autenticação, consultas e regra de data. |
| `frontend/src/models` | Esquemas Mongoose de usuários e reservas. |
| `frontend/src/store` e `frontend/src/types` | Estado do filtro, catálogo de espaços e tipos compartilhados. |

## Vercel

Importe o repositório na Vercel, selecione `frontend` como **Root Directory** e use o preset **Next.js**. Configure `MONGODB_URI` e `NEXTAUTH_SECRET` como variáveis sensíveis e defina `NEXTAUTH_URL` com o endereço HTTPS da aplicação. Confirme que o Atlas permite conexões vindas do ambiente de deploy.

Configure as variáveis no ambiente **Production**. Se alterar uma variável, faça um novo deploy para aplicar a mudança. Se o cadastro carregar, mas a operação atingir o tempo limite, verifique se o cluster está ativo e se a lista de acesso do Atlas permite a conexão da Vercel.

## Convenção de commits

Use o formato `tipo(escopo): descrição`, com uma descrição curta em português que diga o que mudou. Use `feat` para funcionalidades, `fix` para correções e `docs` para documentação.

```text
feat(reservas): adiciona filtro por espaço
fix(auth): oculta o link da tela atual na navbar
docs(readme): documenta a versão final do Reserva Lab
```

## Roteiro de demonstração

1. Acesse `/reservas` sem sessão e confira o redirecionamento para o login.
2. Crie uma conta, entre e cadastre uma reserva de sala e outra de laboratório.
3. Use o filtro e abra uma reserva pelo link. Altere a data ou o horário e confira a atualização da lista.
4. Confira que o calendário bloqueia datas passadas. Tente reservar o mesmo espaço na mesma data e no mesmo horário e confira o aviso de conflito.
5. Abra a confirmação de exclusão, cancele e confira se a reserva permanece na lista. Depois confirme a exclusão e confira o aviso de sucesso.
6. Saia da conta e confirme que a área de reservas volta a exigir login.
