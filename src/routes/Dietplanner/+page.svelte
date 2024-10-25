<script lang="ts">
  import DietPlannerForm from "$lib/components/DietPlannerForm.svelte";
  export let data;
</script>

<DietPlannerForm dietaryGoals={data.dietaryGoals} restrictions={data.restrictions} mealOptions={data.mealOptions} />
