<template>
    <div class="h-full w-full">
     <div class="p-1 bg-[#1c1c1c] shadow-md h-[31.7rem]">
         <div class="mt-5">
            <input v-model="expression" type="text" id="calculator_input" class="text-end h-15 bg-[#1C1C1C] text-[#f7f7f7] text-4xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled />
            
            <div class="grid grid-cols-4 gap-2 mt-2">
            <button v-for="func in functions" :key="func" @click="appendFunction(func)" class="text-white bg-[#353535] hover:bg-[#3d3d3d] focus:outline-none focus:ring-4 focus:ring-gray-900 font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 me-0.5 mb-1">{{ func }}</button>
            <button v-for="num in numbers" :key="num" @click="append(num)" class="text-white bg-[#353535] hover:bg-[#3d3d3d] focus:outline-none focus:ring-4 focus:ring-gray-900 font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 me-0.5 mb-1" 
            >{{ num }}</button>
            <button v-for="op in operators" :key="op" @click="append(op)" class="text-white bg-[#FF9500] hover:bg-[#CC7700] focus:outline-none focus:ring-4 focus:ring-gray-900 font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 me-0.5 mb-1">{{ op }}</button>
            <button @click="clear" class="text-white bg-[#353535] hover:bg-[#3d3d3d] focus:outline-none focus:ring-4 focus:ring-gray-900 font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 me-0.5 mb-1">C</button>
            <button @click="calculate" class="text-white bg-[#353535] hover:bg-[#3d3d3d] focus:outline-none focus:ring-4 focus:ring-gray-900 font-medium rounded-lg shadow-lg text-sm px-5 py-2.5 me-0.5 mb-1">=</button>
            </div>
        </div>
     </div>
    </div>
 </template>
   
 <script>
 export default {
   data() {
     return {
       expression: '',
       numbers: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'],
       operators: ['+', '-', '*', '/', 'mod'],
       functions: ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'pow', 'exp', 'pi', 'e', '!', '|x|', 'x²', 'xʸ'],
     };
   },
   methods: {
     append(value) {
       this.expression += value;
     },
     appendFunction(func) {
       if (func === 'pi') {
         this.expression += 'Math.PI';
       } else if (func === 'e') {
         this.expression += 'Math.E';
       } else if (func === '!') {
         this.expression += 'factorial(';
       } else if (func === '|x|') {
         this.expression = `Math.abs(${this.expression})`;
       } else if (func === 'x²') {
         this.expression = `Math.pow(${this.expression}, 2)`;
       } else if (func === 'xʸ') {
         this.expression += ',';
       } else {
         this.expression += `${func}(`;
       }
     },
     clear() {
       this.expression = '';
     },
     calculate() {
       try {
         this.expression = this.evaluateExpression(this.expression);
       } catch {
         this.expression = 'Error';
       }
     },
     evaluateExpression(exp) {
       return Function(`"use strict"; return (${exp.replace(/(sin|cos|tan|log|ln|sqrt|pow|exp)/g, 'Math.$1')})`)();
     }
   },
 };
 </script>
 