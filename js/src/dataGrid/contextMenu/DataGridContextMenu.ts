/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { BkoContextMenu } from "../../contextMenu";
import { createHeaderContextMenuItems } from './createHeaderContextMenuItems';
import { createCellContextMenuItems } from './createCellContextMenuItems';
import { createPublishMenuItems } from "./createPublishMenuItem";
import { DataGridScope } from "../DataGridScope";
import { selectShowPublication } from "../model/selectors";

export class DataGridContextMenu extends BkoContextMenu {
  private readonly showPublication: boolean = true;

  constructor(scope: DataGridScope) {
    super({...scope, element: [scope.dataGrid.node], dataGrid: scope.dataGrid});
    this.showPublication = selectShowPublication(scope.dataGrid.store.state);
  }

  protected buildMenu(): void {
    this.inLab ? this.buildLabMenu() : this.buildBkoMenu();

    const menuItems = [
      ...createHeaderContextMenuItems(this.scope.dataGrid, this),
      ...createCellContextMenuItems(this.scope.dataGrid, this)
    ];

    if (this.showPublication) {
      menuItems.push(...createPublishMenuItems(this.scope.dataGrid, this));
    }
    this.createItems(menuItems, this.contextMenu);
    this.bindEvents();
  }
}
