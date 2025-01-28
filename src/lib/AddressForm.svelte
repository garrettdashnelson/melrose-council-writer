<script>
  import { geocodedLocation } from './state.svelte';

  let inputAddress = $state('');
  const cityStateZip = 'Melrose, MA 02176';

  import { geocodeAddress } from './helpers';

  async function handleSubmit(event) {
    event.preventDefault();
    const address = await geocodeAddress(inputAddress).catch(error => {
      geocodedLocation.status = 'notfound';
    });
    if(address.geometry) {
      geocodedLocation.result = address.geometry.coordinates;
      geocodedLocation.status = 'success';
      geocodedLocation.inputAddress = inputAddress;
    } else {
      geocodedLocation.status = 'notfound';
    }
  }
</script>

<form class="max-w-md mx-auto p-4 space-y-4">
  <fieldset class="border border-gray-200 rounded-lg p-4">
    <legend class="text-sm font-medium text-gray-700 px-2">Enter your address</legend>
    
    <div class="space-y-4">
      <div class="space-y-2">
        <label 
          for="street-address" 
          class="block text-sm font-medium text-gray-700"
        >
          Street Address
        </label>
        <input
          id="street-address"
          type="text"
          bind:value={inputAddress}
          placeholder="Enter street address"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div class="space-y-2">
        <input
          id="city-state-zip"
          type="text"
          value={cityStateZip}
          disabled
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
        />
      </div>
    </div>
    <button type="submit" class="mt-4 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600" onclick={handleSubmit}>Look up</button>
  </fieldset>
</form>
