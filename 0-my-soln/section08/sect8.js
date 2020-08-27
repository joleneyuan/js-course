/**
 * Notes for Section 8:
 * Asynchronous JavaScript: Promises, Async/Await, AJAX
 */

 var title = 'Section 8: Asynchronous JavaScript';
 var el = [...document.getElementsByClassName('myTitle')];
 el.forEach(el => el.innerHTML = title);

 // start of section
 const first = () => {
     console.log('hey');
     second();
     console.log('end');
 }

 const second = () => {
     setTimeout(() => {
         console.log('async second');
     }, 2000);
     console.log('second');
 }
 first();