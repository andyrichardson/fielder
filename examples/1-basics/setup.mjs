import fs from 'fs';

const updatePackage = () => {
  const json = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const newJson = {
    ...json,
    alias: {
      react: '../../node_modules/react',
      'react-dom': '../../node_modules/react-dom',
      fielder: '../../',
    },
  };

  fs.writeFileSync('./package.json', JSON.stringify(newJson, null, 2), {
    encoding: 'utf-8',
  });
};

const updateTsconfig = () => {
  const json = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));
  const newJson = {
    ...json,
    compilerOptions: {
      ...json.compilerOptions,
      paths: {
        fielder: '../../',
      },
    },
  };

  fs.writeFileSync('./tsconfig.json', JSON.stringify(newJson, null, 2), {
    encoding: 'utf-8',
  });
};

updatePackage();
updateTsconfig();
