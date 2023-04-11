If you are happy with this, support me [here :)](https://www.buymeacoffee.com/jacksonrusch)

## Example Video!
[![Example Video](https://user-images.githubusercontent.com/72236288/231272399-9ffbd095-120c-43a1-aeeb-1131a1aac8b8.png)](https://youtu.be/e--aPgJUGkE)

## Introduction
This readme will explain how to install the extension, how to use it, and how it works (in case the YES website changes in the future). The extension will allow you to enroll instantly when the enrollment period opens by circumventing the front end (which is extremely slow on YES) and making registration HTML requests directly to the server.

## Installation
Download this package (cloned or zipped) into a folder. Go to chrome://extensions and toggle on developer mode in the top right. Select load unpacked on the right side of the screen. Select the downloaded folder (uncompressed). The installation worked if holding Alt+x (Option+x on Mac) on the YES registration starts a counter that moves up under the enrollment date section (you might have to refresh the page if it does not work first try).

## How to Use
#### Before Registration:
Go to YES registration like normal. Put all classes in your cart that you want to enroll in. Note: the behavior of the enrollment bot is undefined when there are enrollment conflicts (ex: attempting to sign up into 2 classes with the same time or attempting to sign up for 2 sections of the same class when one has open spots and one is only waitlist). Luckily, you will have about 1-2 minutes to correct any errors before anyone else's registration opens. Also ensure that all information is stored in the class (if you have to denote grad/undergrad enrollment). NOTE: I would recommend using this to get the classes that are most contentious first to make sure that there aren't any enrollment errors then go back and search for the classes that have more openings.

#### During Registration:
Right before enrollment, refresh the page to make sure you have an active session. Then, wait for enrollment period to open. 5 seconds before the enrollment period start holding down Alt+x (Option+x on Mac). You will see a counter going up on the screen. 5 seconds after the enrollment opens (when the counter goes up to about 10), refresh the page to see if your classes have been registered. If they have not, wait a few seconds and try the same process again (also look for any errors that popup on the bottom right upon refresh). If it does not work again after that, give up on this and go back to the normal method.

## How This Works
Vanderbilt uses URL requests to sign us up. When you press the "enroll" button, it scrapes your webpage and sends a request to the server to enroll, waitlist, etc. to all the classes you selected in your cart. We do this exact process everytime you press Alt+x (with a 1.5 second cooldown because YES will detect spamming activity). The code is ugly but should be relatively self explanatory. Basically, the first half scrapes the webpage to get your class codes and then the second half sends the request. These all come from the HTML on the page.
