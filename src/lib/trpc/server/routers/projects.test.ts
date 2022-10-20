import { Session } from "next-auth";
import auth from "next-auth/react";
import { createMocks } from "node-mocks-http";
import { test, expect, Mock, vi } from "vitest";
import { prisma } from "src/lib/prisma";
import { createContextInner } from "src/lib/trpc/server/createContext";
import { appRouter, AppRouter } from "src/lib/trpc/server/routers/_app";

vi.mock("next-auth/react");

test("example test", async () => {
  const ctx = await createContextInner({});
  const { req, res } = createMocks({
    method: "GET",
  });

  const caller = appRouter.createCaller({ req, res, prisma });

  const mockSession: Session = {
    expires: "1",
    user: { email: "nn829mm@gmail.com", id: "id", image: "", name: "Miki" },
  };

  (auth.getSession as Mock).mockReturnValueOnce(mockSession);

  const created = await caller.plans.create({
    name: "test",
    key: "test_by_test",
    description: "this is test",
    projectId: "cl92s3no900316iai23joqsor",
  });

  expect(created.name).toEqual("test");
});
