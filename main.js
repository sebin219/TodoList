const addBtn = document.querySelector('.fa-plus'); //추가 버튼
const input = document.querySelector('.footer_input'); //input 요소
const items = document.querySelector('.items'); //ul
const countSpan = document.querySelector('.todoCount'); //개수 표시하는 span

//할일 갯수 업데이트 함수
function updateCount() {
  const count = document.querySelectorAll(
    '.items .item:not(.item_done)'
  ).length;
  document.querySelector('.todoCount').textContent = count;
}

const quotes = [
  '성공은 준비된 자에게 온다.',
  '오늘 할 일을 내일로 미루지 말라.',
  '도전하는 사람만이 성장한다.',
  '실패는 성공의 어머니다.',
  '한 걸음씩 나아가면 목표에 닿는다.',
];

const quoteElement = document.querySelector('.quote');

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = `"${quotes[randomIndex]}"`;
}

document.addEventListener('DOMContentLoaded', showRandomQuote);

//li 요소 생성함수
function createItem(text) {
  console.log(text);
  const itemRow = document.createElement('li');
  itemRow.className = 'item';
  itemRow.innerHTML = `<span>${text}</span>
          <i class="fa-regular fa-square-check"></i>
          <i class="fa-regular fa-trash-can"></i>`;
  // 체크버튼 클릭 시 클래스 추가 하는 이벤트
  itemRow.querySelector('.fa-square-check').addEventListener('click', () => {
    itemRow.classList.toggle('item_done');
    updateCount();
  });
  // 삭제버튼 클릭 시 itemRow 제거하는 이벤트
  itemRow.querySelector('.fa-trash-can').addEventListener('click', () => {
    itemRow.remove();
    updateCount();
  });

  //   setTimeout(() => itemRow.scrollIntoView({ block: 'center' }), 0); //요소에 맞춰서 스크롤 내려감(편의성)
  requestAnimationFrame(() => itemRow.scrollIntoView({ block: 'center' }));
  return itemRow;
}

//추가함수
function onAdd() {
  const text = input.value.trim();
  if (!text) {
    input.value = '';
    input.focus();
    return;
  }

  // li를 생성하는 함수 - createItem(text)이라는 함수로 만들 것
  // ul에 생성값을 추가함

  items.appendChild(createItem(text));
  input.value = ''; //입력 후 엔터하면 새로운 글자를 입력할 수 있도록 초기화됨
  input.focus();
  updateCount();
}

//이벤트 등록: 플러스 버튼 클릭 시 onAdd 실행
addBtn.addEventListener('click', onAdd);
// input.addEventListener('keypress', (e) => {
//   console.log(e);
//   if (e.key === 'Enter') {
//     onAdd();
//   }
// });

//위 6줄을 요약해서 쓴 줄
input.addEventListener('keyup', (e) => e.key === 'Enter' && onAdd());
