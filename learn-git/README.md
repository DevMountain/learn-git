<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

learn-git
=========

##Objective
Practice using git + Github

This project will consist of three separate mini-projects to get you comfortable with the kinds of activities you'll be using git for throughout the class. 

In the first mini-project, you'll be mimicking the steps you'll take when you first start your personal project. Creating a repository, linking it to your computer, then pushing those changes up to your GitHub.

In the second mini-project, you'll be mimicking the steps you'll take with nearly every DevMountain project you do. You'll 'fork' the DevMountain repository, link your computer with your fork, then pushing those changes up to your GitHub.

Finally, in the last mini-project you'll be mimicking the steps you'll take during the group project portion. You'll fork your group's repo, link your computer with your fork, push changes to your GitHub, then make a 'Pull Request' into your group's repo.

##Mini-Project 1: Personal Project

### Step 1: Create a Repository on Github
Let's jump ahead a month or two and pretend like we just reached personal projects. You're going to be pushing your code up to GitHub frequently. In order to do that, you first need to create a repository on GitHub to push to. Head over to your GitHub account, then in the top right-hand corner click the '+' button and click 'New repository'. Enter the name of your repository then click 'Create Repository'. This repository is where your code for this project will now live.

### Step 2: Set up the Origin
Once you create your repository, you'll need to connect that repository with your code on your computer. 
* Create a folder called 'myProject' then inside that folder create a file called 'myName.js'. Add your name to that file and then save it. 
* Now in your terminal, navigate to your 'myProject' folder. Once inside that folder, type `git init`. You've just told your computer that you want git to watch the 'myProject' folder and keep track of any changes; basically making it so you can now run git commands inside of this folder.  (Warning:  Be very careful to make sure you're in the right directory when you run `git init`!)
* Now that you've initialized your 'myProject' folder, we need to tell your computer where the location of your GitHub repository is. To do this you'll create what is called a remote. Basically, we tell our computer "Hey, I created this repo on GitHub, so when I push, I want my code to go to this GitHub repo." To do this, in your terminal type `git remote add origin [Repository URL]` replacing [Repository URL] with your repo's url.  To get the url, open the repository you made in step 1 in the browser.  Then copy the url out of the address bar. Now whenever you run `git push origin master` your computer knows that origin is pointing to your repo you made on GitHub and it pushes your changes there. 

### Step 3: Push your code to GitHub
Now that our remote is set up, you'll need to add your files to the staging area, commit your files to be ready for pushing, then push your files. 

This usually looks like this:

1. `git status` --> this will show what files have been changed. We want to make sure not to add any files to GitHub that we don't want there.
2. `git diff` this will show the actual code that has been changed. Again, we want to make sure we don't push anything to GitHub that shouldn't be there.
3. If everything looks good, `git add nameOfMyFile.js` This adds our file(s) to the 'staging area'
4. `git commit -m "The sentence I want associated with this commit message"` which tells your computer 'hey, next time code is pushed to GitHub, take all of this code with it.'
5. `git push origin master` My code is now on GitHub.

* If you did this correctly, check your GitHub repository for your new code.

##Mini-Project 2: DevMountain Project
* Now what we're going to do is walk through how you would normally treat a day's project here at DevMountain. 

### Step 1: Fork the Repo
First, you'll want to 'fork' the repo. On the top right of this page, you should see a button that says 'fork.' This will essentially copy all of the code from this repository, but make it as a new repository under your account. As you can imagine, you can't push directly to the DevMountain repo, because that would not secure for DevMountain (anyone could make any changes they want). What you should do is create a fork of this repo, then push to your own fork because it's under your own account.

### Step 2: Clone the Fork
* Once you've forked this repo, you're going to want to clone your forked repository. Go to your freshly forked page and copy the url that's on the side under where it says "HTTPS clone URL". Then, head over to your terminal and type `git clone [Repository URL]`, replacing Repositry URL with the URL you just grabbed from GitHub. This takes what's on GitHub and essentially downloads it so you can now make changes to it on your local computer.
* Once you've cloned your fork, open up your fork in Sublime Text and make a change. Once you've made a change head over to your terminal and type `git status`, you should see that a file has been changed. If you see the file, run through the steps outlined above in Mini-Project 1 (status, diff, add, commit, push). Note that when you run `git push origin master` in this repository, origin is already pointing to your forked repo since you used `git clone`. Unlike the last step, you don't need to tell your computer where to push your code because git already knows.

##Mini-Project 3: Group Project
* We're essentially going to redo all the same steps we did in Mini-Project 2, but add one more step. 

### Step 1: Re-clone Your Fork
* Re-clone your fork of this project to your local computer, make a change, add, commit, then push that change. 

* Go to your forked repo on GitHub and verify your change is there. 

Let's imagine we're working in groups. If we have everyone pushing to one repo without verifying the quality of the code, things can get messy pretty quick. GitHub fixed this solution with 'Pull Requests.' Basically, you fork a project, make changes to your fork, then you make a Pull Request (PR) back into the original project requesting that some piece of code be added to the original repo. This is how the vast majority of open source code projects work.

### Step 2: Make the PR
* Go to your forked repo and click where it says 'Pull Request.' It should show you the file changes you've made and how they differ from the original repo. If it does, click on the submit button to submit your pull request. 
* Now, I should see your pull request and I can decide if I want to add that code into the main project or not.

## Contributions
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2015. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
