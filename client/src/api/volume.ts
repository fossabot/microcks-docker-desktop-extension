/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createDockerDesktopClient } from "@docker/extension-api-client";

import { EXTENSION_VOLUME } from "../utils/constants";
import { throwErrorAsString } from "./utils";

const ddClient = createDockerDesktopClient();

export async function ensureVolumeExists(): Promise<boolean> {
  console.info('Ensuring a volume exists for extension data...');
  let volumeResult;
  try {
    volumeResult = await ddClient.docker.cli.exec("volume", ["inspect", EXTENSION_VOLUME]);
  } catch (e: any) {
    if (e.stderr !== undefined && (e.stderr.toLowerCase().includes('no such volume'))) {
      // Create missing volume for our extension.
      console.info('Creating a volume for extension data.');
      try {
        volumeResult = await ddClient.docker.cli.exec("volume", ["create",
          "--label", "com.docker.compose.project=microcks_microcks-docker-desktop-extension-desktop-extension", EXTENSION_VOLUME]);
      } catch (ee: any) {
        throwErrorAsString(ee);
      }
    }
  }
  return true;
}