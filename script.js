const form = document.getElementById('contact-form');

if (form) {
  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.querySelector('#name + .error-message')
    },
    email: {
      input: document.getElementById('email'),
      error: document.querySelector('#email + .error-message')
    },
    message: {
      input: document.getElementById('message'),
      error: document.querySelector('#message + .error-message')
    }
  };

  const status = document.getElementById('form-status');

  function setError(fieldKey, message) {
    const field = fields[fieldKey];
    field.input.classList.add('error');
    field.error.textContent = message;
  }

  function clearError(fieldKey) {
    const field = fields[fieldKey];
    field.input.classList.remove('error');
    field.error.textContent = '';
  }

  function validateName() {
    const value = fields.name.input.value.trim();

    if (!value) {
      setError('name', 'Please enter your name.');
      return false;
    }

    if (value.length < 2) {
      setError('name', 'Name must be at least 2 characters long.');
      return false;
    }

    clearError('name');
    return true;
  }

  function validateEmail() {
    const value = fields.email.input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setError('email', 'Please enter your email address.');
      return false;
    }

    if (!emailPattern.test(value)) {
      setError('email', 'Please enter a valid email address.');
      return false;
    }

    clearError('email');
    return true;
  }

  function validateMessage() {
    const value = fields.message.input.value.trim();

    if (!value) {
      setError('message', 'Please enter your message.');
      return false;
    }

    if (value.length < 10) {
      setError('message', 'Message must be at least 10 characters long.');
      return false;
    }

    clearError('message');
    return true;
  }

  Object.keys(fields).forEach((fieldKey) => {
    fields[fieldKey].input.addEventListener('input', () => {
      if (fieldKey === 'name') validateName();
      if (fieldKey === 'email') validateEmail();
      if (fieldKey === 'message') validateMessage();

      if (status) {
        status.textContent = '';
        status.className = 'form-status';
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      status.textContent = 'Please fix the highlighted fields before sending.';
      status.className = 'form-status error';
      return;
    }

    status.textContent = 'Your message has been sent successfully!';
    status.className = 'form-status success';
    form.reset();
    ['name', 'email', 'message'].forEach((fieldKey) => clearError(fieldKey));
  });
}
