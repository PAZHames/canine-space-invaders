// Leaderboard data structure
let leaderboard = [];

let gamePlayed = false; // Flag to indicate if the game has been played

window.onload = function() {
  loadLeaderboard();
  displayLeaderboard();

  if (gamePlayed) {
    openPopup();
  }
}
// Function to load leaderboard data from local storage
function loadLeaderboard() {
  const leaderboardData = localStorage.getItem('leaderboard');
  if (leaderboardData) {
    leaderboard = JSON.parse(leaderboardData);
  }
}

// Function to save leaderboard data to local storage
function saveLeaderboard() {
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Function to add a player to the leaderboard
function addPlayerToLeaderboard(name, image, score) {
  let player = {
    name: name,
    image: image,
    score: score
  };
  leaderboard.push(player);
  sortLeaderboard();
  saveLeaderboard();
  displayLeaderboard();
}

// Function to sort the leaderboard
function sortLeaderboard() {
  leaderboard.sort((a, b) => b.score - a.score);
}

// Function to display the leaderboard
function displayLeaderboard() {
  let leaderboardContainer = document.getElementById('leaderboard');
  leaderboardContainer.innerHTML = '';

  leaderboard.forEach((player, index) => {
    let playerElement = document.createElement('div');
    playerElement.innerHTML = `${index + 1}. ${player.name} - Score: ${player.score}`;
    leaderboardContainer.appendChild(playerElement);
  });
}

// Function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page

  let playerName = document.getElementById('playerName').value;
  let imageSelect = document.getElementById('imageSelect');
  let selectedImage = imageSelect.options[imageSelect.selectedIndex].value;
  let score = localStorage.getItem('score'); // Retrieve the score from local storage

  addPlayerToLeaderboard(playerName, selectedImage, score);

  // Clear form inputs
  document.getElementById('playerName').value = '';
  imageSelect.selectedIndex = 0;

  // Close the popup
  closePopup();
}

// Function to open the popup
function openPopup() {
  document.getElementById('leaderboardPopup').style.display = 'block';
}

// Function to set the game played flag
function setGamePlayed() {
    gamePlayed = true;
    localStorage.setItem('score', score); // Store the score in local storage
    window.location.href = '../leaderboard.html';
  }

// Function to close the popup
function closePopup() {
  document.getElementById('leaderboardPopup').style.display = 'none';
}