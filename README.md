# ds

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## The Stack

### UI Framework

- Vue

### Routing

- Vue Router + [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) for file-based routing

File-based routing gives a fixed way of structuring your views and routing.
So it's a good option for prototyping + [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) automaticaly generates router types for you

### CSS

- TailwindCSS + (`daisyui`)[https://github.com/saadeghi/daisyui] as component library

TailwindCSS is excellent for crafting prototypes, (`daisyui`)[https://github.com/saadeghi/daisyui] is popular tailwind-based component library

### State Management

- Pinia

Pinia is de facto standard for state managment in Vue 3

### Form handling

- `zod` for validation + Pinia for handling form state

`zod` works great with TypeScript and is super popular

Why not form library like `veevalidate`?

I don't want to introduce another _state container_ for the form.
Especially if the app has to be _backend proof_. What I use some sofisticated API?
Like Apollo with the `cache`, or a WebSocket connection, server validation etc.

\+ I want store this data for the session - would it be easy to do with library like `veevalidate`?

I have expirience with `veevalidate` and similar libraries.
And the reality is they're less flexible than a simple state manager like Pinia,
where you can just use vue composables.
I think it's better to integrate such library when you **already have** backend API defined,
then it could help you streamline the work and strucutre the code
