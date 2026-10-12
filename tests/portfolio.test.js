import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import {
  projects,
  experience,
  independent,
  supportingProjects,
  resumes,
} from "../src/portfolio/content.js";
import {
  validateContact,
  createContactSender,
} from "../src/portfolio/contact-service.js";
import {
  routeScrollIntent,
  stageFits,
} from "../src/portfolio/scroll-policy.js";
const valid = {
  name: " Alex ",
  email: " alex@example.com ",
  message: " I would like to discuss an engineering opportunity. ",
};
test("Contact validation rejects empty, malformed and oversized submissions", () => {
  assert.equal(validateContact(valid), null);
  for (const fields of [
    { name: "  " },
    { email: "not-an-email" },
    { message: "short" },
    { message: "x".repeat(4001) },
  ])
    assert.ok(validateContact({ ...valid, ...fields }));
});
test("Contact sends the existing EmailJS template fields and prevents concurrent delivery", async () => {
  let complete;
  const calls = [];
  const sender = createContactSender(
    {
      send: (...args) => {
        calls.push(args);
        return new Promise((resolve) => {
          complete = resolve;
        });
      },
    },
    {
      serviceId: "test-service",
      templateId: "test-template",
      publicKey: "test-key",
    },
  );
  const pending = sender(valid);
  await assert.rejects(sender(valid), /already being sent/);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], [
    "test-service",
    "test-template",
    {
      from_name: "Alex",
      email: "alex@example.com",
      message: valid.message.trim(),
    },
    "test-key",
  ]);
  complete({ status: 200 });
  await pending;
});
test("Contact handles missing configuration and allows retry after provider failure", async () => {
  await assert.rejects(
    createContactSender(
      { send: () => assert.fail("Should not send") },
      {},
    )(valid),
    /not configured/,
  );
  let attempt = 0;
  const sender = createContactSender(
    {
      send: async () => {
        if (++attempt === 1) throw new Error("Offline");
        return { status: 200 };
      },
    },
    { serviceId: "s", templateId: "t", publicKey: "k" },
  );
  await assert.rejects(sender(valid), /Offline/);
  assert.deepEqual(await sender(valid), { status: 200 });
});
test("Public content separates employer metrics from independent contract metrics", () => {
  const company = JSON.stringify(experience);
  assert.ok(company.includes("87%"));
  assert.ok(!company.includes("120") && !company.includes("122"));
  assert.deepEqual(independent.approval, { approved: 120, submitted: 122 });
  assert.equal(experience[0].date, "MAY 2026 — OCT 2026");
  assert.equal(independent.heading, "Independent benchmark engineering");
  assert.deepEqual(Object.keys(independent).sort(), [
    "analysis", "approval", "heading", "intro", "terminal",
  ]);
});
test("Case-study routes, evidence, media and demo destinations are complete", () => {
  assert.deepEqual(
    projects.map((p) => p.slug),
    ["genai-assistant", "climate-risk", "ai-doctor"],
  );
  for (const project of projects) {
    for (const key of [
      "problem",
      "contribution",
      "result",
      "limitations",
      "imageCaption",
    ])
      assert.ok(project[key]?.length > 30, `${project.slug}: missing ${key}`);
    assert.ok(project.architecture.length >= 3);
    assert.ok(project.decisions.length >= 3);
    assert.ok(project.repo.startsWith("https://github.com/Archit-k20/"));
    if (project.demo)
      assert.notEqual(new URL(project.demo).hostname, "vercel.com");
  }
  for (const item of [...projects, ...supportingProjects])
    assert.ok(existsSync(`public${item.image}`));
  for (const resume of resumes) {
    assert.ok(existsSync(`public${resume.file}`));
    assert.ok(
      readFileSync(`public${resume.file}`)
        .subarray(0, 5)
        .toString()
        .startsWith("%PDF"),
    );
  }
});

test("Back restoration takes precedence over a hash and fresh routes start at the top", () => {
  assert.deepEqual(
    routeScrollIntent({
      kind: "POP",
      saved: 3150,
      hash: "#projects",
      samePath: false,
    }),
    { type: "position", value: 3150, immediate: true },
  );
  assert.deepEqual(
    routeScrollIntent({ kind: "PUSH", hash: "", samePath: false }),
    { type: "position", value: 0, immediate: true },
  );
  assert.deepEqual(
    routeScrollIntent({
      kind: "PUSH",
      hash: "#project-genai-assistant",
      samePath: true,
    }),
    { type: "anchor", value: "project-genai-assistant", immediate: false },
  );
  assert.deepEqual(
    routeScrollIntent({ kind: "POP", hash: "#projects", samePath: false }),
    { type: "anchor", value: "projects", immediate: true },
  );
});

test("Sticky chapters yield to content that cannot fit the available viewport", () => {
  assert.equal(stageFits(500, 800, 92), true);
  assert.equal(stageFits(800, 800, 92), false);
  assert.equal(stageFits(500, 500, 92), false);
});

test("Each engineering scenario has meaningful, selectable, distinct content", () => {
  for (const project of projects) {
    assert.ok(project.scenarios.length >= 2);
    assert.equal(
      new Set(project.scenarios.map((s) => s.id)).size,
      project.scenarios.length,
    );
    for (const scenario of project.scenarios) {
      assert.ok(scenario.label.length > 3);
      assert.ok(scenario.stages.length >= 3);
      assert.ok(scenario.note.length > 50);
    }
  }
});

test("Only the two current resumes are served, byte-for-byte identical to the supplied PDFs", () => {
  const expected = {
    ai: "5d9c433cc9c87e413220528668c43c6a11b5b12bf92be55da1941855e1f2a147",
    sde: "b663c4d899936ef6e9a44cf883e101cbc7e51a293e06200564fc66893a2e6eeb",
  };
  assert.equal(resumes.length, 2);
  for (const resume of resumes)
    assert.equal(
      createHash("sha256")
        .update(readFileSync(`public${resume.file}`))
        .digest("hex"),
      expected[resume.id],
    );
  assert.equal(existsSync("public/resume/Archit-Kumar-Resume.pdf"), false);
});
