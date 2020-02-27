# Form-Wizard

This is a front-end coding test for chrono, here are the cretieria:

* First Step - show a list of uploaded files in a table format (date, time + file name)
* Second step is selecting 1 out of 4 box options - a selection must happen for the user to be able to proceed to the next step
* Third step (Q/A): entering in 4 field forms: name, address, email and phone number, there must be form validation
* Last step: overview screen of all information collected where they have to confirm before submitting
* Technologies to be used in this implementation: Angular.js, HTML, Javascript, Bootstrap, CSS and SASS

### Docker

```
docker pull veryan4/wizard
docker run -p 80:80 veryan4/wizard 
```


### Test via Angular

I suggest having Angular 6 or grater installed. This assumes that you also have npm/node installed.

```
git clone https://github.com/Veryan4/form-wizard.git
cd form-wizard
npm install
npm serve
```

You can then visit the application at http://localhost:4200/