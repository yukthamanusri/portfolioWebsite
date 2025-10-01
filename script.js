// ==========================
// 🎵 Audio System
// ==========================

// Global toggle state
let soundEnabled = false;

// Preload sounds
const sounds = {
  click: new Audio("assets/audio/beep.mp3"), // for nav buttons
  close: new Audio("assets/audio/beep.mp3"), // for close button
  theme: new Audio("assets/audio/beep.mp3"), // for theme toggle (always plays)
  alien: new Audio("assets/audio/beep.mp3"), // for alien hover
};

// Generic play function (respects global toggle)
function playPreloadedSound(name) {
  if (!soundEnabled) return; // stop if muted
  if (!sounds[name]) return;

  sounds[name].currentTime = 0;
  sounds[name].play();
}

//  Audio toggle button (volume-btn))
const audioBtn = document.getElementById("audio");

audioBtn.addEventListener("click", () => {
  // Always play its own sound
  sounds.theme.currentTime = 0;
  sounds.theme.play();

  // Toggle global state
  soundEnabled = !soundEnabled;

  // Update visual indicator
  // Correct way
  if (soundEnabled) {
    audioBtn.innerHTML =
      '<span class="text-2xl ml-5 bg-indigo-900 dark:bg-none rounded-full">🔊</span>';
  } else {
    audioBtn.innerHTML =
      '<span class="text-2xl ml-5 bg-indigo-900 dark:bg-none rounded-full">🔇</span>';
  }

  console.log("Audio " + (soundEnabled ? "Enabled" : "Disabled"));
});

// 👽 Alien button (hover once per entry)
document.getElementById("alienBtn").addEventListener("mouseenter", () => {
  playPreloadedSound("alien");
});

//Theme-toggle
const themeToggle = document.getElementById("themeToggle");

// Initial icon (Sun)
themeToggle.addEventListener("click", () => {
  // Toggle dark mode
  document.body.classList.toggle("dark");

  // Remove light-bg when dark, add it back when light
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("light-bg");

    // Moon icon
    themeToggle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
        class="bi bi-moon-fill text-yellow-300 ml-2 pt-2" viewBox="0 0 16 16">
        <path d="M6 0a6 6 0 0 0 0 12c3.314 0 6-2.686 6-6S9.314 0 6 0z"/>
      </svg>
    `;
  } else {
    document.body.classList.add("light-bg");

    // Sun icon
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
class="bi bi-brightness-high-fill text-orange-400" viewBox="0 0 16 16">
<path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;
  }
});

// ==========================
// 📂 Modal Fetch + Overlay
// ==========================
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const page = btn.dataset.page; // e.g., "about"

    // 🎵 play nav click sound
    playPreloadedSound("click");

    try {
      const res = await fetch(`${page}.html`);
      if (!res.ok) throw new Error("Network response was not ok");
      const html = await res.text();

      document.getElementById("modal-content").innerHTML = html;
      document.getElementById("overlay").classList.remove("hidden");

      // Attach close buttons inside loaded content
      document.querySelectorAll(".close-btn").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          // 🎵 play close sound
          playPreloadedSound("close");
          document.getElementById("overlay").classList.add("hidden");
        });
      });
    } catch (err) {
      console.error("Failed to load page:", err);
    }
  });
});
