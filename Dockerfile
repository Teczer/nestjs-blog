# Utilisez une image Node.js en tant que base
FROM node:20.9.0-alpine
# Définissez le répertoire de travail
WORKDIR /app
RUN npm install --global pnpm

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN pnpm install --no-frozen-lockfile

# Copiez le reste des fichiers de l'application
COPY . .

RUN pnpm nest build
# Démarrez l'application
CMD ["pnpm", "nest", "start"]
