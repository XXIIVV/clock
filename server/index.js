'use strict'

function desamber(date = new Date)
{
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)
  const doty = Math.floor(diff/86400000)-1
  const l = Math.floor(((doty)/364) * 26)
  const y = date.getFullYear().toString().substr(2,2)
  const m = doty == 365 || doty == 366 ? "+" : String.fromCharCode(97 + l).toUpperCase()
  const d = `${(doty == 365 ? 1 : doty == 366 ? 2 : (doty % 14))+1}`.padStart(2,"0")
  return `${y}${m}${d}`;
}

function neralie()
{
  const d = new Date()
  const e = new Date(d)
  const t = (e - d.setHours(0, 0, 0, 0) / 8640) * 100
  return `${t}`.substr(0, 3) + ':' + `${t}`.substr(3, 3)
}

console.log(`${neralie()} — ${desamber()}`)