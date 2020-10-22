/* eslint-disable global-require, import/no-unresolved, import/no-extraneous-dependencies, no-param-reassign */
const { parsers } = require('prettier/parser-html');

const parser = parsers.html;

module.exports = {
  options: {
    autoCloseEmptyTag: {
      type: 'boolean',
      category: 'Global',
      default: true,
      description: '自动闭合空标签',
    },
  },
  parsers: {
    html: {
      ...parser,
      preprocess(text, options) {
        if (parser.preprocess) {
          text = parser.preprocess(text, options);
        }
        if (options.autoCloseEmptyTag) {
          text = text.replace(
            /<\s*?(\S+)([\s\S]*?)(?<!\/)>\s*?<\/\1\s*?>/gm,
            (_, tag, attributes) => `<${tag}${attributes} />`,
          );
        }
        return text;
      },
    },
  },
};
