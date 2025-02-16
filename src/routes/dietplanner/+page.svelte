<!-- src/routes/roadmap/+page.svelte -->
<script lang="ts">
  import { fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { Check, Zap, Globe, Cpu, Users, GitBranch, Shield } from "lucide-svelte";
  import CircuitBackground from "$lib/assets/circuit-background.svg?raw";

  type Milestone = {
    title: string;
    date: string;
    status: "completed" | "current" | "upcoming";
    description: string;
    icon: any;
  };

  const milestones: Milestone[] = [
    {
      title: "Testnet Launch",
      date: "Q1 2025",
      status: "completed",
      description: "Initial protocol deployment with basic swap functionality and AI prediction models",
      icon: GitBranch,
    },
    {
      title: "Mainnet Launch",
      date: "Q2 2025",
      status: "current",
      description: "Full protocol deployment with cross-chain capabilities and advanced risk management",
      icon: Zap,
    },
    {
      title: "Strategic Partnerships",
      date: "Q3 2025",
      status: "upcoming",
      description: "Integration with major DeFi platforms and liquidity providers",
      icon: Users,
    },
    {
      title: "Mobile Suite Release",
      date: "Q4 2025",
      status: "upcoming",
      description: "Native iOS/Android apps with biometric security and portfolio management",
      icon: Cpu,
    },
    {
      title: "DAO Governance",
      date: "Q1 2026",
      status: "upcoming",
      description: "Full decentralization through community-controlled governance",
      icon: Globe,
    },
    {
      title: "Global Expansion",
      date: "Q2 2026",
      status: "upcoming",
      description: "Localized services in 50+ countries with multi-language support",
      icon: Shield,
    },
  ];

  let visibleMilestones: boolean[] = Array(milestones.length).fill(false);
</script>

<svelte:head>
  <title>Development Roadmap</title>
</svelte:head>

<div class="font-space-grotesk text-white bg-black min-h-screen">
  <!-- Background -->
  <div class="fixed inset-0 -z-10 opacity-20 mix-blend-screen">
    {@html CircuitBackground}
  </div>

  <!-- Hero Section -->
  <section class="relative px-6 pb-20 pt-32 text-center">
    <div class="mx-auto max-w-4xl">
      <h1
        class="neon-glow mb-6 bg-gradient-to-r from-[#0052ff] via-[#00c7ff] to-[#73e4ff] bg-clip-text text-6xl font-light text-transparent"
      >
        Protocol Roadmap
      </h1>
      <p class="mb-12 text-xl font-light text-gray-300">
        Strategic development phases building the future of decentralized intelligence
      </p>
    </div>
  </section>

  <!-- Timeline -->
  <div class="container relative mx-auto px-6">
    <!-- Progress Line -->
    <div class="absolute left-1/2 h-full w-1 bg-gradient-to-b from-[#0052ff] to-transparent opacity-20"></div>

    {#each milestones as milestone, i}
      <div
        class="group relative py-12"
        in:fly={{ y: i % 2 === 0 ? 50 : -50, duration: 800, easing: quintOut }}
        out:slide
      >
        <!-- Timeline Point -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div class="relative">
            <div
              class={`absolute inset-0 animate-ping rounded-full bg-[#0052ff] ${milestone.status === "current" ? "opacity-40" : "opacity-0"}`}
            ></div>
            <div
              class={`h-4 w-4 rounded-full ${
                {
                  completed: "bg-[#00c7ff]",
                  current: "bg-[#0052ff]",
                  upcoming: "bg-gray-600",
                }[milestone.status]
              }`}
            ></div>
            {#if milestone.status === "completed"}
              <Check class="bg-black absolute -right-1 -top-1 h-5 w-5 rounded-full p-1 text-[#00c7ff]" />
            {/if}
          </div>
        </div>

        <!-- Card -->
        <div class={`max-w-2xl ${i % 2 === 0 ? "mr-auto pr-16" : "ml-auto pl-16"} relative`}>
          <div
            class={`rounded-xl border p-8 backdrop-blur-lg transition-all duration-300 ${
              milestone.status === "current"
                ? "border-[#0052ff]/30 bg-[#0052ff]/10 hover:bg-[#0052ff]/15"
                : "bg-black/20 hover:bg-black/30 border-[#0052ff]/10"
            }`}
          >
            <div class="flex items-start gap-6">
              <div
                class={`rounded-lg p-3 ${
                  {
                    completed: "bg-[#00c7ff]/10",
                    current: "bg-[#0052ff]/20",
                    upcoming: "bg-gray-800/30",
                  }[milestone.status]
                }`}
              >
                <svelte:component
                  this={milestone.icon}
                  class={`h-8 w-8 ${
                    milestone.status === "completed"
                      ? "text-[#00c7ff]"
                      : milestone.status === "current"
                        ? "text-[#0052ff]"
                        : "text-gray-500"
                  }`}
                />
              </div>
              <div class="flex-1">
                <div class="mb-2 flex items-center gap-4">
                  <h3 class="text-2xl font-light">{milestone.title}</h3>
                  <span
                    class={`rounded px-2 py-1 text-sm ${
                      milestone.status === "completed"
                        ? "bg-[#00c7ff]/10 text-[#00c7ff]"
                        : milestone.status === "current"
                          ? "bg-[#0052ff]/20 text-[#0052ff]"
                          : "bg-gray-800/30 text-gray-500"
                    }`}
                  >
                    {milestone.date}
                  </span>
                </div>
                <p class="font-light leading-relaxed text-gray-400">
                  {milestone.description}
                </p>
                {#if milestone.status === "current"}
                  <div class="mt-4 border-t border-[#0052ff]/20 pt-4">
                    <div class="flex items-center gap-2 text-sm text-[#00c7ff]">
                      <div class="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                        <div
                          class="h-full bg-gradient-to-r from-[#0052ff] to-[#00c7ff] transition-all duration-1000"
                          style="width: 65%"
                        ></div>
                      </div>
                      <span>65% Complete</span>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Connector Line -->
          {#if i < milestones.length - 1}
            <div class={`absolute top-full -translate-y-6 ${i % 2 === 0 ? "right-0" : "left-0"}`}>
              <svg class="h-12 w-12 text-[#0052ff]/30">
                <path
                  d={i % 2 === 0 ? "M0 0 L40 40" : "M40 0 L0 40"}
                  stroke="currentColor"
                  stroke-width="1"
                  fill="none"
                />
              </svg>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <!-- Current Focus Section -->
  <section class="px-6 py-20">
    <div class="mx-auto max-w-4xl text-center">
      <div class="mb-8 inline-block rounded-full border border-[#0052ff]/20 bg-[#0052ff]/10 px-8 py-4">
        <span class="text-[#00c7ff]">Current Focus</span>
      </div>
      <h2 class="mb-6 text-4xl font-light">Mainnet Optimization</h2>
      <p class="mx-auto max-w-3xl text-xl font-light leading-relaxed text-gray-300">
        Enhancing protocol scalability and security while integrating with major decentralized exchanges. Our current
        efforts focus on achieving 100k TPS throughput with sub-second finality.
      </p>
    </div>
  </section>
</div>

<style>
  .neon-glow {
    text-shadow:
      0 0 10px rgba(0, 199, 255, 0.3),
      0 0 20px rgba(0, 199, 255, 0.2),
      0 0 30px rgba(0, 199, 255, 0.1);
  }

  .timeline-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 82, 255, 0.1);
  }

  path {
    transition: stroke-opacity 0.3s ease;
  }
</style>
