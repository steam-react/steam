Let's say we need a friends list window, which is docked at the bottom-right corner of window and can be collapsed or expanded. It should display friends' names, online/offline status and picture. Every friend in list can be clicked to open a chat window. Obviously it should be displayed when user is logged in, and hidden otherwise.

So we should create a component, connect it to application state, and setup interaction with backend API.

Here's an example of how do I usually do this task.
