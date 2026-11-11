# Focus-mode test app

This app is separate from the stable installation and has its own data directory.
It uses port **7655** and does not migrate or overwrite your existing dashboard.

1. Push `feat/dashboard-focus-mode` to your fork. This automatically starts
   **Build focus-mode test image** for that branch; no default-branch change is
   needed to trigger it.
2. Wait for the workflow tests and multi-platform Docker Hub build to succeed.
3. Alternatively, use the already visible **Publish Docker image** workflow:
   select **Run workflow → feat/dashboard-focus-mode**. Its **Publish focus test
   to your Docker Hub** job builds your test image. The upstream GHCR job is
   skipped intentionally; it does not prevent the Docker Hub job from running.
   Always start a new run after pushing a fix, rather than rerunning an old run.
4. Create the public `kwintend/ancienthomeassistant` repository on Docker Hub.
   The workflow reads `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` from repository
   Actions secrets; the token needs Read & Write permission. Home Assistant must
   be able to pull the image without credentials. Do not put tokens in this repo.
   The test app pulls `docker.io/kwintend/ancienthomeassistant:focus-test`.
5. For HA app discovery, set your fork's default branch to
   `feat/dashboard-focus-mode`, then add
   `https://github.com/Kwinnieprince/ancienthomeassistant` to the HA app store.
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
