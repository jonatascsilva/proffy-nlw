document.querySelector('#add-time').addEventListener('click', cloneField);

function cloneField() {
  const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
  const cleanedFields = newFieldContainer.querySelectorAll('input').forEach(input => {
    input.value = '';
  });

  document.querySelector('#schedule-items').appendChild(newFieldContainer);
}