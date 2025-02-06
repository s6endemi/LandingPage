<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="mx-auto max-w-3xl text-sm">
  <h1
    class="mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent"
  >
    Terms of Service
  </h1>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">1. Scope and Application</h2>
    <p class="mb-4 text-gray-300">
      (1) These terms govern the use of our AI-powered fitness platform and services. Your use of our platform requires
      acceptance of these terms.
    </p>
    <p class="mb-4 text-gray-300">
      (2) By registering, you agree to these terms and guarantee that you will not create content that violates these
      terms.
    </p>
    <p class="mb-4 text-gray-300">
      (3) Basic platform access is free, though premium features and services may require payment.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">2. User Obligations</h2>
    <p class="mb-4 text-gray-300">
      (1) Users agree not to publish content that violates these terms, good morals, or applicable law.
    </p>
    <p class="mb-4 text-gray-300">(2) Prohibited activities include:</p>
    <ol class="mb-4 list-inside list-decimal space-y-2 text-gray-300">
      <li>Publishing false or illegal content</li>
      <li>Distributing spam or unwanted advertising</li>
      <li>Using copyrighted material without authorization</li>
      <li>Engaging in anti-competitive behavior</li>
      <li>Posting offensive, discriminatory, or inappropriate content</li>
      <li>Using the platform to promote political or religious views</li>
    </ol>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">3. Content Rights</h2>
    <p class="mb-4 text-gray-300">
      (1) By publishing content on our platform, you grant us the right to store and use this content indefinitely.
    </p>
    <p class="mb-4 text-gray-300">(2) We reserve the right to edit, remove, or modify any content on our platform.</p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">4. Limitation of Liability</h2>
    <p class="mb-4 text-gray-300">
      (1) We make no guarantees regarding the accuracy, completeness, or timeliness of content on our platform.
    </p>
    <p class="mb-4 text-gray-300">
      (2) We are only liable for damages resulting from intentional or grossly negligent breach of duty.
    </p>
    <p class="mb-4 text-gray-300">
      (3) We cannot guarantee uninterrupted platform access. Downtime for maintenance or technical issues may occur.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">5. Premium Services</h2>
    <p class="mb-4 text-gray-300">
      (1) Certain features or services may require payment. These will be clearly marked as premium features.
    </p>
    <p class="mb-4 text-gray-300">
      (2) You will be informed of any costs before accessing premium features and must explicitly confirm your
      agreement.
    </p>
    <p class="mb-4 text-gray-300">(3) All prices include applicable taxes and are final at the time of purchase.</p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">6. Intellectual Property</h2>
    <p class="mb-4 text-gray-300">
      (1) All platform content is protected by intellectual property rights unless otherwise stated.
    </p>
    <p class="mb-4 text-gray-300">
      (2) Any reproduction, distribution, or modification requires our written permission.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">7. Membership and Termination</h2>
    <p class="mb-4 text-gray-300">(1) Membership begins upon registration and acceptance of these terms.</p>
    <p class="mb-4 text-gray-300">(2) You may terminate your membership at any time without providing a reason.</p>
    <p class="mb-4 text-gray-300">
      (3) We reserve the right to terminate or suspend accounts that violate these terms.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">8. Changes to Terms</h2>
    <p class="mb-4 text-gray-300">
      We reserve the right to modify these terms at any time. Changes become effective upon posting to the platform.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">9. Dispute Resolution</h2>
    <p class="mb-4 text-gray-300">(1) We aim to resolve disputes informally when possible.</p>
    <p class="mb-4 text-gray-300">
      (2) If informal resolution is not possible, disputes will be resolved through appropriate legal channels.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="mb-4 text-xl font-semibold text-gray-100">10. Severability</h2>
    <p class="mb-4 text-gray-300">
      If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in
      full effect.
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
