<!-- src/routes/docs/+page.svelte -->
<script lang="ts">
  import {
    Code,
    Cpu,
    Shield,
    Network,
    BookOpen,
    Terminal,
    GitBranch,
    Users,
    Clock,
    Wallet,
    Link,
    Vote,
    FileCode,
    Check,
  } from "lucide-svelte";
  import CircuitBackground from "$lib/assets/circuit-background.svg?raw";
  import { fly } from "svelte/transition";

  // Erweiterte Datenstruktur
  const docsSections = {
    introduction: {
      title: "Protocol Overview",
      icon: BookOpen,
      content: [
        "Decentralized AI-powered financial infrastructure",
        "ERC-20 compliant token standard",
        "Cross-chain interoperability",
      ],
    },
    tokenomics: {
      title: "Token Details",
      icon: Code,
      stats: {
        totalSupply: "1,000,000,000",
        contract: "0x8920...c43e7",
        chain: "Solana Mainnet",
      },
      distribution: [
        { label: "Liquidity Pool", value: 35 },
        { label: "Team", value: 20 },
        { label: "Ecosystem", value: 25 },
        { label: "Staking", value: 20 },
      ],
    },
    security: {
      title: "Security",
      icon: Shield,
      audits: [
        { name: "CertiK Audit", date: "2024-03-15" },
        { name: "PeckShield Review", date: "2024-02-28" },
      ],
    },
    governance: {
      title: "Governance",
      icon: Vote,
      proposals: [
        {
          id: "GIP-001",
          title: "Fee Structure Update",
          status: "Implemented",
          date: "2024-04-01",
        },
        {
          id: "GIP-002",
          title: "DAO Treasury Allocation",
          status: "Voting",
          date: "2024-05-15",
        },
      ],
    },
    integration: {
      title: "Integration",
      icon: FileCode,
      guides: ["Wallet Integration", "Staking API Implementation", "Cross-Chain Transactions"],
    },
    contracts: {
      title: "Smart Contracts",
      icon: Terminal,
      coreContracts: [
        {
          name: "Web3Token.sol",
          address: "0x8920...a3b2",
          description: "Main ERC-20 Token Contract",
        },
        {
          name: "StakingVault.sol",
          address: "0x69de...bf7f",
          description: "Staking Reward Distribution",
        },
      ],
    },
  };

  let activeSection: keyof typeof docsSections = "introduction";
  let copiedAddress: string | null = null;

  // Integration Code as String
  const integrationCode = `import { createClient } from '@web3protocol/sdk';

const client = createClient({
  network: 'mainnet',
  apiKey: 'DEIN_API_KEY' // Hier deinen echten API Key einsetzen
});`.trim();
</script>

<svelte:head>
  <title>Technical Documentation</title>
</svelte:head>

<div class="font-space-grotesk text-white bg-black min-h-screen">
  <!-- Background -->
  <div class="fixed inset-0 -z-10 opacity-20 mix-blend-screen">
    {@html CircuitBackground}
  </div>

  <!-- Main Container -->
  <div class="container mx-auto gap-12 p-6 lg:flex">
    <!-- Navigation -->
    <nav class="mb-8 lg:mb-0 lg:w-64">
      <div class="sticky top-6 space-y-4">
        {#each Object.entries(docsSections) as [key, section]}
          <button
            class={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition-colors ${
              activeSection === key ? "bg-[#0052ff]/20 text-[#00c7ff]" : "text-gray-300 hover:bg-[#0052ff]/10"
            }`}
            on:click={() => (activeSection = key as keyof typeof docsSections)}
          >
            <svelte:component this={section.icon} class="h-5 w-5"></svelte:component>
            <span>{section.title}</span>
          </button>
        {/each}
      </div>
    </nav>

    <!-- Content Area -->
    <main class="max-w-3xl flex-1">
      <!-- Introduction Section -->
      {#if activeSection === "introduction"}
        <section in:fly={{ duration: 800 }}>
          <h2 class="neon-glow mb-8 text-4xl font-light">Protocol Architecture</h2>
          <div class="space-y-6 text-gray-300">
            <div class="grid gap-6 md:grid-cols-2">
              {#each docsSections.introduction.content as item}
                <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
                  <div class="mb-3 flex items-center gap-3">
                    <div class="h-2 w-2 rounded-full bg-[#00c7ff]"></div>
                    <h3 class="text-lg">{item}</h3>
                  </div>
                  <p class="text-sm text-gray-400">
                    {#if item.includes("AI-powered")}
                      Real-time market predictions using ML models
                    {:else if item.includes("ERC-20")}
                      Fully compliant with Ethereum standards
                    {:else}
                      Native bridge support for 5+ chains
                    {/if}
                  </p>
                </div>
              {/each}
            </div>
          </div>
        </section>
      {/if}

      <!-- Tokenomics Section -->
      {#if activeSection === "tokenomics"}
        <section in:fly={{ duration: 800 }}>
          <h2 class="neon-glow mb-8 text-4xl font-light">Token Economics</h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-4 text-xl text-[#00c7ff]">Key Metrics</h3>
              <dl class="space-y-4">
                <div>
                  <dt class="text-sm text-gray-400">Total Supply</dt>
                  <dd class="font-mono">{docsSections.tokenomics.stats.totalSupply}</dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-400">Contract Address</dt>
                  <dd class="break-all font-mono text-sm">
                    {docsSections.tokenomics.stats.contract}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm text-gray-400">Chain</dt>
                  <dd class="font-mono text-sm">
                    {docsSections.tokenomics.stats.chain}
                  </dd>
                </div>
              </dl>
            </div>

            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-4 text-xl text-[#00c7ff]">Distribution</h3>
              <div class="space-y-4">
                {#each docsSections.tokenomics.distribution as item}
                  <div class="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span class="font-mono">{item.value}%</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </section>
      {/if}

      <!-- Security Section -->
      {#if activeSection === "security"}
        <section in:fly={{ duration: 800 }}>
          <h2 class="neon-glow mb-8 text-4xl font-light">Security Measures</h2>
          <div class="grid gap-6 md:grid-cols-2">
            {#each docsSections.security.audits as audit}
              <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
                <div class="mb-4 flex items-center gap-4">
                  <Shield class="h-8 w-8 text-[#00c7ff]"></Shield>
                  <div>
                    <h3 class="text-lg">{audit.name}</h3>
                    <p class="text-sm text-gray-400">{audit.date}</p>
                  </div>
                </div>
                <p class="text-sm text-gray-400">Full audit report available for community review</p>
              </div>
            {/each}

            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-4 text-lg text-[#00c7ff]">Bug Bounty Program</h3>
              <div class="space-y-4">
                <div>
                  <div class="text-sm text-gray-400">Critical Vulnerabilities</div>
                  <div class="text-2xl">Up to $250,000</div>
                </div>
                <div class="h-px bg-[#0052ff]/20"></div>
                <div>
                  <div class="text-sm text-gray-400">Contact:</div>
                  <div class="font-mono text-sm">security@protocol.xyz</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      {/if}

      {#if activeSection === "governance"}
        <section in:fly={{ duration: 800 }}>
          <h2 class="neon-glow mb-8 text-4xl font-light">Decentralized Governance</h2>
          <div class="space-y-6">
            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-6 text-2xl text-[#00c7ff]">Governance Process</h3>
              <div class="grid gap-6 md:grid-cols-3">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Users class="h-5 w-5 text-[#00c7ff]" />
                    <span class="font-medium">Proposal Initiation</span>
                  </div>
                  <p class="text-sm text-gray-400">Minimum 1% token ownership required to submit proposals</p>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Clock class="h-5 w-5 text-[#00c7ff]" />
                    <span class="font-medium">Voting Period</span>
                  </div>
                  <p class="text-sm text-gray-400">7-day voting window with snapshot mechanism</p>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Shield class="h-5 w-5 text-[#00c7ff]" />
                    <span class="font-medium">Implementation</span>
                  </div>
                  <p class="text-sm text-gray-400">Timelock-controlled execution after successful vote</p>
                </div>
              </div>
            </div>

            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-4 text-xl text-[#00c7ff]">Active Proposals</h3>
              <div class="space-y-4">
                {#each docsSections.governance.proposals as proposal}
                  <div class="bg-black/20 flex items-center justify-between rounded-lg p-4">
                    <div>
                      <div class="font-mono text-sm text-gray-400">{proposal.id}</div>
                      <div class="font-medium">{proposal.title}</div>
                    </div>
                    <div class="flex items-center gap-4">
                      <span
                        class={`rounded px-2 py-1 text-sm ${
                          proposal.status === "Implemented"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-[#0052ff]/20 text-[#00c7ff]"
                        }`}
                      >
                        {proposal.status}
                      </span>
                      <span class="text-sm text-gray-400">{proposal.date}</span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </section>
      {/if}

      {#if activeSection === "contracts"}
        <section in:fly={{ duration: 800 }}>
          <h2 class="neon-glow mb-8 text-4xl font-light">Core Contracts</h2>
          <div class="space-y-6">
            {#each docsSections.contracts.coreContracts as contract}
              <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
                <div class="mb-4 flex items-center justify-between">
                  <div>
                    <h3 class="text-xl text-[#00c7ff]">{contract.name}</h3>
                    <p class="text-sm text-gray-400">{contract.description}</p>
                  </div>
                  <div class="relative">
                    <button
                      class="flex items-center gap-2 text-sm"
                      on:click={() => {
                        navigator.clipboard.writeText(contract.address);
                        copiedAddress = contract.address;
                        setTimeout(() => (copiedAddress = null), 2000);
                      }}
                    >
                      <span class="font-mono">{contract.address}</span>
                      <Link class="h-4 w-4 text-[#00c7ff]" />
                    </button>
                    {#if copiedAddress === contract.address}
                      <div class="absolute right-0 top-full mt-2 rounded bg-[#0052ff]/20 px-2 py-1 text-sm">
                        Copied!
                      </div>
                    {/if}
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-400">Verified:</span>
                    <span class="flex items-center gap-1 text-green-500">
                      <Check class="h-4 w-4" />
                      Etherscan Verified
                    </span>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="text-sm text-gray-400">Audits:</span>
                    <span class="text-[#00c7ff]">2 Completed</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/if}

      {#if activeSection === "integration"}
        <section in:fly={{ duration: 800 }}>
          <h2 class="neon-glow mb-8 text-4xl font-light">Integration Guide</h2>
          <div class="space-y-6">
            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-6 text-2xl text-[#00c7ff]">Getting Started</h3>
              <div class="prose prose-invert max-w-none">
                <h4>Prerequisites</h4>
                <ul>
                  <li>Node.js v18+</li>
                  <li>Web3.js or Ethers.js</li>
                  <li>RPC Endpoint (Mainnet or Testnet)</li>
                </ul>

                <h4>Installation</h4>
                <pre class="bg-black/20 rounded p-4">npm install @web3protocol/sdk</pre>

                <h4>Basic Usage</h4>
                <p class="mb-2 text-gray-400">
                  Um den Client zu initialisieren, benötigst du einen API Key. Diesen findest du in deinem <a
                    href="#"
                    class="text-[#00c7ff] hover:underline">Dashboard</a
                  > nach der Registrierung.
                </p>
                <pre class="bg-black/20 rounded p-4">
                  {integrationCode}
                </pre>
              </div>
            </div>

            <div class="bg-black/10 rounded-lg border border-[#0052ff]/20 p-6">
              <h3 class="mb-4 text-xl text-[#00c7ff]">API Rate Limits</h3>
              <div class="grid gap-4 md:grid-cols-3">
                <div class="bg-black/20 rounded-lg p-4">
                  <div class="text-sm text-gray-400">Free Tier</div>
                  <div class="text-2xl">100 RPM</div>
                </div>
                <div class="bg-black/20 rounded-lg p-4">
                  <div class="text-sm text-gray-400">Developer Tier</div>
                  <div class="text-2xl">1,000 RPM</div>
                </div>
                <div class="bg-black/20 rounded-lg p-4">
                  <div class="text-sm text-gray-400">Enterprise</div>
                  <div class="text-2xl">Custom</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      {/if}
    </main>
  </div>
</div>

<style>
  .neon-glow {
    text-shadow:
      0 0 10px rgba(0, 199, 255, 0.3),
      0 0 20px rgba(0, 199, 255, 0.2),
      0 0 30px rgba(0, 199, 255, 0.1);
  }

  @media (max-width: 1023px) {
    nav {
      margin-bottom: 2rem;
    }
  }

  /* Prose styles for better readability in Integration section */
  .prose :where(h4) {
    color: #00c7ff; /* Neon blue color for h4 */
    font-weight: bold;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  .prose :where(ul) {
    list-style-type: disc;
    margin-left: 1.5em;
    margin-bottom: 1em;
    color: #e0e0e0; /* Helle Schriftfarbe für die Liste */
  }

  .prose :where(li) {
    margin-bottom: 0.3em;
    color: #e0e0e0; /* Helle Schriftfarbe für die Listenelemente */
  }

  .prose :where(pre) {
    background-color: rgba(0, 82, 255, 0.05); /* Slightly brighter background for code blocks */
    border-radius: 0.375rem;
    padding: 0.75rem;
    overflow-x: auto; /* Enable horizontal scrolling for long code lines */
    tab-size: 2; /* Optional: Set tab size for code indentation */
    -moz-tab-size: 2; /* For Firefox */
  }

  .prose :where(code) {
    color: #fff; /* White color for inline code */
    background-color: rgba(0, 82, 255, 0.1); /* Background for inline code */
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
  }
</style>
