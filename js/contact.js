(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var responseEl = document.getElementById('form-response');

  var fields = [
    {
      id: 'cf-name',
      validate: function (el) { return el.value.trim().length > 0; }
    },
    {
      id: 'cf-email',
      validate: function (el) {
        var value = el.value.trim();
        return value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
    },
    {
      id: 'cf-service',
      validate: function (el) { return el.value.trim().length > 0; }
    },
    {
      id: 'cf-message',
      validate: function (el) { return el.value.trim().length > 0; }
    }
  ];

  function setFieldState(el, isValid) {
    var wrap = el.closest('.form-field');
    if (!wrap) return;
    wrap.classList.toggle('has-error', !isValid);
  }

  function showResponse(message, isSuccess) {
    responseEl.textContent = message;
    responseEl.classList.remove('is-success', 'is-error');
    responseEl.classList.add(isSuccess ? 'is-success' : 'is-error');
  }

  fields.forEach(function (field) {
    var el = document.getElementById(field.id);
    if (!el) return;
    el.addEventListener('blur', function () {
      setFieldState(el, field.validate(el));
    });
    el.addEventListener('input', function () {
      if (el.closest('.form-field').classList.contains('has-error')) {
        setFieldState(el, field.validate(el));
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var allValid = true;
    fields.forEach(function (field) {
      var el = document.getElementById(field.id);
      if (!el) return;
      var valid = field.validate(el);
      setFieldState(el, valid);
      if (!valid) allValid = false;
    });

    if (!allValid) {
      showResponse('Please fill in all required fields correctly before sending.', false);
      return;
    }

    showResponse('Thank you! Your message has been sent successfully. We will get back to you shortly.', true);
    form.reset();
  });
})();
