import type { LocationData } from "../types/common";
import type { Widget } from "../types/widgets";

const WIDGETS_STORAGE_KEY = "voltboard.widgets";
const DISTANCE_STORAGE_KEY = "voltboard.distance";
const LOCATION_STORAGE_KEY = "voltboard.location";

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

/**
 * Save distance array to localStorage
 * @param distance - Maximum distance within which charging stations are shown
 */
export function saveDistance(distance: string): void {
  try {
    localStorage.setItem(DISTANCE_STORAGE_KEY, distance);
  } catch (error) {
    console.error("Failed to save distance to localStorage", error);
  }
}

/**
 * Retrieve distance from localStorage
 * @returns Distance or empty string if none found or error occurs
 */
export function getDistance(): string | undefined {
  try {
    const distance = localStorage.getItem(DISTANCE_STORAGE_KEY);
    if (!distance) {
      return undefined;
    }

    return distance;
  } catch (error) {
    console.error("Failed to read distance from localStorage", error);
    return undefined;
  }
}

/**
 * Save location data to localStorage
 * @param location - Location data to save
 */
export function saveLocation(location: LocationData): void {
  try {
    const serialized = JSON.stringify(location);
    localStorage.setItem(LOCATION_STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Failed to save location to localStorage", error);
  }
}

/**
 * Retrieve location data from localStorage
 * @returns Location data or undefined if none found or error occurs
 */
export function getLocation(): LocationData | undefined {
  try {
    const location = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!location) {
      return undefined;
    }

    return JSON.parse(location);
  } catch (error) {
    console.error("Failed to read location from localStorage", error);
    return undefined;
  }
}
