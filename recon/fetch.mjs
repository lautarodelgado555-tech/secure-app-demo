import fs from 'node:fs';
const targets = JSON.parse(fs.readFileSync('recon/targets.json', 'utf8'));
fs.mkdirSync('recon/out', { recursive: true });
for (const t of targets) {
  const started = Date.now();
  try {
    const res = await fetch(t.url, {
      method: t.method || 'GET',
      headers: { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36', 'accept': 'text/html,*/*', ...(t.headers || {}) },
      body: t.body,
      redirect: 'manual',
    });
    const text = await res.text();
    const ms = Date.now() - started;
    fs.writeFileSync(`recon/out/${t.name}.html`, text);
    console.log(`\n===== ${t.name} :: ${res.status} ${res.headers.get('content-type')} len=${text.length} ${ms}ms location=${res.headers.get('location') || '-'}`);
    console.log(`----- set-cookie: ${res.headers.get('set-cookie') || '-'}`);
    const body = t.strip === false ? text : text.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/\n\s*\n/g, '\n');
    const max = t.max || 12000;
    console.log(body.slice(0, max));
    if (body.length > max) console.log(`... [truncated ${body.length - max} chars]`);
  } catch (e) {
    console.log(`\n===== ${t.name} :: ERROR ${e.message}`);
  }
}
