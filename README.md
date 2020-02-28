# Chromométriq Quizz

J'ai fais 14 unit tests, je sais pas si c'est trop ou pas assez. Laissez moi des commentaires s'il vous plaît, ça serait bien apprécié!!!


### Docker

```
docker pull veryan4/chrono
docker run -p 80:80 veryan4/chrono
```


### Angular 8

```
git clone https://github.com/Veryan4/chrono.git
cd chorno
npm install
ng serve
```

You can then visit the application at http://localhost:4200/

For the unit tests:

```
ng test
```


### The Requirements

Front-end Technical Test 
Goal : building a small application dashboard that clinic managers 
would use for 2 functionalities 
1. Schedule : display a calendar (non-interactive) 
2. Doctor : display the staff for to the fictional clinic 
Design : 
- the app will have a small side-menu on the left displaying the 2 
options 
- the main view will take the rest of the space (no header or footer) 
Technical details : 
1. The app will be ideally developed in angular, but another 
framework can be used instead (vue, react or backbone marionette) 
2. You can use any front-end component library (bootstrap, 
primeng...) 
3. When the app loads, the user has to arrive on the schedule view 
(i.e. https://dashboard.com/#schedule) 
4. A routing system has to be used, so when switching from the 
Schedule to the Staff view, the url will change from /#schedule to /#staff 
5. The Schedule view won't be interactive. The goal here is simply to 
include a 3rd party library and display a calendar in the view 
6. The Staff view : 
- the number of employees has to be visible in the side-menu next 
to the label (like a bootstrap badge) 
- the list of employees will be taken from a json file 
- the table needs to have 2 columns : 
- firstName + lastName 
- group 
- when clicking on this tab, a http GET call will be mocked (i.e. 
https://chrono.com/api/doctors) 
- a button on top of the list with the label *Create* will render a 
popup with a small form containing 3 attributes 
- firstName (input field taking a string) 
- lastName (input field taking a string) 
- group (dropdown with 3 choices) 
- when confirming the creation of a new staff member, the 
displayed list has to be updated live as well as the "badge" in the 
side-menu will be (+1) 
- a search bar that filters the list after each letter entered 