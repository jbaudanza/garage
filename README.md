Install node:

  http://joshondesign.com/2013/10/23/noderpi

  wget http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-arm-pi.tar.gz

GPIO connections:

    RELAY                GPIO
    -----                ----
    ry-vcc               pin 2 - 5v
    vcc (either one)     pin 1 - 3.3v
    gnd (either one)     pin 6 - ground
    in1                  pin 3 - gpio00
    in2                  pin 5 - gpio01

Deploying

    grunt shipit:production deploy

