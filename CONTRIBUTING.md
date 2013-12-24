# Contribute

## Development

For developers and contributors

1. Fork project and clone your fork

2. Install local dependencies

  ``` bash
  npm install
  ```

3. Run tests

  ``` bash
  npm test
  ```


## Publishing

For project maintainers

1. Update meta files with latest information

2. Add a changelog entry to `HISTORY.md` with change information

  ```
  v2.0.0 April 17, 2013
    - Something that changes
  ```

3. Update `version` entry in `package.json` with new version number

4. Commit changes

  ``` bash
  git commit -a -m "A message about what changed"
  ```

5. Publish new version

  ``` bash
  npm publish
  ```
