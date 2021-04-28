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

1. Run it locally:

   1. If you're working on the UI and don't aren't creating/updating projects, you can use Next.js as usual:

      ```shell
      yarn dev
      ```

   1. If you're testing out the greenfield project creation flow:

      ```shell
      cd /tmp
      $(yarn global bin)/amplify-visor
      ```

   1. If you're testing out an existing Amplify project, just run:

      ```shell
      $(yarn global bin)/amplify-visor
      ```
