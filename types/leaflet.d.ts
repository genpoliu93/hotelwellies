declare module "leaflet" {
  export function map(element: HTMLElement | string): any;
  export function tileLayer(url: string, options?: any): any;
  export function marker(latLng: [number, number], options?: any): any;
  export function icon(options: any): any;

  export interface Map {
    setView(latLng: [number, number], zoom: number): any;
  }

  export interface Marker {
    addTo(map: any): any;
    bindPopup(content: string): any;
    openPopup(): any;
  }

  export interface TileLayer {
    addTo(map: any): any;
  }
}
