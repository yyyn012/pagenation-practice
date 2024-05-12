//    총 게시글 수
const totalPage = 100;

//  한 페이지 당 출력되는 게시글 갯수
const page_num = 10;

//   한번에 출력될 수 있는 최대 블록 수
// ex ) [1][2][3][4][5] -> 블록
const block_num = 5;

// 블록의 총 수를 계산한다.
const total_block = totalPage % 5 == 0 ? totalPage / 5 : totalPage / 5 + 1;

// 현재 블록 위치를 알려준다
const current_block = 1;

// template 생성
const postTemplate = (index, objValue) => {
  return `
  <tr>
    <td>${index + 1}</td>
    <td>
      <a href="/board/view.html?index=${objValue.index}"
        onmouseover={mouseOver(event)}
        onmouseout={mouseOut(event)}
        style="
        display:inline-block;
        width:90px;
        "
      >
        ${objValue.subject}
      </a>
    </td>
    <td>${objValue.writer}</td>
    <td>${objValue.date}</td>
    <td>${objValue.views}</td>
  </tr>
  `;
};

// 게시글 데이터 출력하기
function post_data_print(blockButton) {
  // 게시글 title 제외하고 모두 제거
  post.forEach(function (item) {
    item.remove();
  });

  const BOARDS = "boards";
  const boardsObj = JSON.parse(localStorage.getItem(BOARDS));
  const post = document.querySelector("tbody");

  // 출력 첫 페이지 번호
  const start = totalPage - page_num * (block - 1);

  for (let i = start; i >= 1 && i > start - page_num; i--) {
    post.innerHTML += postTemplate(i, boardsObj[i]);
    boardsObj[i].refresh = false;
    const produceStr = JSON.stringify(boardsObj);
    localStorage.setItem(BOARDS, produceStr);
  }

  post.appendChild(postTemplate);
}

let front_block = current_block;

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
function block_print(front_block) {
  /*
            1. 이전, 다음 블럭 속성 처리
            2. 기존 블럭 모두 삭제
            3. 범위 안의 블럭 생성 및 추가
            */

  // 이전으로 갈 블럭이 없으면
  if (front_block <= 1) {
    document.querySelector(".before_move").style.visibility = "hidden";
  } else {
    document.querySelector(".before_move").style.visibility = "visible";
  }

  // 다음으로 갈 블럭이 없으면
  if (front_block + block_num >= total_block) {
    document.querySelector(".next_move").style.visibility = "hidden";
  } else {
    document.querySelector(".next_move").style.visibility = "visible";
  }

  // 블럭을 추가할 공간
  let block_box = document.querySelector(".block");
  // 기존 블럭 모두 삭제
  block_box.replaceChildren();

  console.log("remove");

  //front_block부터 total_block 또는 block_num까지 생성 및 추가
  for (
    let i = front_block;
    i <= total_block && i < front_block + block_num;
    i++
  ) {
    console.log("add element");

    // 버튼을 생성한다.
    let blockButton = document.createElement("button");
    blockButton.textContent = i;
    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    blockButton.addEventListener("click", function (event) {
      post_data_print(i);
    });
    // 블럭에 추가한다.
    block_box.appendChild(blockButton);
  }
}

function before() {
  block_print(current_block - block_num);
  console.log("이전");
}

function next() {
  block_print(current_block + block_num);
  console.log("다음");
}
