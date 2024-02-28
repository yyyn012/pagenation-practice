const writeForm = document.querySelector("#write-form");

// 데이터 기본 틀(construtor를 사용하여 클래스 Board의 인스턴스 객체 생성)
class Board {
  constructor(indexNum, subjectStr, writerStr, contentStr) {
    this.index = indexNum;
    this.subject = subjectStr;
    this.writer = writerStr;
    this.content = contentStr;
    this.date = recordDate();
    this.views = -1;
    this.refresh = false;
  }

  // 빈 값일 경우 에러 메시지 출력
  set Subject(value) {
    if (value.length === 0) throw new Error("제목을 작성해주세요.");
  }
  set Writer(value) {
    if (value.length === 0) throw new Error("작성자를 작성해주세요.");
  }
  set Content(value) {
    if (value.length === 0) throw new Error("내용을 작성해주세요.");
  }
}

// 날짜 반환 함수
const recordDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  mm = (mm > 9 ? "" : 0) + mm;
  dd = (dd > 9 ? "" : 0) + dd;

  const arr = [yyyy, mm, dd];

  return arr.join("-");
};

// 글 작성 버튼(데이터 가져오기, 가져온 데이터를 사용하여 new Board의 새로운 객체 생성하기, 생성한 객체 push해주기, localStorage에 저장하기, view.html페이지로 넘어가기)
const submitHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  try {
    // boards 가져오기
    const boardsObj = JSON.parse(localStorage.getItem("boards"));

    // 새로운 객체 추가하여 new Board의 인자로 전달
    const index = boardsObj.length;
    const instance = new Board(index, subject, writer, content);
    boardsObj.push(instance);

    // localStorage에 저장하기
    const boardsStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardsStr);

    // view.html페이지로 넘어가기
    location.href = "/board/view.html?index=" + index;
  } catch (e) {
    // try문에서 에러 발생 시 에러 메시지 출력
    alert(e.message);
    console.error(e);
  }
};

writeForm.addEventListener("submit", submitHandler);
