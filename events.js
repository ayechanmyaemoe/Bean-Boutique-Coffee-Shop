allEvents = [
    {
      title: "Barista Fundamentals",
      description:
        "Join us for a fun, engaging introduction to barista fundamentals! Learn the tricks of the trade from our expert instructor and leave feeling confident in your ability to make great coffee at home.",
      date: "August 15, 2025",
      time: "2:00 PM",
      image: "images/events/barista_fundamentals.png",
      link: "register.html",
    },
    {
      title: "Latte Art Workshop",
      description:
        "Ready to pour like a pro? Our 90-minute Latte Art Workshop sharpens your milk-steaming skills and guides you through three classic free-pour patterns—no basics required.",
      date: "August 22, 2025",
      time: "11:00 AM",
      image: "images/events/event_class.png",
      modalTarget: "#registerModal",
    },
    {
      title: "Roastery Tour & Tasting",
      description:
        "Step inside our Peabody roastery for an insider’s look at coffee in the making. Join us for a guided tour and tasting—no experience required!",
      date: "August 29, 2025",
      time: "4:00 PM",
      image: "images/events/roastery_tour_and_tasting.png",
      modalTarget: "#registerModal",
    },
  ];
  
  const container = document.getElementById("eventsList");
  
  allEvents.forEach((event) => {
    let actionButton = `<a class="btn btn-coffee w-100" href="register.html">Register</a>`;
  
    container.innerHTML += `
            <div class="col">
              <div class="card h-100 shadow-sm">
                <img src="${event.image}" class="card-img-top" alt="${event.title}" />
                <div class="card-body">
                  <h4 class="card-title">${event.title}</h4>
                  <p class="card-text">${event.description}</p>
                  <p class="text-muted">Date: ${event.date} | Time: ${event.time}</p>
                  ${actionButton}
                </div>
              </div>
            </div>
          `;
  });