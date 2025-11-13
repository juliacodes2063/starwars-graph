export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss', '@stylistic/stylelint-plugin'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {
        'selector-class-pattern': null, 
      },
    }
  ],
  rules: {
    'at-rule-no-unknown': null,
    'media-query-no-invalid': null,
    'scss/at-rule-no-unknown': true,
    '@stylistic/indentation': 2,

    'max-nesting-depth': 3,
    'no-descending-specificity': null,
    'media-feature-range-notation': null
  }
};
