module.exports = ({ types: t }) => {
  const imports = {};

  console.log(t);
  return {
    name: 'test',
    visitor: {
      // Remap React -> Preact imports
      ImportDeclaration: {
        enter: function (path, state) {
          const filename = state.file.opts.sourceFileName;

          if (!imports[filename]) {
            imports[filename] = {};
          }

          const fileImports = imports[filename];

          if (path.node.source.value !== 'react') {
            return;
          }

          const specifiers = {
            preact: [],
            'preact/hooks': [],
          };

          path.node.specifiers.forEach((spec) => {
            if (/^use.*/.test(spec.imported.name)) {
              specifiers['preact/hooks'].push(spec);
              return;
            }

            if (spec.imported.name === 'FC') {
              spec.imported.name = 'FunctionalComponent';
            }

            if (spec.imported.name === 'MutableRefObject') {
              spec.imported.name = 'RefObject';
            }

            specifiers.preact.push(spec);
          });

          const replacements = [];

          Object.keys(specifiers).forEach((key) => {
            if (specifiers[key].length === 0) {
              return;
            }

            if (fileImports[key] === undefined) {
              fileImports[key] = t.importDeclaration(
                specifiers[key],
                t.stringLiteral(key)
              );
              replacements.push(fileImports[key]);
              return;
            }

            fileImports[key].specifiers.concat(specifiers[key]);
          });

          if (!replacements.length) {
            path.remove();
            return;
          }

          path.replaceWithMultiple(replacements);
        },
      },
      // Add onInput to useField type
      TSPropertySignature: {
        enter: function (path) {
          if (path.node.key.name === 'onChange') {
            const copy = t.cloneNode(path.node);
            copy.key.name = 'onInput';
            path.insertBefore(copy);
          }
        },
      },
      // Add onInput to useField body
      VariableDeclaration: {
        enter: function (path) {
          const firstDec = path.node.declarations[0];

          if (!firstDec || firstDec.id.name !== 'onChange') {
            return;
          }

          const onInput = t.variableDeclaration('const', [
            t.variableDeclarator(t.identifier('onInput'), firstDec.id),
          ]);
          path.insertAfter(onInput);
        },
      },
      // Add onInput to useField memoised deps
      ArrayExpression: {
        enter: function (path) {
          if (
            path.node.elements.find(
              (i) => t.isIdentifier(i) && i.name === 'onChange'
            )
          ) {
            path.node.elements.push(t.identifier('onInput'));
          }
        },
      },
      ObjectExpression: {
        enter: function (path) {
          if (
            path.node.properties.find(
              (i) => t.isObjectProperty(i) && i.key.name === 'onChange'
            )
          ) {
            path.node.properties.push(
              t.objectProperty(t.identifier('onInput'), t.identifier('onInput'))
            );
          }
        },
      },
    },
  };
};
