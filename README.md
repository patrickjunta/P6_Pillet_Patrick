## Piquante

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

## Development server

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source.

### Connection Base de Donnée

Veuillez vous déplacer sur le dossier backend et faire un `npm install`
Veullez faire dans le terminal la manipulation  `node server` ou `nodemon server`

Pour vous connecter à la base de donnée avec votre compte mongoDB veuillez créer un fichier dotenv
.env 
`MONGOOSE=mongodb+srv://votreIdentifiant:votrePassword@cluster0.4bgvw.gcp.mongodb.net/P6?retryWrites=true&w=majority`
