# Things to do
## Now: have a super simple workout timer
### Example
Timer page:\
Current status (work/rest): Work\
Time left:                  03:45\
Time elapsed: 				01:15\
Round:						1/5\
Cycle:						1/2

On the settings page i want:\
Workout time (s):   [input box]\
Rest time (s):		[input box]\
Working rounds:		[input box]\
Workout cycles:		[input box]\
(Start/Pause)\
(Stop)

### ChatGPT help
Great approach! Learning as you go will help you grasp concepts more naturally, and I’ll guide you through a detailed workflow for building your simple workout timer.

Workflow Breakdown:

Step 1: Learn Form Handling in HTML and Basic JavaScript (Settings Page)

You need to create input fields for the workout parameters and handle the form submission.

	1.	Search: Go to YouTube and search for “HTML forms tutorial”. I suggest watching a video that explains how to create forms and capture data from input boxes (look for something like “HTML Forms for Beginners”).
	•	You’ll want to understand:
	•	<input> tags for creating text input boxes.
	•	How to create a button to submit the form.
	2.	Learn JavaScript to handle the input:
	•	Once you have a basic form, search for “JavaScript form handling tutorial” on YouTube or a site like FreeCodeCamp. This will teach you how to capture user inputs when a form is submitted.
	•	Focus on learning:
	•	The document.getElementById or document.querySelector methods to grab values from the input boxes.
	•	How to prevent the default form submission and handle the input with JavaScript.
	3.	Try it: After watching the videos, build the input form on your settings page, including fields for:
	•	Workout time (seconds)
	•	Rest time (seconds)
	•	Working rounds
	•	Workout cycles
	•	Buttons (Start/Pause and Stop)

Step 2: Learn Basic JavaScript Logic (Timer Page)

Next, you’ll need to create the timer logic using JavaScript. This will control how the time updates and displays.

	1.	Search: On YouTube or Google, search for “How to build a countdown timer in JavaScript”. This will help you:
	•	Learn how to use setInterval() to update the time every second.
	•	How to format the time (e.g., converting seconds into mm:ss format).
	2.	Key Concepts:
	•	Focus on how to create a timer that counts down and triggers different events (e.g., start resting after working).
	•	Study how to reset and pause the timer, which you’ll need later for the “Start/Pause” and “Stop” buttons.
	3.	Try it: Implement a basic timer that displays time on your timer.html page, updating the countdown every second. For now, hard-code some values (e.g., 3 minutes for work, 1 minute for rest) to test.

Step 3: Sync Timer Settings with the Timer Page Using Socket.io (Server Communication)

Now, you’ll need to send the input values from the settings page to the timer page and ensure both are in sync.

	1.	Search: Look for “Socket.io basics tutorial” on YouTube or Google (I’d recommend sites like FreeCodeCamp or the official Socket.io docs). This will teach you how to:
	•	Emit messages from the client (settings page) to the server when the user hits “Start”.
	•	Have the server broadcast the updated timer settings to all clients (including the timer page).
	2.	Learn:
	•	Learn how to emit events using socket.emit() from the settings page when the “Start” button is clicked.
	•	On the server side, catch these events using io.on('connection', socket => {...}) and then emit them to all connected clients.
	3.	Try it: Implement a simple Socket.io setup where:
	•	When the user clicks “Start” on the settings page, the timer parameters (work time, rest time, rounds, cycles) are sent to the server.
	•	The server broadcasts these settings to the timer page, where they are displayed.

Step 4: Test, Debug, and Refine

Once you have a basic prototype running, you’ll likely encounter small issues or new ideas. Here’s what to do:

	1.	Search: If you get stuck or something doesn’t work as expected, search for specific errors or terms (e.g., “Socket.io not working”, “JavaScript timer stops updating”) on Google or StackOverflow.
	2.	Testing: Use multiple browsers or devices to test the synchronization between the settings and timer pages.
	•	If you want to simulate multiple users, open the settings page in one browser and the timer page in another.

Next Steps

After getting this simple version working, you can focus on improving the UI, adding error handling (e.g., preventing negative numbers), or making the timer logic more robust.

Summary of Actions:

	1.	HTML forms: Search for “HTML forms tutorial” on YouTube.
	2.	Form handling with JavaScript: Search “JavaScript form handling tutorial”.
	3.	Build a timer: Search for “How to build a countdown timer in JavaScript”.
	4.	Sync with Socket.io: Search for “Socket.io basics tutorial”.
	5.	Debug as needed: Search for specific issues/errors on Google or StackOverflow.

Does this structure and plan sound good? Feel free to ask for more details or suggestions as you work through it!


## Next: Create a decent ui to display the timer
