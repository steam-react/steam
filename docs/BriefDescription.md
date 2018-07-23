This approach can work on different platforms: pure clientside web application, web application with server rendering, Electron-based desktop application or React.Native mobile (or even native desktop application via proton-native).

Component structure of application looks like this:

![](/illustrations/FrontendComponents.png)

__Components on diagram:__

- _Backends_&nbsp;&mdash; various backends, usually written in different languages and tools depending of what works best for specific task
- _Frontend API_&nbsp;&mdash; used for unification of Backends APIs, mostly IO bound, so languages with good async programming support are the best (Golang, Node.js etc.)), I used a Google Firebase REST API in prototype, but in production I prefer gRPC (or grpc-web for websites), it's fast (uses binary serialization and HTTP/2), self-documented and has support for all popular programming languages
- _Frontend renderer_&nbsp;&mdash; application code running on server, used to render application pages on initial user's request (and for search engines), I didn't implement it because of time restrictions
- _Browser_, _Desktop app_, _Mobile app_&nbsp;&mdash; application code running in browser and on desktop/mobile as a hybrid or native application

Application code split into three basic layers: presentation, logic and data access (and some native code in case of desktop/mobile app). The same logic and data access code can be used across different platforms/environment, like at server, or in browser, or in desktop or mobile applications. There are also possible to use the same presentational components on different platforms, but sometimes it requires some additional work.

I used quite common React/Redux approach. It has the next data flow:

![](/illustrations/redux-flow.png)

Looks familiar, isn't it?

![](/illustrations/mvc-flow.png)

So _components_ (and _containers_) represent a presentation layer, _reducers_ and _sagas_ are responsible for logic, and there are also data access layer (not shown on diagram, will be described later), which consists of _services_.

### Components
This is a part of presentation layer, implemented using React library. Component output can depend only on component properties (stateless component), or on properties and internal data (stateful). Most of components are stateless. Stateful components are interactive components like popups or carousel.

React uses VirtualDOM for rendering, it renders complete new UI state every in memory, than applies difference to the real DOM. It's like a conventional templates on steroids.

Components are styled using PostCSS with CSSModules, it prevents from CSS scoping issues. I like it slightly more than CSS-in-JS solutions like styled-components because it still have all benefits of pure CSS like having option to cache CSS and JS separately etc. (actually I just prefer not to write CSS in JS files).

Components can be found in `src/components` directory or [component library](/#!/Components).

### State
In Redux state is a plain old JavaScript object, which holds current application state. State is immutable, so on every modification new state object created. It makes possible very simple and cheap modification detection (plain reference equality) in the cost of slightly higher memory usage.

### Reducer
In Redux reducer is a pure function. It takes two objects as arguments: current _state_ and _action_, and it returns new state. Reducer called with unknown _action_ returns current _state_. In real life reducer is a composition of several smaller pure functions, each responsible for the small meaningful part of state. You can find source code in `src/reducers` directory.

### Container components
React components doesn't know anything about state, reducers and _actions_, so there are special kind of higher-order components named "Containers" (see `src/containers`). Redux function `connect()` used to subscribe wrapped Component to State changes (via function which takes state and returns Component properties values), and to subscribe on Component events, dispatching _actions_ as a result. So containers act as an adapter between redux and react.

### Action
 _Action_ is a very important concept. In classic MVC approach _action_ dispatched by calling corresponding method. In Redux _action_ is a plain old JavaScript object (POJO) which is passed to reducer. There are no requirements on _action_ structure, but it's very common to have this format:

```js static
{
	type: 'auth/LOGIN', // action type identifier
	payload: {          // action parameters/data
		login: '...',
		password: '...'
	}
}
```

This for instance makes possible save every _action_, and replay all of them later for debug purposes (check out the Redux DevTools extensions time-travel [demo](https://www.youtube.com/watch?v=tHLRexgkOzk)) and many more fancy stuff.

But more important this solution decouples components from reducer and simplifies unit testing as you don't need any complex mock objects or even services, you can provide every piece of data needed right in the test.

### Saga
React/Redux approach works well until we need some side effects like network communication, watching global events, working with third party APIs etc. There are several solutions, but I prefer redux-saga. It introduces one more abstraction named "Effect". It's a plain object which describes needed side effect: "wait for the _action_ with type XXX", "call async function YYY with arguments ZZZ", "wait for event XXX" etc.

![](/illustrations/saga-flow.png)

Each _saga_ is a generator function, which yields needed effects. It can be treated like a background process (which is actually not) which handles all side effects.

It decouples pure _reducers_ from imperfect and impure real life.

See `src/sagas` directory for examples.

### Services
It's a data access layer, used in _sagas_. It doesn't specify what kind of API to use. I didn't implement it in this project, but I'd recommend [grpc-web](https://github.com/improbable-eng/grpc-web):
- `.proto` file is a great automatically updated API documentation
- strongly-typed request/response
- standard error reporting
- it uses HTTP/2, so it works well with many small requests, which seems like a typical scenario for this application

Also there are another options like XMLHttpRequest calls, FetchAPI (using REST, RPC or GraphQL) and WebSockets.
