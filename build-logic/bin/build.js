import * as Path from "node:path";

import { build } from "@calmdown/rolldown-workspace";

const jail = Path.join(import.meta.dirname, "../..");
await build({ jail });
