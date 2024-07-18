
# Vue App (vue)

Technical task for ambitioned

## Steps to run the project:

### 1. Install the dependencies
```bash
yarn install
```

### 2. Since the generated token from crudcrud API has an expiration of 24 hours or 100 requests, you will need to do the following steps: 
#### 2.1. Generate a new API token going to https://crudcrud.com/ <-- тук ако има по-специфичен линк
#### 2.2. Go to `quasar.config.js` and replace the "RESOURCE_API_URL" env variable on line 55.

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
```


### Lint the files
```bash
yarn lint
```


### Format the files
```bash
yarn format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
