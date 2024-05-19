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

### Other Features

### Session presistence

Persisiting most user data could be as straightforward as storing in in a `SessionStorage`.
However, there's one elephant in the room - **Avatar file**, it's to big to be stored in `SessionStorage`.
For such cases `indexedDB` exists. I found out that `vueuse` has integration with [`idb-keyval`](https://github.com/jakearchibald/idb-keyval#readme).
It turned out to be the perfect solution. It even exposes a vue's `ref` to synchronously manipulate the data. So I could replace:

```typescript
  const user = ref<Partial<User>>({})
```

with:

```typescript
  const { data: user } = useIDBKeyval<Partial<User>>('user:user', {}, { deep: true })
```

And it worked as expected, updating the `indexedDB` entry "in the background".
All I had to do was to somehow **invalidate** the stored data if session has ended. 
And that's how `useSessionIDBKeyval` came to life

### Phone number validation

I used `libphonenumber-js` for phone validation. It uses Google's [`libphonenumber`](https://github.com/google/libphonenumber) underneath

### Component styled wihtout libs

`AvatarInput` was styled without the use of tailwindCSS
