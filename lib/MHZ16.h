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

#ifndef _MHZ16_H
#define _MHZ16_h

#include "MicroBit.h"
#include "abbozzaDevice.h"

class MHZ16 {
   private:
      Abbozza *abbozza;
      int PPM;
      char cmd[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};
      char cal[9] = {0xFF,0x01,0x87,0x00,0x00,0x00,0x00,0x00,0x78};
      char buf[9];
      PinName rx;
      PinName tx;

   public:
      MHZ16(Abbozza *abbozza, PinName tx, PinName rx);
      MHZ16(Abbozza *abbozza, int tx, int rx);
      void doMeasurement();
      void calibrate();
      int getPPM();
};

#endif