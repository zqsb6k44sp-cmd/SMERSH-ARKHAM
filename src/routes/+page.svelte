<script>
  export let current;
</script>

<svelte:head>
  <title>SMERSH-ARKHAM Dashboard</title>
</svelte:head>

<div class="container">
  <!-- Other panels here -->

  <div class="panel deep-sea-fishing-traffic">
    <h2>Deep Sea Fishing Traffic</h2>
    <!-- Content for Deep Sea Fishing Traffic Panel -->
  </div>

  <div class="panel global-fishing-watch">
    <h2>Global Fishing Watch</h2>
    <!-- Content for Global Fishing Watch Panel -->
  </div>

  <div class="panel custom-monitors">
    <h2>Custom Monitors</h2>
    <!-- Content for Custom Monitors Section -->
  </div>

  <div class="panel bloomberg-business-news-live">
    <h2>Bloomberg Business News Live</h2>
    <div class="youtube-container">
      <iframe 
        src="https://www.youtube.com/embed/iEpJwprxDdk" 
        width="1547" 
        height="869" 
        title="Bloomberg Business News Live" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
      </iframe>
    </div>
  </div>

  <!-- Other panels continue here -->

  <style>
    .youtube-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 ratio */
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }
    .youtube-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
</div>
