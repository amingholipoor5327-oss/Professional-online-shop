 import { getAuthHandler } from "@/auth";

const handler = getAuthHandler();

export { handler as GET, handler as POST };
 