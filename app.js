AOS.init();
const scrollToSection = (section) => {
  let element = document.getElementById(section);
  element.scrollIntoView({
    behavior: "smooth",
  });
};

const query = `
{
  user(username:"sushmita") {
    publication {
      posts {
        title
        brief
        slug
        dateAdded
      }
    }
  }
}`;

async function getData() {
  const response = await fetch("https://api.hashnode.com", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  });
  const body = await response.json();
  let html = "";

  body.data?.user?.publication?.posts.forEach((post) => {
    const title = `<p class="blog-title">${post.title}</p>`;
    const desc = `<p class="desc">${post.brief}</p>`;
    let date = new Date(post.dateAdded);
    date = `<p class='date-posted'>${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}</p>`;
    html += `<a class="blog-card-link" href="https://sushmita.hashnode.dev/${post.slug}" target="_blank">
    <div class="blog-card">
    <div>
    ${title}
    ${desc}
    </div>
    <div>
    ${date}
    </div>
    </div>
    </a>`;
  });
  document.getElementById("blogPosts").innerHTML = html;
}

getData();
