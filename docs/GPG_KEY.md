<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# GPG Commit Signing

All commits to **web-app** must be signed with a GPG key. This guarantees that every change can be
traced to a verified author and that no commit has been tampered with after signing.

---

## 1. Generate a GPG key

```bash
gpg --full-generate-key
```

When prompted:

- Key type: **RSA and RSA** (option 1)
- Key size: **4096** bits
- Expiry: your choice (1–2 years is a good default; you can extend it later)
- Real name and email: use the same email as your GitHub account

---

## 2. Find your key ID

```bash
gpg --list-secret-keys --keyid-format=long
```

Example output:

```
sec   rsa4096/3AA5C34371567BD2 2024-01-01 [SC]
      ...
uid   [ultimate] Your Name <you@example.com>
```

The key ID in this example is `3AA5C34371567BD2`.

---

## 3. Configure Git to use the key

```bash
git config --global user.signingkey 3AA5C34371567BD2
git config --global commit.gpgsign true
git config --global tag.gpgsign true
```

To sign only commits in this repository:

```bash
git config user.signingkey 3AA5C34371567BD2
git config commit.gpgsign true
```

---

## 4. Export and add the public key to GitHub

```bash
gpg --armor --export 3AA5C34371567BD2
```

Copy the output (including `-----BEGIN PGP PUBLIC KEY BLOCK-----`), then go to **GitHub → Settings →
SSH and GPG keys → New GPG key** and paste it.

---

## 5. Verify a signed commit

```bash
git log --show-signature -1
```

A valid signature looks like:

```
gpg: Signature made ...
gpg: Good signature from "Your Name <you@example.com>"
```

---

## 6. Troubleshooting

**`error: gpg failed to sign the data`**

On macOS/Linux, tell Git which GPG binary to use:

```bash
git config --global gpg.program gpg2
# or on macOS with Homebrew:
git config --global gpg.program $(which gpg)
```

On Windows (Git for Windows):

```bash
git config --global gpg.program "C:/Program Files (x86)/GnuPG/bin/gpg.exe"
```

**TTY / pinentry issues**

Add this to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
export GPG_TTY=$(tty)
```

---

## Developer Certificate of Origin (DCO)

In addition to GPG signing, contributors are expected to acknowledge the [DCO](../DCO) by adding a
`Signed-off-by` trailer to their commits:

```bash
git commit -s -m "feat: add new feature"
# produces: Signed-off-by: Your Name <you@example.com>
```
