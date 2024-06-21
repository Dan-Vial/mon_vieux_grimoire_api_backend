# Mon vieux Grimoire

Développez le back-end d'un site de notation de livres

## Config DotEnv .env

générer un token avec cette commande : 

> [!CAUTION]
> Garder le bien secret.

```sh
openssl rand -base64 32
```

créé un fichier `.env`.

> [!CAUTION]
> Garder le bien secret. \
Vérifier votre fichier .gitignore et ajouter `.env`. \
Utiliser votre URL Mongoose.

```sh
PORT=4000
TOKEN_SECRET="gen token"
URL_MONGOOSE_DB="mongodb+srv://XXXXXXXXXXXXXXXXX"
```

## install

```sh
npm i
```

## star server backend

* ### server : 

  ```sh
  npm run start
  ```

* ### server + vscode : 

  ```sh
  npm run code
  ```

URL backend : http://localhost:4000/

URL swagger backend API REST : http://localhost:4000/api-docs/

URL frontkend : http://localhost:4080/
