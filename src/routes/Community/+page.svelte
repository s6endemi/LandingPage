<!-- src/routes/community/+page.svelte -->
<script lang="ts">
  import { Users, MessageSquare, GitBranch, Vote, Calendar, Globe, Rocket, Trophy } from "lucide-svelte";
  import CircuitBackground from "$lib/assets/circuit-background.svg?raw";

  const forumCategories = [
    {
      title: "Protocol Governance",
      icon: Vote,
      threads: 142,
      description: "Discuss and propose protocol improvements",
    },
    {
      title: "Developer Discussions",
      icon: GitBranch,
      threads: 89,
      description: "Technical integration support and SDK talk",
    },
    {
      title: "Market Analysis",
      icon: Globe,
      threads: 234,
      description: "Token economics and market predictions",
    },
  ];

  const activeProposals = [
    {
      id: "WIP-42",
      title: "Layer 2 Migration Plan",
      status: "Voting",
      endDate: "2024-07-15",
    },
    {
      id: "WIP-43",
      title: "DAO Treasury Allocation",
      status: "Discussion",
      endDate: "2024-07-01",
    },
  ];

  const upcomingEvents = [
    {
      title: "AMA with Core Developers",
      date: "June 25, 2024 16:00 UTC",
      type: "Live Session",
    },
    {
      title: "Governance Workshop",
      date: "July 2, 2024 14:00 UTC",
      type: "Educational",
    },
  ];

  let activeModal: "proposal" | "event" | null = null;
  let selectedItem: any = null;
  let showComingSoon = false;

  function handleInteraction(type: string, item?: any) {
    selectedItem = item;
    switch (type) {
      case "proposal":
        activeModal = "proposal";
        break;
      case "event":
        activeModal = "event";
        break;
      default:
        showComingSoon = true;
        setTimeout(() => (showComingSoon = false), 2000);
    }
  }
</script>

<div class="font-space-grotesk text-white bg-black min-h-screen">
  <!-- Background -->
  <div class="fixed inset-0 -z-10 opacity-20 mix-blend-screen">
    {@html CircuitBackground}
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-20">
    <!-- Hero Section -->
    <div class="mb-20 text-center">
      <h1 class="neon-glow mb-6 text-5xl font-light">Web3 Protocol Community</h1>
      <p class="mx-auto max-w-2xl text-xl text-gray-300">
        Join developers, investors, and enthusiasts shaping the future of decentralized finance. Participate in
        governance, collaborate on integrations, and stay ahead of protocol developments.
      </p>
    </div>

    <!-- Community Grid -->
    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Forum Categories -->
      <div class="bg-black/10 rounded-xl border border-[#0052ff]/20 p-6">
        <div class="mb-6 flex items-center gap-3">
          <Users class="h-8 w-8 text-[#00c7ff]" />
          <h2 class="text-2xl">Discussion Hub</h2>
        </div>
        <div class="space-y-4">
          {#each forumCategories as category}
            <button
              on:click={() => handleInteraction("comingSoon")}
              class="bg-black/20 group block w-full rounded-lg p-4 text-left transition-all hover:bg-[#0052ff]/10"
            >
              <div class="flex items-center gap-3">
                <svelte:component this={category.icon} class="h-6 w-6 text-[#00c7ff]" />
                <div>
                  <h3 class="text-lg">{category.title}</h3>
                  <p class="text-sm text-gray-400">{category.description}</p>
                </div>
              </div>
              <div class="mt-2 flex items-center justify-between text-sm text-gray-400">
                <span>{category.threads} active threads</span>
                <span class="group-hover:text-[#00c7ff]">View →</span>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <!-- Governance Activity -->
      <div class="bg-black/10 rounded-xl border border-[#0052ff]/20 p-6">
        <div class="mb-6 flex items-center gap-3">
          <Vote class="h-8 w-8 text-[#00c7ff]" />
          <h2 class="text-2xl">Active Governance</h2>
        </div>
        <div class="space-y-4">
          {#each activeProposals as proposal}
            <div class="bg-black/20 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-mono text-sm text-gray-400">{proposal.id}</div>
                  <h3 class="text-lg">{proposal.title}</h3>
                </div>
                <span
                  class={`rounded px-2 py-1 text-sm ${
                    proposal.status === "Voting" ? "bg-[#00c7ff]/20 text-[#00c7ff]" : "bg-[#0052ff]/20 text-[#0052ff]"
                  }`}
                >
                  {proposal.status}
                </span>
              </div>
              <div class="mt-2 flex items-center justify-between text-sm text-gray-400">
                <span>Ends: {proposal.endDate}</span>
                <button on:click={() => handleInteraction("proposal", proposal)} class="text-sm hover:text-[#00c7ff]">
                  View Details →
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Events & Updates -->
      <div class="bg-black/10 rounded-xl border border-[#0052ff]/20 p-6">
        <div class="mb-6 flex items-center gap-3">
          <Calendar class="h-8 w-8 text-[#00c7ff]" />
          <h2 class="text-2xl">Protocol Events</h2>
        </div>
        <div class="space-y-4">
          {#each upcomingEvents as event}
            <div class="bg-black/20 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg">{event.title}</h3>
                  <p class="text-sm text-gray-400">{event.date}</p>
                </div>
                <span class="text-sm text-[#00c7ff]">{event.type}</span>
              </div>
              <div class="mt-3 flex justify-end">
                <button
                  on:click={() => handleInteraction("event", event)}
                  class="rounded bg-[#0052ff]/20 px-4 py-2 text-sm transition-colors hover:bg-[#0052ff]/30"
                >
                  Show Details
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Additional Sections -->
    <div class="mt-12 grid gap-8 lg:grid-cols-2">
      <!-- Developer Hub -->
      <div class="bg-black/10 rounded-xl border border-[#0052ff]/20 p-6">
        <div class="mb-6 flex items-center gap-3">
          <GitBranch class="h-8 w-8 text-[#00c7ff]" />
          <h2 class="text-2xl">Developer Resources</h2>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          {#each [{ title: "API Documentation", icon: Rocket, text: "Full technical specifications..." }, { title: "Bug Bounty", icon: Trophy, text: "Earn rewards..." }] as resource}
            <button
              on:click={() => handleInteraction("comingSoon")}
              class="bg-black/20 group rounded-lg p-4 text-left transition-colors hover:bg-[#0052ff]/10"
            >
              <div class="flex items-center gap-2">
                <svelte:component this={resource.icon} class="h-5 w-5 text-[#00c7ff]" />
                <span class="text-lg">{resource.title}</span>
              </div>
              <p class="mt-2 text-sm text-gray-400">{resource.text}</p>
            </button>
          {/each}
        </div>
      </div>

      <!-- Social Links -->
      <div class="bg-black/10 rounded-xl border border-[#0052ff]/20 p-6">
        <div class="mb-6 flex items-center gap-3">
          <MessageSquare class="h-8 w-8 text-[#00c7ff]" />
          <h2 class="text-2xl">Community Channels</h2>
        </div>
        <div class="grid gap-4">
          <a href="#" class="bg-black/20 flex items-center gap-3 rounded-lg p-4 hover:bg-[#0052ff]/10">
            <span class="flex-1">Discord Developer Chat</span>
            <span class="text-sm text-gray-400">12,345 members</span>
          </a>
          <a href="#" class="bg-black/20 flex items-center gap-3 rounded-lg p-4 hover:bg-[#0052ff]/10">
            <span class="flex-1">Governance Forum</span>
            <span class="text-sm text-gray-400">2,345 active proposals</span>
          </a>
          <a href="#" class="bg-black/20 flex items-center gap-3 rounded-lg p-4 hover:bg-[#0052ff]/10">
            <span class="flex-1">Technical Support</span>
            <span class="text-sm text-gray-400">24/7 assistance</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal Overlays -->
{#if activeModal === "proposal"}
  <div class="bg-black/80 fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-black/90 w-full max-w-2xl rounded-xl border border-[#0052ff]/20 p-6">
      <h3 class="mb-4 text-2xl">{selectedItem.title}</h3>
      <div class="space-y-4">
        <div class="flex gap-4">
          <span class="font-mono text-[#00c7ff]">{selectedItem.id}</span>
          <span>Status: {selectedItem.status}</span>
          <span>End Date: {selectedItem.endDate}</span>
        </div>
        <p class="text-gray-400">
          {#if selectedItem.status === "Voting"}
            Participate in the ongoing governance decision...
          {:else}
            Discussion phase - share your thoughts...
          {/if}
        </p>
        <div class="mt-6 flex justify-end gap-4">
          <button
            on:click={() => (activeModal = null)}
            class="rounded border border-[#0052ff]/20 px-4 py-2 hover:bg-[#0052ff]/20"
          >
            Close
          </button>
          <button
            on:click={() => handleInteraction("comingSoon")}
            class="rounded bg-[#0052ff]/20 px-4 py-2 hover:bg-[#0052ff]/30"
          >
            {selectedItem.status === "Voting" ? "Cast Vote" : "Add Comment"}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if activeModal === "event"}
  <div class="bg-black/80 fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="bg-black/90 w-full max-w-md rounded-xl border border-[#0052ff]/20 p-6">
      <h3 class="mb-4 text-2xl">{selectedItem.title}</h3>
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Calendar class="h-5 w-5 text-[#00c7ff]" />
          <span>{selectedItem.date}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[#00c7ff]">Type:</span>
          <span>{selectedItem.type}</span>
        </div>
        <p class="text-gray-400">
          {#if selectedItem.type === "Live Session"}
            Join our core developers for an AMA session...
          {:else}
            Educational workshop about protocol governance...
          {/if}
        </p>
        <div class="mt-6 flex justify-end gap-4">
          <button
            on:click={() => (activeModal = null)}
            class="rounded border border-[#0052ff]/20 px-4 py-2 hover:bg-[#0052ff]/20"
          >
            Close
          </button>
          <button
            on:click={() => handleInteraction("comingSoon")}
            class="rounded bg-[#0052ff]/20 px-4 py-2 hover:bg-[#0052ff]/30"
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if showComingSoon}
  <div class="fixed bottom-4 right-4 z-50 rounded-lg bg-[#0052ff]/20 p-4">
    <span class="text-[#00c7ff]">Feature coming soon!</span>
  </div>
{/if}

<style>
  .neon-glow {
    text-shadow:
      0 0 10px rgba(0, 199, 255, 0.3),
      0 0 20px rgba(0, 199, 255, 0.2),
      0 0 30px rgba(0, 199, 255, 0.1);
  }
</style>
