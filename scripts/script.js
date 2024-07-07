"use strict";

const inputEl = document.getElementById("amount");
const selectFrom = document.getElementById("selectFrom");
const selectTo = document.getElementById("selectTo");
const swapBtn = document.getElementById("swapBtn");
const output = document.getElementById("output");
const rateEl = document.getElementById("rateEl");

//global variable
const url = `https://v6.exchangerate-api.com/v6/7fca41dfd7e94e2db32bdcdd/latest/`;

const init = () => {
  output.classList.remove("flex");
  showProperty(selectFrom);
  showProperty(selectTo);
};

// fetch(url + "USD")
//   .then((res) => res.json())
//   .then((data) => {
//     const objProp = Object.keys(data.conversion_rates);
//     showProperty(objProp, selectFrom);
//     showProperty(objProp, selectTo);
//   });

const showProperty = async (selectEl) => {
  const request = await fetch(url + "USD");
  const data = await request.json();
  const prop = await Object.keys(data.conversion_rates);
  prop.forEach((val) => {
    const optionEl = document.createElement("option");
    optionEl.value = val;
    optionEl.innerText = val;
    selectEl.appendChild(optionEl);
  });
};

const calculate = async () => {
  const inputValue = inputEl.value;
  const selectOne = selectFrom.value;
  const selectTwo = selectTo.value;

  if (inputValue.trim()) {
    const response = await fetch(url + `${selectOne}`);
    const data = await response.json();
    const rate = data.conversion_rates[`${selectTwo}`];
    rateEl.innerText = `${selectOne} = ${rate.toFixed(2)}  ${selectTwo}`;
    output.classList.add("flex");
    output.innerText = (inputValue * rate).toFixed(2);
  } else {
    alert("Input Field Is Mandatory");
  }
};

const swapButton = () => {
  const dummy = selectFrom.value;
  selectFrom.value = selectTo.value;
  selectTo.value = dummy;
  calculate();
};

inputEl.addEventListener("input", calculate);
selectFrom.addEventListener("change", calculate);
selectTo.addEventListener("change", calculate);
swapBtn.addEventListener("click", swapButton);

// initial setting
init();
