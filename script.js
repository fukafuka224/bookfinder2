const TTB_KEY = "ttbmisuk48652139001";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("bookResult");

searchBtn.addEventListener("click", searchBook);

async function searchBook() {

    const keyword = searchInput.value.trim();

    if (!keyword) {
        alert("책 제목을 입력하세요.");
        return;
    }

    result.innerHTML = "검색 중...";

    const url =
        `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx` +
        `?ttbkey=${TTB_KEY}` +
        `&Query=${encodeURIComponent(keyword)}` +
        `&QueryType=Keyword` +
        `&MaxResults=10` +
        `&SearchTarget=Book` +
        `&output=js` +
        `&Version=20131101`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (!data.item || data.item.length === 0) {
            result.innerHTML = "책을 찾을 수 없습니다.";
            return;
        }

        const book = data.item[0];

        result.innerHTML = `
            <h2>${book.title}</h2>

            <img src="${book.cover}" width="160">

            <p><b>저자</b><br>${book.author}</p>

            <p><b>출판사</b><br>${book.publisher}</p>

            <p><b>가격</b><br>${book.priceStandard}원</p>

            <button onclick="window.open('${book.link}')">
                알라딘에서 보기
            </button>
        `;

    } catch (e) {

        result.innerHTML =
        "API 연결 실패 <br>브라우저에서는 CORS 때문에 실행되지 않을 수 있습니다.";

        console.log(e);

    }

}