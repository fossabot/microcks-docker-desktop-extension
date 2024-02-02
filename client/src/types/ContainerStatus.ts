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
export class ContainerStatus {
  exists: boolean = false;
  isRunning: boolean = false;
  mappedPort: number = 0;

  constructor(exists: boolean, isRunning: boolean, mappedPort?: number) {
    this.exists = exists;
    this.isRunning = isRunning;
    this.mappedPort = mappedPort ? mappedPort : 0;
  }
}
