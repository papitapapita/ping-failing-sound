const ping = require('ping');
const player = require('play-sound')(opts = {});

const host = '172.16.30.9'; // Replace with the host you want to ping
const interval = 1000; // Ping interval in milliseconds
const maxFailures = 5; // Maximum consecutive failures before notification

let consecutiveFailures = 0;

function pingHost() {
  ping.promise.probe(host)
    .then((res) => {
      if (!res.alive) {
        consecutiveFailures++;
        console.log(`Ping failed. Consecutive failures: ${consecutiveFailures}/${maxFailures}`);
        if (consecutiveFailures >= maxFailures) {
          notifyAndPlaySound();
        }
      } else {
        consecutiveFailures = 0;
        console.log(`Ping successful.`);
      }
    })
    .catch((error) => {
      console.error(`Error while pinging: ${error}`);
    })
    .finally(() => {
      setTimeout(pingHost, interval);
    });
}

function notifyAndPlaySound() {
  console.log('Notify and play sound!');
  // Add your notification logic and play sound here
  player.play('sound.wav', (err) => {
    if (err) {
      console.error(`Error playing sound: ${err}`);
    }
  });
}

// Start pinging
pingHost();
