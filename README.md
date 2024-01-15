<img width="1512" alt="image" src="https://github.com/dpetrov96/realtime-chat/assets/16683108/6309a498-bc0e-4cce-8172-00897261bda8">

# How to run the project

## Install packages

      npm install

## Run mongodb docker instance

      docker compose up --build

This will run the container on PORT 27018 to avoid any conflicts with local instances of mongodb

## Run application

      npm run dev

This will run both the Websocket server and the Nextjs server

# How to use the application

1. Register two new users

   To be able to test communicating between two users you will require two separate accounts

2. Login

   After creating your users, open two incognito browsers and login with each user separately.

3. Create a Group
   After you login, the groups sidebar and chat will be empty.

   To create a new group, click the `Create Group` button.
   A dialog modal will appear prompting for a name for the `group` and for which users will be invited to the group

   Users cannot be added to groups, after it has been created

4. Sending messages

   In the left sidebar it will display all groups related to the current user.
   Click on the chat to open it.

   In the chat textarea, you can type your messages, and to send you need to manually click the `send` icon on the right

   Note: You may use the search-bar above, to filter between all the groups in the sidebar.

5. Logout

   By clicking the Top-right most circle icon, it will open a dialog containing the email of the current user and a `logout` button, which will remove the session and redirect to the auth page

# Missing features

- pagination for groups and group messages
- deleting groups
- filtering groups
- searching for users
