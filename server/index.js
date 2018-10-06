'use strict'

function desamber()
{
  const date = new Date
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const doty = Math.floor(diff/86400000);
  let y = date.getFullYear().toString().substr(2,2);
  let m = String.fromCharCode(97 + Math.floor(((doty-1)/364) * 26)).toUpperCase(); m = doty == 365 || doty == 366 ? "+" : m;
  let d = (doty % 14); d = d < 10 ? `0${d}` : d; d = d == "00" ? "14" : d; d = doty == 365 ? "01" : (doty == 366 ? "02" : d);
  return `${y}${m}${d}`;
}

function neralie()
{
  const d = new Date(); const e = new Date(d)
  const t = (e - d.setHours(0, 0, 0, 0) / 8640) * 100
  return `${t}`.substr(0, 3) + ':' + `${t}`.substr(3, 3)
}

console.log(`${neralie()} — ${desamber()}`)