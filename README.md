> March, 2016: If you're on an old version of Jekyll Now and run into a) build warnings or b) syntax highlighting issues caused by [Jekyll 3 and GitHub Pages updates](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0), just :sparkles:[update your \_config.yml](https://github.com/barryclark/jekyll-now/pull/445/files):sparkles: and you'll be set!

# Jekyll Now

**Jekyll** is a static site generator that's perfect for GitHub hosted blogs ([Jekyll Repository](https://github.com/jekyll/jekyll))

**Jekyll Now** makes it easier to create your Jekyll blog, by eliminating a lot of the up front setup.

- You don't need to touch the command line
- You don't need to install/configure ruby, rvm/rbenv, ruby gems :relaxed:
- You don't need to install runtime dependencies like markdown processors, Pygments, etc
- If you're on Windows, this will make setting up Jekyll a lot easier
- It's easy to try out, you can just delete your forked repository if you don't like it

In a few minutes you'll be set up with a minimal, responsive blog like the one below giving you more time to spend on writing epic blog posts!

![Jekyll Now Theme Screenshot](/images/jekyll-now-theme-screenshot.jpg 'Jekyll Now Theme Screenshot')

## Quick Start

### Step 1) Fork Jekyll Now to your User Repository

Fork this repo, then rename the repository to yourgithubusername.github.io.

Your Jekyll blog will often be viewable immediately at <https://yourgithubusername.github.io> (if it's not, you can often force it to build by completing step 2)

![Step 1](/images/step1.gif 'Step 1')

### Step 2) Customize and view your site

Enter your site name, description, avatar and many other options by editing the \_config.yml file. You can easily turn on Google Analytics tracking, Disqus commenting and social icons here too.

Making a change to \_config.yml (or any file in your repository) will force GitHub Pages to rebuild your site with jekyll. Your rebuilt site will be viewable a few seconds later at <https://yourgithubusername.github.io> - if not, give it ten minutes as GitHub suggests and it'll appear soon

> There are 3 different ways that you can make changes to your blog's files:

> 1. Edit files within your new username.github.io repository in the browser at GitHub.com (shown below).
> 2. Use a third party GitHub content editor, like [Prose by Development Seed](http://prose.io). It's optimized for use with Jekyll making markdown editing, writing drafts, and uploading images really easy.
> 3. Clone down your repository and make updates locally, then push them to your GitHub repository.

![_config.yml](/images/config.png '_config.yml')

### Step 3) Publish your first blog post

Edit `/_posts/2014-3-3-Hello-World.md` to publish your first blog post. This [Markdown Cheatsheet](http://www.jekyllnow.com/Markdown-Style-Guide/) might come in handy.

![First Post](/images/first-post.png 'First Post')

> You can add additional posts in the browser on GitHub.com too! Just hit the + icon in `/_posts/` to create new content. Just make sure to include the [front-matter](http://jekyllrb.com/docs/frontmatter/) block at the top of each new blog post and make sure the post's filename is in this format: year-month-day-title.md

## Local Development

1. Install Jekyll and plug-ins in one fell swoop. `gem install github-pages` This mirrors the plug-ins used by GitHub Pages on your local machine including Jekyll, Sass, etc.
2. Clone down your fork `git clone https://github.com/yourusername/yourusername.github.io.git`
3. Serve the site and watch for markup/sass changes `jekyll serve`
4. View your website at http://127.0.0.1:4000/
5. Commit any changes and push everything to the master branch of your GitHub user repository. GitHub Pages will then rebuild and serve your website.

## Moar!

I've created a more detailed walkthrough, [**Build A Blog With Jekyll And GitHub Pages**](http://www.smashingmagazine.com/2014/08/01/build-blog-jekyll-github-pages/) over at the Smashing Magazine website. Check it out if you'd like a more detailed walkthrough and some background on Jekyll. :metal:

It covers:

- A more detailed walkthrough of setting up your Jekyll blog
- Common issues that you might encounter while using Jekyll
- Importing from Wordpress, using your own domain name, and blogging in your favorite editor
- Theming in Jekyll, with Liquid templating examples
- A quick look at Jekyll 2.0's new features, including Sass/Coffeescript support and Collections

## Jekyll Now Features

✓ Command-line free _fork-first workflow_, using GitHub.com to create, customize and post to your blog  
✓ Fully responsive and mobile optimized base theme (**[Theme Demo](http://jekyllnow.com)**)  
✓ Sass/Coffeescript support using Jekyll 2.0  
✓ Free hosting on your GitHub Pages user site  
✓ Markdown blogging  
✓ Syntax highlighting  
✓ Disqus commenting  
✓ Google Analytics integration  
✓ SVG social icons for your footer  
✓ 3 http requests, including your avatar

✘ No installing dependencies
✘ No need to set up local development  
✘ No configuring plugins  
✘ No need to spend time on theming  
✘ More time to code other things ... wait ✓!

## Questions?

[Open an Issue](https://github.com/barryclark/jekyll-now/issues/new) and let's chat!

## Other forkable themes

You can use the [Quick Start](https://github.com/barryclark/jekyll-now#quick-start) workflow with other themes that are set up to be forked too! Here are some of my favorites:

- [Hyde](https://github.com/poole/hyde) by MDO
- [Lanyon](https://github.com/poole/lanyon) by MDO
- [mojombo.github.io](https://github.com/mojombo/mojombo.github.io) by Tom Preston-Werner
- [Left](https://github.com/holman/left) by Zach Holman
- [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) by Michael Rose
- [Skinny Bones](https://github.com/mmistakes/skinny-bones-jekyll) by Michael Rose

## Credits

- [Jekyll](https://github.com/jekyll/jekyll) - Thanks to its creators, contributors and maintainers.
- [SVG icons](https://github.com/neilorangepeel/Free-Social-Icons) - Thanks, Neil Orange Peel. They're beautiful.
- [Solarized Light Pygments](https://gist.github.com/edwardhotchkiss/2005058) - Thanks, Edward.
- [Joel Glovier](http://joelglovier.com/writing/) - Great Jekyll articles. I used Joel's feed.xml in this repository.
- [David Furnes](https://github.com/dfurnes), [Jon Uy](https://github.com/jonuy), [Luke Patton](https://github.com/lkpttn) - Thanks for the design/code reviews.
- [Bart Kiers](https://github.com/bkiers), [Florian Simon](https://github.com/vermluh), [Henry Stanley](https://github.com/henryaj), [Hun Jae Lee](https://github.com/hunjaelee), [Javier Cejudo](https://github.com/javiercejudo), [Peter Etelej](https://github.com/etelej), [Ben Abbott](https://github.com/jaminscript), [Ray Nicholus](https://github.com/rnicholus), [Erin Grand](https://github.com/eringrand), [Léo Colombaro](https://github.com/LeoColomb), [Dean Attali](https://github.com/daattali), [Clayton Errington](https://github.com/cjerrington), [Colton Fitzgerald](https://github.com/coltonfitzgerald), [Trace Mayer](https://github.com/sunnankar) - Thanks for your [fantastic contributions](https://github.com/barryclark/jekyll-now/commits/master) to the project!

## Contributing

Issues and Pull Requests are greatly appreciated. If you've never contributed to an open source project before I'm more than happy to walk you through how to create a pull request.

You can start by [opening an issue](https://github.com/barryclark/jekyll-now/issues/new) describing the problem that you're looking to resolve and we'll go from there.

I want to keep Jekyll Now as minimal as possible. Every line of code should be one that's useful to 90% of the people using it. Please bear that in mind when submitting feature requests. If it's not something that most people will use, it probably won't get merged. :guardsman:

# Video Streaming Platform

## Components

### Video Upload Service

- Handles video uploads from users, often using multi-part uploads for large files.
- Generates a pre-signed URL for direct upload to Object Storage (e.g., AWS S3) from the user's device.
- Creates a new entry in the video metadata database when upload is initiated.
- Sends a transcoding job to a Message Queue after a successful upload.

### Video Transcoding Service

- Reads raw video files from Blob Storage and encodes it into multiple resolutions/bitrates (e.g., 240p, 480p, 720p, 1080p) for adaptive streaming.
- Generates thumbnails and extracts metadata (e.g., duration, codec).
- Stores transcoded video segments in Object Storage or CDN-backed storage for efficient delivery.

### Message Queue

- Decouples video upload from transcoding to ensure scalability.
- Stores job requests from the Upload Service and allows the Transcoding Service to process them asynchronously.

### Storage

- **Raw Video Storage** – Stores unprocessed uploads in a blob store before transcoding.
- **Processed Video Storage** – Stores transcoded video segments in a CDN-backed system.
- **Metadata Storage** – Stores structured video metadata in a relational database.

## Upload Workflow

1. **Initiating the Upload**

   - A logged-in content creator selects a video file via a frontend client (web, mobile, or smart TV interface).
   - The client sends an upload request to the Video Upload Service via the API Gateway.
     - Includes metadata such as `channel_id`, `title`, `description`, `tags`, and other relevant fields.
   - The server generates a pre-signed URL for an Object Storage bucket (e.g., AWS S3).
   - The client uploads the video directly to Object Storage using the pre-signed URL.

2. **Upload to Object Storage**

   - Large files often use multi-part or chunked uploads. The client splits a large file into smaller "parts" (chunks), each typically ranging from a few MBs to tens of MBs.
     - If the connection drops in the middle of the upload, only the incomplete chunk needs to be re-sent rather than re-uploading the entire file from scratch.
     - In many multi-part implementations, each chunk can be uploaded concurrently using multiple threads or connections.

3. **Metadata Creation & Status Update**

   - Once the upload call is initiated, the Upload Service creates a new record in the Videos table with:
     - `video_id` (primary key)
     - `channel_id` (which user or channel this belongs to)
     - `title`, `description`, `tags`
     - `status = "processing"` (since it's not yet ready for viewing)
     - `upload_date = now()`
   - The Videos table record includes a reference or URL to the uploaded file in Object Storage, e.g., `raw_file_url: <https://bucket/raw/12345.mp4>`.
   - The Upload Service returns a response to the client with the newly created `video_id`.

4. **Sending a Transcoding Job**
   - The Upload Service places a message on a queue (e.g., RabbitMQ, AWS SQS, Kafka) containing:
     - `video_id`
     - `raw_file_url`
     - `target_resolutions`
     - `target_formats`

## Video Transcoding Workflow

1. **Processing the Job**

   - A Transcoding Service worker polls the queue, retrieves the message, and extracts: `raw_file_url`, `video_id`, `target_resolutions`, and `target_formats`.
   - The worker downloads the raw file from the Object Storage (raw files bucket).

2. **Video Transcoding Process**

   - The worker uses video processing tools (e.g., FFmpeg) to create adaptive bitrate variants:
     - Low resolution (240p or 360p) - For slow connections.
     - Standard resolution (480p or 720p) - For average connections.
     - High resolution (1080p or 4K) - For high-bandwidth users.
   - Each variant is split into small segments (e.g., 2-10 seconds long) for adaptive streaming.
   - The worker writes the final video segments and streaming manifests to a "transcoded" bucket in Object Storage or a CDN-backed storage path, e.g.:
     - `https://cdn.provider.com/videos/11111/720p/...`.
   - The worker may also generate a thumbnail at this stage (capturing a frame at X seconds into the video).

3. **Status Update & Database Sync**
   - Once transcoding finishes successfully, the Transcoding Service calls an internal API (e.g., `PUT /videos/{video_id}/status`) on the Metadata Service.
   - The Videos metadata table record is updated:
     - `status = "live"` (video is now available for streaming).
     - `transcoded_url` fields updated with resolution-based URLs.
     - `thumbnail_url` updated.
   - If transcoding fails, the worker marks `status = "failed"`, optionally storing an error message.
   - Once the transcoded files are in object storage or an origin server, the CDN automatically caches content at edge locations to serve playback requests.
   - Future playback requests are served from CDN edge nodes, reducing origin bandwidth usage and improving streaming performance.

## How Video Transcoding Works

When a video is uploaded, it undergoes post-processing to convert it into a streamable format. This process is often executed in steps using a pipeline to produce the final output.

### Step 1: Uploading & Storing the Raw Video

- A user uploads a raw video file (e.g., MP4, MOV, AVI).
- The raw file is stored in Object Storage (e.g., AWS S3) directly from the user's device.
- Metadata is recorded in the Videos Metadata Table, including:
  - `video_id`
  - `duration`
  - `status = "processing"`

### Step 2: Job Dispatching via Message Queue

- Once the raw file is uploaded, the Upload Service sends a message to a Message Queue (e.g., Kafka).
- The Transcoding Service workers poll messages from the queue and process jobs asynchronously.
- Example Message Sent to Queue:
  ```json
  {
    "video_id": 456,
    "raw_file_url": "s3://video-uploads/12345.mp4",
    "target_resolutions": ["240p", "480p", "720p", "1080p"],
    "target_formats": ["HLS", "DASH"]
  }
  ```
- The target formats are HLS (HTTP Live Streaming) and DASH (Dynamic Adaptive Streaming over HTTP), the two most widely used adaptive streaming protocols.

### Step 3: Decoding the Raw Video

- The raw video file is split into smaller segments (e.g., 10-second chunks) using a tool like FFmpeg.
- Each segment is transcoded separately into multiple formats.
- Segments can be transcoded parallelly using multiple FFmpeg instances on worker nodes.

### Step 4: Encoding into Multiple Resolutions

- Each video is encoded into multiple bitrates/resolutions (e.g., 240p, 360p, 480p, 720p, 1080p).
- A "master" manifest references these resolutions, letting the player decide which one to fetch.

### Step 5: Generating Video Segments for Streaming

- Each resolution is split into short segments (2-10 seconds) for HLS and DASH adaptive streaming.
- **Why Segment-Based?**
  - Short segments allow quick adaptation. If the network changes mid-video, the next segment can be requested at a different bitrate/resolution with minimal playback disruption.

### Step 6: Generating Thumbnails

- A thumbnail image is created as a preview.
- The user can later update the thumbnail manually.

### Step 7: Storing Transcoded Files in Object Storage

- The transcoded videos, thumbnails, and manifest files are stored in Object Storage (e.g., AWS S3).
- Example storage structure:
  ```
  s3://video-platform/videos/12345/240p.m3u8
  s3://video-platform/videos/12345/480p.m3u8
  s3://video-platform/videos/12345/thumbnail.jpg
  ```

### Step 8: Updating the Database & CDN

- The Video Metadata Table is updated with:
  - `Transcoded URLs` for different resolutions
  - `Thumbnail URL`
  - `status = "live"` (video is ready to stream).
- The CDN caches video segments for low-latency streaming and fast access

## Video Streaming

The Video Streaming Component is responsible for orchestrating video playback and adaptive streaming.

Rather than pushing large media files through a single backend endpoint, modern platforms provide manifests describing how to fetch the media segments.

Clients then download video segments directly from the CDN, which offloads huge bandwidth demands from your core application servers.

Below is the typical workflow to support smooth video streaming:

1. **User Initiates Playback**

   - The user clicks on a video thumbnail or opens a video page on a web browser, mobile app, or smart TV app.

2. **Fetching Video Metadata**

   - The client app sends a request to the Video Metadata Service via the API Gateway or Load Balancer to retrieve:
     - Video metadata (title, description, thumbnail, channel info).
     - A streaming manifest URL (e.g., HLS `.m3u8` or DASH `.mpd` file), which guides the player in fetching and playing the video.

3. **Downloading the Manifest File**

   - The client makes an HTTP GET request to the CDN to download the manifest file.
   - This manifest file contains links to video segments in multiple resolutions and bitrates (generated in the video transcoding process), allowing adaptive streaming based on the user's internet speed.

4. **Retrieving Video Segments & Adaptive Bitrate**

   - The video player chooses an initial bitrate (often mid or low) and downloads the first segment from the CDN.
   - It continuously monitors download speed and buffer level. If downloads arrive quickly, it may switch to higher quality; if the connection slows, it drops to lower quality.

5. **Continuous Playback**

   - The player sequentially requests segments: `segment_01.ts`, `segment_02.ts`, etc., or corresponding `.m4s` fragments for DASH.
   - It buffers data, rendering frames to the user in a near real-time fashion.

6. **End of Playback / Seeking**
   - When playback concludes or the user seeks (e.g., moves the timeline forward), the player calculates which segments to request next and continues the same segment download process.

## Video Search

A video platform's Search Engine enables users to quickly find videos by keywords in titles, descriptions, tags, or even transcribed captions.

This requires:

1. **Indexing**: Transforming raw metadata into a data structure optimized for text retrieval (e.g., inverted indexes).

2. **Query Parsing**: Understanding user queries, possibly with keyword-based or NLP-based improvements.

3. **Ranking/Scoring**: Determining how relevant each video is to the user's query, often incorporating signals like view count, recency, or user preferences.

### Architecture and Components:

- Whenever a video is uploaded or updated, the system pushes the new/updated metadata to a search indexing service (e.g., Elasticsearch, Solr, or a custom system).
- This process might be asynchronous—meaning a short delay between upload and availability in search results.
- **Inverted Index**: Each word maps to a list of video IDs where it appears, enabling fast lookups.
- The Search Service queries the inverted index with relevant filters (e.g., language, upload date).
- A scoring/ranking algorithm sorts results by relevance, which might incorporate additional signals like popularity or watch time.
- If the user is logged in, search could factor in watch history, subscriptions, or topic preferences.
