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
 * @fileoverview ...
 * @author michael.brinkmeier@uni-osnabrueck.de (Michael Brinkmeier)
 */

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import de.uos.inf.did.abbozza.plugin.PluginHandler;
import de.uos.inf.did.abbozza.AbbozzaServer;
import de.uos.inf.did.abbozza.AbbozzaLogger;
import java.io.OutputStream;

/**
 *
 * @author michael
 */
public class Testplugin extends PluginHandler {

    public Testplugin() {
        AbbozzaLogger.out("Testplugin handler instanciated",AbbozzaLogger.INFO);
    }

    public void handleRequest(HttpExchange exchg) throws IOException {
        String path = exchg.getRequestURI().getPath();
        System.out.println("Plugin: " + path + " requested");
 
        // String response = _plugin.getId();
       String response = "testplugin answered";
       response = response + "\n" + AbbozzaServer.getInstance();
 
        OutputStream os = exchg.getResponseBody();
        Headers responseHeaders = exchg.getResponseHeaders();
        responseHeaders.set("Content-Type", "text/plain");
        exchg.sendResponseHeaders(200, response.length());
        os.write(response.getBytes());
        os.close();
    }
    
}
