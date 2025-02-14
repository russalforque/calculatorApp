<template>
    <div class="h-full">
        <div class="p-6 bg-[#1c1c1c] shadow-md rounded-lg h-[31.7rem]">
            <div class="mt-10">
                <p v-if="speed" class="mt-2 text-end text-[25px] text-[#f7f7f7]">Speed: {{ speed }} km/h</p>
                <input v-model="distance" class="border p-2 w-full mb-2 mt-10" type="number" placeholder="Distance (km)" />
                <input v-model="time" class="border p-2 w-full mb-2" type="number" placeholder="Time (hours)" />
                <button @click="calculateSpeed" class="text-white bg-[#353535] hover:bg-[#2b2b2b] focus:outline-none font-medium w-full rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Calculate Speed
                </button>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        distance: '',
        time: '',
        speed: null,
      };
    },
    methods: {
      calculateSpeed() {
        if (this.distance && this.time) {
          this.speed = this.distance / this.time;
        }
      },
    },
  };
  </script>