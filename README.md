# ReservaLab

Aplicação para criar e gerenciar reservas de salas e laboratórios. Cada pessoa acessa as próprias reservas. O mesmo espaço só aceita uma reserva por data e horário de início.

## Execução local

Use Node.js 24 e um banco no MongoDB Atlas. No Atlas, crie um usuário do banco com permissão de leitura e escrita, autorize o acesso da máquina de desenvolvimento e copie a URI de conexão com o nome do banco, por exemplo `reservalab`.

Na raiz do repositório, execute no PowerShell.

```powershell
cd frontend
npm.cmd ci
Copy-Item .env.example .env.local
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Preencha `MONGODB_URI` com a URI do Atlas e `NEXTAUTH_SECRET` com o valor gerado. Mantenha `NEXTAUTH_URL=http://localhost:3000` no ambiente local. Inicie o projeto com `npm.cmd run dev` e abra [localhost:3000](http://localhost:3000).

Se o DNS local recusar as consultas SRV do Atlas (`ECONNREFUSED querySrv`), adicione `MONGODB_DNS_SERVERS=1.1.1.1,8.8.8.8` ao `.env.local` e reinicie o servidor. Essa opção configura o resolvedor DNS do processo do Node.js.

Para validar o código, execute `npm.cmd run lint` e `npm.cmd run build` dentro de `frontend`.

## Arquitetura

- O App Router em `frontend/src/app` organiza as páginas, o layout privado e a rota dinâmica `/reservas/[id]`. A interface usa TypeScript, Tailwind CSS, HeroUI v2 e navegação com `next/link`.
- O NextAuth.js usa credenciais e sessão JWT. O cadastro aplica hash Bcrypt à senha. O layout e as páginas verificam a sessão, e as Server Actions verificam a sessão e a propriedade das reservas antes de editar ou excluir.
- O Mongoose reutiliza uma promessa de conexão por processo, inclusive durante hot reload. Os modelos têm índices únicos para e-mail e horário por espaço.
- As páginas leem os dados no servidor. As Server Actions chamam `revalidatePath` após alterações. O Zustand guarda apenas o filtro de espaço na interface.

## Vercel

Importe o repositório na Vercel, selecione `frontend` como **Root Directory** e use o preset **Next.js**. Configure `MONGODB_URI` e `NEXTAUTH_SECRET` como variáveis sensíveis e defina `NEXTAUTH_URL` com o endereço HTTPS da aplicação. Confirme que o Atlas permite conexões vindas do ambiente de deploy.

## Roteiro de demonstração

1. Acesse `/reservas` sem sessão e confira o redirecionamento para o login.
2. Crie uma conta, entre e cadastre uma reserva de sala e outra de laboratório.
3. Use o filtro e abra uma reserva pelo link. Altere a data ou o horário e confira a atualização da lista.
4. Tente reservar o mesmo espaço em um horário já ocupado e confira a mensagem de erro.
5. Exclua uma reserva, saia e confirme que a área de reservas volta a exigir login.
