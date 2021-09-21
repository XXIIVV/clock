# Clock

Clock is a small widget displaying [decimal time](http://wiki.xxiivv.com/time) with automatic reminders to stand, drink and [rest your hands](https://en.wikipedia.org/wiki/Repetitive_strain_injury).

## Beats

The clock has **two groups of 3 digits**, called the `beat` and the `pulse`. For example, **Noon** is `500:000`, **6AM** is `250:000` and **6PM** is `750:000`. In the decimal format, the shortest pulse equals to **8.64 milliseconds**, the second shortest **86.4** and so on. 

`1 beat, or 1000 pulses` is equivalent to **86.4 seconds**, or about 1m44s. This app includes a [Pomodoro timer](https://en.wikipedia.org/wiki/Pomodoro_Technique) to do a singular focused work lasting `30 beats`, or **25.92 minutes**.

```
1 beat = 86.4 seconds
1 second = 1.157 beats
```

## Preview

<img src='https://raw.githubusercontent.com/hundredrabbits/Clock/master/PREVIEW.jpg'/>

## Build

Install [npm](https://docs.npmjs.com/getting-started/installing-node), download dependencies and start Clock with:

```
npm install
npm run build_osx
```

## Extras

- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
