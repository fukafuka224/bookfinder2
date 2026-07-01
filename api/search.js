export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {

  const q = req.query.q;
  const key = process.env.ALADIN_API_KEY;

  if (!key) {
    return res.status(500).json({ error: "NO_API_KEY" });
  }

  try {

    const url =
`https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${key}&Query=${encodeURIComponent(q)}&QueryType=Keyword&MaxResults=5&SearchTarget=Book&output=js&Version=20131101`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      items: data.item || []
    });

  } catch (e) {
    res.status(500).json({ error: "API_FAIL" });
  }

}