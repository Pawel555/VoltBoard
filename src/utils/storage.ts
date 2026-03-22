import type { Widget } from "../types/widgets";

const WIDGETS_STORAGE_KEY = "voltboard.widgets";

/**
 * Save widgets array to localStorage
 * @param widgets - Array of widgets to save
 */
export function saveWidgets(widgets: Widget[]): void {
  try {
    const serialized = JSON.stringify(widgets);
    localStorage.setItem(WIDGETS_STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save widgets to localStorage", error);
  }
}

/**
 * Retrieve widgets array from localStorage
 * @returns Array of widgets or empty array if none found or error occurs
 */
export function getWidgets(): Widget[] {
  try {
    const serialized = localStorage.getItem(WIDGETS_STORAGE_KEY);
    if (!serialized) {
      return [];
    }

    const parsed = JSON.parse(serialized);

    if (!Array.isArray(parsed)) {
      console.warn("Invalid widgets format in localStorage", parsed);
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("Failed to read widgets from localStorage", error);
    return [];
  }
}
