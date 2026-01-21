export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }
  const url = process.env.KOUZI_ENDPOINT;
  const token = process.env.KOUZI_TOKEN;
  const defaultSid = process.env.KOUZI_SESSION_ID;
  if (!url || !token) {
    return new Response(JSON.stringify({ reply: "服务未配置" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }
  const text = typeof payload?.text === "string" ? payload.text : "";
  const sid = typeof payload?.sessionId === "string" ? payload.sessionId : defaultSid;
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text, sessionId: sid })
    });
    if (!r.ok) {
      return new Response(JSON.stringify({ reply: "服务暂不可用" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    const data = await r.json();
    return new Response(JSON.stringify({ reply: data.reply ?? "", translated: data.translated }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ reply: "网络异常" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
