This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Check node version

```bash
node -v
```

- Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required
- If needed use nvm to install and use an appropriate node version

```bash
nvm install v18.18.0
nvm use v18.18.0
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a .env file in the project root with the following:

```bash
DATABASE_URL="file:./dev.db"
```

4. Set Up the Database

```bash
npx prisma migrate dev --name init
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the completed project
