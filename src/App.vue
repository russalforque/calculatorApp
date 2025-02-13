<template>
  <div id="app" class="bg-[#1C1C1C] w-100 p-1.5 border-2xl border-[#0000] shadow-[-3px_1px_55px_0px_rgba(255,_255,_255,_0.05)]">
      <div class="flex">
        <div class="basis-64">
          <button type="button" 
                  @click="toggleMenu" 
                  class="text-white bg-[#1c1c1c] hover:bg-[#353535] focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>

          <div class="basis-64 mb-4 text-end">
            <button type="button" 
                  @click="toggleHistory" 
                  class="text-white bg-[#1c1c1c] hover:bg-[#353535] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                  <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
        </div>
      </div>


      <!--Menu Modal-->
      <transition name="slide">
      <div v-if="showMenu" @click.self="toggleMenu" class="fixed inset-0 flex flex-col h-screen mt-[30px]">
        <div class="bg-[#353535] shadow-xl p-4 w-2/3 h-[31.7rem] rounded-r-lg">
          <button type="button" 
                  @click="toggleMenu" 
                  class="text-white bg-[#353535] hover:bg-[#2b2b2b] focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div class="flex flex-col text-center">
            <h2 class="text-[13px] text-start text-[#f7f7f7] ml-2">Converter</h2>
            <router-link to="/currency-converter">
              <button type="button" 
                  class="text-white text-start bg-[#1c1c1c] hover:bg-[#3e3e3e] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mt-3 px-5 py-2.5 w-full me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                  <i class="fa-solid fa-dollar-sign mr-4"></i>
                  Currency
            </button>
            </router-link>
          </div>
        </div>
      </div>
    </transition>

      
      <!--History Modal-->
      <Transition name="slideLeft">
        <div v-if="showHistory" @click.self="toggleHistory" class="fixed inset-0 flex bg-[transparent] mt-8">
        <div class="bg-[#353535] backdrop:blur-md p-4 rounded-b-lg shadow-xl w-full min-h-40 h-auto max-h-[35vh] overflow-y-auto">
          <div class="flex justify-between items-center">
            <h2 class="text-lg text-white font-semibold">History</h2>
          </div>
          <div class="mt-3">
            <ul v-if="history.length">
              <li v-for="(item, index) in history" :key="index" class="text-white mb-1">
                {{ item }}
              </li>
            </ul>
            <p v-else class="text-gray-400">No history available</p>
          </div>
        </div>
      </div>
      </Transition>

      <div class="">
        <input v-model="displayValue"
               type="text" 
               id="first_name" 
               class="text-end h-15 bg-[#1C1C1C] text-[#f7f7f7] text-7xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
      </div>

      <div class="grid grid-cols-4 gap-2">
        <button 
          class="text-white bg-[#353535] hover:bg-[#3d3d3d] focus:outline-none focus:ring-4 focus:ring-gray-900 font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 me-0.5 mb-1" 
          v-for="(button, index) in buttons" 
          :key="index" :class="button.class" 
          @click="button.action">
          <span v-if="typeof button.value === 'number'">{{ button.value }}</span>
          <span v-else>
             <i v-if="button.class === 'delete'" class="fa fa-backspace"></i>
             <i v-if="button.class === 'minus'" class="fa-solid fa-minus"></i>
             <i v-if="button.class === 'plus'" class="fa-solid fa-plus"></i>
             <i v-if="button.class === 'divide'" class="fa-solid fa-divide"></i>
             <i v-if="button.class === 'multiply'" class="fa-solid fa-xmark"></i>
             <i v-if="button.class === 'result'" class="fa-solid fa-equals"></i>
             <i v-if="button.class === 'squareRoot'" class="fa-solid fa-square-root-variable"></i>
            <span v-else>{{ button.value }}</span>
          </span>
        </button>
      </div>
  </div>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  data() {
    return {
      displayValue: "",
      history: [],  
      showHistory: false,
      showMenu: false,
      showCurrencyConverter: false,
      amount: null,
      toCurrency: "EUR",
      convertedAmount: null,
      exchangeRates: {
        USD: 1,   
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110.53,
        PHP: 56.25 
      },
      buttons: [
        { value: 'log', class: 'symbols', action: this.Logarithm},
        { value: 'x²', class: 'symbols', action: this.xSquared },
        { value: 'AC', class: 'symbols', action: this.clearDisplay },
        { class: 'delete', action: this.eraseLastCharacter },
        { class: 'squareRoot', action: this.squareRoot },
        { value: 'oz', class: '', action: this.poundsToOz},
        { value: 'kg', class: 'symbols', action: this.poundsToKg},
        { class: 'divide', action: () => this.appendOperator('/') },
        { value: 7, action: () => this.appendNumber(7) },
        { value: 8, action: () => this.appendNumber(8) },
        { value: 9, action: () => this.appendNumber(9) },
        { class: 'multiply', action: () => this.appendOperator('*') },
        { value: 4, action: () => this.appendNumber(4) },
        { value: 5, action: () => this.appendNumber(5) },
        { value: 6, action: () => this.appendNumber(6) },
        { class: 'minus', action: () => this.appendOperator('-') },
        { value: 1, action: () => this.appendNumber(1) },
        { value: 2, action: () => this.appendNumber(2) },
        { value: 3, action: () => this.appendNumber(3) },
        { class: 'plus', action: () => this.appendOperator('+') },
        { value: '%', class: 'symbols', action: this.percent },
        { value: 0, class: 'zero', action: () => this.appendNumber(0) },
        { value: '.', class: 'dot', action: () => this.appendOperator('.') },
        { class: 'result', action: this.calculateResult },
      ]
    };
  },

  methods: {
    toggleCurrencyConverter() {
    this.showCurrencyConverter = !this.showCurrencyConverter;
    this.showMenu = false;
    },
    convertCurrency() {
      if (this.amount && this.fromCurrency && this.toCurrency) {
        let rate = this.exchangeRates[this.toCurrency] / this.exchangeRates[this.fromCurrency];
        this.convertedAmount = (this.amount * rate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    },
    toggleMenu () {
      this.showMenu = !this.showMenu;
    },
    toggleHistory() {
      this.showHistory = !this.showHistory;
      this.showMenu = false;
    },
    appendNumber(number) {
      this.displayValue += number;
    },
    clearDisplay() {
      this.displayValue = "";
    },
    appendOperator(operator) {
      if (this.displayValue && !/[+\-/*]$/.test(this.displayValue)) {
        this.displayValue += operator;
      }
    },
    eraseLastCharacter() {
      if (this.displayValue && this.displayValue.toString().length > 0) {
        this.displayValue = this.displayValue.toString().slice(0, -1);
      }
    },
    squareRoot() {
      this.displayValue = Math.sqrt(this.displayValue);
    },
    percent() {
      this.displayValue = this.displayValue / 100;
    },
    poundsToKg() {
      this.displayValue = this.displayValue / 1000;
    },
    poundsToOz() {
      this.displayValue = this.displayValue * 16;
    },
    xSquared() {
      this.displayValue = Math.pow(this.displayValue, 2);
    },
    Logarithm() {
      this.displayValue = Math.log10(this.displayValue);
    },
    calculateResult() {
      try {
        const operation = this.displayValue;
        const result = eval(this.displayValue);
        this.displayValue = result.toString();

        if (!isNaN(result) && result > 999) {
          this.displayValue = result.toLocaleString();
        } else {
          this.displayValue = result.toString();
        }

        this.history.push(`${operation} = ${this.displayValue}`);

        if (this.history.length > 5) {
          this.history.shift();
        }
      
      } catch (e) {
        this.displayValue = "0";
      }
    },
  },
};
</script>


<style scoped>
#app {
  font-family: "Poppins", serif;
}

.minus, .plus, .divide, .multiply {
  background-color: #FF9500;
}
.minus:hover, .plus:hover, .divide:hover, .multiply:hover {
  background-color: #CC7700; /* Darker shade on hover */
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease-out, opacity 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slideLeft-enter-active, .slideLeft-leave-active {
  transition: transform 0.4s ease-out, opacity 0.3s ease-out;
}
.slideLeft-enter-from, .slideLeft-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

</style>
