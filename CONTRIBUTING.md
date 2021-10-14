# Amplify Visor

### Local Development

1. First, clone this project & then install dependencies:

   ```shell
   yarn install
   ```

1. Next, get `amplify-visor` available globally:

   ```shell
   yarn link
   ```

1. Run it locally in `/tmp`:

   ```shell
   yarn dev
   ```

If you want to see what the `production` build feels like:

```shell
yarn build
yarn start
```

If you're testing out an existing Amplify project, just run the following in your project:

```shell
$(yarn global bin)/amplify-visor
```
