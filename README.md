learn-git
=========
* This project will consist of three separate mini-projects to get you comfortable with the kinds of activities you'll be using git for throughout the class. 
* The first mini-project you'll be mimicking the steps you'll take when you first start your personal project. Creating a repository, linking it to your computer, then pushing those changes up to your github.
* The second mini-project you'll be mimicking the steps you'll take with every DevMountain project you do. You'll 'fork' the DevMountain repository, link your computer with your fork, then pushing those changes up to your github.
* The last mini-project you'll be mimicking the steps you'll take when it's group project period. You'll fork your groups repo, link your computer with your fork, push changes to your github, then make a 'Pull Request' into your groups repo.

##Mini-Project 1: Personal Project
### Step 1: Create a Repository on Github
* Let's  jump ahead a month or two and pretend like we just got to personal project period. Because you're not an idiot, you're going to be pushing your code up to github frequently. In order to do that, you first need to create a repository on github to push to. Head over to your github account then in the top right hand corner click the '+' button and click 'new repository'. Enter the name of your repository then click 'Create Repository'. This repository is where your code for this project will now live.

### Step 2: Set up the Origin
* Once you create your repository, you'll need to connect that repository with your code on your computer. 
* Create a folder called 'myProject' then inside that folder create a file called 'myName.js'. Add your name to that file and then save it. 
* Now in your terminal navigate to your 'myProject' folder. Once inside that folder, type ```git init```. You've just told your computer that you want git to watch the 'myProject' folder and keep track of any changes - basically making it so you can now run git commands inside of this folder. 
* Now that you've initialized your 'myProject' folder, we need to tell your computer where the location of your github repository is. To do this you create what is called a remote. Basically we tell our computer 'Hey computer, I created this repo on github, when I push, I want my code to go to this github repo'. To do this, in your terminal type ```git remote add origin https://github.com/nameOfYourRepo.git``` with nameOfYourRepo being replaced with what you named your repository. Now whenever you run ```git push origin master``` your computer knows that origin is pointing to your repo you made on github and it pushes your changes there.
* Now that our remote is set up. You'll need to add your files to the staging area, commit your files to be ready for pushing, then push your files. The process I always take is one that looks like this.
* ```git status``` --> this will show me what files have been changes. I want to make sure not to add any files to github that I don't want there
* ```git diff``` this will show me the actual code that has been changed. Again, I want to make sure I don't push anything to github that shouldn't be there
* If everything looks good ```git add nameOfMyFile.js``` I add my file(s) to the 'staging area'
* ```git commit -m "The sentence I want associated with this commit message``` which tells my computer 'hey, next time code is pushed to github, take all of this code with it.
* ```git push origin master``` and MAGIC. My code is now on github.

### Step 3: Push your code to github
* Follow the steps I did above in order to get your new code on your computer up to your github repository.
* If all goes well, check your github repository for your new code.


##Mini-Project 2: DevMountain Project
* Now what we're going to do is walk through how you would normally treat a project here from DevMountain. First, you'll want to 'fork' this repo. On the top right of this page you should see a button that says 'fork'. What this is going to do is essentially copy all of the code from this repository, but make it as a repo under your account. As you can imagine, you can't push directly to the DevMtn repo because that's not secure. But what you can do is create a fork of this repo, then push to your own fork because it's under your own account.
### Step 2: Clone the Fork
* Once you've forked this repo, you're going to want to clone your forked repository. Go to your freshly forked page and copy the url that's on the side under where it says "HTTPS clone URL". Then, head over to your terminal and type ```git clone pasteTheUrlHere```. This takes what's on github, and essentially downloads it so you can now make changes to it on your local computer.or
* Once you've cloned your fork, open up your fork in Sublime Text and make a change. Once you've made a change head over to your terminal and type ```git status```, you should see that a file has been changed. If you see the file, run through the steps outlined in Mini-Project 1 (status, diff, add, commit, push). Note that when you run ```git push origin master``` in this repository origin is already pointing to your forked repo since you used ```git clone```. Unlike the last step you don't need to tell your computer where to push your code because git already knows.

##Mini-Project 3: Group Project
* We're essentially going to redo all the same steps we did in Mini-Project 2, but add one more step. Re-clone your fork of this project to your local computer, make a change, add, commit, then push that change. If you go to your forked repo on github you should then see your change. 
### Step 2: 
* Let's imagine we're working in groups. If we have everyone pushing to one repo without verifying the quality of the code, things can get messy pretty quick. We fixed this solution with things called 'Pull Requests'. Basically you fork a project, make changes to your fork, then you make a pull request back into the original project requesting that some piece of code be added to the original repo. This is how open source projects work.
### Step 3: Make the PR
* Go to your forked repo and click where it says 'Pull Request'. It should show you the file changes you've made and how they differ from the original repo. If it does, click on the submit button to submit your pull request. 
* Now, I should see your pull request and I can decide if I want to add that code into the main project or not.


****If you see a typo or something that could be said more clearly, make a pull request. This goes for all the repositories and projects we do.****


###Learning Objectives. 
* After finishing this repository you should feel comfortable with the following list, if you're not, ask your mentor for more help. 
* Understand and be able to use the command line for
  - creating a folder
  - creating a file
  - editing a file
  - changing directories
* Understand what Git and Github are and how they fit into the web app landscape
  - be able to Fork a repo and know it’s purpose
  - be able to clone a repo and know it’s purpose
  - be able to add, commit, and push files to github
  - understand how to use github in a group setting
  - know how to create an upstream to master
  - be able to handle merge conflicts
  - be able to minimally manage vim to escape merge conflict messages
  - know how to make a Pull Request
  - be able to pull changes from the master repo

