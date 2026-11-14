export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle D1 Database API (/api/portfolio)
    if (url.pathname === "/api/portfolio") {
      const corsHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      };

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
      }

      if (!env.DB) {
        return new Response(JSON.stringify({ status: "no_d1_binding" }), {
          status: 200,
          headers: corsHeaders
        });
      }

      try {
        await env.DB.prepare(
          "CREATE TABLE IF NOT EXISTS portfolio_state (id INTEGER PRIMARY KEY, state_json TEXT NOT NULL, updated_at TEXT)"
        ).run();

        if (request.method === "GET") {
          const row = await env.DB.prepare(
            "SELECT state_json FROM portfolio_state WHERE id = 1"
          ).first();
          if (!row || !row.state_json) {
            return new Response(JSON.stringify({ status: "empty" }), {
              status: 200,
              headers: corsHeaders
            });
          }
          return new Response(row.state_json, {
            status: 200,
            headers: corsHeaders
          });
        }

        if (request.method === "POST") {
          const bodyText = await request.text();
          await env.DB.prepare(
            "INSERT INTO portfolio_state (id, state_json, updated_at) VALUES (1, ?1, datetime('now')) ON CONFLICT(id) DO UPDATE SET state_json = ?1, updated_at = datetime('now')"
          ).bind(bodyText).run();

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: corsHeaders
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // Serve static assets (including / and /admin SPA fallback)
    if (env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status === 404 && !url.pathname.includes(".")) {
        return env.ASSETS.fetch(new URL("/index.html", request.url));
      }
      return assetRes;
    }

    return new Response("Not Found", { status: 404 });
  }
};
