/*When you click on the dropdown the other pages pop up*/
document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelector('.dropdown');

  dropdown.addEventListener('click', function () {
    dropdown.classList.toggle('open');
  });

  window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropdown-select')) {
      if (dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
      }
    }
  });
});

/*When you search for a sport or something that includes that sport then it takes you to that page*/
function search() {
  var searchTerm = document.getElementById('searchbar').value.toLowerCase();

  if (searchTerm.includes('baseball')) {
    window.location.href = 'baseball.html';
  } else if (searchTerm.includes('basketball')) {
    window.location.href = 'basketball.html';
  } else if (searchTerm.includes('football')) {
    window.location.href = 'football.html';
  } else if (searchTerm.includes('hockey')) {
    window.location.href = 'hockey.html';
  } else {
    alert('No matching sport found!');
  }
}