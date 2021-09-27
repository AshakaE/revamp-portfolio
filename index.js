// const form = document.getElementById('contact-form');

// const formEvent = form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   let mail = new FormData(form);

//   sendMail(mail);
// });

fetch('https://api.github.com/users/ashakae/repos')
  .then((response) => response.json())
  .then((data) => console.log(data));
