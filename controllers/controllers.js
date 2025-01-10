const { calculateDuration } = require("../utils/time");

const { Sequelize, Op } = require("sequelize");
const { projects, User } = require("../models");
const bcrypt = require("bcrypt");
// const config = require("../config/config");

// require("dotenv").config();

// const env = process.env.NODE_ENV;
// const sequelize = new Sequelize(config[env]);

function renderHome(req, res) {
  const { user } = req.session;
  res.render("index", { user });
}

// Project

async function renderProject(req, res) {
  const { user } = req.session;

  const project = await projects.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "ASC"]],
  });

  res.render("project", { project, user });
}

async function addProject(req, res) {
  console.log("information file", req.file);
  const { user } = req.session;

  const { project_name, description, start_date, end_date, tech } = req.body;

  const image = "http://localhost:3000/" + req.file.path;

  const duration = calculateDuration(start_date, end_date);

  const techArray = Array.isArray(tech) ? tech : [tech];

  const result = await projects.create({
    project_name: project_name,
    description,
    duration,
    start_date,
    end_date,
    image,
    technologies: techArray,
    user_id: user.id,
  });

  console.log("Project created:", result);

  if (!user) {
    return res.redirect("/login");
  }

  res.redirect("/project");
}

async function renderProjectDetail(req, res) {
  const { id } = req.params;

  const projectDetail = await projects.findOne({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    where: {
      id: id,
    },
  });

  if (projectDetail === null) {
    return res.redirect("/page-404");
  } else {
    console.log("detail project :", projectDetail);
    res.render("project-detail", { data: projectDetail });
  }
}

async function updateProjects(req, res) {
  const { user } = req.session;
  const { id } = req.params;
  const { project_name, description, start_date, end_date, tech } = req.body;

  let image = req.body.image;

  if (req.file) {
    image = "http://localhost:3000/" + req.file.path.replace(/\\/g, "/");
  }

  const duration = calculateDuration(start_date, end_date);

  const techArray = Array.isArray(tech) ? tech : [tech];

  const result = await projects.update(
    {
      project_name: project_name,
      description,
      duration,
      start_date,
      end_date,
      image,
      technologies: techArray,
      updatedAt: sequelize.fn("NOW"),
    },
    {
      where: {
        id: id,
      },
    }
  );

  console.log("result update : ", result);

  req.session.user = user;
  res.redirect("/project");
}

async function deleteProjects(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  const result = await projects.destroy({
    where: {
      id: id,
    },
  });

  console.log("Deleted project ID: ", result);

  res.redirect("/project");
}

async function editProjects(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  const projectToEdit = await projects.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }

  if (!projectToEdit) {
    return res.redirect("/page-404");
  }

  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const formattedData = {
    ...projectToEdit.get(),
    start_date: formatDate(projectToEdit.start_date),
    end_date: formatDate(projectToEdit.end_date),
  };

  console.log("Data yang akan di-edit:", formattedData);

  res.render("edit-project", { data: formattedData, user });
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      req.flash("error", "Email Already in Use.");
    }

    if (existingUser.username === username) {
      req.flash("error", "Username Already Taken.");
    }

    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  req.flash("success", "Registration successful! Please log in to continue.");
  res.redirect("/login");
}

async function authLogin(req, res) {
  const { username, password, email } = req.body;

  const whereCondition = {};
  if (email) whereCondition.email = email;
  if (username) whereCondition.username = username;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [whereCondition],
    },
  });

  if (!existingUser) {
    req.flash("error", "Username Not Found");
    return res.redirect("/login");
  }

  const isInvalid = await bcrypt.compare(password, existingUser.password);

  if (!isInvalid) {
    req.flash("error", "Incorrect Username/Password");
    return res.redirect("/login");
  }

  const userObject = existingUser.toJSON();
  delete userObject.password;
  req.session.user = userObject;

  console.log(`User ${username || email} Logged In`);

  res.redirect("/");
}

function authLogout(req, res) {
  req.session.user = null;

  res.redirect("/login");
}

function renderProjectAdd(req, res) {
  const { user } = req.params;
  res.render("project-add", { user });
}

function renderRegister(req, res) {
  const { user } = req.session;

  if (user) {
    return res.redirect("/");
  } else {
    res.render("auth-register");
  }
}

function renderLogin(req, res) {
  const { user } = req.session;

  if (user) {
    return res.redirect("/");
  } else {
    return res.render("auth-login");
  }
}

function renderContact(req, res) {
  const { user } = req.session;
  res.render("contact", { user });
}

async function addProjects(req, res) {
  const { user } = req.session;

  if (!user) {
    return res.redirect("/login");
  }
  res.render("add-project", { user });
}

function renderTestimonial(req, res) {
  const { user } = req.session;
  res.render("testimonial", { user });
}

function render404(req, res) {
  const { user } = req.session;
  res.render("page-404", { user });
}

module.exports = {
  renderHome,
  renderContact,
  renderTestimonial,
  renderProject,
  renderProjectAdd,
  addProject,
  render404,
  addProjects,
  deleteProjects,
  editProjects,
  updateProjects,
  renderProjectDetail,
  renderRegister,
  renderLogin,
  authRegister,
  authLogin,
  authLogout,
};
