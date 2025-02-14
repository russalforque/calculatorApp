<template>
  <div class="flex flex-col p-0.5 items-start justify-start h-full bg-[#1C1C1C]">
    <div class="fixed flex">
          <div class="basis-64">
            <button type="button" 
                    @click="showMenu = true" 
                    class="text-white bg-[#1c1c1c] hover:bg-[#353535] focus:outline-none font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
    
    <!-- Menu Modal -->
    <Transition name="slide">
    <div v-if="showMenu" @click.self="toggleMenu" class="fixed inset-0 flex flex-col h-screen mt-[30px]">
      <div class="bg-[#353535] shadow-xl p-1 w-2/3 h-[32.2rem] rounded-r-lg">
        <button type="button" @click="toggleMenu" class="text-white bg-[#353535] hover:bg-[#2b2b2b] focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><i class="fa-solid fa-bars"></i></button>
        <div class="p-2">
        <h2 class="text-[13px] text-start text-[#f7f7f7] ml-2">Calculator</h2>
        <button @click="setMode('StandardCalculator')" class="block w-full text-start text-white bg-[#1c1c1c] hover:bg-[#292828] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        <i class="fa-solid fa-calculator mr-3"></i>Standard</button>
        <button @click="setMode('ScientificCalculator')" class="block w-full text-start text-white bg-[#1c1c1c] hover:bg-[#292828] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        <i class="fa-solid fa-flask mr-3"></i>Advance</button>
        <h2 class="text-[13px] text-start text-[#f7f7f7] ml-2 mt-5 mb-2">Converter</h2>
        <button @click="setMode('SpeedCalculator')" class="block w-full text-start text-white bg-[#1c1c1c] hover:bg-[#292828] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        <i class="fa-solid fa-person-running mr-3"></i>Speed</button>
        <button @click="setMode('CurrencyConverter')" class="block w-full text-start text-white bg-[#1c1c1c] hover:bg-[#292828] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        <i class="fa-solid fa-dollar-sign mr-3"></i>Currency</button>
        </div>
      </div>
    </div>
    </Transition>

    <component :is="currentCalculator" />
  </div>
</template>

<script>
import StandardCalculator from './components/StandardCalculator.vue';
import ScientificCalculator from './components/ScientificCalculator.vue';
import SpeedCalculator from './components/SpeedCalculator.vue';
import CurrencyConverter from './components/CurrencyCalculator.vue';

export default {
  components: {
    StandardCalculator,
    ScientificCalculator,
    SpeedCalculator,
    CurrencyConverter,
  },
  data() {
    return {
      showMenu: false,
      currentCalculator: 'StandardCalculator',
    };
  },
  methods: {
    setMode(mode) {
      this.currentCalculator = mode;
      this.showMenu = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
};
</script>

<style>
body {
  font-family: "Poppins", serif;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease-out, opacity 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>