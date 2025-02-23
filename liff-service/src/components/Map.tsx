import { 
    MapContainer, 
    Marker, 
    Popup, 
    TileLayer, 
    useMap 
} from "react-leaflet";
import L from "leaflet";

// import markerIcon
import markerIcon from "/liff-icons/location_on.svg";

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// import env variables
const API_KEY = import.meta.env.VITE_MAP_API_KEY;
// OpenStreetMap topo base by Traces Track
const urlMap = "https://tile.tracestrack.com/topo_th/{z}/{x}/{y}.png?key=" + API_KEY;

// google map
// const urlMap =  "https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}";

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}

interface MapProps {
    location: [number, number];
    mark?: string;
}

export default function Map(props: MapProps) {
    return (
        <MapContainer center={props.location} zoom={12} scrollWheelZoom={true} >
            <ChangeView center={props.location} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Map render &copy; <a href="https://www.tracestrack.com/">Traces Track</a>'
                url={urlMap}
            />

            {
                props.mark ? (
                    <Marker position={props.location} icon={customIcon}>
                        <Popup>{props.mark}</Popup>
                    </Marker>
                ) : null
            }
        </MapContainer>
    );
}