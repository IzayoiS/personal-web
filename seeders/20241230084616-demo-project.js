"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("projects", [
      {
        project_name: "Project A",
        description: "Description for project A",
        duration: 6,
        start_date: "2024-01-01",
        end_date: "2024-06-30",
        image: "https://picsum.photos/200/100",
        technologies: ["check-reactjs", "check-nodejs"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        project_name: "Project B",
        description: "Description for project B",
        duration: 4,
        start_date: "2024-02-01",
        end_date: "2024-06-01",
        image: "https://picsum.photos/200/100",
        technologies: ["check-nextjs", "check-typescript"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("projects", null, {});
  },
};
