import { Session } from "next-auth";
import auth from "next-auth/react";
import { test, expect, Mock, vi } from "vitest";
import { prisma } from "src/lib/prisma";

vi.mock("next-auth/react");

const mockSession: Session = {
  expires: "1",
  user: { email: "nn829mm@gmail.com", id: "id", image: "", name: "Miki" },
};

(auth.getSession as Mock).mockReturnValueOnce(mockSession);

async function main() {
  await prisma.user.create({
    data: {
      email: "nn829mm@gmail.com",
    },
  });
}

main();
