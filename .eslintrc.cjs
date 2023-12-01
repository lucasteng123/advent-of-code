module.exports = {
  'root':true,
  'env': {
    'es2021': true,
    'node': true, 
    'mocha': true,
  },
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  'parser': '@typescript-eslint/parser',

  'parserOptions': { 'project': ['./tsconfig.json'] },
  'ignorePatterns': ['*.js', '*.cjs'],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
