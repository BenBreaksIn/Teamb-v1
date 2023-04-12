const streamers = [
  {
    name: "Sam",
    icon: "images/sam.webp",
    url: "http://localhost:3000/proxy/sam",
    status: false,
    elementId: "sam",
    offlineElementId: "sam_offline",
  },
  {
    name: "Suspendas",
    icon: "images/sus.webp",
    url: "http://localhost:3000/proxy/suspendas",
    status: false,
    elementId: "suspendas",
    offlineElementId: "suspendas_offline",
  },
];

function updateStreamerStatus() {
  streamers.forEach((streamer) => {
    fetch(streamer.url)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const streamerOnline = doc.querySelector(".stream-username");
        const streamTitleElement = doc.querySelector(".stream-title");

        if (streamerOnline && streamTitleElement) {
          const streamTitle = streamTitleElement.textContent.trim();
          streamer.title = streamTitle;
          streamer.status = true;
        } else {
          streamer.status = false;
        }
        updateStreamerElement(streamer);
      })
      .catch((error) => {
        console.log(`Error fetching data for ${streamer.name}: ${error}`);
      });
  });
}

function updateStreamerElement(streamer) {
  const onlineElement = document.getElementById(streamer.elementId);
  const offlineElement = document.getElementById(streamer.offlineElementId);

  if (streamer.status) {
    onlineElement.querySelector("span").textContent = streamer.title;
    onlineElement.classList.add("online");
    onlineElement.style.display = "inline-block";
    offlineElement.style.display = "none";
  } else {
    onlineElement.classList.remove("online");
    onlineElement.style.display = "none";
    offlineElement.style.display = "inline-block";
  }
}


updateStreamerStatus();
setInterval(updateStreamerStatus, 30000);
