export default async function handler(req, res) {

    const { q } = req.query;

    const API_KEY = process.env.ALADIN_API_KEY;

    const url =
`https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${API_KEY}&Query=${encodeURIComponent(q)}&QueryType=Keyword&MaxResults=5&SearchTarget=Book&output=js&Version=20131101`;

    const response = await fetch(url);
    const data = await response.json();

    const items = (data.item || []).map(b => ({
        title: b.title,
        author: b.author,
        price: b.priceStandard,
        cover: b.cover,
        link: b.link
    }));

    res.status(200).json({ items });
}