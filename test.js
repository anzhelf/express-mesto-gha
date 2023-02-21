
const data = [
  { name: 'Кот', isPerformingInCircus: true, },
  { name: 'Собака', isPerformingInCircus: true, },
  { name: 'Тигр', isPerformingInCircus: true, },
  { name: 'Волк', isPerformingInCircus: false, },
  { name: 'Лев', isPerformingInCircus: true, },
  { name: 'Журавль', isPerformingInCircus: false, },
  { name: 'Осьминог', isPerformingInCircus: false, },
];

const animals = data.map(function (item) {
  return item.name;
});

console.log(animals);

function f() {
  console.log(this.success);
}

const dat = { success: 'Успех - он тут!' };

f = f.bind(dat)

f();



const URL = 'https://randomuser.me/api/';

fetch(URL)
  .then((res) => {
    return res.json();
  })
.then((data) => {
  console.log(data.results);
})