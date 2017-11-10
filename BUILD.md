## Build

Don't forget to ```npm cache clean```!

### Build Linux64 / Darwin64 / Windows64(Offsite)

```
cd /xxiivv/Nataniev/public/public.projects/sources/Clock/

git pull

rm -r /xxiivv/Nataniev/public/public.projects/builds/Clock-linux-x64/ 
rm /xxiivv/Nataniev/public/public.projects/builds/clock_lin64.zip
electron-packager . Clock --platform=linux --arch=x64 --out /xxiivv/Nataniev/public/public.projects/builds --overwrite --electron-version=1.7.5 --icon=icon.ico

rm -r /xxiivv/Nataniev/public/public.projects/builds/Clock-win32-x64/ 
rm /xxiivv/Nataniev/public/public.projects/builds/clock_win64.zip
electron-packager . Clock --platform=win32 --arch=x64 --out /xxiivv/Nataniev/public/public.projects/builds --overwrite --electron-version=1.7.5 --icon=icon.ico

rm -r /xxiivv/Nataniev/public/public.projects/builds/Clock-darwin-x64/
rm /xxiivv/Nataniev/public/public.projects/builds/clock_osx64.zip
electron-packager . Clock --platform=darwin --arch=x64 --out /xxiivv/Nataniev/public/public.projects/builds --overwrite --electron-version=1.7.5 --icon=icon.icns

cd /xxiivv/Nataniev/public/public.projects/builds/

~/butler push /xxiivv/Nataniev/public/public.projects/builds/Clock-linux-x64/ hundredrabbits/clock:linux-64
~/butler push /xxiivv/Nataniev/public/public.projects/builds/Clock-win32-x64/ hundredrabbits/clock:windows-64
~/butler push /xxiivv/Nataniev/public/public.projects/builds/Clock-darwin-x64/ hundredrabbits/clock:osx-64

rm -r /xxiivv/Nataniev/public/public.projects/builds/Clock-darwin-x64/
rm -r /xxiivv/Nataniev/public/public.projects/builds/Clock-linux-x64/
rm -r /xxiivv/Nataniev/public/public.projects/builds/Clock-win32-x64/

~/butler status hundredrabbits/clock
```

### Build Linux64 / Darwin64 / Windows64(Local)
```
cd /Users/VillaMoirai/Desktop/
rm -r /Users/VillaMoirai/Desktop/Clock-darwin-x64/ 
rm -r /Users/VillaMoirai/Desktop/Clock-linux-x64/ 
rm -r /Users/VillaMoirai/Desktop/Clock-win32-x64/ 

cd /Users/VillaMoirai/Github/HundredRabbits/Clock/
electron-packager . Clock --platform=darwin --arch=x64 --out /Users/VillaMoirai/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.icns

cd /Users/VillaMoirai/Github/HundredRabbits/Clock/
electron-packager . Clock --platform=linux --arch=x64 --out /Users/VillaMoirai/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.ico

cd /Users/VillaMoirai/Github/HundredRabbits/Clock/
electron-packager . Clock --platform=win32 --arch=x64 --out /Users/VillaMoirai/Desktop/ --overwrite --electron-version=1.7.5 --icon=icon.ico
```
