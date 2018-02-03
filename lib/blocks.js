/**
 * @license
 * abbozza!
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
 
/**
 * @fileoverview Blocks for the NH-Z16 UART CO2-Sensor
 * 
 * @author michael.brinkmeier@uni-osnabrueck.de (Michael Brinkmeier)
 */

DEV_TYPE_MHZ16 = "mhz16";

/**
 * 
 * @type type
 */
Abbozza.MHZ16Device = {
    devtype: DEV_TYPE_MHZ16,
    init: function () {
        this.setHelpUrl(Abbozza.HELP_URL);
        this.setColour(ColorMgr.getColor("cat.DEVIN"));
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("img/devices/input32.png",16,16))            
            .appendField(__("dev.MHZ16",0))
            .appendField(new FieldDevNameInput("<default>", Abbozza.blockDevices, this), "NAME");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(__("dev.MHZ16",1))
            .appendField(new PinDropdown(PinDropdown.DIGITAL), "TX");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(__("dev.MHZ16",2))
            .appendField(new PinDropdown(PinDropdown.DIGITAL), "RX");
        this.setInputsInline(false);
        this.setOutput(false);
        this.setPreviousStatement(true, "DEVICE");
        this.setNextStatement(true, "DEVICE");
        this.setTooltip('');
        Abbozza.addDisposeHandler(this);
    },
    
    getName: function () {
        return this.getFieldValue("NAME");
    },
    
    generateCode: function (generator) {
        generator.addLibrary("lib/MHZ16.h");
        var tx = generator.fieldToCode(this, "TX");
        var rx = generator.fieldToCode(this, "RX");
        var name = generator.fieldToCode(this, "NAME");
        
        generator.addSetupCode("MHZ16 _dev_" + this.getName() + "(&abbozza,"
            + tx + "," + rx + ");");

        return "";
    },
    
    onDispose: function () {
        Abbozza.devices.delDevice(this.getName());
    }
};




Abbozza.MHZ16Calibrate = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.DEVIN"));
    this.appendDummyInput()
        .appendField(_("dev.MHZ16_CALIBRATE"))
        .appendField(new DeviceDropdown(this, DEV_TYPE_MHZ16, Abbozza.blockDevices), "NAME");
    this.setPreviousStatement(true, "STATEMENT");
    this.setNextStatement(true, "STATEMENT");
    this.setOutput(false);
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
        var device = Abbozza.blockDevices.getDevice(generator.fieldToCode(this,"NAME"));
        if (device == null) {
            ErrorMgr.addError(this, "UNKNOWN_DEVICE");
            return;
        }

        var name = device.getName();

        return "_dev_" + name + ".calibrate();";
  }
};

Abbozza.MHZ16Measurement = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.DEVIN"));
    this.appendDummyInput()
        .appendField(__("dev.MHZ16_MEASUREMENT",0))
        .appendField(new DeviceDropdown(this, DEV_TYPE_MHZ16, Abbozza.blockDevices), "NAME")
        .appendField(__("dev.MHZ16_MEASUREMENT",1));
    this.setPreviousStatement(true, "STATEMENT");
    this.setNextStatement(true, "STATEMENT");
    this.setOutput(false);
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
        var device = Abbozza.blockDevices.getDevice(generator.fieldToCode(this,"NAME"));
        if (device == null) {
            ErrorMgr.addError(this, "UNKNOWN_DEVICE");
            return;
        }

        var name = device.getName();

        return "_dev_" + name + ".doMeasurement();";
  }
};

Abbozza.MHZ16PPM = {
  init: function() {
    this.setHelpUrl(Abbozza.HELP_URL);
    this.setColour(ColorMgr.getCatColor("cat.DEVIN"));
    this.appendDummyInput()
        .appendField(__("dev.MHZ16_LAST_PPM",0))
        .appendField(new DeviceDropdown(this, DEV_TYPE_MHZ16, Abbozza.blockDevices), "NAME")
        .appendField(__("dev.MHZ16_LAST_PPM",1));
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setOutput(true,"NUMBER");
    this.setTooltip('');
  },
  
  generateCode : function(generator) {
        var device = Abbozza.blockDevices.getDevice(generator.fieldToCode(this,"NAME"));
        if (device == null) {
            ErrorMgr.addError(this, "UNKNOWN_DEVICE");
            return;
        }

        var name = device.getName();

        return "_dev_" + name + ".getPPM()";
  }
};



Blockly.Blocks['dev_mhz16_device'] = Abbozza.MHZ16Device;
Blockly.Blocks['dev_mhz16_calibrate'] = Abbozza.MHZ16Calibrate;
Blockly.Blocks['dev_mhz16_measurement'] = Abbozza.MHZ16Measurement;
Blockly.Blocks['dev_mhz16_get_ppm'] = Abbozza.MHZ16PPM;
