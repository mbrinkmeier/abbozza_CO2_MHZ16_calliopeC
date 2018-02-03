# abbozza_CO2_MHZ16_calliopeC

This project is a plugin for [abbozza! Calliope](http://inf-didaktik.rz.uos.de/abbozza/calliope).
It adds blocks for the MH-Z16 CO2-Sensor.

The MH-Z16 has a UART interface and can be connected to the UART port of the Calliope Mini
(A1) with pin P17 as TX and P16 as RX.

It provides an device block for the configuration of the sensor, a calibration block,
a measurment block and a block to access the last measured value in ppm.
