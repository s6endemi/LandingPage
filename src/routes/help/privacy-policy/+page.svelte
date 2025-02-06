<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="mx-auto max-w-3xl text-sm">
  <h1
    class="mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent"
  >
    Privacy Policy
  </h1>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">1. Introduction</h2>
    <p class="mb-4 text-gray-300">
      This Privacy Policy explains how we collect, use, and protect your personal information when you use our
      AI-powered fitness platform. By using our service, you agree to the collection and use of information in
      accordance with this policy.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">2. Data We Collect</h2>

    <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-200">2.1 Account Information</h3>
    <p class="mb-4 text-gray-300">
      When you create an account, we collect necessary information to provide our services, including age, fitness
      level, and training preferences.
    </p>

    <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-200">2.2 Training Data</h3>
    <p class="mb-4 text-gray-300">
      We collect data about your workouts, progress, and performance to provide personalized training recommendations.
    </p>

    <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-200">2.3 Technical Information</h3>
    <p class="mb-4 text-gray-300">
      We automatically collect certain technical information when you visit our platform, including:
    </p>
    <ul class="mb-4 list-inside list-disc space-y-2 text-gray-300">
      <li>Browser type and version</li>
      <li>Operating system</li>
      <li>Access timestamps</li>
      <li>Usage statistics</li>
    </ul>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">3. How We Use Your Data</h2>

    <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-200">3.1 Service Provision</h3>
    <p class="mb-4 text-gray-300">We use your data to:</p>
    <ul class="mb-4 list-inside list-disc space-y-2 text-gray-300">
      <li>Create and maintain your account</li>
      <li>Provide personalized training plans</li>
      <li>Track your progress</li>
      <li>Improve our AI training algorithms</li>
    </ul>

    <h3 class="mb-2 mt-4 text-lg font-semibold text-gray-200">3.2 Service Improvement</h3>
    <p class="mb-4 text-gray-300">
      We analyze usage patterns and performance data to improve our services and develop new features.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">4. Data Protection</h2>
    <p class="mb-4 text-gray-300">
      We implement appropriate security measures to protect your personal information against unauthorized access,
      alteration, disclosure, or destruction.
    </p>
    <ul class="mb-4 list-inside list-disc space-y-2 text-gray-300">
      <li>Encryption of data in transit and at rest</li>
      <li>Regular security assessments</li>
      <li>Access control measures</li>
      <li>Secure data storage practices</li>
    </ul>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">5. Your Rights</h2>
    <p class="mb-4 text-gray-300">
      Under applicable data protection laws, you have rights regarding your personal data:
    </p>
    <ul class="mb-4 list-inside list-disc space-y-2 text-gray-300">
      <li>Access your personal data</li>
      <li>Correct inaccurate information</li>
      <li>Request data deletion</li>
      <li>Restrict data processing</li>
      <li>Data portability</li>
      <li>Withdraw consent</li>
    </ul>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">6. Cookies</h2>
    <p class="mb-4 text-gray-300">
      We use cookies and similar tracking technologies to maintain your session and store your preferences. You can
      control cookie settings through your browser preferences.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">7. Updates to Privacy Policy</h2>
    <p class="mb-4 text-gray-300">
      We may update this Privacy Policy periodically. Continued use of our service after changes constitutes acceptance
      of the updated policy.
    </p>
  </section>

  <div class="mt-8 text-xs text-gray-400">
    Last updated: {new Date().toLocaleDateString()}
  </div>
</div>

<style>
  section {
    position: relative;
  }

  section::before {
    content: "";
    position: absolute;
    left: -1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  }
</style>
