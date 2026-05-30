<script>
        (function () {
          var chipHost = document.getElementById('service-area-chips');
          var rawCities = document.getElementById('svc-cities-json');
          if (chipHost && rawCities && rawCities.textContent.trim()) {
            try {
              var cities = JSON.parse(rawCities.textContent);
              if (Array.isArray(cities)) {
                cities.forEach(function (lab) {
                  if (lab == null || String(lab).trim() === '') return;
                  var sp = document.createElement('span');
                  sp.className = 'chip';
                  sp.setAttribute('role', 'listitem');
                  sp.textContent = String(lab).trim();
                  chipHost.appendChild(sp);
                });
              }
            } catch (e) {}
          }
          if (chipHost && chipHost.childElementCount === 0) {
            var oneLineEl = document.getElementById('ahana-svc-cities-one-line');
            var cityEl = document.getElementById('ahana-city-fallback');
            var oneLine = oneLineEl ? oneLineEl.textContent.replace(/\s+/g, ' ').trim() : '';
            var cityFb = cityEl ? cityEl.textContent.replace(/\s+/g, ' ').trim() : '';
            var tokenBroken = function (s) {
              return !s || s.indexOf('{{') !== -1;
            };
            var text = !tokenBroken(oneLine) ? oneLine : (!tokenBroken(cityFb) ? cityFb : '');
            if (text) {
              var fb = document.createElement('p');
              fb.className = 'chips';
              fb.style.marginTop = '1.75rem';
              fb.style.fontWeight = '700';
              fb.textContent = text;
              chipHost.parentNode.insertBefore(fb, chipHost.nextSibling);
            }
          }

          if (typeof L === 'undefined' || !document.getElementById('service-area-map')) return;

          var lat = parseFloat(String('{{MAP_CENTER_LAT}}').trim());
          var lng = parseFloat(String('{{MAP_CENTER_LNG}}').trim());
          if (!isFinite(lat) || !isFinite(lng)) {
            lat = 39.8283;
            lng = -98.5795;
          }
          var zoom = parseInt('{{MAP_ZOOM|10}}', 10);
          if (!isFinite(zoom) || zoom < 4 || zoom > 16) zoom = 10;

          var map = L.map('service-area-map', { scrollWheelZoom: false }).setView([lat, lng], zoom);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

          var REGION_STYLE = {
            color: '#c2410c',
            weight: 2,
            fillColor: '#f97316',
            fillOpacity: 0.38
          };

          function dedupeLatLng(pts) {
            var out = [];
            var eps = 0.00012;
            for (var i = 0; i < pts.length; i++) {
              var dup = false;
              for (var j = 0; j < out.length; j++) {
                if (Math.abs(out[j][0] - pts[i][0]) < eps && Math.abs(out[j][1] - pts[i][1]) < eps) {
                  dup = true;
                  break;
                }
              }
              if (!dup) out.push(pts[i]);
            }
            return out;
          }

          function haversineM(a, b) {
            var R = 6371000;
            var p1 = (a[0] * Math.PI) / 180;
            var p2 = (b[0] * Math.PI) / 180;
            var dp = ((b[0] - a[0]) * Math.PI) / 180;
            var dl = ((b[1] - a[1]) * Math.PI) / 180;
            var x = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
            return 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
          }

          function convexHullLngLat(pointsLngLat) {
            if (pointsLngLat.length < 3) return pointsLngLat.slice();
            var pts = pointsLngLat.slice().sort(function (a, b) {
              return a[0] - b[0] || a[1] - b[1];
            });
            function cross(o, a, b) {
              return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
            }
            var lower = [];
            for (var i = 0; i < pts.length; i++) {
              while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pts[i]) <= 0) lower.pop();
              lower.push(pts[i]);
            }
            var upper = [];
            for (var j = pts.length - 1; j >= 0; j--) {
              while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pts[j]) <= 0) upper.pop();
              upper.push(pts[j]);
            }
            upper.pop();
            lower.pop();
            return lower.concat(upper);
          }

          function inflateRing(latLngRing, factor) {
            var clat = 0;
            var clng = 0;
            var n = latLngRing.length;
            for (var ir = 0; ir < n; ir++) {
              clat += latLngRing[ir][0];
              clng += latLngRing[ir][1];
            }
            clat /= n;
            clng /= n;
            var inflated = [];
            for (var ir2 = 0; ir2 < n; ir2++) {
              inflated.push([clat + (latLngRing[ir2][0] - clat) * factor, clng + (latLngRing[ir2][1] - clng) * factor]);
            }
            return inflated;
          }

          function circleFromDiameter(a, b, pad) {
            var mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
            var d = haversineM(a, b);
            var r = Math.max((d / 2) * pad, 6500);
            return L.circle(mid, Object.assign({}, REGION_STYLE, { radius: r }));
          }

          function circleCoveringPoints(pts, pad) {
            if (pts.length === 1) return L.circle(pts[0], Object.assign({}, REGION_STYLE, { radius: 22000 }));
            var bestD = -1;
            var bestA = pts[0];
            var bestB = pts[1];
            for (var ia = 0; ia < pts.length; ia++) {
              for (var jb = ia + 1; jb < pts.length; jb++) {
                var dist = haversineM(pts[ia], pts[jb]);
                if (dist > bestD) {
                  bestD = dist;
                  bestA = pts[ia];
                  bestB = pts[jb];
                }
              }
            }
            return circleFromDiameter(bestA, bestB, pad);
          }

          function buildUnifiedRegion(map, centerLat, centerLng, markerRecords, bizName) {
            var pts = [];
            for (var im = 0; im < markerRecords.length; im++) {
              pts.push([markerRecords[im].la, markerRecords[im].ln]);
            }
            pts.push([centerLat, centerLng]);
            pts = dedupeLatLng(pts);

            var labels = [];
            var seenLab = {};
            for (var il = 0; il < markerRecords.length; il++) {
              var slab = markerRecords[il].label;
              if (slab && !seenLab[slab]) {
                seenLab[slab] = true;
                labels.push(slab);
              }
            }

            var layer;
            if (pts.length === 1) {
              layer = L.circle(pts[0], Object.assign({}, REGION_STYLE, { radius: 22000 }));
            } else if (pts.length === 2) {
              layer = circleFromDiameter(pts[0], pts[1], 1.38);
            } else {
              var hullLngLat = convexHullLngLat(
                pts.map(function (p) {
                  return [p[1], p[0]];
                })
              );
              if (hullLngLat.length < 3) {
                layer = circleCoveringPoints(pts, 1.38);
              } else {
                var ring = hullLngLat.map(function (p) {
                  return [p[1], p[0]];
                });
                ring = inflateRing(ring, 1.12);
                layer = L.polygon(ring, REGION_STYLE);
              }
            }

            layer.addTo(map);

            var popupParts = [];
            if (labels.length) popupParts.push('<strong>Communities we serve</strong><br>' + labels.join(', '));
            if (bizName) popupParts.push('<strong>Base</strong><br>' + bizName);
            if (popupParts.length) layer.bindPopup(popupParts.join('<br><br>'));

            map.fitBounds(layer.getBounds().pad(0.18));
          }

          var markerRecords = [];
          var rawMarkers = document.getElementById('area-markers-json');
          if (rawMarkers && rawMarkers.textContent.trim()) {
            try {
              var parsed = JSON.parse(rawMarkers.textContent);
              if (Array.isArray(parsed)) {
                parsed.forEach(function (m) {
                  if (!m) return;
                  var la = Number(m.lat);
                  var ln = Number(m.lng);
                  if (!isFinite(la) || !isFinite(ln)) return;
                  var label = m.label != null ? String(m.label).trim() : '';
                  markerRecords.push({ la: la, ln: ln, label: label });
                });
              }
            } catch (e2) {}
          }

          var bizEl = document.getElementById('biz-name-for-map');
          var bizName = bizEl && bizEl.textContent ? bizEl.textContent.trim() : '';

          if (markerRecords.length) {
            buildUnifiedRegion(map, lat, lng, markerRecords, bizName);
          } else {
            var bizLabel = bizName || 'Our location';
            var solo = L.circle([lat, lng], Object.assign({}, REGION_STYLE, { radius: 18000 }));
            solo.addTo(map).bindPopup(bizLabel);
            map.fitBounds(solo.getBounds().pad(0.18));
          }
        })();
      </script>