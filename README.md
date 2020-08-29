# inkredo-challenge

## In Progress. 

## Some Links related to the project.

### [Guidelines](https://git.aniketbiprojit.me/Guidelines/)
### [Server Docs](https://github.com/aniketbiprojit/inkredo-challenge/blob/master/server/README.md)
### [Client Docs](https://github.com/aniketbiprojit/inkredo-challenge/blob/master/client/README.md)


## React Structure

### ./client/app/src

```
src
│   ├── assets
│   │   └── logo.svg
│   ├── components
│   │   ├── App.scss
│   │   ├── App.test.tsx
│   │   ├── App.tsx (home page and routes)
│   │   ├── Auth
│   │   │   ├── auth.js (a helper to check state of things)
│   │   │   ├── Auth.scss
│   │   │   ├── Create Company.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Company.tsx (company dashboard)
│   │   ├── config.js (configuration for api calls)
│   │   └── User.jsx (user dashboard)
│   ├── index.css (base css)
└── └──index.tsx (entry file. calls ./components/App.jsx)
```


## Express Structure

### ./client/server/src

```
├── src
│   ├── helpers
│   │   └── Console.ts (console logging helper -> colors)
│   ├── index.ts (entry file contains class App)
│   ├── models
│   │   ├── company.model.js (model for company)
│   │   ├── index.ts (easy exports)
│   │   ├── relation.model.js ( user <===> company )
│   │   └── user.model.js (model for user)
│   ├── routes
│   │   ├── company.routes.ts (/company)
│   │   ├── index.ts (routes export and verify middleware)
│   │   ├── relation.routes.ts (/relation)
│   │   └── user.routes.ts (/user)
│   └── server.ts (mongoose connection)
└── tsconfig.json
```
