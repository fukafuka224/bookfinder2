const btn = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {

    const q = input.value;

    if(!q){
        alert("책 제목 입력!");
        return;
    }

    result.innerHTML = "검색중... 🌿";

    const res = await fetch("/api/search?q=" + encodeURIComponent(q));
    const data = await res.json();

    if(!data.items || data.items.length === 0){
        result.innerHTML = "책 없음 😢";
        return;
    }

    const book = data.items[0];

    result.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.cover}" width="120">
        <p>${book.author}</p>
        <p>${book.price}원</p>
        <a href="${book.link}" target="_blank">알라딘 보기</a>
    `;
});