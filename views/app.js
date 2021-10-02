let anchorlinks = document.querySelectorAll('a[href^="#"]');
let menu = document.getElementById('toggle-icon');
let panel = document.getElementById('data-panel');
let list = document.getElementById('data-list');
let cntc = document.getElementById('cntc');
let port = document.getElementById('port');
let abt = document.getElementById('abt');
let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
anchorlinks = document.querySelectorAll('a[href^="#"]');
let home = document.getElementById('home');
let portfolio = document.getElementById('portfolio');
let contact = document.getElementById('contact');
let all = [one, two, three];
let rev = [panel, list, ...all];
let cont = [menu, ...all];

window.addEventListener('load', function () {
  let direction = '';
  list.classList.add('list-items');

  cont.forEach((el) =>
    el.addEventListener('click', function () {
      menu.classList.toggle('rotate-icon');
      list.classList.remove('list-items');
      list.classList.remove('data-list');

      panel.classList.remove('disp');

      one.classList.remove('one');
      two.classList.remove('two');
      three.classList.remove('three');

      panel.offsetWidth = panel.offsetWidth;

      if (direction === 'toRight') {
        direction = 'toLeft';
        rev.forEach((el) => (el.style.animationDirection = 'reverse'));
      } else {
        direction = 'toRight';
        rev.forEach((el) => (el.style.animationDirection = ''));
      }

      list.classList.add('data-list');
      panel.classList.add('disp');

      one.classList.add('one');
      two.classList.add('two');
      three.classList.add('three');
    }),
  );
});

for (let item of anchorlinks) {
  item.addEventListener('click', (e) => {
    let hashval = item.getAttribute('href');
    console.log(hashval);
    if (hashval === '#portfolio') {
      port.classList.add('underline');
    }
    let target = document.querySelector(hashval);
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    history.pushState(null, null, hashval);
    e.preventDefault();
  });
}
