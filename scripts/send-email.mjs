#!/usr/bin/env node
// scripts/send-email.mjs
//
// Sends an email via Resend (https://resend.com). Reads RESEND_API_KEY and
// (optionally) RESEND_FROM from .env in the current directory.
//
// Usage:
//   node scripts/send-email.mjs --to user@x.com --subject "..." --body-file body.txt
//   echo "body text" | node scripts/send-email.mjs --to user@x.com --subject "..."
//
// Options:
//   --to <email>          recipient (required)
//   --subject <text>      subject line (required)
//   --body-file <path>    body source; or pipe via stdin
//   --from <"Name <a@b>"> override RESEND_FROM
//
// Exit codes: 0 ok, 1 usage/runtime, 2 missing key.
//
// Native fetch needs Node 18+. Use `node --version` to confirm.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([^#=][^=]*?)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

// Try .env next to the script's parent (project root = scripts/..), then CWD.
// Whichever loads first wins (loadEnv won't overwrite existing process.env entries).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(__dirname, '..', '.env'));
loadEnv(path.join(process.cwd(), '.env'));

const API_KEY = process.env.RESEND_API_KEY;
if (!API_KEY) {
  console.error('ERROR: RESEND_API_KEY not set. Add it to .env or export it.');
  process.exit(2);
}

const args = process.argv.slice(2);
let to = '';
let subject = '';
let bodyFile = '';
let from = process.env.RESEND_FROM || 'Aether AI <onboarding@resend.dev>';
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--to': to = args[++i]; break;
    case '--subject': subject = args[++i]; break;
    case '--body-file': bodyFile = args[++i]; break;
    case '--from': from = args[++i]; break;
    default:
      console.error(`Unknown arg: ${args[i]}`);
      process.exit(1);
  }
}

if (!to || !subject) {
  console.error('Usage: send-email.mjs --to <email> --subject <text> [--body-file <path>] [--from <"Name <a@b>">]');
  process.exit(1);
}

let body = '';
if (bodyFile) {
  body = fs.readFileSync(bodyFile, 'utf8');
} else {
  body = await new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => resolve(data));
  });
}

if (!body.trim()) {
  console.error('ERROR: body is empty (use --body-file or pipe text via stdin).');
  process.exit(1);
}

const resp = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ from, to: [to], subject, text: body }),
});

const out = await resp.json();
if (!resp.ok) {
  console.error(`ERROR: Resend returned ${resp.status}:`, JSON.stringify(out));
  process.exit(1);
}

console.log(`SENT: id=${out.id} from=${from} to=${to} subject="${subject}"`);
