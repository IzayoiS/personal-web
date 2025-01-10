const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();
const upload = require("./middlewares/upload-file");
const flash = require("express-flash");

const {
  formatDateToWIB,
  getRelativeTime,
  calculateDuration,
  renderTechIcons,
} = require("./utils/time");

const hbs = require("hbs");

const {
  renderHome,
  renderContact,
  addProject,
  renderProject,
  render404,
  renderTestimonial,
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
} = require("./controllers/controllers");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(methodOverride("_method"));
app.use(
  session({
    name: "session",
    secret: "process.env.SECRET_KEY",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(flash());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

hbs.registerHelper("formatDateToWIB", formatDateToWIB);
hbs.registerHelper("getRelativeTime", getRelativeTime);
hbs.registerHelper("calculateDuration", calculateDuration);
hbs.registerHelper("renderTechIcons", renderTechIcons);
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
hbs.registerHelper("isSelected", function (array, value) {
  return array.includes(value) ? "checked" : "";
});

app.get("/register", renderRegister);
app.post("/register", authRegister);

app.get("/login", renderLogin);
app.post("/login", authLogin);

app.get("/logout", authLogout);

app.get("/", renderHome);

app.get("/project", renderProject);
app.get("/project-detail/:id", renderProjectDetail);
app.post("/add-project", upload.single("image"), addProject);
app.get("/add-project", addProjects);
app.get("/edit-project/:id", editProjects);
app.patch("/update-project/:id", upload.single("image"), updateProjects);
app.delete("/delete-project/:id", deleteProjects);

app.get("/contact", renderContact);

app.get("/testimonial", renderTestimonial);

app.get("/page-404", render404);
app.get("*", render404);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
