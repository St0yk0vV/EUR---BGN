const RATE = 1.95583; // 1 EUR = 1.95583 BGN

const directionEl = document.getElementById("direction");
const amountEl    = document.getElementById("amount");
const resultEl    = document.getElementById("result");
const convertBtn  = document.getElementById("convertBtn");
const swapBtn     = document.getElementById("swapBtn");
const clearBtn    = document.getElementById("clearBtn");

function formatBGN(v){ return `${Number(v).toFixed(2)} лв`; }
function formatEUR(v){ return `${Number(v).toFixed(2)} €`;  }

function showMessage(text, bg = "", color = "") {
  resultEl.textContent = text;
  // Леко визуално разграничаване без CSS файл – чрез inline стилове:
  resultEl.style.background = bg;
  resultEl.style.color = color || "";
  resultEl.style.padding = "8px";
  resultEl.style.borderRadius = "6px";
}

function convert(){
  const dir = directionEl.value;
  const val = parseFloat(amountEl.value);
  if (isNaN(val) || val < 0){
    showMessage("❌ Моля, въведи валидна положителна сума.", "#ffebee", "#b00020");
    return;
  }

  let out, text;
  if (dir === "bgn2eur"){
    out = val / RATE;
    text = `${formatBGN(val)} = ${formatEUR(out)}`;
  } else {
    out = val * RATE;
    text = `${formatEUR(val)} = ${formatBGN(out)}`;
  }
  showMessage(`✅ ${text}`, "#e8f5e9", "green");
}

function swapDirection(){
  directionEl.value = directionEl.value === "bgn2eur" ? "eur2bgn" : "bgn2eur";
  showMessage('Посоката е сменена. Въведи сума и натисни „Изчисли“.', "#e3f2fd");
  amountEl.focus();
}

function clearAll(){
  amountEl.value = "";
  showMessage("Резултатът ще се появи тук.");
  amountEl.focus();
}

convertBtn.addEventListener("click", convert);
swapBtn.addEventListener("click", swapDirection);
clearBtn.addEventListener("click", clearAll);

// Enter за изчисление
amountEl.addEventListener("keydown", (e)=>{ if(e.key === "Enter") convert(); });
