<script>
  import { geocodedLocation } from './lib/state.svelte';
  import AddressForm from './lib/AddressForm.svelte';
  import WardResult from './lib/WardResult.svelte';
  import ErrorMessage from './lib/ErrorMessage.svelte';
</script>

<main>
  <AddressForm />
  {#if geocodedLocation.status === 'notfound'}
    <ErrorMessage message="I couldn't find that address!" />
  {/if}
  {#if geocodedLocation.status === 'success'}
  <WardResult />
  {/if}
</main>

<style>

</style>
