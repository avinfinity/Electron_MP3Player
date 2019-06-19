const { dialog } = require('electron').remote
var fs = require('fs');
var path = require('path');
const url = require('url')

var audioElement;

async function OnButtonClick() {
  var userPath = dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] });
  userPath.forEach(path => {
    walk(path, function (err, results) {
      if (err) throw err;
      populateSongsInUI(results);
    });
  });
};

function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.toLowerCase().includes("mp3")) {
            results.push(file);
          }

          if (!--pending) done(null, results);
        }
      });
    });
  });
};

function populateSongsInUI(files) {
  var path = require('path');
  var songsList = document.getElementById("lstSongs");

  var i;
  for (i = 0; i < 10; i++) {
    files.forEach(song => {
      aLink = document.createElement("a");
      aLink.innerHTML = path.parse(song).base;
      aLink.href = "#";
      aLink.onclick = function () {
        playSelectedSong(song);
      };
      songsList.appendChild(aLink);
    });
  }
};

function playSelectedSong(song) {
  if (audioElement != undefined) {
    audioElement.pause();
  }
  audioElement = new Audio(song);
  audioElement.play();
}

$(() => {
  document.getElementById("btnPlayPause").addEventListener('click', OnButtonClick);
});