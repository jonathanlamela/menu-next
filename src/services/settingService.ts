import { prisma } from "@/src/lib/prisma";
var cache = require("memory-cache");

export async function getSettings() {
  var cachedSettings = cache.get(
    "settings",
  );

  if (cachedSettings) {
    return cachedSettings;
  } else {
    var settings = prisma.setting.findMany();

    cache.put("settings", settings, 30 * 1000);

    return settings;
  }
}
