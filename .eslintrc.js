const spellCheckRules = require('./spells')

module.exports = {
    'extends': [
        'airbnb',
        'prettier',
        'prettier/react',
    ],
    'parser': 'typescript-eslint-parser',
    'plugins': [
        'typescript',
        'prettier',
        'spellcheck'
    ],
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': './build/webpack.config.js'
            }
        }
    },
    'rules': {
        'spellcheck/spell-checker': spellCheckRules,
        'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.jsx'] }],
        // https://github.com/eslint/typescript-eslint-parser/issues/77
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'prettier/prettier':  ['error', {
            'singleQuote': true,
            'trailingComma': 'all',
            'bracketSpacing': true,
            'jsxBracketSameLine': true,
            'parser': 'typescript'
        }],
        'complexity': ['error', 8],
        'max-depth': 2,
        'max-lines': ['error', 100],

        /* Todo 빌드시 자동으로 함수형 컴포넌트로 변경해주는 도구 사용 */
        "react/prefer-stateless-function": ["error", { "ignorePureComponents": true }], 

        /* 생산성을 위한 조치 (임시조치로 삭제해야함) */
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',

        //<></> 를 쓰기 위해 임시책
        'no-multi-str': 'off',

        /* Supported ts */
        "react/prop-types": 'off',
        "import/no-unresolved": 'off',
        "no-use-before-define": 'off' // type 지정 순서 무시
    },
};