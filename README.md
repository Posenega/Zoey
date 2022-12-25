
<h1 align="center">
  Distancia - Web
</h1>

<h4 align="center">Distancia ~ Digitilizing Education</h4>



<p align="center">
  <a href="#motivation">Motivation</a> •
  <a href="#key-features">Live Demo</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#you-may-also-like">You May Also like</a>

</p>



## Motivation
The COVID-19 pandemic presented unprecedented challenges to the education system, with schools and universities closing their doors and transitioning to online learning. In this time of crisis, "Distancia" was born as a solution to facilitate the educational environment between students and teachers. Developed by Selim Ellieh and Theo Khalil, two coding passionates, "Distancia" is a web platform that provides students with a means of communication with their teachers, access to course materials, and the ability to stay on top of homework assignments. The motivation behind "Distancia" was to provide a comprehensive and convenient learning platform for students and teachers during a time of uncertainty and change. In 2021, Distancia won the first place in a web development contest by the Lebanese American University. This platform could be considered as an attempt to create a modern, secure and free open-source alternative to other platforms like BlackBoard and Moodle.


## Live Demo
You can visit an online live demo now by clicking [here](https://edudistancia.herokuapp.com/)!
## Key Features
* Home Page <br/>

  <img  height='528px' src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/distancia_home.png"/>
  
  - Our Home Page shows the different features you may find in our website.
  
* Authentication <br/>

  <img  height='528px' src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/distancia_auth.png"/>
  
  - Sign up with full name, email, password and profile picture 
  - Specify if you are a teacher (or not)
  - Login using email, password
  - Signing up using google is also possible!
 
* Join Course (Student)<br/>

  <img height='528px' src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/distancia_courses-student.png"/>
  
  - Join courses using a secure ID provided by your teacher
  - The teacher may then accept the request
  - Each course groups many tools such as: lectures, homeworks ...
 
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/distancia_grade-student-available.png"/>
  
* Homework Management (Student)<br/>

  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/distancia_homework-student.png"/>
  
  - Students can easily manage their homeworks and keep track of it.
  - We offer an incredible and interactive tool that lets student submit their due work.
 
* Lecture Navigation (Student)<br/>

  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/distancia_pd-reader(2).png"/>
  
  - Students can navigate through the material (videos, pdf, etc...) sent by the tutor.
* Grades Dashboard (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_grades.png"/>
  - Teachers can manage all their courses from the home page dashboard

* Interact with Grade (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_manage_grade.png"/>
  - Teachers can click on any of their courses in order to interact with it
  - This will open a drawer on right side of the page
  - The teacher can then either delete the course, add (or delete a new chapter), add a homework for each chapter and manage the grade as a whole

* Delete Grade (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_delete_grade.png"/>
  - By clicking the delete button, a teacher may delete the whole course contents
  - This include all materials, submitted homeworks!
  - This action is dangerous, the website requires the teacher to type the entire grade name before proceeding
  
* Manage Grade (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_manage_grade.png"/>
  - By clicking the manage button, a teacher may manage the course
  - The teacher can see any incoming requests to join the grade and may accept them (or reject them) accordingly
  - The teacher can also see all the students enrolled in his class

* Add Chapter (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_add_chapter.png"/>
  - By clicking the add chapter button, a teacher may add a chapter to the course
  - The teacher has to specify the name of that specific chapter
  - Then, he may be able to post lecture materials, assignments related to this specific chapter (That the students enrolled may see)
  
* Upload Lecture material (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_add_lecture.png"/>
  - By clicking on "Lecture" underneath each chapter, the teacher is able to post any lecture material for the students (in any format)

* Add due homework (Teacher)
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/teacher_add_homework.png"/>
  - By clicking on "Homework" underneath each chapter, the teacher is able to manage homeworks due to the students
  - The teacher can add homeworks by specifying its name, its due date and if he wishes to accept answers
  - The teacher can then check all the answers of the students

* Chatting system \
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/chatting.png"/>
  - Real-time chat between the student and the teacher directly in addition to the whole class
  - Uses web sockets!
  
* Profile\
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/profile.png"/>
  <img height="528px" src="https://github.com/selimellieh72/Distantia-MERN/blob/main/preview/edit_profile.png"/>
  - Clicking on the profile picture in the dashboard will open a little pop-up
  - You can click on "Edit profile" to edit your profile (First Name and Last Name)

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [React](https://reactjs.org), [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com). From your command line:

```bash
# Clone this repository 
$ git clone https://github.com/selimellieh72/Distancia-Mern

# Go into the repository
$ cd Distancia-Mern

# Install dependencies
$ npm install

# Run the backend api
node app.js
````

On another terminal, run the client react app:

```bash
# Go to the client folder
cd client

# Install dependencies
npm install

# Run React App
$ npm start
```

> **Note**
> Make sure to run the backend (NodeJs) app alongside the client (React) app or the website will not work.


## You may also like...

- [Distancia - App](https://github.com/selimellieh72/DistanciaMobile) - Digitializing education
- [Zoey](https://github.com/Ghaadyy/book-app-frontend) - Exchanging books

## Credits
- [React](https://reactjs.org)
- [MongoDB](https://www.mongodb.com)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)


---

> [selimellieh.me](https://www.selimellieh.me) &nbsp;&middot;&nbsp;
> GitHub [@selimellieh72](https://github.com/selimellieh72) &nbsp;&middot;&nbsp;
> Twitter [@selim_ellieh](https://twitter.com/selim_ellieh)

> [theokhalil.me](https://www.theokhalil.me) &nbsp;&middot;&nbsp;
> GitHub [@Posenega](https://github.com/Posenega) &nbsp;&middot;&nbsp;

> GitHub [@Ghaadyy](https://github.com/Ghaadyy) &nbsp;&middot;&nbsp;


