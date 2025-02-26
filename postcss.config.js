const fs = require('fs');
const {homepage, version, author, animateConfig} = JSON.parse(fs.readFileSync('package.json'));

const header = `@charset "UTF-8";

/*!
 * animate.css - ${homepage}
 * Version - ${version}
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) ${new Date().getFullYear()} ${author.name}
 */


  `;

module.exports = (ctx) => {
  const prefix = ctx.env === 'compat' ? '' : animateConfig.prefix;
  const devMessage = `🎉🎉🎉🎉 \nanimate.css ${ctx.env} build was compiled sucessfully! \n`;

  console.log(devMessage);

  return {
    map: ctx.options.map,
    parser: ctx.options.parser,
    plugins: {
      'postcss-import': {root: ctx.file.dirname},
      'postcss-discard-comments': {removeAll: true},
      'postcss-prefixer': {
        prefix,
        ignore: [/\[class\*=.*\]/],
      },
      'postcss-preset-env': {
        autoprefixer: {
          cascade: false,
        },
        features: {
          'custom-properties': true,
        },
      },
      cssnano: ctx.env === 'production' || ctx.env === 'compat' ? {} : false,
      // Header is not required, since CSS is copied
      /*'postcss-header': {
        header,
      },*/
    },
  };
};
