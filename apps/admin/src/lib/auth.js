 import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 8 * 60 * 60;

export { COOKIE_NAME, SESSION_DURATION };

export function createSessionToken(email) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      exp: Math.floor(Date.now() / 1000) + SESSION_DURATION,
    })
  ).toString("base64url");

  const signature = createHmac("sha256", process.env.AUTH_SECRET)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  try {
    if (!process.env.AUTH_SECRET || !token) return null;

    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expectedSignature = createHmac(
      "sha256",
      process.env.AUTH_SECRET
    )
      .update(payload)
      .digest();

    const receivedSignature = Buffer.from(signature, "base64url");

    if (
      receivedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(receivedSignature, expectedSignature)
    ) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      typeof session.email !== "string" ||
      typeof session.exp !== "number" ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return { email: session.email };
  } catch {
    return null;
  }
}
 