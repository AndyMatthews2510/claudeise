# English for Future Entrepreneurs in Engineering: course site

A static course guide for students. It is plain HTML, CSS and a little JavaScript, so there is nothing to build or install.

## Put it online with GitHub Pages

1. Create a new repository on GitHub (for example `entrepreneurs-english`) and upload everything in this folder, keeping the folders as they are. `index.html` must be at the top level.
2. Open the repository's **Settings**, then **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then save.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

To preview on your own computer, open `index.html` in a browser.

## Edit the content

Everything students read is in `index.html`.

- **A week:** search for `id="week-3"` (or any week number) and change the text inside it. The week cells at the top of the page are the `<a class="cell">` items near the start of the file.
- **A graded task:** edit its row in the table with `id="task-1"` and so on. The coloured bar above the table uses `--w:` for each task's weight, so update that number too. The weights should add up to 100.
- **The rubric:** edit the two tables in the section `id="rubric"`.
- **The draft notice:** delete the `<div class="notice">` block at the top when the syllabus is final.
- **Colours and sizes:** the first lines of `css/styles.css`.

## Notes

- The page uses a limited set of fonts, bundled in `fonts/` (Bricolage Grotesque and Atkinson Hyperlegible, both under the SIL Open Font License; licence files are included). No data is sent to Google or any other service.
- The page works without JavaScript. The script only adds the week-opening links, the expand all button, the speaking and writing switch and the highlighted menu.
- The site shows the 80/20 team-and-individual mark split under "What is graded". Remove that line if ISE does not approve it.
