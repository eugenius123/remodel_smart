Remodel Smart is a home remodeling company in Pittsburgh.

# Website Management

These instructions are for updating the website using the GitHub website without
the need to install a Git client on your PC.

## Add a Project to the Gallery
- Determine the mapped project name.
  - The mapped project name is the all lowercase version of the project name
    with spaces instead of underscores.
  - Currently only project names that have each word capitalized are supported.
    - Names such as `castle_of_ivory` will show as `Castle Of Ivory`.
- On your PC, create a folder with all of your project images.
  - Name the folder the mapped project name.
  - Name the images with numbers starting from 0 and without leading zeros.
  - The images will appear in numerical order and image 0 will be the main link image.
  - These are only the source images. At build time, thumbnails be will
    automatically created and downsized copies of the images will be made to
    optimize page load times.
- Follow the [high level procedure](#high-level-procedure), to make the following changes.
  - Add the project images.
    - Browse to `Source/img/gallery`.
    - Click `Upload files` from the `Add file` dropdown.
    - Drag your folder with the project images to the `Drag files here` box.
    - Click the `Commit changes` button.
  - Add a project page.
    - Browse to the `Source/gallery` folder.
    - Click on one of the existing files to show the file's contents.
    - Click the copy icon at the top right which shows `Copy raw contents` when hovered.
    - Browse to the `Source/gallery` folder.
    - Click `Create new file` from the `Add file` dropdown.
    - In the `Name your file...` textbox, put the mapped project name followed by `.html`.
    - In the `Edit new file` text area paste what you copied from the other file.
    - Modify the copied text as follows.
      - Set `projectName` to the mapped project name.
      - Set `imageCount` to the number of images for the project.
    - Click the `Commit new file` button at the bottom.
  - Add a link to the project page from main page.
    - Browse to `Source`.
    - Click `index.html`.
    - Click the `Edit this file` icon in the top right.
    - In the section with `id="gallery"`, duplicate one of the divs with `class="project"`
      and change the following.
      - a href - Update to use mapped project name
      - img src - Update to use mapped project name
      - h2 - Update to project name
    - Click the `Commit changes` button.

## Add Images to Existing Project
- Follow the [high level procedure](#high-level-procedure), to make the following changes.
  - Add the images to the appropriate folder under `Source/img/gallery`.
  - Update the `imageCount` in the appropriate `Source/gallery` file.

# Sub Procedures

## High Level Procedure
- [Pause Clouldflare automatic deployments](#pause-cloudflare-automatic-deployments)
- [Create a GitHub Branch](#create-github-branch)
- Make a series of changes in GitHub to the branch.
- [Resume Clouldflare automatic deployments](#resume-cloudflare-automatic-deployments)
- Preview changes
  - Make a small whitespace change to the `Readme.md` file in the root folder of the branch
    to force a deployment.
  - In Cloudflare, under the `Pages | Deployments` tab, a new deployment should begin for the
    GitHub branch with state `In progress`. The deployment will take about 3 - 5 minutes. When
    the deployment is finished, you can click on the link in the `Deployment` column to
    preview your changes to the website.
- If needed, make more changes in GitHub.
- [Merge the GitHub branch into the main branch](#merge-github-branch-into-main)

## Pause Cloudflare Automatic Deployments
- Log into `cloudflare.com`
- Click `Pages` tab
- Click the title of the Pages project
- Click the `Settings` tab
- Click the `Builds & Deployments` tab
- Click the `Pause deployments` button
- Click the `Pause deployments` button again

## Resume Cloudflare Automatic Deployments
- Log into `cloudflare.com`
- Click `Pages` tab
- Click the title of the Pages project
- Click the `Settings` tab
- Click the `Builds & Deployments` tab
- Click the `Resume deployments` button
- Click the `Resume deployments` button again

## Create Github Branch
- Log into github.com
- Click on the repository for the website
- Click the dropdown at the top left that says `main`.
- In the text box which says `Find or create a branch...`, enter a new branch name such as `addingXyzProject`.
- Click the `Create branch: addingXyzProject from main` link.
- The top left dropdown should show the new branch name, indicating that you are working on the new branch.
- For operations intended for a branch, always check that this dropdown shows the correct branch name.

## Merge GitHub Branch into Main
- In GitHub, when on the branch, you should see `This branch is x commits ahead of main.`
- From the `Contribute` dropdown, click the `Open pull request` button.
- Click `Create pull request` button.
- Then click `Merge pull request`.
- Click `Confirm merge`.
- Click `Delete branch`.
- If Cloudflare automatic deployments is enabled...
  - Cloudflare should automatically begin a new deployment.
  - Changes will be live once the deployment is finished.
