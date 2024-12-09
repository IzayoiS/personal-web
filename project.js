function updateFileName() {
  const fileInput = document.getElementById("file-upload");
  const fileNameInput = document.getElementById("file-name");
  fileNameInput.value =
    fileInput.files.length > 0 ? fileInput.files[0].name : "";
}

let projects = [];

function addProject(e) {
  e.preventDefault();

  let projectName = document.getElementById("project-name").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let description = document.getElementById("description").value;
  let imageInput = document.getElementById("file-upload");
  let imageFile = imageInput.files[0];
  let image = imageInput.files[0] ? URL.createObjectURL(imageFile) : "";
  let imageName = imageFile ? imageFile.name : "";

  if (!projectName || !startDate || !endDate || !description) {
    return alert("All input fields cannot be empty");
  }

  const duration = calculateDuration(startDate, endDate);

  if (duration === null) {
    return alert("End date must be later than start date.");
  }

  let selectedTechnologies = [];
  const techCheckboxes = document.querySelectorAll(
    'input[name="tech"]:checked'
  );
  techCheckboxes.forEach((tech) => selectedTechnologies.push(tech.id));

  let project = {
    name: projectName,
    startDate: startDate,
    endDate: endDate,
    duration: duration,
    description,
    technologies: selectedTechnologies,
    postedAt: new Date(),
    image,
    imageName,
  };

  projects.push(project);
  renderProjects();
  resetForm();
}

function resetForm() {
  document.getElementById("project-name").value = "";
  document.getElementById("start-date").value = "";
  document.getElementById("end-date").value = "";
  document.getElementById("description").value = "";
  document.getElementById("file-upload").value = "";
  document.getElementById("file-name").value = "";

  const techCheckboxesToClear = document.querySelectorAll('input[name="tech"]');
  techCheckboxesToClear.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    alert("End date must be later than start date.");
    return null;
  }

  const diffInMilliseconds = end - start;
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  const months = Math.floor(diffInDays / 30);

  return months;
}

function renderProjects() {
  let projectListElement = document.getElementById("project-list");
  projectListElement.innerHTML = `<div class="card">
            <img
              src="assets/images/blog-img-detail.png"
              alt="Project Image"
              class="card-image"
            />
            <h3><a href="#">Example Project</a></h3>
            <p><strong>Durasi:</strong> 3 Bulan</p>
            <p><strong>Added:</strong> 2024-12-06</p>
            <p>This is an example description for the project.</p>
            <div class="tech-icons">
              <i class="fab fa-node"></i>
              <i class="fab fa-react"></i>
            </div>
            <p class="relative-time">3 minutes ago</p>
            <div class="card-actions">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </div>
          </div>`;

  projects.forEach((project, index) => {
    let projectCard = `
    <div class="card">
      <img
        src="${project.image}"
        alt="Project Image"
        class="card-image"
      />
      <h3><a href="#">${project.name}</a></h3>
      <p><strong>Durasi:</strong> ${project.duration} bulan</p>
      <p><strong>Added:</strong> ${formatDateToWIB(project.postedAt)}</p>
      <p>${project.description}</p>
      <div class="tech-icons">
        ${renderTechIcons(project.technologies)}
      </div>
      <p class="relative-time">${getRelativeTime(project.postedAt)}</p>
      <div class="card-actions">
        <button class="edit-btn" onclick="editProject(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
      </div>
    </div>
    `;
    projectListElement.innerHTML += projectCard;
  });
}

function editProject(index) {
  const project = projects[index];
  document.getElementById("project-name").value = project.name;
  document.getElementById("start-date").value = project.startDate;
  document.getElementById("end-date").value = project.endDate;
  document.getElementById("description").value = project.description;

  const imageInput = document.getElementById("file-upload");
  const fileNameInput = document.getElementById("file-name");

  fileNameInput.value = project.imageName;

  const techCheckboxes = document.querySelectorAll('input[name="tech"]');
  techCheckboxes.forEach((checkbox) => {
    checkbox.checked = project.technologies.includes(checkbox.id);
  });

  projects.splice(index, 1);
}

function deleteProject(index) {
  if (confirm("Are you sure you want to delete this project?")) {
    projects.splice(index, 1);
    renderProjects();
  }
}

function renderTechIcons(technologies) {
  let icons = {
    "check-nodejs": "fab fa-node",
    "check-reactjs": "fab fa-react",
    "check-nextjs": "fab fa-node-js",
    "check-typescript": "fab fa-js-square",
  };

  return technologies.map((tech) => `<i class="${icons[tech]}"></i>`).join("");
}

function formatDateToWIB(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0");

  let minutes = date.getMinutes().toString().padStart(2, "0");

  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

  return formattedDate;
}

function getRelativeTime(targetDate) {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000);

  console.log(diffInSeconds);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
}
