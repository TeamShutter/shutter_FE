import { Box } from "@mui/material";
import { useEffect, useState } from "react";

// export default function StudioMap() {
//   console.log("a");
//   useEffect(() => {
//     console.log("b");
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=7df8535a03baaf68c31da7c6d6cfe798&autoload=false`;
//     document.head.appendChild(script);
//     console.log("c");

//     script.addEventListener("load", () => {
//       window.kakao.maps.load(() => {
//         const mapContainer = document.getElementById("map");

//         const mapOptions = {
//           center: new window.kakao.maps.LatLng(35.85133, 127.734086),
//           level: 13,
//         };
//         console.log("load");

//         const map = new window.kakao.maps.Map(mapContainer, mapOptions);
//       });
//     });
//     console.log("d");
//   }, []);
//   return (
//     <Box>
//       <div id="map"></div>
//     </Box>
//   );
// }

const StudioMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const $script = document.createElement("script");
    //appkey를 .env파일에 넣으면 왜 인식이 안될까잉..
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=7df8535a03baaf68c31da7c6d6cfe798&autoload=false`;
    $script.addEventListener("load", () => setMapLoaded(true));
    document.head.appendChild($script);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    window.kakao.maps.load(() => {
      var container = document.getElementById("map");
      var options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      var map = new window.kakao.maps.Map(container, options);
    });
  }, [mapLoaded]);

  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "400px",
      }}
    ></div>
  );
};

export default StudioMap;
