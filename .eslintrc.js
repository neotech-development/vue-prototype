module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'node': true
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 8
    },
    'extends': [
        'eslint:recommended',
        'plugin:flowtype/recommended',
        'plugin:tcomb/recommended'
    ],
    'plugins': [
        "html",
        'tcomb',
        'flowtype',
        'flowtype-errors'
    ],
    'rules': {
        "flowtype-errors/show-errors": 2,

        'no-undef': 'warn',
        'no-unused-vars': 'warn',
        'callback-return': 'warn',
        'indent': [
            'warn',
            4,
            {'SwitchCase': 1}
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'eqeqeq': 'error',
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'max-len': [
            'warn',
            120
        ],
        'no-console': [
            'error',
            {
                'allow': [
                    'warn',
                    'error',
                    'assert'
                ]
            }
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'never',
                'objects': 'never',
                'imports': 'never',
                'exports': 'never',
                'functions': 'ignore'
            }
        ],
        'new-cap': [
            'error',
            {
                'capIsNewExceptions': [
                    'T'
                ]
            }
        ],
        'curly': [
            'off',
            'multi'
        ]
    }
};
