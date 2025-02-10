<script>
  import { geocodedLocation } from "./state.svelte";
  import { point, multiPolygon, booleanPointInPolygon } from "@turf/turf";

  import wards from "../assets/precincts.json";
  import councilors from "../assets/councilors.json";

  const atLargeEmails = [
    { name: "Leila Migliorelli", email: "lmigliorelli@cityofmelrose.org" },
    { name: "Maya Jamaleddine", email: "mjamaleddine@cityofmelrose.org" },
    { name: "Ryan Williams", email: "rwilliams@cityofmelrose.org" },
    { name: "Ward A. Hamilton", email: "whamilton@cityofmelrose.org" },
  ];

  let ward = $derived(findWard());

  function findWard() {
    if (!geocodedLocation.result || !wards) return null;

    const thisPoint = point(geocodedLocation.result);

    for (const feature of wards.features) {
      if (
        booleanPointInPolygon(
          thisPoint,
          multiPolygon(feature.geometry.coordinates),
        )
      ) {
        return feature.properties;
      }
    }
    return null;
  }
</script>

<div class="max-w-md mx-auto p-4">
  {#if ward}
    <div class="bg-white shadow rounded-lg p-6 mb-4">
      <h2 class="text-xl font-semibold mb-4">Your Ward Information</h2>
      <p class="text-gray-700 mb-4">
        I think this address is in <strong
          >Ward {ward.WARD} (Precinct {ward.PRECINCT})</strong
        >.
      </p>
      <p class="text-gray-700 mb-4">
        The ward councilor for Ward {ward.WARD} is
        <strong
          >{councilors.find((c) => c.ward === +ward.WARD).councilor}</strong
        >. Their email is
        <a
          class="text-blue-500 hover:underline"
          href="mailto:{councilors.find((c) => c.ward === +ward.WARD).email}"
          >{councilors.find((c) => c.ward === +ward.WARD).email}</a
        >.
      </p>
      <p class="text-gray-500 text-sm italic">
        This is based on a geographic lookup of your address. It should not be
        considered a legal or official determination of your ward. For official
        information about voting and council representation, see the <a
          class="text-blue-500 hover:underline"
          target="_blank"
          href="https://www.cityofmelrose.org/elections-melrose"
          >City Elections Department</a
        >.
      </p>
    </div>
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">
        Send an email to your councilor
      </h2>

      <div id="email-message">
        <p class="text-gray-600 font-mono text-sm pb-6 border-dotted border-b">
          To: <a
            class="text-blue-500 hover:underline"
            href="mailto:{councilors.find((c) => c.ward === +ward.WARD).email}"
            >{councilors.find((c) => c.ward === +ward.WARD).email}</a
          ><br />
          cc: {#each atLargeEmails as atLarge}
            <a
              class="text-blue-500 hover:underline"
              href="mailto:{atLarge.email}">{atLarge.email}</a
            ><br>
          {/each}
        </p>
        <p class="sr-only">---</p>

        <p class="text-gray-700 my-6">
          Dear Councilor {councilors.find((c) => c.ward === +ward.WARD)
            .councilor},
        </p>
        <p class="text-gray-700">
          I live at {geocodedLocation.inputAddress} in Ward {ward.WARD}. When
          property owners do not clear the sidewalks after a snow storm, this
          creates unacceptably dangerous conditions for pedestrians. It is
          particularly true for our elderly residents, our residents with
          disabilities, and our families with small children. I strongly believe
          that it’s time for Melrose to have an effective snow-clearing
          ordinance on the books. Please pass the ordinance and make Melrose a
          safer city for pedestrians. Thank you for your consideration.
        </p>
      </div>
      <button
        onclick={() => {
          const text = document.getElementById("email-message").innerText;
          navigator.clipboard.writeText(text);
          window.alert("Copied to clipboard")
        }}
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Copy message to clipboard
      </button>
    </div>
  {:else}
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <p class="text-yellow-700">
        Unable to determine ward location. The provided coordinates may be
        outside city limits.
      </p>
    </div>
  {/if}
</div>
