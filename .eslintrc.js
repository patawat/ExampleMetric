module.exports = {

    "rulePaths": ["./lib/rules"],
    "rules": {
  ////////// Possible Errors //////////

      "no-comma-dangle": 1,         // disallow trailing commas in object literals
      //"no-extra-boolean-cast": 1,   // disallow double-negation boolean casts in a boolean context
      //"no-extra-semi": 1,           // disallow unnecessary semicolons
      ////////// Best Practices //////////

    //   "complexity": 1,            // specify the maximum cyclomatic complexity allowed in a program (off by default)
      "curly": 1,                 // specify curly brace conventions for all control statements
      "dot-location": 1,          // encourages use of dot notation whenever possible
      "eqeqeq": 1,                // require the use of === and !==
      //"no-case-declarations": 1,
      "no-floating-decimal": 1,   // disallow the use of leading or trailing decimal points in numeric literals (off by default)
      //"no-multi-str": 1,          // disallow use of multiline strings
      "vars-on-top": 1,           // requires to declare all vars on top of their containing scope (off by default)

      ////////// Variables //////////

      "no-unused-vars": 1,              // disallow declaration of variables that are not used in the code
      "no-use-before-define": 1,        // disallow use of variables before they are defined

      ////////// Stylistic Issues //////////

      "id-length" : 1,
      //"new-cap": 1,                   // require a capital letter for constructors
      "semi": 1,                      // require or disallow use of semicolons instead of ASI

      ////////// Legacy //////////

      //"max-depth": 1,       // specify the maximum depth that blocks can be nested (off by default)
      "max-len": 1,         // specify the maximum length of a line in your program (off by default)
      "max-params": 1,      // limits the number of parameters that can be used in the function declaration. (off by default)
      "max-statements": 1,  // specify the maximum number of statement allowed in a function (off by default)
      "max-statements-per-line": 1,
      "no-bitwise": 1,      // disallow use of bitwise operators (off by default)
}

};
