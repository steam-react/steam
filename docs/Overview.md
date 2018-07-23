- [Brief architecture description](/#!/Brief%20architecture%20description)
- [Workflow example](/#!/Workflow%20example)

## Directory structure

```md
├── build          - build output
├── config         - build configuration
├── docs           - documentation (you read it)
│   └── mockups    - prototyping sandbox
├── public         - static files
├── scripts        - build scripts
├── src            - source code
│   ├── components - presentational components (react code and CSS goes here)
│   ├── containers - container components (connected to redux via connect())
│   ├── reducers   - reducers/selectors/state (what makes redux store)
│   ├── sagas      - sagas (redux-saga)
│   └── services   - data access layer
└── styleguide     - compiled documentation
```
