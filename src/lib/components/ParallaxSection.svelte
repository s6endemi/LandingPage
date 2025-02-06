<script lang="ts">
  import { onMount } from "svelte";

  let section: HTMLElement;
  let y = 0;

  onMount(() => {
    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;

      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        y = rate;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  export let class_name = "";
</script>

<section bind:this={section} class="relative {class_name}" style="transform: translateY({y}px)">
  <slot />
</section>

<style>
  section {
    will-change: transform;
  }
</style>
