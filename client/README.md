
## Kanban Board Client
This is the client side of the Kanban Board application. It is built using React and TailWind CSS.

### Pre-requisites
- Server must be running on `http://localhost:5000`

### How to run
1. Clone the repository
2. Run `npm install` to install all dependencies
3. Run `npm start` to start the application
4. Open `http://localhost:5173` in your browser

### Folder Structure
```
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
|   ├── kanban-bg.png
├── README.md
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   ├── components
│   │   ├── ColumnWrapper.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── NavBar.tsx
│   │   └── TaskCard.tsx
│   ├── contexts
│   │   ├── KanbanBoardContext.tsx
│   │   └── UserContext.tsx
│   ├── icons
│   │   ├── AddIcon.tsx
│   │   └── DeleteIcon.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── pages
│   │   ├── KanbanBoardPage.tsx
│   │   ├── Login.tsx
│   │   └── SignUp.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Folder Description

- The `src` folder contains the source code of the project
- The `components` folder contains reusable UI componenets used in the client.
- The `contexts` folder cotnains the React contexts that are used in the client to easily share common methods and variables accross all components.
- The `pages` folder contains the pages of the application. Each page is a React component that is rendered when the user navigates to a specific route.
- The `icons` folder contains the SVG icons used in the application in the form of React Elements.