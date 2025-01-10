let testimonials = [
  {
    author: "Andi Setiawan",
    rating: 5,
    content: "Website ini sangat membantu dan mudah digunakan!",
    image: "blog-img-detail.png",
  },
  {
    author: "Budi Santoso",
    rating: 4,
    content:
      "Desainnya bagus, tapi ada beberapa fitur yang masih bisa ditingkatkan.",
    image: "blog-img-detail.png",
  },
  {
    author: "Citra Amelia",
    rating: 3,
    content: "Lumayan oke, hanya saja loadingnya terkadang agak lama.",
    image: "blog-img-detail.png",
  },
  {
    author: "Dewi Anggraeni",
    rating: 2,
    content:
      "Kurang sesuai dengan ekspektasi, mungkin butuh beberapa pembaruan.",
    image: "blog-img-detail.png",
  },
  {
    author: "Eka Prasetyo",
    rating: 5,
    content: "Luar biasa, terus tingkatkan kualitasnya!",
    image: "blog-img-detail.png",
  },
  {
    author: "Nanda Sintya",
    rating: 5,
    content: "bagus banget!",
    image: "blog-img-detail.png",
  },
];

const testimonialsContainer = document.getElementById("testimonialsContainer");

const testimonialsHTML = (daftarTestimoni) => {
  return daftarTestimoni
    .map(
      (testimonial) => `
      <div class="card my-3 p-2 col-4" style="width: 18rem">
        <img
          src="/assets/images/${testimonial.image}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <p class="card-text">
            ${testimonial.content}
          </p>
          <p>- ${testimonial.author}</p>
          <p>${testimonial.rating}⭐</p>
        </div>
      </div>
    `
    )
    .join("");
};

function showAllTestimonials() {
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  console.log(filteredTestimonial);

  if (filteredTestimonial.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonial);
  }, 500);
}
