import L from 'leaflet';

const defaultOptions = {
    guide: true,
};

const CustomLayer = L.Layer.extend({
    initialize(options) {
        L.setOptions(this, options);
        this._map = undefined;
        this._container = undefined;
    },

    onAdd(map) {
        this._map = map;
        var pane = map.getPane(this.options.pane);
        this._container = L.DomUtil.create('canvas', 'leaflet-tile');

        pane.appendChild(this._container);

        // Calculate initial position of container with `L.Map.latLngToLayerPoint()`, `getPixelOrigin()` and/or `getPixelBounds()`

        L.DomUtil.setPosition(this._container, this.options.point);

        L.DomUtil.setClass(this._container, 'outline');

        // Add and position children elements if needed

        map.on('zoomend viewreset', this._update, this);
    },

    onRemove(map) {
        L.DomUtil.remove(this._container);
        map.off('zoomend viewreset', this._update, this);
    },

    _update() {
        // Recalculate position of container

        L.DomUtil.setPosition(this._container, this.options.point);

        // Add/remove/reposition children elements if needed
    },
});

// Creates a CustomLayer renderer with the given options.
function customLayer(options = defaultOptions) {
    return L.customLayer ? new CustomLayer(options) : null;
}

L.CustomLayer = CustomLayer;
L.customLayer = customLayer;

export { CustomLayer };
export { customLayer };
export default customLayer;