import { Session } from "next-auth";
import auth from "next-auth/react";
import { test, expect, Mock, vi } from "vitest";
import { createContextInner } from "src/lib/trpc/server/createContext";
import { appRouter, AppRouter } from "src/lib/trpc/server/routers/_app";

vi.mock("next-auth/react");

test("example test", async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const mockSession: Session = {
    expires: "1",
    user: { email: "nn829mm@gmail.com", id: "id", image: "", name: "Miki" },
  };

  (auth.getSession as Mock).mockReturnValueOnce(mockSession);

  const created = await caller.plans.create({
    name: "test",
    key: "test",
    description: "this is test",
    projectId: "projectId",
  });

  expect(created.name).toEqual("test");
});
