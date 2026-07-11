// ============================================================
// YOUR PERSONAL CONTEXT FOR THE AI ASSISTANT
// ============================================================
// Everything you write between the backticks below is given to
// the AI on every question, alongside what the site already
// knows (bio, projects, reading list, experience, contact).
//
// Write freely in plain text — sections, bullet points, whole
// paragraphs, anything. Good things to add:
//   - your story: where you grew up, how you got into design
//   - how you work: process, tools, opinions, philosophies
//   - specifics recruiters ask: availability, kinds of work
//     you take on, what you're looking for
//   - FAQs and your preferred answers to them
//   - personality: humor, favourite things, quirks
//   - boundaries: anything the AI should decline to discuss
//
// Rough cost note: every ~750 words here adds about half a
// cent per visitor question. A few pages of text is fine.
// After editing, tell Claude to deploy (or push to GitHub and
// run `npx vercel --prod`).
// ============================================================

export const personalContext = `
HOW I GOT HERE:
(Write your story — where you grew up, what led you to design,
the path to Kredete.)

HOW I WORK:
(Your process, tools you love, design opinions, what you value
in a team.)

WORKING WITH ME:
(Are you open to freelance, advising, speaking? What kind of
projects excite you? How should someone start a conversation?)

FAQ:
(Questions people often ask, with the answers you'd want given.)

OFF LIMITS:
(Anything the assistant should politely decline to discuss.)
`.trim();
