// @vitest-environment node
import { createMocks } from "node-mocks-http";
import { test, expect } from "vitest";
import { prisma } from "src/lib/prisma";
import { createContextInner } from "src/lib/trpc/server/createContext";
import { appRouter, AppRouter } from "src/lib/trpc/server/routers/_app";

test("example test", async () => {
  const ctx = await createContextInner({});
  const { req, res } = createMocks({
    method: "GET",
  });

  const caller = appRouter.createCaller({ req, res, prisma });

  const created = await caller.plans.create({
    name: "test",
    key: "test_by_test",
    description: "this is test",
    projectId: "cl92s3no900316iai23joqsor",
  });

  expect(created.name).toEqual("test");
});
