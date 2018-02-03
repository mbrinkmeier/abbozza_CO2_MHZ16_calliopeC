/**
 * @license
 * abbozza! Calliope plugin for the MH-Z16 CO2 sensor
 * 
 * The sensor has to be connected to a serial connection with 9600 baud.
 *
 * Copyright 2015 Michael Brinkmeier ( michael.brinkmeier@uni-osnabrueck.de )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "MicroBit.h"
#include "abbozzaDevice.h"
#include "MHZ16.h"

MHZ16::MHZ16(Abbozza *abbozza, PinName tx, PinName rx) {
    this->abbozza = abbozza;
    this->tx = tx;
    this->rx = rx;
    this->abbozza->serialSetBaud(tx,rx,9600);
}

MHZ16::MHZ16(Abbozza *abbozza, int tx, int rx) {
    this->abbozza = abbozza;
    this->tx = abbozza->io.pin[tx].name;
    this->rx = abbozza->io.pin[rx].name;
    this->abbozza->serialSetBaud(tx,rx,9600);
}

void MHZ16::calibrate() {
    int idx;
    for (idx = 0; idx < 9; idx++) {
        abbozza->serialWriteByte(tx, rx, cal[idx]);
    }
    wait_ms(100);
}

void MHZ16::doMeasurement() {
    int idx;
    int bu;

    this->abbozza->serialSetBaud(tx,rx,9600);

    for (idx = 0; idx < 9; idx++) {
        abbozza->serialWriteByte(tx, rx, cmd[idx]);
    }
    wait_ms(100);

    while (abbozza->serialIsAvailable(tx, rx)) {
        do {
            bu = abbozza->serialReadByte(tx, rx);
        } while (bu != 255);
        buf[0] = bu;

        idx = 1;
        while (abbozza->serialIsAvailable(tx, rx) && (idx < 9)) {
            bu = abbozza->serialReadByte(tx, rx);
            buf[idx] = bu;
            idx++;
        }

        if (idx == 9) {
            PPM = ((int) buf[2]) *256 + ((int) buf[3]);
        }
    }
}

int MHZ16::getPPM() {
    return PPM;
}
