// Init Github
const github = new Github();

// init UI
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");

// Search input event listener
searchUser.addEventListener(
  "keyup",
  _.debounce(e => {
    // Get input text
    const userText = e.target.value;

    if (userText !== "") {
      // Make http call
      github.getUser(userText).then(data => {
        if (data.profile.message === "Not Found") {
          // Show alert
          ui.showAlert("User not found", "alert alert-danger");
        } else {
          // Show profile
          ui.clearAlert();
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      });
    } else {
      // Clear profile
      ui.clearAlert();
      ui.clearProfile();
    }
  }, 300)
);
