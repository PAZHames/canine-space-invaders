let leaderboard = [];

// add player to leaderboard

function addPlayerToLeaderboard(name, image, score) {
let player = {
    name: name,
    image: image,
    score: score
};
leaderboard.push(player);
sortLeaderboard();
displayLeaderboard();
}

// sort the leaderboard by score

function sortLeaderboard () {
    leaderboard.sort((a,b) => b.score - a.score);
}