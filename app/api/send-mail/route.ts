import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Vercel Cron이 이 경로를 호출합니다. (vercel.json의 crons 참고)
// 실행 환경: Node.js 런타임 (nodemailer는 Edge에서 동작하지 않으므로 필수)
export const runtime = "nodejs";
// 항상 새로 실행되도록 캐시 비활성화
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1) 보안: Vercel Cron이 보낸 요청만 허용
  //    Vercel은 CRON_SECRET 환경변수가 있으면 자동으로
  //    Authorization: Bearer <CRON_SECRET> 헤더를 붙여 호출합니다.
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) 환경변수 확인
  const { GMAIL_USER, GMAIL_APP_PASSWORD, MAIL_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return NextResponse.json(
      { error: "GMAIL_USER / GMAIL_APP_PASSWORD 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  // 3) Gmail SMTP 트랜스포터 생성
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD, // Gmail '앱 비밀번호' (일반 로그인 비밀번호 아님)
    },
  });

  // 4) 메일 발송
  try {
    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const info = await transporter.sendMail({
      from: `"Vercel Cron" <${GMAIL_USER}>`,
      to: MAIL_TO || GMAIL_USER, // 받는 사람 (기본값: 본인)
      subject: `[Vercel Cron] 정기 알림 - ${now}`,
      text: `Vercel Cron Job이 정상적으로 실행되었습니다.\n실행 시각(KST): ${now}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>✅ Vercel Cron Job 실행됨</h2>
          <p>정기 이메일이 정상적으로 발송되었습니다.</p>
          <p><strong>실행 시각(KST):</strong> ${now}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error("메일 발송 실패:", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
