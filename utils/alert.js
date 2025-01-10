export function setupEditAlert() {
  document.getElementById("saveBtn").addEventListener("click", function () {
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("end_date").value;
    const projectName = document.getElementById("project_name").value;
    const description = document.getElementById("description").value;

    if (!projectName || !description) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields.",
      });
      return;
    }
    if (!startDate || !endDate) {
      Swal.fire({
        icon: "error",
        title: "Missing Dates",
        text: "Please fill in both start and end dates.",
      });
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Dates",
        text: "End date must be later than start date.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this project?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById(formId).submit();
      }
    });
  });
}

export function setupDeleteAlert() {
  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", () =>
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(
        (result) => result.isConfirmed && btn.closest(".delete-form").submit()
      )
    )
  );
}
