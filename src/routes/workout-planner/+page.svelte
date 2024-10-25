<script lang="ts">
  import WorkoutPlannerForm from "$lib/components/WorkoutPlannerForms/Form.svelte";

  export let data;
</script>

<WorkoutPlannerForm exercises={data.exercises} />
