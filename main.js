let data = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

// Создание обьекта на странице
const addNewBranch = (id, name, price, sorthead, node, root) => {
  const branch = document.createElement("div");
  root.appendChild(branch);
  branch.outerHTML = `
    <div id="${id}" class="branch" style=";
    ">
      ${node == 1 ? `<img src="./arrow.svg">` : ""}
      <span>
        ${name} ${price != 0 ? price : ""}
      </span>
      ${node == 1 ? `<div class="childs"></div>` : ""}
    </div> 
  `;
};

const rootElement = document.querySelector(".tree");
var to_render = data.services;

function render(head_id = null) {
  while (to_render.length > 0) {
    const element = to_render[0];
    let new_childs = findAndSortSimilar(element.head);

    new_childs.map((value) => {
      addNewBranch(
        value.id,
        value.name,
        value.price,
        value.sorthead,
        value.node,
        element.head == null
          ? rootElement
          : document.getElementById(element.head).querySelector(".childs")
      );
    });
  }
}

// поиск элементов узла
function findAndSortSimilar(head_id) {
  let similar_objects = [];
  let index = 0;

  while (index < to_render.length) {
    const element = to_render[index];
    if (element.head == head_id) {
      similar_objects.push(element);
      to_render.splice(index, 1);
      continue;
    }
    index++;
  }
  similar_objects.sort((a, b) => {
    if (a.sorthead > b.sorthead) {
      return 1;
    } else {
      return -1;
    }
  });

  return similar_objects;
}

render();

var btns = document.getElementsByTagName("img");

for (let index = 0; index < btns.length; index++) {
  const element = btns[index];

  element.addEventListener("click", (e) => {
    element.classList.toggle("hide");
  });
}
