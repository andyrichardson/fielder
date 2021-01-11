module.exports = ({ types: t }) => {
    const imports = {};

    return {
        name: 'test',
        visitor: {
            ImportDeclaration: {
                enter: function (path, state) {
                    const filename = state.file.opts.sourceFileName;

                    if(!imports[filename]) {
                        imports[filename] = {};
                    }

                    const fileImports = imports[filename];

                    if (path.node.source.value !== "react") {
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

                        if (spec.imported.name === "FC") {
                            spec.imported.name = "FunctionalComponent";
                        }

                        if (spec.imported.name === "MutableRefObject") {
                            spec.imported.name = "RefObject";
                        }

                        specifiers.preact.push(spec);
                    });

                    const replacements = [];

                    Object.keys(specifiers).forEach((key) => {
                        if (specifiers[key].length === 0) {
                            return;
                        }

                        if (fileImports[key] === undefined) {
                            fileImports[key] = t.importDeclaration(specifiers[key], t.stringLiteral(key));
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
                }
            }
        }
    }
}