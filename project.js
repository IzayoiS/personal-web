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
  let image = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : "";

  if (!projectName || !startDate || !endDate || !description) {
    return alert("All input fields cannot be empty");
  }

  let selectedTechnologies = [];
  const techCheckboxes = document.querySelectorAll(
    'input[name="tech"]:checked'
  );
  techCheckboxes.forEach((tech) => selectedTechnologies.push(tech.id));

  let project = {
    name: projectName,
    startDate,
    endDate,
    description,
    technologies: selectedTechnologies,
    postedAt: new Date(),
    image,
  };

  projects.push(project);
  renderProjects();

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

function renderProjects() {
  let projectListElement = document.getElementById("project-list");

  projectListElement.innerHTML = `
    <div class="card">
            <img
              src="assets/images/blog-img-detail.png"
              alt="Project Image"
              class="card-image"
            />
            <h3><a href="#" target="_blank">Example Project</a></h3>
            <p><strong>Added:</strong> 2024-12-06</p>
            <p>This is an example description for the project.</p>
            <div class="tech-icons">
              <i class="fab fa-node"></i>
              <i class="fab fa-react"></i>
            </div>
            <div class="card-actions">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </div>
          </div>`;

  projects.forEach((project) => {
    let projectCard = `
    <div class="card">
            <img
              src="${project.image}"
              alt="Project Image"
              class="card-image"
            />
            <h3><a href="#" target="_blank">${project.name}</a></h3>
            <p><strong>Added:</strong> ${project.postedAt.toLocaleDateString()}</p>
            <p>${project.description}</p>
            <div class="tech-icons">
              ${renderTechIcons(project.technologies)}
            </div>
            <div class="card-actions">
              <button class="edit-btn">Edit</button>
              <button class="delete-btn">Delete</button>
            </div>
          </div>
    `;
    projectListElement.innerHTML += projectCard;
  });
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
