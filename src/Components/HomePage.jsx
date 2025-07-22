const app = document.getElementById("app");

// Create header
const header = document.createElement("header");
header.innerHTML = `
  <div class="logo">🏠 The children's home collective</div>
  <nav>
    <a href="#">Home</a>
    <a href="#" class="active">Programs</a>
    <a href="#">Browse Children's Homes</a>
    <a href="#">Volunteer</a>
  </nav>
  <div class="avatar"></div>
`;
app.appendChild(header);

// Create main section
const main = document.createElement("div");
main.className = "main-content";
main.innerHTML = `
  <h1>Our Programs</h1>
  <p class="subtitle">
    We offer comprehensive programs designed to meet each child’s unique needs and support their journey toward healing and growth.
  </p>
`;
app.appendChild(main);

// Programs data
const programs = [
  {
    icon: "📘",
    title: "Education",
    description: "We offer comprehensive educational programs, tutoring, and academic support for all ages.",
    items: ["Academic tutoring", "Life skills training", "Vocational programs", "College preparation"],
    img: "https://i.imgur.com/G1sVGvV.jpeg"
  },
  {
    icon: "🍎",
    title: "Nutrition & Health",
    description: "Comprehensive educational programs, tutoring, and academic support for all ages.",
    items: ["Academic tutoring", "Life skills training", "Vocational programs", "College preparation"],
    img: "https://i.imgur.com/ywlERED.jpeg"
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Reunification",
    description: "Supporting families to safely reunite when possible, with ongoing support services.",
    items: ["Family counseling", "Parenting classes", "Transition support", "Follow-up services"],
    img: "https://i.imgur.com/RboD9jJ.jpeg"
  },
  {
    icon: "🧠",
    title: "Counseling & Guiding",
    description: "Connect with licensed mental health professionals who specialize in supporting children and families.",
    items: [],
    img: "https://i.imgur.com/QQOhTVU.jpeg"
  }
];

// Build each program card with JS
programs.forEach(program => {
  const card = document.createElement("div");
  card.className = "program";

  const left = document.createElement("div");
  left.className = "program-text";

  const title = document.createElement("h2");
  title.textContent = `${program.icon} ${program.title}`;
  left.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = program.description;
  left.appendChild(desc);

  if (program.items.length) {
    const ul = document.createElement("ul");
    program.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    left.appendChild(ul);
  }

  const right = document.createElement("div");
  right.className = "program-image";

  const img = document.createElement("img");
  img.src = program.img;
  img.alt = program.title;
  right.appendChild(img);

  card.appendChild(left);
  card.appendChild(right);

  main.appendChild(card);
});
