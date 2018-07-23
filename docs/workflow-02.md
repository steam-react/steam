So we have a component which can display our friends list, now it's time to bring it to live.

After all visual components have been created, we have this interface:

```ts
export interface IFriendsListProps {
	collapsed: boolean
	loading?: boolean
	friends: IFriendListItemProps[]
	onFriendClick: (friendId: number) => void
}

export interface IFriendListItemProps {
	id: number
	name: string
	picture: string
	status: TFriendStatus
	onClick: React.ReactEventHandler<any>
}

type TFriendStatus = 'online' | 'offline'
```

So we need to store somewhere in the application state a list of current user's friends. Also in Redux better to store normalized data in application state, because it helps to keep state consistenct and makes equality checks really easy (reference equality check). So we should add:
- users list - object which contains users details (`{ id: {... user details} }`)
- friends list -  array of user ids, so we can pick user details by picking values from our users list.

Therefore we should create two reducers: one for friends list and another for users list (and tests for it). Let's start with tests:

```ts
/* src/reducers/friends.test.ts */

import reducer from './friends'
import {actions, initialState, getFriendsList} from './friends'

describe('reducer', () => {
	it('should set friends list', () => {
		const result = reducer(initialState, actions.set([
			'1', '2', '3'
		]))

		expect(result).toEqual(['1', '2', '3'])
	})
})

describe('selectors', () => {
	it('should get friends list', () => {
		const state = {
			friends: ['1', '2', '3']
		}
		const result = getFriendsList(state)
		expect(result).toEqual(['1', '2', '3'])
	})
})
```

If we run `yarn test` command in shell, our test will fail on compilation stage, because we don't have a `friends.ts` module, so it's time to implement reducer and selector:

```ts
/* src/reducers/friends.ts */

import { ActionType, createAction, createReducer } from './helpers'
import { TRootState } from '../reducers'

// Type alias to add more semantics
export const TFriendId = string

// Initial state which will be returned
// if no previous state were supplied
export const initialState = {
	isLoading: false,
	friends: [] as TFriendId[]
}

export const actions = {
	// "friends/SET" is an action type,
	// so we can distinguish one action from another
	// First type in generic is a payload, second is a state
	set: createAction("friends/SET")<TFriendId[], typeof initialState>(
		(state, payload) => ({
			...state,
			friends: [...payload]
		})
	),
}

// Type to make action types correctly inferred
// It's a union of all action types
// {type: '...', payload: ...} | {type: '...', payload: ...} | etc.
export type TLanguagesAction = ActionType<typeof actions>

// Export reducer
export default createReducer<typeof initialState, TLanguagesAction>(initialState, actions)

// Selectors
export const getFriends = (state: TRootState) => state.friends.friends
export const getIsLoading = (state: TRootState) => state.friends.isLoading
```

So test should pass now. Let's add this reducer to store, so we should modify the `src/reducers/index.ts`:

```ts
/* src/reducers/index.ts */

// ...

// import reducer
import friendsReducer from './friends'

// ...

const rootReducer = combineReducers({

	// ...

	// add it to the store
	friends: friendsReducer,
})
```

Then we implement reducer for users list in the same manner.

After that we are ready to _connect_ our visual components to the application state, so we create a _Container_ component:

```ts
/* src/containers/friendslist.ts */
import { pick } from 'lodash/fp'
import { connect } from 'react-redux'
import {
	IFriendsListProps,
	IFriendListItemProps,
	FriendsList,
} from '../components/FriendsList'
import { TRootState } from '../reducers'
import { getFriends, getIsLoading } from '../reducers/friends'
import { getUsers } from '../reducers/users'
import { createSelector } from 'reselect'

const getFriendsList = createSelector(
	getFriends,
	getUsers,
	(friends, users): IFriendListItemProps[] =>
		pick(friends, users)
)

// mapStateToProps takes current state, and returns
// and object containing property values for component
const mapStateToProps = (state: TRootState): IFriendsListProps => ({
		collapsed: true, // always start collapsed
		loading: getIsLoading(state),
		friends: getFriendsList(state),
	})
)

const mapDispatchToProps = (dispatch) => {
	onFriendClick: (friendId: number) => {
		// we do nothing here now,
		// later we can use dispatch()
		// to dispatch an action and handle it
		// in a saga
		// i.e. load chat history,
		// open a chat window etc.
	},
}

// export component, connected to the store
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FriendsList)
```

Now we can add our connected component to the application:

```ts
/* src/containers/StoreFront.tsx */
import FriendsList from './FriendsList'

export default () => (
	// ...
	<FriendsList />
	// ...
)
```

Now we can run `yarn start` and go to the [localhost:3000](http://localhost:3000) to test our component. We can use ReduxDevTools extension to dispatch needed actions and see how our component behave.




