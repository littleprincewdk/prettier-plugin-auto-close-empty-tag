const path = require('path');
const fs = require('fs');
const prettier = require('prettier');

const code = fs.readFileSync('./test/example.html').toString().trim();

prettier.resolveConfig(path.resolve('.prettierrc')).then((options) => {
  fs.writeFileSync(
    './test/formatted.html',
    prettier.format(code, {
      parser: 'html',
      ...options,
      plugins: ['./src/index'],
    }),
  );
});
