# Instruções

Tenha instalado o VSCode, PostgreSQL, node e Insomnia.

Baixe os arquivos do repositório e faça a extração em uma pasta ***diferente da pasta anterior do projeto***.  
**Abra o arquivo .env da pasta backend e modifique com o usuário e senha do seu PostgreSQL.**  
Abra um prompt de comando **dentro da pasta backend**. Se estiver abrindo o terminal pelo VSCode, não esqueça de abrir novas abas como "command prompt".  
Execute os comandos, nessa ordem:  

    npm i  
    npx prisma migrate dev --name banco-limpo  
    npm run dev  

O backend deve estar funcionando na porta 3000. Use "npm run dev" na pasta backend para subir novamente quando precisar.

Agora abra um novo prompt **dentro da pasta frontend**. Execute os comandos:

    npm i  
    npm run dev  

O frontend deve estar funcionando na porta 5173.  
Acesse pelo navegador através da URL http://localhost:5173/
