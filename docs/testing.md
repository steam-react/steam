In workflow example I demonstrated unit and integration tests. I usually run it in a tmux split pane:

```bash
yarn test
```

This command starts `jest`, and watches if any files have been changed, then runs all test cases related to changed files.

To check if there are enough tests, `yarn test-coverage` command can be used:

```bash
$ yarn test-coverage

---------------------|----------|----------|----------|----------|-------------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------|----------|----------|----------|----------|-------------------|
All files            |      100 |      100 |      100 |      100 |                   |
 reducers            |      100 |      100 |      100 |      100 |                   |
  auth.ts            |      100 |      100 |      100 |      100 |                   |
  cart.ts            |      100 |      100 |      100 |      100 |                   |
  discoveryQueue.ts  |      100 |      100 |      100 |      100 |                   |
  helpers.ts         |      100 |      100 |      100 |      100 |                   |
  languages.ts       |      100 |      100 |      100 |      100 |                   |
  products.ts        |      100 |      100 |      100 |      100 |                   |
  productsList.ts    |      100 |      100 |      100 |      100 |                   |
  recommendations.ts |      100 |      100 |      100 |      100 |                   |
  specialOffers.ts   |      100 |      100 |      100 |      100 |                   |
 sagas               |      100 |      100 |      100 |      100 |                   |
  auth.ts            |      100 |      100 |      100 |      100 |                   |
  recommendations.ts |      100 |      100 |      100 |      100 |                   |
  storeFront.ts      |      100 |      100 |      100 |      100 |                   |
---------------------|----------|----------|----------|----------|-------------------|
```

It displays several metrics:

- `% Stmts` means percentage of statements which were executed during all tests
- `% Branch` means percentage of `if/then/else` branches been visited, i.e. if we have condition like `if (x) { foo(); }` and in tests `x` is always truthy, it means we can have 100% of statements covered, but only 50% of branches, because we never executed code in a way when `foo()` never been called
- `% Funcs` means how many declared functions have been called in tests
- `% Lines` means how many lines have been executed in tests
- `Uncovered line #s` - just numbers of lines never executed in tests

 I usually add check of test coverage in CI, so it can check on every pull request if code is covered. If coverage less than 100% - it blocks merging of this pull request.

## Screenshots difference

There also one more test I usually run on CI system: screenshots comparison test.

It can be started by running `yarn test-screenshot`, while having `yarn styleguidist server` runinng in background (so there are components documentation server available on http://localhost:6060/). It takes screenshots of every component using headless Chromium, then compares these screenshots with previously taken "reference" screenshots. If there are any difference, it stores diff result, and fails the test.

It does have pretty fair amount of false positives, i.e. every animated item can trigger difference, so it can't be used as a formal tool for approving/rejecting changes, but it finds all places needed to check before release, so it dramatically reduces manual testing time.

So usually visual components don't need any unit tests, and it's enough to check them using this screenshot diff tool.
