# Imagem base do Node.js versão 20 leve
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto React para produção
RUN npm run build

# Instala o serve para servir os arquivos estáticos
RUN npm install -g serve

# Expõe a porta que o frontend vai usar
EXPOSE 5173

# Serve os arquivos buildados na porta 5173
CMD ["serve", "-s", "dist", "-l", "5173"]