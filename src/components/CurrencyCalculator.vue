<template>
    <div class="flex flex-col items-center justify-center h-[31.7rem] text-white bg-[#1c1c1c]">
        <h2 class="text-lg font-semibold mb-3">Currency Converter</h2>
  
        <div class="mb-3">
          <label class="block text-sm">Amount:</label>
          <input
            type="number"
            v-model="amount"
            placeholder="Enter amount"
            class="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm">From:</label>
            <select v-model="fromCurrency" class="w-full p-2 rounded-md bg-gray-700 border border-gray-600">
              <option v-for="(rate, currency) in exchangeRates" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>
  
          <div>
            <label class="block text-sm">To:</label>
            <select v-model="toCurrency" class="w-full p-2 rounded-md bg-gray-700 border border-gray-600">
              <option v-for="(rate, currency) in exchangeRates" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>
      </div>
  
      <div class="mt-4 p-3 bg-gray-700 rounded-md text-center">
        <p class="text-sm">Converted Amount:</p>
        <p class="text-xl font-semibold">{{ convertedAmount }} {{ toCurrency }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        amount: 1,
        fromCurrency: "USD",
        toCurrency: "EUR",
        exchangeRates: {},
      };
    },
    computed: {
      convertedAmount() {
        if (!this.exchangeRates[this.fromCurrency] || !this.exchangeRates[this.toCurrency]) return 0;
        return (
          (this.amount * (this.exchangeRates[this.toCurrency] / this.exchangeRates[this.fromCurrency])).toFixed(2)
        );
      },
    },
    methods: {
      async fetchExchangeRates() {
        try {
          const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD"); 
          const data = await response.json();
          this.exchangeRates = data.rates;
        } catch (error) {
          console.error("Error fetching exchange rates:", error);
        }
      },
      goBack() {
        this.$router.push("/app");
      },
    },
    mounted() {
      this.fetchExchangeRates();
    },
  };
  </script>

  