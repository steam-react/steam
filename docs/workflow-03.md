Let's say we have WebSockets based chat API, from which we can take a user status message to reflect current user status, and usual RPC or REST API to get a friends list.

So our component should wait until user is logged in, then it should be displayed, fetch friends list of current user, handle chat API messages to set status of user and periodically fetch friends list to keep friends list in sync.

Simplified activity diagram for this process looks like this:

![](/illustrations/friendslist-flow.png)

This example is a good illustration to benefits of redux-saga: in traditional approach this code quickly becomes a mess on every added parallel processes (especially with complex enter/exit conditions).

But in redux-saga we just have several continuous processes, which can be implemented and tested in a separate saga independently and then combined, just like it shown on diagram.

So let's start by creating a test for the first process - "wait until user logs in, show friends list, wait until user logs out, hide friends list":

```ts
/* src/sagas/friendsList.test.ts */
import { take } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan-ts'
import { FriendsListSaga } from './friendsList'
import { authActions } from '../reducers/auth'
import { friendsAction } from '../reducers/friends'

// I use friendsApiMock because I don't have
// production API implemented. In actual production code
// normal production API should be imported here.
// Test doesn't call any methods, just checks if there
// were call attempt with needed arguments supplied.
// So it can be tested without any "test servers" or so.
import { friendsApiMock } from '../services/friends.mock'

describe('FriendsListSaga', () => {
	it('should wait until user logs in, show friends list, wait until user logs out, then hide friends list', () => {

		// Pass friendsApi as argument to saga
		// it helps to change api implementation for
		// different environments, like server,
		// browser or native app
		return expectSaga(FriendsListSaga, friendsApiMock)
			// Mock action payloads
			.provide([
				[take(authActions.loginSuccess.getType()), {}],
				[take(authActions.logout.getType()), undefined],
			])
			// Assertions
			// These effects should be yielded
			// in specified order
			.take(authActions.loginSuccess.getType())
			.put(friendsActions.show())
			.take(authActions.logout.getType())
			.put(friendsActions.hide())
			// Run test
			.run()
	})
})
```

It's an integration test, so it's a bit more complex than unit tests we did for reducers. Again if we run `yarn test`, it will fail, so we should create a saga:

```ts
/* src/sagas/friendsList.ts */
// effect creators
import { take, put } from 'redux-saga/effects'
import { IFriendsApi } from '../services/auth'
import { authActions } from '../reducers/auth'
import { friendsAction } from '../reducers/friends'

export function* friendsListSaga(friendsApi: IFriendsApi) {
	// The main loop
	while(true) {
		// Wait until user logs in
		yield take(authActions.loginSuccess.getType())
		// Show friends list
		yield put(friendsActions.show())
		// Wait until user logs out
		yield take(authActions.logout.getType())
		// Hide friends list
		yield put(friendsActions.hide())
	}
}

```

That's all! Now `yarn test` says test passed. Let's add the next flow: "wait until user logs in, show friends list, wait for status change message, change user status".

To watch for external events we need an [event channel](https://redux-saga.js.org/docs/advanced/Channels.html), which converts events to something which can be taken by `yield take()` effect.

Again, let's add the test for it:

```ts
/* src/sagas/friendsList.test.ts */
import { eventChannel } from 'redux-saga'
import { call } from 'redux-saga/effects'
import { usersAction } from '../reducers/users'
import { createStatusChannel } from './friendsList'

describe('FriendsListSaga', () => {
	// ...
	it('should wait until user logs in, show friends list, wait for status change, yield status change action', () => {

		// Mocked status message
		const chatStatusMessage = {
			userId: '1',
			status: 'offline',
		}

		// Mocked status message event channel
		// The channel itself doesn't matter here
		const mockChannel = eventChannel(() => () => {})

		return expectSaga(FriendsListSaga, friendsApiMock)
			.provide([
				[take(authActions.loginSuccess.getType()), {}],
				[call(createStatusChannel), mockChannel],
				[take(mockChannel), chatStatusMessage],
			])
			.put(usersActions.setStatus('offline'))
			.run()
	}

```

Now test should fail again, so we have to implement a new flow. So let's start with creating an event channel:

```ts
/* src/sagas/friendsList.ts */
import { eventChannel } from 'redux-saga'
import { IFriendsStatusMessage } from '../services/friends'

export function createStatusChannel(friendsApi: IFriendsApi) {
	return eventChannel(emit => {
		const handler = (message: IFriendsStatusMessage) => {
			emit({
				userId: message.userId,
				status: message.status,
			})
		})

		friendsApi.onStatusMessage(handler)

		// channel creator should return unsubscribe function
		return () => friendsApi.offStatusMessage(handler)
	}) as EventChannel<IFriendsStatusMessage>
}
```

Also we have to implement the new flow itself in a friendsListSaga:

```ts
/* src/sagas/friendsList.ts */
import { fork, cancel } from 'redux-saga/effects'

function* watchStatusChanges(statusChannel: EventChannel<IFriendsStatusMessage>) {
	while(true) {
		const message = yield take(statusChannel)
		yield put(usersActions.setStatus(
			message.userId,
			message.status,
		))
	}
}

export function* friendsListSaga(friendsApi: IFriendsApi) {
	while(true) {
		yield take(authActions.loginSuccess.getType())
		yield put(friendsActions.show())

		// ADD THIS
		// create event channel
		const statusChannel = yield call(createStatusChannel, friendsApi)
		// watch for status changes
		const statusWatcher = yield fork(watchStatusChanges)


		yield take(authActions.logout.getType())

		// ADD THIS
		// Cancel watcher (it stops the while(true) {} loop)
		yield cancel(statusWatcher)


		yield put(friendsActions.hide())
	}
}
```

The same process applies to the last part - periodical update of friends list.
