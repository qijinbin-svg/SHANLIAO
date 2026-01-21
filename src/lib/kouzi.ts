export async function sendKouziMessage(text: string, sessionId?: string) {
  const endpoint = import.meta.env.VITE_KOUZI_ENDPOINT;
  const token = import.meta.env.VITE_KOUZI_TOKEN;
  const sid = sessionId || import.meta.env.VITE_KOUZI_SESSION_ID;
  if (!endpoint || !token) {
    return { reply: "服务未配置", translated: undefined };
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text, sessionId: sid })
    });
    if (!res.ok) {
      return { reply: "服务暂不可用", translated: undefined };
    }
    const data = await res.json();
    return { reply: data.reply ?? "", translated: data.translated };
  } catch {
    return { reply: "网络异常", translated: undefined };
  }
}
