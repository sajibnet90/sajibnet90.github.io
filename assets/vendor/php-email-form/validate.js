document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(thisForm) {
    thisForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(thisForm);
      const action = thisForm.getAttribute('action');

      thisForm.querySelector('.loading').classList.add('d-block');

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => response.text())
      .then(data => {
        console.log('Response data:', data); // Log the response data for debugging

        thisForm.querySelector('.loading').classList.remove('d-block');
        if (data.trim() === 'Thank you! Your message has been sent.') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.querySelector('.error-message').classList.remove('d-block');
          thisForm.reset();
        } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    });
  });

  function displayError(thisForm, error) {
    console.error('Error:', error); // Log the error for debugging

    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }
});