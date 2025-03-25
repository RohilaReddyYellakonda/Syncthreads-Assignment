import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const MapView = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      const response = await axios.get('/api/map');
      setMapData(response.data);
    };
    fetchMapData();
  }, []);

  return (
    <MapContainer center={mapData?.center} zoom={mapData?.zoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};
