var keys = require('./config/API_KEYS');

var googleMapsClient = require('@google/maps').createClient({
  key: keys.G_DIRECTIONS_KEY
});

exports.getDirections = function(params, cb){
  googleMapsClient.directions(params, function(err, response) {
    if (!err) {
      console.log('numLegs', response.json.routes[0].legs.length);
      console.log('legs: ', response.json.routes[0].legs);
      console.log('distance:', response.json.routes[0].legs[0].distance)
      console.log('duration:', response.json.routes[0].legs[0].duration)
      console.log('steps', response.json.routes[0].legs[0].steps)
      cb(response.json.routes[0].legs[0].duration);
    }
  });
}




/*

//Sample: routes[0].legs[0] 
{
   "distance" : {
      "text" : "3.3 mi",
      "value" : 5337
   },
   "duration" : {
      "text" : "6 mins",
      "value" : 346
   },
   "steps" : [
      {
         "distance" : {
            "text" : "2.9 mi",
            "value" : 4600
         },
         "duration" : {
            "text" : "4 mins",
            "value" : 259
         },
         "end_location" : {
            "lat" : 42.3525544,
            "lng" : -74.24439799999999
         },
         "html_instructions" : "Head \u003cb\u003enorthwest\u003c/b\u003e on \u003cb\u003eMitchell Hollow Rd\u003c/b\u003e toward \u003cb\u003eMaplewood Ave\u003c/b\u003e",
         "polyline" : {
            "points" : "{dgaGdgddMK^Wx@ENELEJGLILGLEDGHUPOHOFKBOBO@cDBoDBm@AWCc@EaDi@i@KaAM}AKSEQAOE[GwA]m@Me@Kk@IaCWeCYyAQa@GUEyAY[Ee@GQAWA[?m@?W?SASCSCQEuBi@a@QaAa@[KQEg@Me@KwAUi@I{@MiAKmDe@y@MgAOsAUs@KSEa@Gc@E_AIeAK[EQESGq@Ww@c@_@Qk@SUIM?QAW@]BqAJe@Bk@B]?sB?qEEi@?o@?g@@u@Da@By@Lg@JUF_@Ji@Tc@R]PeBv@aA`@y@^_@Pi@TQHe@T_@Lg@PcATs@R_@L_@Lm@Z_@R_Ah@YNYNq@Vu@ViA^YDKBMBU@S@WAW?y@Eg@CoCKqFWe@CsAMm@GiAIw@Ik@G[GOCSGe@Oy@YaBi@kAYiA[c@G[GU?W?_@B]Dm@Fi@DQ?O?]Cm@Ia@IuA]o@Qe@OYMUM_Ag@s@a@o@[_@MaB["
         },
         "start_location" : {
            "lat" : 42.31262419999999,
            "lng" : -74.24643259999999
         },
         "travel_mode" : "DRIVING"
      },
      {
         "distance" : {
            "text" : "0.5 mi",
            "value" : 737
         },
         "duration" : {
            "text" : "1 min",
            "value" : 87
         },
         "end_location" : {
            "lat" : 42.349022,
            "lng" : -74.25148990000001
         },
         "html_instructions" : "Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eMill St\u003c/b\u003e\u003cdiv style=\"font-size:0.9em\"\u003eDestination will be on the right\u003c/div\u003e",
         "maneuver" : "turn-left",
         "polyline" : {
            "points" : "m~naGnzcdMMFCBCDCDCDAFCJC^FZHZHVL^|@lC~@fClB~EXn@Ln@Jf@Tj@^z@\\j@jA|AnAhBnBxC~@rA"
         },
         "start_location" : {
            "lat" : 42.3525544,
            "lng" : -74.24439799999999
         },
         "travel_mode" : "DRIVING"
      }
   ],
   "traffic_speed_entry" : [],
   "via_waypoint" : []
}
 

 */