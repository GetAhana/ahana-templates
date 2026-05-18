import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;

const oldD =
  '        <li><a href="service-area.html">{{SERVICE_AREA_PAGE_LABEL|Service Area}}</a></li>';
const newD = `        <li class="nav-dd">
          <button type="button" class="nav-dd-trigger" aria-expanded="false" aria-haspopup="true" aria-controls="nav-dd-sa-panel">{{SERVICE_AREA_PAGE_LABEL|Service area}} <span class="nav-dd-caret" aria-hidden="true">▾</span></button>
          <ul class="nav-dd-panel" id="nav-dd-sa-panel" role="menu">
            <li role="none"><a role="menuitem" href="service-area.html">Coverage map &amp; list</a></li>
            <li role="none"><a role="menuitem" href="location-1.html">{{LOCATION_1_MENU_LABEL|Metro north}}</a></li>
            <li role="none"><a role="menuitem" href="location-2.html">{{LOCATION_2_MENU_LABEL|Central corridor}}</a></li>
            <li role="none"><a role="menuitem" href="location-3.html">{{LOCATION_3_MENU_LABEL|South county}}</a></li>
          </ul>
        </li>`;

const oldM = '    <a href="service-area.html">{{SERVICE_AREA_PAGE_LABEL|Service Area}}</a>';
const newM = `    <div class="mobile-nav-dd" role="group" aria-label="Service area links">
      <span class="mobile-nav-dd-label">{{SERVICE_AREA_PAGE_LABEL|Service area}}</span>
      <a href="service-area.html">Coverage map &amp; list</a>
      <a href="location-1.html">{{LOCATION_1_MENU_LABEL|Metro north}}</a>
      <a href="location-2.html">{{LOCATION_2_MENU_LABEL|Central corridor}}</a>
      <a href="location-3.html">{{LOCATION_3_MENU_LABEL|South county}}</a>
    </div>`;

for (const name of fs.readdirSync(root)) {
  if (!name.endsWith(".html") && name !== "bundle.txt") continue;
  const fp = path.join(root, name);
  let t = fs.readFileSync(fp, "utf8");
  const o = t;
  if (t.includes(oldD)) t = t.split(oldD).join(newD);
  if (t.includes(oldM)) t = t.split(oldM).join(newM);
  if (t !== o) {
    fs.writeFileSync(fp, t, "utf8");
    console.log("nav:", name);
  }
}
