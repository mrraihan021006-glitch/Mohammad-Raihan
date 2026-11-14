// Cloudflare Pages Function: /api/portfolio
// Bound to D1 Database: raihan_portfolio_db (212050f4-a269-4c14-a6d2-9b3f21431902)

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const row = await env.DB.prepare("SELECT state_json FROM portfolio_state WHERE id = 1").first();
    if (!row) {
      return new Response(JSON.stringify({ status: "empty" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(row.state_json, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const bodyText = await request.text();
    await env.DB.prepare(
      "INSERT INTO portfolio_state (id, state_json, updated_at) VALUES (1, ?1, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET state_json = ?1, updated_at = CURRENT_TIMESTAMP"
    ).bind(bodyText).run();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
