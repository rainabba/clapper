This is literally my the test project that I can't get working (get a 500 and no exposed error) except that I've changed my auth keys of course.

To test:
1. Clone this branch
2. `npm install`
3. node ./index.js
4. navigate to http://localhost:8000/

If I remove lines node_modules/clapper/index.js:80-84, restart and then do step #4, I get "I can haz cheezburger!" as expected.
