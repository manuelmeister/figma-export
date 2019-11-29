const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const svgToMiniDataURI = require('mini-svg-data-uri');

const camelCase = (str) => str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
});

const getVariableName = (componentName) => {
    const trimmedComponentName = componentName.trim();
    const variableName = camelCase(trimmedComponentName);

    if (/^[\d]+/.test(variableName)) {
        throw new Error(`"${trimmedComponentName}" - Component names cannot start with a number.`);
    }

    return variableName;
};

module.exports = ({
    output,
    variablePrefix = '',
    variableSuffix = '',
    useBase64 = false,
    useDataUrl = false,
}) => {
    makeDir.sync(output);
    return async (pages) => {
        pages.forEach(({ name: pageName, components }) => {
            let code = '';

            components.forEach(({ name: componentName, svg }) => {
                const variableName = getVariableName(`${variablePrefix} ${componentName} ${variableSuffix}`);
                let variableValue = svg;

                // eslint-disable-next-line default-case
                switch (true) {
                case useBase64:
                    variableValue = Buffer.from(svg).toString('base64');
                    break;
                case useDataUrl:
                    variableValue = svgToMiniDataURI(svg);
                    break;
                }

                code += `export const ${variableName} = \`${variableValue}\`;\n`;
            });

            const filePath = path.resolve(output, `${pageName}.js`);
            fs.writeFileSync(filePath, code);
        });
    };
};
