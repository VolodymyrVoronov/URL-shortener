// select elements

const form = document.querySelector('.app__form');
const formInput = form.querySelector('.form__input');
const appOutput = document.querySelector('.app__output');


// focus on input field

formInput.focus();

// create error template

createErrorTemplate = () => (`
  <p class="app__error">Something has gone wrong. Please try again.</p>
`);

// get link

getShortLink = async (link) => {
  try {
    const endpoint = 'https://api.shrtco.de/v2/shorten?url=';
    const query = `${link}`;

    const response = await fetch(endpoint + query);  
    const data = await response.json();

    return data;
  }
  catch (error) {
    appOutput.innerHTML = createErrorTemplate();
    console.log(error);
  }
}

// update website

updateUI = (data) => {
  try {
    const html = (`
    <a class="app__link app__link--origin-link" href="${data.result.original_link}" target="_blank"><b>Origin link:</b> ${data.result.original_link}</a>
    <a class="app__link app__link--shortened-link" href="${data.result.full_short_link2}" target="_blank"><b>Shortened link:</b> ${data.result.full_short_link2}</a>
    `);
    appOutput.innerHTML = html;
  } catch (error) {
    appOutput.innerHTML = createErrorTemplate();
    console.log(error);
  }
}

// show progress bar

showProgressBar = () => {
  const html = (`
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  `);

  appOutput.innerHTML = html;
}

// listen to the form

form.addEventListener('submit', e => {
  e.preventDefault();
  getShortLink(formInput.value.trim())
    .then(data => updateUI(data))
    .then(showProgressBar())
    .then(err => console.log(err));

    form.reset();
    formInput.focus();
});
