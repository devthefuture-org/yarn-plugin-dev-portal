# Yarn Plugin Dev-Portal

Utilize Yarn's portal to seamlessly link to external local libraries you're developing, allowing your project's source code and configuration to remain consistent with the distributed version, eliminating the need for constant toggling manually between the two.

## Installation

```sh
yarn plugin import https://codeberg.org/devthefuture/yarn-plugin-dev-portal/raw/branch/master/bundles/@yarnpkg/plugin-dev-portal.js
```

## Commit Strategy

For the smoothest experience with the `yarn-dev-portal` plugin, commit the `.prod` suffixed files like `yarn.lock.prod` and `package.json.prod`. While working locally, the default mode of operation is development. This ensures a seamless transition between development activities and production-ready states.

## Features

1.  **Enhanced Portal Protocol**: The plugin makes use of Yarn's portal protocol for dependencies that are being worked on in parallel.  
    _Understanding the Portal Protocol_: The portal protocol is a Yarn feature, allowing for a dependency declaration that points directly to a directory on your disk. This is incredibly helpful when developing multiple interrelated projects concurrently.
2.  **Easy Environment Toggling**: Switch effortlessly between development and production environments.
3.  **Centralized & Local Portal Repositories**: The plugin looks in `~/.yarn-dev-portal` (global) and `./.yarn-dev-portal` (local) directories for symlinked repos, integrating them as portals. This supports synchronized development on the primary projects and linked libraries.
4.  **Automatic Symlinking**: In the absence of `yarn.lock` or `package.json` files, the plugin creates symlinks that point to their respective `.prod` versions.

## Workflow

1.  **Initial Setup**: Commit the `.prod` suffixed files: `yarn.lock.prod` and `package.json.prod`.  
    **.gitignore snippet**:  
    ```.gitignore
    yarn.lock
    package.json
    yarn.lock.dev
    package.json.dev
    ```
2.  **Development Workflow**: By default, the plugin operates in development mode. Whenever a `yarn` command is invoked and either the `yarn.lock` or `package.json` file is missing, the plugin will symlink them to their corresponding `.prod` versions. Local packages should be linked using Yarn's portal protocol within `package.json.dev`.
3.  **Toggling Environments**: Use `yarn dev-portal dev` to activate the development mode. Switch to production with `yarn dev-portal prod`. By default, `yarn dev-portal` without arguments sets the mode to development.
4.  **Post-Installation**: Adding new packages prompts the plugin's post-install command to refresh the associated `yarn.lock` files.
5.  **Docker Integration**: For integration with Docker, consider the following snippet:  
    ```Dockerfile
    COPY package.json.prod /app/package.json
    COPY yarn.lock.prod /app/yarn.lock
    ```
6.  **Portal Repository Management**: Both `~/.yarn-dev-portal` (global) and `./.yarn-dev-portal` (local) are scanned by the plugin for symlinked repositories. Every identified symlink is assimilated as a portal. For scoped packages (ones prefixed with `@`), the plugin searches the nested subdirectories, ensuring the concurrent development of the main project and the intertwined libraries.

## Tips and Considerations

*   **Thorough Testing**: Prior to moving to production, make sure to test your application's performance without the development portal links.
*   Ensure the `yarn-dev-portal` plugin is placed at the top of the plugins list in the `.yarnrc.yml` file to guarantee that the `package.json` and `yarn.lock` symlinks are present for any other plugins that might require them during repository initialization after cloning.
*   to configure vscode/vscodium you can put this in `.vscode/settings.json`:
    ```json
    {
      "files.associations": {
        "package.json.*": "json"
      }
    }

## Contributing

We welcome contributions! If you encounter a bug or have a feature suggestion, please open an issue. To contribute code, simply fork the repository and submit a pull request.

This repository is mirrored on both GitHub and Codeberg. Contributions can be made on either platform, as the repositories are synchronized bidirectionally. 
- Codeberg: [https://codeberg.org/devthefuture/yarn-plugin-dev-portal](https://codeberg.org/devthefuture/yarn-plugin-dev-portal)
- GitHub: [https://github.com/devthefuture-org/yarn-plugin-dev-portal](https://github.com/devthefuture-org/yarn-plugin-dev-portal)

For more information:
- [Why mirror to Codeberg?](https://codeberg.org/Recommendations/Mirror_to_Codeberg#why-should-we-mirror-to-codeberg)
- [GitHub to Codeberg mirroring tutorial](https://codeberg.org/Recommendations/Mirror_to_Codeberg#github-codeberg-mirroring-tutorial)
