I usually start working on a new feature from making a visual component in an isolated environment of a `react-styleguidist`, this helps me to iterate faster on most volatile part of this task, clarify component requirements as early as possible, because you work with almost ready component in a live environment instead of just looking at the pictures.

So, let's make our playground by creating a `Readme.md` file in an `src/components/FriedsList/` directory.

````md
## Collapsed

```
<FriendsList
	collapsed={true}
	friends={[
        {
			id: 1,
			name: 'John Doe',
			picture: 'pictures/avatar.png',
			status: 'online'
		},
		{
			id: 2,
			name: 'John Doe',
			picture: 'pictures/avatar.png',
			status: 'offline'
		},
    ]}
	onFriendClick={() => alert('friend clicked')}
/>
```

## Opened

```
<FriendsList
	collapsed={false}
	friends={[
		{
			id: 1,
			name: 'John Doe',
			picture: 'pictures/avatar.png',
			status: 'online'
		},
		{
			id: 2,
			name: 'John Doe',
			picture: 'pictures/avatar.png',
			status: 'offline'
		},
	]}
	onFriendClick={() => alert('friend clicked')}
/>
```

## Loading

`
<FriendsList
	collapsed={false}
	friends={[]}
	loading={true}
	onFriendClick={() => alert('friend clicked')}
/>
`
````

This is not only a documentation, but a some kind of a test, because it defines the needed states of a component, it helps me to understand if it should be a stateless or stateful component and what data it will need, and it should automatically check if there's any difference from expected result (using `snapguidist` snapshot testing).

So, the next thing is to create a component itself. I usually create components in a file `<Component name>.tsx`, and export public interface in `index.ts` file, it's easier to refactor components later. So let's create a `FriendsList.tsx` in an `src/components/FriendsList/` directory.

```ts
import * as React from 'react' // Needed for React

// Props description
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


// Component have to track if it's collapsed or expanded,
// so it's a stateful component
export class FriendsList
	extends React.Component<IFriendsListProps> {
	constructor(p: IFriendsListProps) {
		super(p)
		this.state = {
			collapsed: p.collapsed
		}
	}
	render() {
		return (
			<div>FriendsList</div>
		)
	}
}
```

I also add `index.ts` file to export my component:

```ts
export { FriendsList } from './FriendsList'
```

After running `yarn styleguidist server` and navigating to [http://localhost:6060/](http://localhost:6060/) I should see a newly created component in a "Components" section. If I change component's code or `Readme.md`, it will automatically recompile and reload page, so all I need to see my changes is save file and switch to the browser. Usually I arrange windows side-by-side or move browser window to separate display, so I don't even need to switch between editor and browser.

Let's add some markup and styles. I use CSSModules, so let's create `FriendsList.css` file in an `src/components/FriendsList/` directory.

```css
.FriendsList {
	/*
	I name the class of component's root element
	with component's name
	*/
}
```

Use this classname in `FriendsList.tsx`:
```ts
// .css extension is essential
import * as styles from './styles.css'

...
render() {
	return (
		<div className={styles.FriendsList}>
			FriendsList
		</div>
	)
}
```

To display friends in list I use another component (stateless):

```ts
/* FriendsListItem.tsx */
import * as styles from './FriendsListItem.css'

export const FriendsListItem = (p: IFriendListItemProps) => (
	<div
		onClick={p.onClick}
		className={styles.FriendsListItem}>
		<img className={styles.picture} src={p.picture} />
		<span className={styles.name}>{p.name}</span>
		<span className={styles.status}>{p.status}</span>
	</div>
)
```

Also I create a separate styles file `FriendsListItem.css` to prevent main styles file cluttering and to simplify any future refactorings:

```css
.FriendsListItem
{
	/* placeholder */
}

.name,
.picture,
.status
{
	/* placeholder */
}
```

...and use it in the main component:
```ts
/* FriendsList.tsx */
import {FriendsListItem} from './FriendsListItem'

// ...

export class FriendsList ... {

	// ...

	render() {
		return (
			<div className={styles.FriendsList}>
				{
					p.friends.map(friendProps => (
						<FriendsListItem
							{...friendProps}
							onClick={this.props.onFriendClick(friendProps.id)}
						/>
					))
				}
			</div>
		)
	}
}
```

Then I usually do the component's markup, presentational logic (collapsing/expanding, some effects and so on), and iterate it over with designers if there are any problems or questions.

Also this process doesn't require any knowledge about underlying  data structure and APIs, so it can be easily outsourced.

After work on a component complete, I press "Update" button in `react-styleguidist` interface, so it saves a snapshot of the component output, and will compare any future output to it. So after any change you can quickly understand what components have been affected and how.

Next, I usually check project using screenshot testing, so while running `styleguidist` server in background (usually in separate pane of `tmux`), I run:

```bash
yarn test-screenshots
```

If there some difference, I can check diff screenshots, and fix found problems, or update screnshots if everything is okay. Sometimes screenshot testing makes false negatives, in this case it can be ignored.

Now I have a ready piece of interface, so I can start working on application behavior.
