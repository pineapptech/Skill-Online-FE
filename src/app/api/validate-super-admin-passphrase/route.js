export async function POST(request) {
  const { passphrase } = await request.json();

  if (passphrase === "Admin@etsapafrica") {
    return Response.json({ success: true });
  }
  return Response.json({ success: false });
}
