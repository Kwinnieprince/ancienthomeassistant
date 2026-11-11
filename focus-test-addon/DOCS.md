# Focus-mode test app

This app is separate from the stable installation and has its own data directory.
It uses port **7655** and does not migrate or overwrite your existing dashboard.

1. Push `feat/dashboard-focus-mode` to your fork.
2. On your fork only, set the default branch to `feat/dashboard-focus-mode`
   (repository Settings → default branch). This makes both the manual workflow
   and the test app discoverable. The original owner's repository is unaffected.
3. In GitHub Actions choose **Build focus-mode test image**, select this branch,
   and run the workflow. Wait for the multi-platform build to succeed.
4. Ensure the GHCR package `ancienthomeassistant` is publicly readable so Home
   Assistant can pull it without credentials. Do not put credentials in this repo.
5. Add `https://github.com/Kwinnieprince/ancienthomeassistant` to the HA app store.
   Alternatively, copy `focus-test-addon` into HA's local `/addons` directory and
   refresh the app store. Do not change the original author's default branch.
6. Install **Ancient Dashboard Focus Test**, start it and open
   `http://YOUR_HA_IP:7655` on your iPad.
7. Complete setup with a small selection of test widgets. In Settings → This
   browser enable **Hide sidebar** and **Hide top bar**.
8. Tap the corner menu to restore navigation. Select a page, tap outside the
   menu, or press Escape to close it. Edit mode temporarily restores navigation.
9. Refresh the page to verify the browser remembers the preferences. Try each
   setting individually, both together, portrait/landscape and the dark theme.

The stable app is unaffected. For a second image build, bump this test app's
version and rebuild/reinstall the wrapper in HA so it pulls the new test image.
The image is mutable intentionally for this isolated test app only.

No container image has been built locally: Docker is unavailable on the current
machine. The workflow publishes only after you push/run it; this preparation does
not push a branch, publish an image, or open a pull request.
