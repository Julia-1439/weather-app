# npm-webpack-template

Dev Setup

```
npm install
npx webpack # generates /dist
```

Usage

```
npm run dev # build in dev mode
npm run build # build in prod mode
npm run deploy # deploy to gh-pages branch
```

Optional installations
```
 # eslint (see: https://eslint.org/docs/latest/use/getting-started)
 npm init @eslint/config@latest 

 # prettier - style formatter (see: https://prettier.io/docs/install.html)
 npm install --save-dev --save-exact prettier
 && node --eval "fs.writeFileSync('.prettierrc','{}\n')"
 && node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```