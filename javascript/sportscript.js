function httpGetAsync(url, callback) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText);
    }
  };
  xmlHttp.open("GET", url, true); 
  xmlHttp.send(null);
}


/*Gets the current time and date from an api*/
function getCurrentTimeAndDisplayPost(post) {
  const timezoneApiUrl =
    "https://timezone.abstractapi.com/v1/current_time/?api_key=341c369fc2ea4ee2b9075f2a8fddffcd&location=Oxford,United%20Kingdom";

  httpGetAsync(timezoneApiUrl, function (response) {
    const responseData = JSON.parse(response);
    const currentTime = responseData.datetime;

    post.time = currentTime;
    displayBlogPost(post);
    savePostToLocal(post);
  });
}


/*Saves the post to local storage so that the post stays on the page after reloading it*/
function savePostToLocal(post) {
  var currentPage = window.location.pathname;
  var existingPosts = JSON.parse(localStorage.getItem(currentPage)) || [];

  existingPosts.push(post);

  localStorage.setItem(currentPage, JSON.stringify(existingPosts));
}


/*Displays the post where it needs to be*/
function displayBlogPost(post) {
  var postsContainer = document.getElementById('posts-container');

  var postDiv = document.createElement('div');
  postDiv.id = post.id;
  postDiv.className = 'blog-post';
  postDiv.innerHTML = `
    <h2>${post.title}</h2>
    <p>Time: ${post.time}</p>
    <p><strong>${post.name}</strong></p>
    <p>${post.splog}</p>
    <button class="delete-btn" onclick="deletePost('${post.id}')">Delete</button>
  `;

  postsContainer.appendChild(postDiv);
}

window.onload = function () {
  var currentPage = window.location.pathname;
  var existingPosts = JSON.parse(localStorage.getItem(currentPage)) || [];

  existingPosts.forEach(function (post) {
    displayBlogPost(post);
  });
};

/*Post the splog that you are writing*/
function postSplog() {
  var name = document.getElementById('name').value;
  var title = document.getElementById('title').value;
  var splog = document.getElementById('splog').value;

  if (name && title && splog) {
    var postId = Date.now().toString();

    var post = {
      id: postId,
      name: name,
      title: title,
      splog: splog,
    };

    getCurrentTimeAndDisplayPost(post);
    var currentPage = window.location.pathname;
    var existingPosts = JSON.parse(localStorage.getItem(currentPage)) || [];
    existingPosts.push(post);
    localStorage.setItem(currentPage, JSON.stringify(existingPosts));    
  }
}


/*Allows you to delete a post after you have posted it*/
function deletePost(postId) {
  var currentPage = window.location.pathname;
  var existingPosts = JSON.parse(localStorage.getItem(currentPage)) || [];

  var postIndex = existingPosts.findIndex(post => post.id === postId);

  if (postIndex !== -1) {
    existingPosts.splice(postIndex, 1);

    localStorage.setItem(currentPage, JSON.stringify(existingPosts));

    var postElement = document.getElementById(postId);
    postElement.parentNode.removeChild(postElement);
  }
}

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

/*Clears all the data on that page*/
function clearData(){
  var currentPage = window.location.pathname;
  localStorage.removeItem(currentPage);
  location.reload();
}
