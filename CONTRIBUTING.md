## How do I publish a new version?

### 1. Update the version

Set the version attribute in the _package.json_

### 2. Build the new changelog

> Note: This step requires docker

```
npm run changelog --future-release [release version] --token [your github oauth token]
```

### 3. Push/merge new version to master

```
git add package.json CHANGELOG.md
git commit -m "Version v0.0.0"
git push origin master
```

### 4. Publish new release

**Warning:** This will publish a new release to the npmjs registry.

_(replace v0.0.0 with your new version)_

```
git fetch origin master
git tag v0.0.0 origin/master
git push origin v0.0.0
```

### 5. Create a new release on Github

Finally, navigate to [releases](https://github.com/andyrichardson/fielder/releases) and choose _draft a new release_.

> Note: You can copy and paste release info from the changelog you just generated
