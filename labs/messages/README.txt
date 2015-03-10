Lab 6 - Messages 
COMP 20 (Spring 2015)
Lisa Fukushima

To my knowledge, I feel that everything has been correctly implemented.
I worked alone on this assignment

QUESTION: Is it possible to request the data from a different origin (e.g.,
http://messagehub.herokuapp.com/) or from your local machine (from file:///)
from using XMLHttpRequest? Why or why not? 
--> ANSWER: A big N-O-P-E because of the “same origin policy” which is a security measure that restricts how documents and scripts of one origin (origin = same protocol, port, AND host) interact with resources from another origin. This helps prevent malicious sites from accessing sensitive data like cookies, privacy, and personal info that we may have cached/stored/what-have-you on sites like facebook, online banking, etc.

Last Updated: March 9, 2015

HOURS: 5

VALIDATORS
- http://www.jslint.com/#JSLINT_OPTIONS
- http://www.javascriptlint.com/online_lint.php

REFERENCES
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
- http://www.w3schools.com/js/js_loop_for.asp
- http://overapi.com/css/
- http://davidwalsh.name/css-circles
- https://css-tricks.com/almanac/properties/b/border-radius/
- https://en.wikipedia.org/wiki/XMLHttpRequest
- https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
- https://security.stackexchange.com/questions/8264/why-is-the-same-origin-policy-so-important
