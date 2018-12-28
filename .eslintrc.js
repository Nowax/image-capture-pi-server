module.exports = {
    "parser": "babel-eslint",
    "extends": "react-app",
    "env": {
        "jest": true
    },
    "rules": {
        "no-console": "off",
        "no-unused-vars": "error",
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
        "flowtype/require-valid-file-annotation": ["error", "always"],
        "no-warning-comments":"error"
    }
};