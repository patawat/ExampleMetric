module.exports = {

    "rulePaths": ["./lib/rules"],
    "rules": {
  ////////// Possible Errors //////////
    "no-cond-assign": 1,
    "no-constant-condition": 1,
    "no-empty": 1,
    "no-irregular-whitespace": 1,

      ////////// Best Practices //////////


    "complexity": [1,{ "max": 4 }],            // specify the maximum cyclomatic complexity allowed in a program (off by default)
    "curly": 1,                 // specify curly brace conventions for all control statements
    "dot-location": 1,          // encourages use of dot notation whenever possible
    "eqeqeq": 1,                // require the use of === and !==
    "vars-on-top": 1,           // requires to declare all vars on top of their containing scope (off by default)

      ////////// Variables //////////

      "no-undef": 1,
      "no-unused-vars": 1,              // disallow declaration of variables that are not used in the code
      "no-use-before-define": 1,        // disallow use of variables before they are defined

      ////////// Stylistic Issues //////////

      "id-length" : 1,
      "semi": 1,                      // require or disallow use of semicolons instead of ASI

      ////////// Legacy //////////

      "max-depth": [1, { "max": 3}],       // specify the maximum depth that blocks can be nested (off by default)
      "max-len": [1,{ "code": 60 }],         // specify the maximum length of a line in your program (off by default)
      "max-params": 1,      // limits the number of parameters that can be used in the function declaration. (off by default)
      "max-statements": [1, { "max": 4}],  // specify the maximum number of statement allowed in a function (off by default)
      "max-statements-per-line": [1, { "max": 1}],
      "no-bitwise": 1,      // disallow use of bitwise operators (off by default)
}

};
