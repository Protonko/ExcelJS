<h1>Excel JS - SPA clone excel in pure javascript.</h1>

<h3>In the process of creating this project:</h3>
<ol>
  <li>
    Implemented <b>Observer pattern</b> to define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing, 
  </li>
  <li>
    Implemented <b>Facade pattern</b> to create a simplified interface for interaction with store and observer;
  </li>
  <li>
    wrote UNIT-tests with using JEST;
  </li>
  <li>
    Implemented a class DOM containing methods for interaction with the DOM tree of the application;
  </li>
  
  ```javascript
    export function $(selector) {
      return new DOM(selector);
    }
  ```
    
  <li>
    Implemented Router - classes required for navigation between application pages;
  </li>
  <li>
    Implemented store, which is an analogue of Redux for working with state;
  </li>
</ol>
