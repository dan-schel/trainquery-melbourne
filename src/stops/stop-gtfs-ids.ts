import type { StopGtfsIdMapping } from "../third-party-id-mapping-types.js";
import * as stop from "./stop-ids.js";
import * as position from "./stop-position-ids.js";

// prettier-ignore
export const stopGtfsIds: StopGtfsIdMapping = {
  // Aircraft
  "vic:rail:ACF": { stopId: stop.AIRCRAFT }, // Parent (suburban)
  "13738": { stopId: stop.AIRCRAFT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13739": { stopId: stop.AIRCRAFT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26100": { stopId: stop.AIRCRAFT, replacementBus: true }, // Replacement bus (suburban)

  // Alamein
  "vic:rail:ALM": { stopId: stop.ALAMEIN }, // Parent (suburban)
  "11197": { stopId: stop.ALAMEIN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26101": { stopId: stop.ALAMEIN, replacementBus: true }, // Replacement bus (suburban)

  // Albion
  "vic:rail:ALB": { stopId: stop.ALBION }, // Parent (suburban)
  "15364": { stopId: stop.ALBION, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15365": { stopId: stop.ALBION, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Albury
  "nsw:rail:ABY": { stopId: stop.ALBURY }, // Parent (regional)
  "20287": { stopId: stop.ALBURY }, // Platform ? (regional)

  // Alphington
  "vic:rail:ALP": { stopId: stop.ALPHINGTON }, // Parent (suburban)
  "13750": { stopId: stop.ALPHINGTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13751": { stopId: stop.ALPHINGTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26103": { stopId: stop.ALPHINGTON, replacementBus: true }, // Replacement bus (suburban)

  // Altona
  "vic:rail:ALT": { stopId: stop.ALTONA }, // Parent (suburban)
  "13742": { stopId: stop.ALTONA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26104": { stopId: stop.ALTONA, replacementBus: true }, // Replacement bus (suburban)

  // Anstey
  "vic:rail:ASY": { stopId: stop.ANSTEY }, // Parent (suburban)
  "14312": { stopId: stop.ANSTEY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14313": { stopId: stop.ANSTEY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Ararat
  "vic:rail:ART": { stopId: stop.ARARAT }, // Parent (regional)
  "20288": { stopId: stop.ARARAT }, // Platform ? (regional)

  // Ardeer
  "vic:rail:ARR": { stopId: stop.ARDEER }, // Parent (regional)
  "20020": { stopId: stop.ARDEER }, // Platform ? (regional)

  // Armadale
  "vic:rail:ARM": { stopId: stop.ARMADALE }, // Parent (suburban)
  "14259": { stopId: stop.ARMADALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14260": { stopId: stop.ARMADALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Ascot Vale
  "vic:rail:ASV": { stopId: stop.ASCOT_VALE }, // Parent (suburban)
  "15548": { stopId: stop.ASCOT_VALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15549": { stopId: stop.ASCOT_VALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Ashburton
  "vic:rail:ASH": { stopId: stop.ASHBURTON }, // Parent (suburban)
  "11198": { stopId: stop.ASHBURTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Aspendale
  "vic:rail:ASP": { stopId: stop.ASPENDALE }, // Parent (suburban)
  "11234": { stopId: stop.ASPENDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11235": { stopId: stop.ASPENDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26109": { stopId: stop.ASPENDALE, replacementBus: true }, // Replacement bus (suburban)

  // Auburn
  "vic:rail:AUB": { stopId: stop.AUBURN }, // Parent (suburban)
  "12238": { stopId: stop.AUBURN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12239": { stopId: stop.AUBURN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12240": { stopId: stop.AUBURN, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Avenel
  "vic:rail:AVL": { stopId: stop.AVENEL }, // Parent (regional)
  "20289": { stopId: stop.AVENEL }, // Platform ? (regional)

  // Bacchus Marsh
  "vic:rail:BAH": { stopId: stop.BACCHUS_MARSH }, // Parent (regional)
  "20290": { stopId: stop.BACCHUS_MARSH }, // Platform ? (regional)

  // Bairnsdale
  "vic:rail:BDE": { stopId: stop.BAIRNSDALE }, // Parent (regional)
  "20291": { stopId: stop.BAIRNSDALE }, // Platform ? (regional)

  // Balaclava
  "vic:rail:BCV": { stopId: stop.BALACLAVA }, // Parent (suburban)
  "14288": { stopId: stop.BALACLAVA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14287": { stopId: stop.BALACLAVA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26111": { stopId: stop.BALACLAVA, replacementBus: true }, // Replacement bus (suburban)

  // Ballan
  "vic:rail:BLN": { stopId: stop.BALLAN }, // Parent (regional)
  "20292": { stopId: stop.BALLAN }, // Platform ? (regional)

  // Ballarat
  "vic:rail:BAT-V": { stopId: stop.BALLARAT }, // Parent (regional)
  "20293": { stopId: stop.BALLARAT }, // Platform ? (regional)

  // Batman
  "vic:rail:BAT": { stopId: stop.BATMAN }, // Parent (suburban)
  "14306": { stopId: stop.BATMAN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14307": { stopId: stop.BATMAN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Baxter
  "vic:rail:BXR": { stopId: stop.BAXTER }, // Parent (suburban)
  "5701": { stopId: stop.BAXTER, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Bayswater
  "vic:rail:BAY": { stopId: stop.BAYSWATER }, // Parent (suburban)
  "11410": { stopId: stop.BAYSWATER, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11411": { stopId: stop.BAYSWATER, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Beaconsfield
  "vic:rail:BFD": { stopId: stop.BEACONSFIELD }, // Parent (suburban)
  "12176": { stopId: stop.BEACONSFIELD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12177": { stopId: stop.BEACONSFIELD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26115": { stopId: stop.BEACONSFIELD, replacementBus: true }, // Replacement bus (suburban)

  // Beaufort
  "vic:rail:BET": { stopId: stop.BEAUFORT }, // Parent (regional)
  "20294": { stopId: stop.BEAUFORT }, // Platform ? (regional)

  // Belgrave
  "vic:rail:BEG": { stopId: stop.BELGRAVE }, // Parent (suburban)
  "11119": { stopId: stop.BELGRAVE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11120": { stopId: stop.BELGRAVE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Bell
  "vic:rail:BEL": { stopId: stop.BELL }, // Parent (suburban)
  "15381": { stopId: stop.BELL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15382": { stopId: stop.BELL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26117": { stopId: stop.BELL, replacementBus: true }, // Replacement bus (suburban)

  // Benalla
  "vic:rail:BXA": { stopId: stop.BENALLA }, // Parent (regional)
  "20295": { stopId: stop.BENALLA }, // Platform ? (regional)

  // Bendigo
  "vic:rail:BGO": { stopId: stop.BENDIGO }, // Parent (regional)
  "20296": { stopId: stop.BENDIGO }, // Platform ? (regional)

  // Bentleigh
  "vic:rail:BEN": { stopId: stop.BENTLEIGH }, // Parent (suburban)
  "14239": { stopId: stop.BENTLEIGH, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14240": { stopId: stop.BENTLEIGH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14241": { stopId: stop.BENTLEIGH, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Berwick
  "vic:rail:BEW": { stopId: stop.BERWICK }, // Parent (suburban and regional)
  "12178": { stopId: stop.BERWICK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12179": { stopId: stop.BERWICK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "22251": { stopId: stop.BERWICK }, // Platform ? (regional)
  "26119": { stopId: stop.BERWICK, replacementBus: true }, // Replacement bus (suburban)

  // Birregurra
  "vic:rail:BGE": { stopId: stop.BIRREGURRA }, // Parent (regional)
  "20297": { stopId: stop.BIRREGURRA }, // Platform ? (regional)

  // Bittern
  "vic:rail:BIT": { stopId: stop.BITTERN }, // Parent (suburban)
  "3236": { stopId: stop.BITTERN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Blackburn
  "vic:rail:BBN": { stopId: stop.BLACKBURN }, // Parent (suburban)
  "12226": { stopId: stop.BLACKBURN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12227": { stopId: stop.BLACKBURN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12228": { stopId: stop.BLACKBURN, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26121": { stopId: stop.BLACKBURN, replacementBus: true }, // Replacement bus (suburban)

  // Bonbeach
  "vic:rail:BON": { stopId: stop.BONBEACH }, // Parent (suburban)
  "11228": { stopId: stop.BONBEACH, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11229": { stopId: stop.BONBEACH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26122": { stopId: stop.BONBEACH, replacementBus: true }, // Replacement bus (suburban)

  // Boronia
  "vic:rail:BOR": { stopId: stop.BORONIA }, // Parent (suburban)
  "11249": { stopId: stop.BORONIA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11409": { stopId: stop.BORONIA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Box Hill
  "vic:rail:BOX": { stopId: stop.BOX_HILL }, // Parent (suburban)
  "12221": { stopId: stop.BOX_HILL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12222": { stopId: stop.BOX_HILL, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "12223": { stopId: stop.BOX_HILL, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)
  "26124": { stopId: stop.BOX_HILL, replacementBus: true }, // Replacement bus (suburban)

  // Brighton Beach
  "vic:rail:BBH": { stopId: stop.BRIGHTON_BEACH }, // Parent (suburban)
  "14275": { stopId: stop.BRIGHTON_BEACH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14276": { stopId: stop.BRIGHTON_BEACH, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Broadford
  "vic:rail:BRF": { stopId: stop.BROADFORD }, // Parent (regional)
  "20298": { stopId: stop.BROADFORD }, // Platform ? (regional)

  // Broadmeadows
  "vic:rail:BMS": { stopId: stop.BROADMEADOWS }, // Parent (suburban and regional)
  "15529": { stopId: stop.BROADMEADOWS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15530": { stopId: stop.BROADMEADOWS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "22254": { stopId: stop.BROADMEADOWS }, // Platform ? (regional)

  // Brunswick
  "vic:rail:BWK": { stopId: stop.BRUNSWICK }, // Parent (suburban)
  "14314": { stopId: stop.BRUNSWICK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14315": { stopId: stop.BRUNSWICK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Bunyip
  "vic:rail:BYP": { stopId: stop.BUNYIP }, // Parent (regional)
  "20299": { stopId: stop.BUNYIP }, // Platform ? (regional)

  // Burnley
  "vic:rail:BLY": { stopId: stop.BURNLEY }, // Parent (suburban)
  "12247": { stopId: stop.BURNLEY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12248": { stopId: stop.BURNLEY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12249": { stopId: stop.BURNLEY, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "12250": { stopId: stop.BURNLEY, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)
  "26128": { stopId: stop.BURNLEY, replacementBus: true }, // Replacement bus (suburban)

  // Burwood
  "vic:rail:BWD": { stopId: stop.BURWOOD }, // Parent (suburban)
  "11200": { stopId: stop.BURWOOD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11199": { stopId: stop.BURWOOD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26129": { stopId: stop.BURWOOD, replacementBus: true }, // Replacement bus (suburban)

  // Camberwell
  "vic:rail:CAM": { stopId: stop.CAMBERWELL }, // Parent (suburban)
  "11207": { stopId: stop.CAMBERWELL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11208": { stopId: stop.CAMBERWELL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "11209": { stopId: stop.CAMBERWELL, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26130": { stopId: stop.CAMBERWELL, replacementBus: true }, // Replacement bus (suburban)

  // Camperdown
  "vic:rail:CPD": { stopId: stop.CAMPERDOWN }, // Parent (regional)
  "20300": { stopId: stop.CAMPERDOWN }, // Platform ? (regional)

  // Canterbury
  "vic:rail:CBY": { stopId: stop.CANTERBURY }, // Parent (suburban)
  "12210": { stopId: stop.CANTERBURY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12211": { stopId: stop.CANTERBURY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12209": { stopId: stop.CANTERBURY, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Cardinia Road
  "vic:rail:CDA": { stopId: stop.CARDINIA_ROAD }, // Parent (suburban)
  "26501": { stopId: stop.CARDINIA_ROAD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26502": { stopId: stop.CARDINIA_ROAD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26132": { stopId: stop.CARDINIA_ROAD, replacementBus: true }, // Replacement bus (suburban)

  // Carnegie
  "vic:rail:CNE": { stopId: stop.CARNEGIE }, // Parent (suburban)
  "13729": { stopId: stop.CARNEGIE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13730": { stopId: stop.CARNEGIE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26133": { stopId: stop.CARNEGIE, replacementBus: true }, // Replacement bus (suburban)

  // Caroline Springs
  "vic:rail:RVH": { stopId: stop.CAROLINE_SPRINGS }, // Parent (regional)
  "52011": { stopId: stop.CAROLINE_SPRINGS }, // Platform ? (regional)

  // Carrum
  "vic:rail:CAR": { stopId: stop.CARRUM }, // Parent (suburban)
  "11226": { stopId: stop.CARRUM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11227": { stopId: stop.CARRUM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Castlemaine
  "vic:rail:CME": { stopId: stop.CASTLEMAINE }, // Parent (regional)
  "20301": { stopId: stop.CASTLEMAINE }, // Platform ? (regional)

  // Caulfield
  "vic:rail:CFD": { stopId: stop.CAULFIELD }, // Parent (suburban and regional)
  "14251": { stopId: stop.CAULFIELD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "14252": { stopId: stop.CAULFIELD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "14253": { stopId: stop.CAULFIELD, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "14254": { stopId: stop.CAULFIELD, positionId: position.PLATFORM_4 }, // Platform 4 (suburban and regional)
  "22248": { stopId: stop.CAULFIELD }, // Platform ? (suburban and regional)
  "26135": { stopId: stop.CAULFIELD, replacementBus: true }, // Replacement bus (suburban and regional)

  // Chatham
  "vic:rail:CHM": { stopId: stop.CHATHAM }, // Parent (suburban)
  "12212": { stopId: stop.CHATHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12213": { stopId: stop.CHATHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12214": { stopId: stop.CHATHAM, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Chelsea
  "vic:rail:CSA": { stopId: stop.CHELSEA }, // Parent (suburban)
  "11230": { stopId: stop.CHELSEA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11231": { stopId: stop.CHELSEA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26137": { stopId: stop.CHELSEA, replacementBus: true }, // Replacement bus (suburban)

  // Cheltenham
  "vic:rail:CTM": { stopId: stop.CHELTENHAM }, // Parent (suburban)
  "11243": { stopId: stop.CHELTENHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11242": { stopId: stop.CHELTENHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "11244": { stopId: stop.CHELTENHAM, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26138": { stopId: stop.CHELTENHAM, replacementBus: true }, // Replacement bus (suburban)

  // Chiltern
  "vic:rail:CHI": { stopId: stop.CHILTERN }, // Parent (regional)
  "20302": { stopId: stop.CHILTERN }, // Platform ? (regional)

  // Clarkefield
  "vic:rail:CKF": { stopId: stop.CLARKEFIELD }, // Parent (regional)
  "20303": { stopId: stop.CLARKEFIELD }, // Platform ? (regional)

  // Clayton
  "vic:rail:CLA": { stopId: stop.CLAYTON }, // Parent (suburban and regional)
  "13718": { stopId: stop.CLAYTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "13719": { stopId: stop.CLAYTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "22249": { stopId: stop.CLAYTON }, // Platform ? (suburban and regional)
  "26139": { stopId: stop.CLAYTON, replacementBus: true }, // Replacement bus (suburban and regional)

  // Clifton Hill
  "vic:rail:CHL": { stopId: stop.CLIFTON_HILL }, // Parent (suburban)
  "14330": { stopId: stop.CLIFTON_HILL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14331": { stopId: stop.CLIFTON_HILL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26140": { stopId: stop.CLIFTON_HILL, replacementBus: true }, // Replacement bus (suburban)

  // Clunes
  "vic:rail:CLU": { stopId: stop.CLUNES }, // Parent (regional)
  "44952": { stopId: stop.CLUNES }, // Platform ? (regional)

  // Cobblebank
  "vic:rail:TLN": { stopId: stop.COBBLEBANK }, // Parent (regional)
  "48804": { stopId: stop.COBBLEBANK }, // Platform ? (regional)

  // Coburg
  "vic:rail:COB": { stopId: stop.COBURG }, // Parent (suburban)
  "14308": { stopId: stop.COBURG, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14309": { stopId: stop.COBURG, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Colac
  "vic:rail:COL": { stopId: stop.COLAC }, // Parent (regional)
  "20304": { stopId: stop.COLAC }, // Platform ? (regional)

  // Collingwood
  "vic:rail:CWD": { stopId: stop.COLLINGWOOD }, // Parent (suburban)
  "14335": { stopId: stop.COLLINGWOOD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14334": { stopId: stop.COLLINGWOOD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26142": { stopId: stop.COLLINGWOOD, replacementBus: true }, // Replacement bus (suburban)

  // Coolaroo
  "vic:rail:CLO": { stopId: stop.COOLAROO }, // Parent (suburban)
  "26503": { stopId: stop.COOLAROO, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26504": { stopId: stop.COOLAROO, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Corio
  "vic:rail:COR": { stopId: stop.CORIO }, // Parent (regional)
  "20305": { stopId: stop.CORIO }, // Platform ? (regional)

  // Craigieburn
  "vic:rail:CGB": { stopId: stop.CRAIGIEBURN }, // Parent (suburban and regional)
  "15527": { stopId: stop.CRAIGIEBURN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "15528": { stopId: stop.CRAIGIEBURN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "20029": { stopId: stop.CRAIGIEBURN }, // Platform ? (suburban and regional)
  "26144": { stopId: stop.CRAIGIEBURN, replacementBus: true }, // Replacement bus (suburban and regional)

  // Cranbourne
  "vic:rail:CBE": { stopId: stop.CRANBOURNE }, // Parent (suburban)
  "12184": { stopId: stop.CRANBOURNE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12185": { stopId: stop.CRANBOURNE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26145": { stopId: stop.CRANBOURNE, replacementBus: true }, // Replacement bus (suburban)

  // Creswick
  "vic:rail:CWK": { stopId: stop.CRESWICK }, // Parent (regional)
  "44951": { stopId: stop.CRESWICK }, // Platform ? (regional)

  // Crib Point
  "vic:rail:CPT": { stopId: stop.CRIB_POINT }, // Parent (suburban)
  "615": { stopId: stop.CRIB_POINT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Croxton
  "vic:rail:CXT": { stopId: stop.CROXTON }, // Parent (suburban)
  "15385": { stopId: stop.CROXTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15386": { stopId: stop.CROXTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26147": { stopId: stop.CROXTON, replacementBus: true }, // Replacement bus (suburban)

  // Croydon
  "vic:rail:CDN": { stopId: stop.CROYDON }, // Parent (suburban)
  "12168": { stopId: stop.CROYDON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12169": { stopId: stop.CROYDON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Dandenong
  "vic:rail:DNG": { stopId: stop.DANDENONG }, // Parent (suburban and regional)
  "12187": { stopId: stop.DANDENONG, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "12188": { stopId: stop.DANDENONG, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "12189": { stopId: stop.DANDENONG, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "22250": { stopId: stop.DANDENONG }, // Platform ? (suburban and regional)
  "26149": { stopId: stop.DANDENONG, replacementBus: true }, // Replacement bus (suburban and regional)

  // Darebin
  "vic:rail:DBN": { stopId: stop.DAREBIN }, // Parent (suburban)
  "13752": { stopId: stop.DAREBIN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13753": { stopId: stop.DAREBIN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26150": { stopId: stop.DAREBIN, replacementBus: true }, // Replacement bus (suburban)

  // Darling
  "vic:rail:DLG": { stopId: stop.DARLING }, // Parent (suburban)
  "8272": { stopId: stop.DARLING, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "8691": { stopId: stop.DARLING, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Deer Park
  "vic:rail:DEK": { stopId: stop.DEER_PARK }, // Parent (regional)
  "19982": { stopId: stop.DEER_PARK }, // Platform ? (regional)

  // Dennis
  "vic:rail:DEN": { stopId: stop.DENNIS }, // Parent (suburban)
  "13746": { stopId: stop.DENNIS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13747": { stopId: stop.DENNIS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26152": { stopId: stop.DENNIS, replacementBus: true }, // Replacement bus (suburban)

  // Diamond Creek
  "vic:rail:DCK": { stopId: stop.DIAMOND_CREEK }, // Parent (suburban)
  "15334": { stopId: stop.DIAMOND_CREEK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15335": { stopId: stop.DIAMOND_CREEK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26153": { stopId: stop.DIAMOND_CREEK, replacementBus: true }, // Replacement bus (suburban)

  // Diggers Rest
  "vic:rail:DRT": { stopId: stop.DIGGERS_REST }, // Parent (suburban)
  "26505": { stopId: stop.DIGGERS_REST, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15354": { stopId: stop.DIGGERS_REST, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Dingee
  "vic:rail:DGE": { stopId: stop.DINGEE }, // Parent (regional)
  "20306": { stopId: stop.DINGEE }, // Platform ? (regional)

  // Donnybrook
  "vic:rail:DBK": { stopId: stop.DONNYBROOK }, // Parent (regional)
  "20307": { stopId: stop.DONNYBROOK }, // Platform ? (regional)

  // Drouin
  "vic:rail:DRN": { stopId: stop.DROUIN }, // Parent (regional)
  "20308": { stopId: stop.DROUIN }, // Platform ? (regional)

  // Eaglehawk
  "vic:rail:EAG-V": { stopId: stop.EAGLEHAWK }, // Parent (regional)
  "20309": { stopId: stop.EAGLEHAWK }, // Platform ? (regional)

  // Eaglemont
  "vic:rail:EAG": { stopId: stop.EAGLEMONT }, // Parent (suburban)
  "13756": { stopId: stop.EAGLEMONT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13757": { stopId: stop.EAGLEMONT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26155": { stopId: stop.EAGLEMONT, replacementBus: true }, // Replacement bus (suburban)

  // East Camberwell
  "vic:rail:ECM": { stopId: stop.EAST_CAMBERWELL }, // Parent (suburban)
  "12206": { stopId: stop.EAST_CAMBERWELL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12207": { stopId: stop.EAST_CAMBERWELL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12208": { stopId: stop.EAST_CAMBERWELL, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26156": { stopId: stop.EAST_CAMBERWELL, replacementBus: true }, // Replacement bus (suburban)

  // East Malvern
  "vic:rail:EMV": { stopId: stop.EAST_MALVERN }, // Parent (suburban)
  "8705": { stopId: stop.EAST_MALVERN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "8718": { stopId: stop.EAST_MALVERN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // East Richmond
  "vic:rail:ERM": { stopId: stop.EAST_RICHMOND }, // Parent (suburban)
  "12251": { stopId: stop.EAST_RICHMOND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12252": { stopId: stop.EAST_RICHMOND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26159": { stopId: stop.EAST_RICHMOND, replacementBus: true }, // Replacement bus (suburban)

  // Echuca
  "vic:rail:ECH": { stopId: stop.ECHUCA }, // Parent (regional)
  "20310": { stopId: stop.ECHUCA }, // Platform ? (regional)

  // Edithvale
  "vic:rail:EDI": { stopId: stop.EDITHVALE }, // Parent (suburban)
  "11232": { stopId: stop.EDITHVALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11233": { stopId: stop.EDITHVALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26160": { stopId: stop.EDITHVALE, replacementBus: true }, // Replacement bus (suburban)

  // Elmore
  "vic:rail:EME": { stopId: stop.ELMORE }, // Parent (regional)
  "20311": { stopId: stop.ELMORE }, // Platform ? (regional)

  // Elsternwick
  "vic:rail:ELS": { stopId: stop.ELSTERNWICK }, // Parent (suburban)
  "14283": { stopId: stop.ELSTERNWICK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14284": { stopId: stop.ELSTERNWICK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26161": { stopId: stop.ELSTERNWICK, replacementBus: true }, // Replacement bus (suburban)

  // Eltham
  "vic:rail:ELT": { stopId: stop.ELTHAM }, // Parent (suburban)
  "15332": { stopId: stop.ELTHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15333": { stopId: stop.ELTHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26162": { stopId: stop.ELTHAM, replacementBus: true }, // Replacement bus (suburban)

  // Epping
  "vic:rail:EPP": { stopId: stop.EPPING }, // Parent (suburban)
  "15366": { stopId: stop.EPPING, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15367": { stopId: stop.EPPING, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26163": { stopId: stop.EPPING, replacementBus: true }, // Replacement bus (suburban)

  // Epsom
  "vic:rail:EPM": { stopId: stop.EPSOM }, // Parent (regional)
  "47642": { stopId: stop.EPSOM }, // Platform ? (regional)

  // Essendon
  "vic:rail:ESD": { stopId: stop.ESSENDON }, // Parent (suburban and regional)
  "15543": { stopId: stop.ESSENDON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "15544": { stopId: stop.ESSENDON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "15545": { stopId: stop.ESSENDON, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "22253": { stopId: stop.ESSENDON }, // Platform ? (suburban and regional)
  "26164": { stopId: stop.ESSENDON, replacementBus: true }, // Replacement bus (suburban and regional)

  // Euroa
  "vic:rail:EOA": { stopId: stop.EUROA }, // Parent (regional)
  "20312": { stopId: stop.EUROA }, // Platform ? (regional)

  // Fairfield
  "vic:rail:FFD": { stopId: stop.FAIRFIELD }, // Parent (suburban)
  "13748": { stopId: stop.FAIRFIELD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13749": { stopId: stop.FAIRFIELD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26165": { stopId: stop.FAIRFIELD, replacementBus: true }, // Replacement bus (suburban)

  // Fawkner
  "vic:rail:FAK": { stopId: stop.FAWKNER }, // Parent (suburban)
  "14302": { stopId: stop.FAWKNER, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14303": { stopId: stop.FAWKNER, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Ferntree Gully
  "vic:rail:FTG": { stopId: stop.FERNTREE_GULLY }, // Parent (suburban)
  "11247": { stopId: stop.FERNTREE_GULLY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11248": { stopId: stop.FERNTREE_GULLY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Flagstaff
  "vic:rail:FGS": { stopId: stop.FLAGSTAFF }, // Parent (suburban)
  "10920": { stopId: stop.FLAGSTAFF, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "10921": { stopId: stop.FLAGSTAFF, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12195": { stopId: stop.FLAGSTAFF, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "12196": { stopId: stop.FLAGSTAFF, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)
  "26168": { stopId: stop.FLAGSTAFF, replacementBus: true }, // Replacement bus (suburban)

  // Flemington Bridge
  "vic:rail:FBD": { stopId: stop.FLEMINGTON_BRIDGE }, // Parent (suburban)
  "14320": { stopId: stop.FLEMINGTON_BRIDGE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14321": { stopId: stop.FLEMINGTON_BRIDGE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Flemington Racecourse
  "vic:rail:RCE": { stopId: stop.FLEMINGTON_RACECOURSE }, // Parent (suburban)
  "15524": { stopId: stop.FLEMINGTON_RACECOURSE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15525": { stopId: stop.FLEMINGTON_RACECOURSE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Flinders Street
  "vic:rail:FSS": { stopId: stop.FLINDERS_STREET }, // Parent (suburban and regional)
  "11212": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "11213": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "11214": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "11215": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_4 }, // Platform 4 (suburban and regional)
  "11216": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_5 }, // Platform 5 (suburban and regional)
  "11217": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_6 }, // Platform 6 (suburban and regional)
  "11218": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_7 }, // Platform 7 (suburban and regional)
  "12205": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_8 }, // Platform 8 (suburban and regional)
  "12204": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_9 }, // Platform 9 (suburban and regional)
  "12203": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_10 }, // Platform 10 (suburban and regional)
  "12202": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_12 }, // Platform 12 (suburban and regional)
  "12201": { stopId: stop.FLINDERS_STREET, positionId: position.PLATFORM_13 }, // Platform 13 (suburban and regional)
  "22238": { stopId: stop.FLINDERS_STREET }, // Platform ? (suburban and regional)
  "26170": { stopId: stop.FLINDERS_STREET, replacementBus: true }, // Replacement bus (suburban and regional)

  // Footscray
  "vic:rail:FSY": { stopId: stop.FOOTSCRAY }, // Parent (suburban and regional)
  "15518": { stopId: stop.FOOTSCRAY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "15519": { stopId: stop.FOOTSCRAY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "15520": { stopId: stop.FOOTSCRAY, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "15521": { stopId: stop.FOOTSCRAY, positionId: position.PLATFORM_4 }, // Platform 4 (suburban and regional)
  "26508": { stopId: stop.FOOTSCRAY, positionId: position.PLATFORM_5 }, // Platform 5 (suburban and regional)
  "26509": { stopId: stop.FOOTSCRAY, positionId: position.PLATFORM_6 }, // Platform 6 (suburban and regional)
  "22240": { stopId: stop.FOOTSCRAY }, // Platform ? (suburban and regional)
  "26171": { stopId: stop.FOOTSCRAY, replacementBus: true }, // Replacement bus (suburban and regional)

  // Frankston
  "vic:rail:FKN": { stopId: stop.FRANKSTON }, // Parent (suburban)
  "11220": { stopId: stop.FRANKSTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11221": { stopId: stop.FRANKSTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26510": { stopId: stop.FRANKSTON, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26172": { stopId: stop.FRANKSTON, replacementBus: true }, // Replacement bus (suburban)

  // Gardenvale
  "vic:rail:GVE": { stopId: stop.GARDENVALE }, // Parent (suburban)
  "14281": { stopId: stop.GARDENVALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14282": { stopId: stop.GARDENVALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Gardiner
  "vic:rail:GAR": { stopId: stop.GARDINER }, // Parent (suburban)
  "12269": { stopId: stop.GARDINER, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "5804": { stopId: stop.GARDINER, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Garfield
  "vic:rail:GAR-V": { stopId: stop.GARFIELD }, // Parent (regional)
  "20313": { stopId: stop.GARFIELD }, // Platform ? (regional)

  // Geelong
  "vic:rail:GEL": { stopId: stop.GEELONG }, // Parent (regional)
  "20314": { stopId: stop.GEELONG }, // Platform ? (regional)

  // Ginifer
  "vic:rail:GIN": { stopId: stop.GINIFER }, // Parent (suburban)
  "15362": { stopId: stop.GINIFER, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15363": { stopId: stop.GINIFER, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Gisborne
  "vic:rail:GIS": { stopId: stop.GISBORNE }, // Parent (regional)
  "20315": { stopId: stop.GISBORNE }, // Platform ? (regional)

  // Glen Iris
  "vic:rail:GIR": { stopId: stop.GLEN_IRIS }, // Parent (suburban)
  "5966": { stopId: stop.GLEN_IRIS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "8266": { stopId: stop.GLEN_IRIS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Glen Waverley
  "vic:rail:GWY": { stopId: stop.GLEN_WAVERLEY }, // Parent (suburban)
  "12158": { stopId: stop.GLEN_WAVERLEY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12159": { stopId: stop.GLEN_WAVERLEY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26177": { stopId: stop.GLEN_WAVERLEY, replacementBus: true }, // Replacement bus (suburban)

  // Glenbervie
  "vic:rail:GBV": { stopId: stop.GLENBERVIE }, // Parent (suburban)
  "15541": { stopId: stop.GLENBERVIE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15542": { stopId: stop.GLENBERVIE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Glenferrie
  "vic:rail:GFE": { stopId: stop.GLENFERRIE }, // Parent (suburban)
  "12241": { stopId: stop.GLENFERRIE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12242": { stopId: stop.GLENFERRIE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12243": { stopId: stop.GLENFERRIE, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26179": { stopId: stop.GLENFERRIE, replacementBus: true }, // Replacement bus (suburban)

  // Glen Huntly
  "vic:rail:GHY": { stopId: stop.GLEN_HUNTLY }, // Parent (suburban)
  "14248": { stopId: stop.GLEN_HUNTLY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14249": { stopId: stop.GLEN_HUNTLY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14250": { stopId: stop.GLEN_HUNTLY, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Glenroy
  "vic:rail:GRY": { stopId: stop.GLENROY }, // Parent (suburban)
  "15533": { stopId: stop.GLENROY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15534": { stopId: stop.GLENROY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26181": { stopId: stop.GLENROY, replacementBus: true }, // Replacement bus (suburban)

  // Goornong
  "vic:rail:GRG": { stopId: stop.GOORNONG }, // Parent (regional)
  "51809": { stopId: stop.GOORNONG }, // Platform ? (regional)

  // Gowrie
  "vic:rail:GOW": { stopId: stop.GOWRIE }, // Parent (suburban)
  "14300": { stopId: stop.GOWRIE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14301": { stopId: stop.GOWRIE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Greensborough
  "vic:rail:GRN": { stopId: stop.GREENSBOROUGH }, // Parent (suburban)
  "15329": { stopId: stop.GREENSBOROUGH, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15330": { stopId: stop.GREENSBOROUGH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26183": { stopId: stop.GREENSBOROUGH, replacementBus: true }, // Replacement bus (suburban)

  // Hallam
  "vic:rail:HLM": { stopId: stop.HALLAM }, // Parent (suburban)
  "12182": { stopId: stop.HALLAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12183": { stopId: stop.HALLAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26184": { stopId: stop.HALLAM, replacementBus: true }, // Replacement bus (suburban)

  // Hampton
  "vic:rail:HAM": { stopId: stop.HAMPTON }, // Parent (suburban)
  "14272": { stopId: stop.HAMPTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14273": { stopId: stop.HAMPTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Hartwell
  "vic:rail:HWL": { stopId: stop.HARTWELL }, // Parent (suburban)
  "11202": { stopId: stop.HARTWELL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11201": { stopId: stop.HARTWELL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Hastings
  "vic:rail:HST": { stopId: stop.HASTINGS }, // Parent (suburban)
  "3580": { stopId: stop.HASTINGS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Hawksburn
  "vic:rail:HKN": { stopId: stop.HAWKSBURN }, // Parent (suburban)
  "14267": { stopId: stop.HAWKSBURN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14268": { stopId: stop.HAWKSBURN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Hawkstowe
  "vic:rail:HWS": { stopId: stop.HAWKSTOWE }, // Parent (suburban)
  "26511": { stopId: stop.HAWKSTOWE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26512": { stopId: stop.HAWKSTOWE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26189": { stopId: stop.HAWKSTOWE, replacementBus: true }, // Replacement bus (suburban)

  // Hawthorn
  "vic:rail:HAW": { stopId: stop.HAWTHORN }, // Parent (suburban)
  "12244": { stopId: stop.HAWTHORN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12245": { stopId: stop.HAWTHORN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12246": { stopId: stop.HAWTHORN, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Heathcote Junction
  "vic:rail:HCJ": { stopId: stop.HEATHCOTE_JUNCTION }, // Parent (regional)
  "20316": { stopId: stop.HEATHCOTE_JUNCTION }, // Platform ? (regional)

  // Heatherdale
  "vic:rail:HTD": { stopId: stop.HEATHERDALE }, // Parent (suburban)
  "12234": { stopId: stop.HEATHERDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12233": { stopId: stop.HEATHERDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26191": { stopId: stop.HEATHERDALE, replacementBus: true }, // Replacement bus (suburban)

  // Heathmont
  "vic:rail:HMT": { stopId: stop.HEATHMONT }, // Parent (suburban)
  "11412": { stopId: stop.HEATHMONT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11413": { stopId: stop.HEATHMONT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Heidelberg
  "vic:rail:HDB": { stopId: stop.HEIDELBERG }, // Parent (suburban)
  "13758": { stopId: stop.HEIDELBERG, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13759": { stopId: stop.HEIDELBERG, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26193": { stopId: stop.HEIDELBERG, replacementBus: true }, // Replacement bus (suburban)

  // Heyington
  "vic:rail:HEY": { stopId: stop.HEYINGTON }, // Parent (suburban)
  "12263": { stopId: stop.HEYINGTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12264": { stopId: stop.HEYINGTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26194": { stopId: stop.HEYINGTON, replacementBus: true }, // Replacement bus (suburban)

  // Highett
  "vic:rail:HIG": { stopId: stop.HIGHETT }, // Parent (suburban)
  "11471": { stopId: stop.HIGHETT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14232": { stopId: stop.HIGHETT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Holmesglen
  "vic:rail:HOL": { stopId: stop.HOLMESGLEN }, // Parent (suburban)
  "8763": { stopId: stop.HOLMESGLEN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "8766": { stopId: stop.HOLMESGLEN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Hoppers Crossing
  "vic:rail:HCG": { stopId: stop.HOPPERS_CROSSING }, // Parent (suburban)
  "13734": { stopId: stop.HOPPERS_CROSSING, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13735": { stopId: stop.HOPPERS_CROSSING, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26197": { stopId: stop.HOPPERS_CROSSING, replacementBus: true }, // Replacement bus (suburban)

  // Hughesdale
  "vic:rail:HUG": { stopId: stop.HUGHESDALE }, // Parent (suburban)
  "13725": { stopId: stop.HUGHESDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13726": { stopId: stop.HUGHESDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26198": { stopId: stop.HUGHESDALE, replacementBus: true }, // Replacement bus (suburban)

  // Huntingdale
  "vic:rail:HUN": { stopId: stop.HUNTINGDALE }, // Parent (suburban)
  "13720": { stopId: stop.HUNTINGDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13721": { stopId: stop.HUNTINGDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26199": { stopId: stop.HUNTINGDALE, replacementBus: true }, // Replacement bus (suburban)

  // Hurstbridge
  "vic:rail:HBE": { stopId: stop.HURSTBRIDGE }, // Parent (suburban)
  "15337": { stopId: stop.HURSTBRIDGE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26200": { stopId: stop.HURSTBRIDGE, replacementBus: true }, // Replacement bus (suburban)

  // Ivanhoe
  "vic:rail:IVA": { stopId: stop.IVANHOE }, // Parent (suburban)
  "13754": { stopId: stop.IVANHOE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13755": { stopId: stop.IVANHOE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26201": { stopId: stop.IVANHOE, replacementBus: true }, // Replacement bus (suburban)

  // Jacana
  "vic:rail:JAC": { stopId: stop.JACANA }, // Parent (suburban)
  "15531": { stopId: stop.JACANA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15532": { stopId: stop.JACANA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Jewell
  "vic:rail:JWL": { stopId: stop.JEWELL }, // Parent (suburban)
  "14316": { stopId: stop.JEWELL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14317": { stopId: stop.JEWELL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Jolimont
  "vic:rail:JLI": { stopId: stop.JOLIMONT }, // Parent (suburban)
  "14340": { stopId: stop.JOLIMONT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14341": { stopId: stop.JOLIMONT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26204": { stopId: stop.JOLIMONT, replacementBus: true }, // Replacement bus (suburban)

  // Jordanville
  "vic:rail:JOR": { stopId: stop.JORDANVILLE }, // Parent (suburban)
  "10117": { stopId: stop.JORDANVILLE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11219": { stopId: stop.JORDANVILLE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Kananook
  "vic:rail:KAN": { stopId: stop.KANANOOK }, // Parent (suburban)
  "11222": { stopId: stop.KANANOOK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11223": { stopId: stop.KANANOOK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Kangaroo Flat
  "vic:rail:KFT": { stopId: stop.KANGAROO_FLAT }, // Parent (regional)
  "20317": { stopId: stop.KANGAROO_FLAT }, // Platform ? (regional)

  // Keilor Plains
  "vic:rail:KPL": { stopId: stop.KEILOR_PLAINS }, // Parent (suburban)
  "15358": { stopId: stop.KEILOR_PLAINS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15359": { stopId: stop.KEILOR_PLAINS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Kensington
  "vic:rail:KEN": { stopId: stop.KENSINGTON }, // Parent (suburban)
  "15552": { stopId: stop.KENSINGTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15553": { stopId: stop.KENSINGTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Keon Park
  "vic:rail:KPK": { stopId: stop.KEON_PARK }, // Parent (suburban)
  "15371": { stopId: stop.KEON_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15372": { stopId: stop.KEON_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26209": { stopId: stop.KEON_PARK, replacementBus: true }, // Replacement bus (suburban)

  // Kerang
  "vic:rail:KER": { stopId: stop.KERANG }, // Parent (regional)
  "20318": { stopId: stop.KERANG }, // Platform ? (regional)

  // Kilmore East
  "vic:rail:KET": { stopId: stop.KILMORE_EAST }, // Parent (regional)
  "20319": { stopId: stop.KILMORE_EAST }, // Platform ? (regional)

  // Kooyong
  "vic:rail:KYG": { stopId: stop.KOOYONG }, // Parent (suburban)
  "12265": { stopId: stop.KOOYONG, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12266": { stopId: stop.KOOYONG, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Kyneton
  "vic:rail:KYN": { stopId: stop.KYNETON }, // Parent (regional)
  "20320": { stopId: stop.KYNETON }, // Platform ? (regional)

  // Laburnum
  "vic:rail:LAB": { stopId: stop.LABURNUM }, // Parent (suburban)
  "12225": { stopId: stop.LABURNUM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12224": { stopId: stop.LABURNUM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26211": { stopId: stop.LABURNUM, replacementBus: true }, // Replacement bus (suburban)

  // Lalor
  "vic:rail:LAL": { stopId: stop.LALOR }, // Parent (suburban)
  "15368": { stopId: stop.LALOR, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15369": { stopId: stop.LALOR, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26212": { stopId: stop.LALOR, replacementBus: true }, // Replacement bus (suburban)

  // Lara
  "vic:rail:LRA": { stopId: stop.LARA }, // Parent (regional)
  "20321": { stopId: stop.LARA }, // Platform ? (regional)

  // Laverton
  "vic:rail:LAV": { stopId: stop.LAVERTON }, // Parent (suburban)
  "13736": { stopId: stop.LAVERTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13737": { stopId: stop.LAVERTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26513": { stopId: stop.LAVERTON, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26213": { stopId: stop.LAVERTON, replacementBus: true }, // Replacement bus (suburban)

  // Leawarra
  "vic:rail:LWA": { stopId: stop.LEAWARRA }, // Parent (suburban)
  "7878": { stopId: stop.LEAWARRA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Lilydale
  "vic:rail:LIL": { stopId: stop.LILYDALE }, // Parent (suburban)
  "12164": { stopId: stop.LILYDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12165": { stopId: stop.LILYDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Little River
  "vic:rail:LRR": { stopId: stop.LITTLE_RIVER }, // Parent (regional)
  "20323": { stopId: stop.LITTLE_RIVER }, // Platform ? (regional)

  // Longwarry
  "vic:rail:LWY": { stopId: stop.LONGWARRY }, // Parent (regional)
  "20324": { stopId: stop.LONGWARRY }, // Platform ? (regional)

  // Lynbrook
  "vic:rail:LBK": { stopId: stop.LYNBROOK }, // Parent (suburban)
  "26514": { stopId: stop.LYNBROOK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26515": { stopId: stop.LYNBROOK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26216": { stopId: stop.LYNBROOK, replacementBus: true }, // Replacement bus (suburban)

  // Macaulay
  "vic:rail:MAC": { stopId: stop.MACAULAY }, // Parent (suburban)
  "14322": { stopId: stop.MACAULAY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14323": { stopId: stop.MACAULAY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Macedon
  "vic:rail:MDN": { stopId: stop.MACEDON }, // Parent (regional)
  "20325": { stopId: stop.MACEDON }, // Platform ? (regional)

  // Macleod
  "vic:rail:MCD": { stopId: stop.MACLEOD }, // Parent (suburban)
  "15326": { stopId: stop.MACLEOD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15325": { stopId: stop.MACLEOD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "15324": { stopId: stop.MACLEOD, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26218": { stopId: stop.MACLEOD, replacementBus: true }, // Replacement bus (suburban)

  // Malmsbury
  "vic:rail:MMY-V": { stopId: stop.MALMSBURY }, // Parent (regional)
  "20326": { stopId: stop.MALMSBURY }, // Platform ? (regional)

  // Malvern
  "vic:rail:MAL": { stopId: stop.MALVERN }, // Parent (suburban)
  "14255": { stopId: stop.MALVERN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14256": { stopId: stop.MALVERN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14257": { stopId: stop.MALVERN, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "14258": { stopId: stop.MALVERN, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)

  // Marshall
  "vic:rail:MAS": { stopId: stop.MARSHALL }, // Parent (regional)
  "20327": { stopId: stop.MARSHALL }, // Platform ? (regional)

  // Maryborough
  "vic:rail:MBY": { stopId: stop.MARYBOROUGH }, // Parent (regional)
  "44953": { stopId: stop.MARYBOROUGH }, // Platform ? (regional)

  // McKinnon
  "vic:rail:MCK": { stopId: stop.MCKINNON }, // Parent (suburban)
  "14242": { stopId: stop.MCKINNON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14243": { stopId: stop.MCKINNON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14244": { stopId: stop.MCKINNON, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Melbourne Central
  "vic:rail:MCE": { stopId: stop.MELBOURNE_CENTRAL }, // Parent (suburban)
  "10922": { stopId: stop.MELBOURNE_CENTRAL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "10923": { stopId: stop.MELBOURNE_CENTRAL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12197": { stopId: stop.MELBOURNE_CENTRAL, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "12198": { stopId: stop.MELBOURNE_CENTRAL, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)
  "26221": { stopId: stop.MELBOURNE_CENTRAL, replacementBus: true }, // Replacement bus (suburban)

  // Melton
  "vic:rail:MEL": { stopId: stop.MELTON }, // Parent (regional)
  "19980": { stopId: stop.MELTON }, // Platform ? (regional)

  // Mentone
  "vic:rail:MEN": { stopId: stop.MENTONE }, // Parent (suburban)
  "11240": { stopId: stop.MENTONE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11241": { stopId: stop.MENTONE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Merinda Park
  "vic:rail:MPK": { stopId: stop.MERINDA_PARK }, // Parent (suburban)
  "12186": { stopId: stop.MERINDA_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26516": { stopId: stop.MERINDA_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26223": { stopId: stop.MERINDA_PARK, replacementBus: true }, // Replacement bus (suburban)

  // Merlynston
  "vic:rail:MYN": { stopId: stop.MERLYNSTON }, // Parent (suburban)
  "14304": { stopId: stop.MERLYNSTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14305": { stopId: stop.MERLYNSTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Mernda
  "vic:rail:MDD": { stopId: stop.MERNDA }, // Parent (suburban)
  "26517": { stopId: stop.MERNDA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26518": { stopId: stop.MERNDA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26225": { stopId: stop.MERNDA, replacementBus: true }, // Replacement bus (suburban)

  // Merri
  "vic:rail:MER": { stopId: stop.MERRI }, // Parent (suburban)
  "15389": { stopId: stop.MERRI, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15390": { stopId: stop.MERRI, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26226": { stopId: stop.MERRI, replacementBus: true }, // Replacement bus (suburban)

  // Middle Brighton
  "vic:rail:MBN": { stopId: stop.MIDDLE_BRIGHTON }, // Parent (suburban)
  "14277": { stopId: stop.MIDDLE_BRIGHTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14278": { stopId: stop.MIDDLE_BRIGHTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Middle Footscray
  "vic:rail:MFY": { stopId: stop.MIDDLE_FOOTSCRAY }, // Parent (suburban)
  "15516": { stopId: stop.MIDDLE_FOOTSCRAY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15517": { stopId: stop.MIDDLE_FOOTSCRAY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Middle Gorge
  "vic:rail:MMR": { stopId: stop.MIDDLE_GORGE }, // Parent (suburban)
  "26519": { stopId: stop.MIDDLE_GORGE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26520": { stopId: stop.MIDDLE_GORGE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26229": { stopId: stop.MIDDLE_GORGE, replacementBus: true }, // Replacement bus (suburban)

  // Mitcham
  "vic:rail:MCH": { stopId: stop.MITCHAM }, // Parent (suburban)
  "12232": { stopId: stop.MITCHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12231": { stopId: stop.MITCHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26230": { stopId: stop.MITCHAM, replacementBus: true }, // Replacement bus (suburban)

  // Moe
  "vic:rail:MOE": { stopId: stop.MOE }, // Parent (regional)
  "20328": { stopId: stop.MOE }, // Platform ? (regional)

  // Montmorency
  "vic:rail:MMY": { stopId: stop.MONTMORENCY }, // Parent (suburban)
  "15331": { stopId: stop.MONTMORENCY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26521": { stopId: stop.MONTMORENCY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26231": { stopId: stop.MONTMORENCY, replacementBus: true }, // Replacement bus (suburban)

  // Moonee Ponds
  "vic:rail:MPD": { stopId: stop.MOONEE_PONDS }, // Parent (suburban)
  "15546": { stopId: stop.MOONEE_PONDS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15547": { stopId: stop.MOONEE_PONDS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26232": { stopId: stop.MOONEE_PONDS, replacementBus: true }, // Replacement bus (suburban)

  // Moorabbin
  "vic:rail:MRN": { stopId: stop.MOORABBIN }, // Parent (suburban)
  "14233": { stopId: stop.MOORABBIN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14234": { stopId: stop.MOORABBIN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14235": { stopId: stop.MOORABBIN, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26233": { stopId: stop.MOORABBIN, replacementBus: true }, // Replacement bus (suburban)

  // Mooroolbark
  "vic:rail:MLK": { stopId: stop.MOOROOLBARK }, // Parent (suburban)
  "12166": { stopId: stop.MOOROOLBARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12167": { stopId: stop.MOOROOLBARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Mooroopna
  "vic:rail:MPA": { stopId: stop.MOOROOPNA }, // Parent (regional)
  "20329": { stopId: stop.MOOROOPNA }, // Platform ? (regional)

  // Mordialloc
  "vic:rail:MOR": { stopId: stop.MORDIALLOC }, // Parent (suburban)
  "11236": { stopId: stop.MORDIALLOC, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11237": { stopId: stop.MORDIALLOC, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Moreland
  "vic:rail:MLD": { stopId: stop.MORELAND }, // Parent (suburban)
  "14310": { stopId: stop.MORELAND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14311": { stopId: stop.MORELAND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Morradoo
  "vic:rail:MRO": { stopId: stop.MORRADOO }, // Parent (suburban)
  "2155": { stopId: stop.MORRADOO, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Morwell
  "vic:rail:MWL": { stopId: stop.MORWELL }, // Parent (regional)
  "20330": { stopId: stop.MORWELL }, // Platform ? (regional)

  // Mount Waverley
  "vic:rail:MWY": { stopId: stop.MOUNT_WAVERLEY }, // Parent (suburban)
  "12162": { stopId: stop.MOUNT_WAVERLEY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12163": { stopId: stop.MOUNT_WAVERLEY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26238": { stopId: stop.MOUNT_WAVERLEY, replacementBus: true }, // Replacement bus (suburban)

  // Murchison East
  "vic:rail:MST": { stopId: stop.MURCHISON_EAST }, // Parent (regional)
  "20331": { stopId: stop.MURCHISON_EAST }, // Platform ? (regional)

  // Murrumbeena
  "vic:rail:MRB": { stopId: stop.MURRUMBEENA }, // Parent (suburban)
  "13727": { stopId: stop.MURRUMBEENA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13728": { stopId: stop.MURRUMBEENA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26239": { stopId: stop.MURRUMBEENA, replacementBus: true }, // Replacement bus (suburban)

  // Nagambie
  "vic:rail:NGE": { stopId: stop.NAGAMBIE }, // Parent (regional)
  "20332": { stopId: stop.NAGAMBIE }, // Platform ? (regional)

  // Nar Nar Goon
  "vic:rail:NNG": { stopId: stop.NAR_NAR_GOON }, // Parent (regional)
  "20333": { stopId: stop.NAR_NAR_GOON }, // Platform ? (regional)

  // Narre Warren
  "vic:rail:NWA": { stopId: stop.NARRE_WARREN }, // Parent (suburban)
  "12180": { stopId: stop.NARRE_WARREN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12181": { stopId: stop.NARRE_WARREN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26240": { stopId: stop.NARRE_WARREN, replacementBus: true }, // Replacement bus (suburban)

  // Newmarket
  "vic:rail:NKT": { stopId: stop.NEWMARKET }, // Parent (suburban)
  "15550": { stopId: stop.NEWMARKET, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15551": { stopId: stop.NEWMARKET, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26241": { stopId: stop.NEWMARKET, replacementBus: true }, // Replacement bus (suburban)

  // Newport
  "vic:rail:NPT": { stopId: stop.NEWPORT }, // Parent (suburban)
  "15343": { stopId: stop.NEWPORT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15344": { stopId: stop.NEWPORT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "22245": { stopId: stop.NEWPORT }, // Platform ? (suburban)
  "26242": { stopId: stop.NEWPORT, replacementBus: true }, // Replacement bus (suburban)

  // Noble Park
  "vic:rail:NPK": { stopId: stop.NOBLE_PARK }, // Parent (suburban)
  "12192": { stopId: stop.NOBLE_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12193": { stopId: stop.NOBLE_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26243": { stopId: stop.NOBLE_PARK, replacementBus: true }, // Replacement bus (suburban)

  // North Brighton
  "vic:rail:NBN": { stopId: stop.NORTH_BRIGHTON }, // Parent (suburban)
  "14279": { stopId: stop.NORTH_BRIGHTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14280": { stopId: stop.NORTH_BRIGHTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26244": { stopId: stop.NORTH_BRIGHTON, replacementBus: true }, // Replacement bus (suburban)

  // North Geelong
  "vic:rail:NGL": { stopId: stop.NORTH_GEELONG }, // Parent (regional)
  "20334": { stopId: stop.NORTH_GEELONG }, // Platform ? (regional)

  // North Melbourne
  "vic:rail:NME": { stopId: stop.NORTH_MELBOURNE }, // Parent (suburban and regional)
  "14324": { stopId: stop.NORTH_MELBOURNE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14325": { stopId: stop.NORTH_MELBOURNE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14326": { stopId: stop.NORTH_MELBOURNE, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "14327": { stopId: stop.NORTH_MELBOURNE, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)
  "14328": { stopId: stop.NORTH_MELBOURNE, positionId: position.PLATFORM_5 }, // Platform 5 (suburban)
  "14329": { stopId: stop.NORTH_MELBOURNE, positionId: position.PLATFORM_6 }, // Platform 6 (suburban)
  "22239": { stopId: stop.NORTH_MELBOURNE }, // Platform ? (regional)

  // North Richmond
  "vic:rail:NRM": { stopId: stop.NORTH_RICHMOND }, // Parent (suburban)
  "14336": { stopId: stop.NORTH_RICHMOND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14337": { stopId: stop.NORTH_RICHMOND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26246": { stopId: stop.NORTH_RICHMOND, replacementBus: true }, // Replacement bus (suburban)

  // North Shore
  "vic:rail:NSH": { stopId: stop.NORTH_SHORE }, // Parent (regional)
  "20335": { stopId: stop.NORTH_SHORE }, // Platform ? (regional)

  // North Williamstown
  "vic:rail:NWN": { stopId: stop.NORTH_WILLIAMSTOWN }, // Parent (suburban)
  "15341": { stopId: stop.NORTH_WILLIAMSTOWN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15342": { stopId: stop.NORTH_WILLIAMSTOWN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Northcote
  "vic:rail:NCE": { stopId: stop.NORTHCOTE }, // Parent (suburban)
  "15387": { stopId: stop.NORTHCOTE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15388": { stopId: stop.NORTHCOTE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26248": { stopId: stop.NORTHCOTE, replacementBus: true }, // Replacement bus (suburban)

  // Nunawading
  "vic:rail:NWG": { stopId: stop.NUNAWADING }, // Parent (suburban)
  "12230": { stopId: stop.NUNAWADING, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12229": { stopId: stop.NUNAWADING, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26249": { stopId: stop.NUNAWADING, replacementBus: true }, // Replacement bus (suburban)

  // Oak Park
  "vic:rail:OKP": { stopId: stop.OAK_PARK }, // Parent (suburban)
  "15535": { stopId: stop.OAK_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15536": { stopId: stop.OAK_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Oakleigh
  "vic:rail:OAK": { stopId: stop.OAKLEIGH }, // Parent (suburban)
  "13722": { stopId: stop.OAKLEIGH, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13723": { stopId: stop.OAKLEIGH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26251": { stopId: stop.OAKLEIGH, replacementBus: true }, // Replacement bus (suburban)

  // Officer
  "vic:rail:OFC": { stopId: stop.OFFICER }, // Parent (suburban)
  "12174": { stopId: stop.OFFICER, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12175": { stopId: stop.OFFICER, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26252": { stopId: stop.OFFICER, replacementBus: true }, // Replacement bus (suburban)

  // Ormond
  "vic:rail:OMD": { stopId: stop.ORMOND }, // Parent (suburban)
  "14245": { stopId: stop.ORMOND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14246": { stopId: stop.ORMOND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14247": { stopId: stop.ORMOND, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Pakenham
  "vic:rail:PKM": { stopId: stop.PAKENHAM }, // Parent (suburban and regional)
  "12172": { stopId: stop.PAKENHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12173": { stopId: stop.PAKENHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "22252": { stopId: stop.PAKENHAM }, // Platform ? (regional)
  "26254": { stopId: stop.PAKENHAM, replacementBus: true }, // Replacement bus (suburban)

  // Parkdale
  "vic:rail:PKD": { stopId: stop.PARKDALE }, // Parent (suburban)
  "11238": { stopId: stop.PARKDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11239": { stopId: stop.PARKDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Parliament
  "vic:rail:PAR": { stopId: stop.PARLIAMENT }, // Parent (suburban)
  "10924": { stopId: stop.PARLIAMENT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11210": { stopId: stop.PARLIAMENT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12199": { stopId: stop.PARLIAMENT, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "12200": { stopId: stop.PARLIAMENT, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)

  // Pascoe Vale
  "vic:rail:PVL": { stopId: stop.PASCOE_VALE }, // Parent (suburban)
  "15537": { stopId: stop.PASCOE_VALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15538": { stopId: stop.PASCOE_VALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Patterson
  "vic:rail:PAT": { stopId: stop.PATTERSON }, // Parent (suburban)
  "14236": { stopId: stop.PATTERSON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14237": { stopId: stop.PATTERSON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14238": { stopId: stop.PATTERSON, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // Prahran
  "vic:rail:PRA": { stopId: stop.PRAHRAN }, // Parent (suburban)
  "14291": { stopId: stop.PRAHRAN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14292": { stopId: stop.PRAHRAN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26259": { stopId: stop.PRAHRAN, replacementBus: true }, // Replacement bus (suburban)

  // Preston
  "vic:rail:PRE": { stopId: stop.PRESTON }, // Parent (suburban)
  "15379": { stopId: stop.PRESTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15380": { stopId: stop.PRESTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26260": { stopId: stop.PRESTON, replacementBus: true }, // Replacement bus (suburban)

  // Pyramid
  "vic:rail:PYD": { stopId: stop.PYRAMID }, // Parent (regional)
  "20336": { stopId: stop.PYRAMID }, // Platform ? (regional)

  // Regent
  "vic:rail:REG": { stopId: stop.REGENT }, // Parent (suburban)
  "15377": { stopId: stop.REGENT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15378": { stopId: stop.REGENT, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26261": { stopId: stop.REGENT, replacementBus: true }, // Replacement bus (suburban)

  // Reservoir
  "vic:rail:RES": { stopId: stop.RESERVOIR }, // Parent (suburban)
  "15375": { stopId: stop.RESERVOIR, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15376": { stopId: stop.RESERVOIR, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26262": { stopId: stop.RESERVOIR, replacementBus: true }, // Replacement bus (suburban)

  // Richmond
  "vic:rail:RMD": { stopId: stop.RICHMOND }, // Parent (suburban and regional)
  "12253": { stopId: stop.RICHMOND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "12254": { stopId: stop.RICHMOND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "12255": { stopId: stop.RICHMOND, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "12256": { stopId: stop.RICHMOND, positionId: position.PLATFORM_4 }, // Platform 4 (suburban and regional)
  "12257": { stopId: stop.RICHMOND, positionId: position.PLATFORM_5 }, // Platform 5 (suburban and regional)
  "12258": { stopId: stop.RICHMOND, positionId: position.PLATFORM_6 }, // Platform 6 (suburban and regional)
  "12259": { stopId: stop.RICHMOND, positionId: position.PLATFORM_7 }, // Platform 7 (suburban and regional)
  "12260": { stopId: stop.RICHMOND, positionId: position.PLATFORM_8 }, // Platform 8 (suburban and regional)
  "12261": { stopId: stop.RICHMOND, positionId: position.PLATFORM_9 }, // Platform 9 (suburban and regional)
  "12262": { stopId: stop.RICHMOND, positionId: position.PLATFORM_10 }, // Platform 10 (suburban and regional)
  "22247": { stopId: stop.RICHMOND }, // Platform ? (suburban and regional)
  "26263": { stopId: stop.RICHMOND, replacementBus: true }, // Replacement bus (suburban and regional)

  // Riddells Creek
  "vic:rail:RIK": { stopId: stop.RIDDELLS_CREEK }, // Parent (regional)
  "20337": { stopId: stop.RIDDELLS_CREEK }, // Platform ? (regional)

  // Ringwood
  "vic:rail:RWD": { stopId: stop.RINGWOOD }, // Parent (suburban)
  "12236": { stopId: stop.RINGWOOD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12237": { stopId: stop.RINGWOOD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "12235": { stopId: stop.RINGWOOD, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26265": { stopId: stop.RINGWOOD, replacementBus: true }, // Replacement bus (suburban)

  // Ringwood East
  "vic:rail:RWE": { stopId: stop.RINGWOOD_EAST }, // Parent (suburban)
  "12170": { stopId: stop.RINGWOOD_EAST, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12171": { stopId: stop.RINGWOOD_EAST, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Ripponlea
  "vic:rail:RIP": { stopId: stop.RIPPONLEA }, // Parent (suburban)
  "14285": { stopId: stop.RIPPONLEA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14286": { stopId: stop.RIPPONLEA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26266": { stopId: stop.RIPPONLEA, replacementBus: true }, // Replacement bus (suburban)

  // Riversdale
  "vic:rail:RIV": { stopId: stop.RIVERSDALE }, // Parent (suburban)
  "11205": { stopId: stop.RIVERSDALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11206": { stopId: stop.RIVERSDALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26267": { stopId: stop.RIVERSDALE, replacementBus: true }, // Replacement bus (suburban)

  // Rochester
  "vic:rail:ROR": { stopId: stop.ROCHESTER }, // Parent (regional)
  "20338": { stopId: stop.ROCHESTER }, // Platform ? (regional)

  // Rockbank
  "vic:rail:RBK": { stopId: stop.ROCKBANK }, // Parent (regional)
  "19981": { stopId: stop.ROCKBANK }, // Platform ? (regional)

  // Rosanna
  "vic:rail:ROS": { stopId: stop.ROSANNA }, // Parent (suburban)
  "13760": { stopId: stop.ROSANNA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15323": { stopId: stop.ROSANNA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26268": { stopId: stop.ROSANNA, replacementBus: true }, // Replacement bus (suburban)

  // Rosedale
  "vic:rail:ROE": { stopId: stop.ROSEDALE }, // Parent (regional)
  "20339": { stopId: stop.ROSEDALE }, // Platform ? (regional)

  // Roxburgh Park
  "vic:rail:RXP": { stopId: stop.ROXBURGH_PARK }, // Parent (suburban)
  "40218": { stopId: stop.ROXBURGH_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "40219": { stopId: stop.ROXBURGH_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Royal Park
  "vic:rail:RPK": { stopId: stop.ROYAL_PARK }, // Parent (suburban)
  "14318": { stopId: stop.ROYAL_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14319": { stopId: stop.ROYAL_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Rushall
  "vic:rail:RUS": { stopId: stop.RUSHALL }, // Parent (suburban)
  "15391": { stopId: stop.RUSHALL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15392": { stopId: stop.RUSHALL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26271": { stopId: stop.RUSHALL, replacementBus: true }, // Replacement bus (suburban)

  // Ruthven
  "vic:rail:RUT": { stopId: stop.RUTHVEN }, // Parent (suburban)
  "15373": { stopId: stop.RUTHVEN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15374": { stopId: stop.RUTHVEN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26272": { stopId: stop.RUTHVEN, replacementBus: true }, // Replacement bus (suburban)

  // Sale
  "vic:rail:SAE": { stopId: stop.SALE }, // Parent (regional)
  "20341": { stopId: stop.SALE }, // Platform ? (regional)

  // Sandown Park
  "vic:rail:SNP": { stopId: stop.SANDOWN_PARK }, // Parent (suburban)
  "12194": { stopId: stop.SANDOWN_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13713": { stopId: stop.SANDOWN_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26273": { stopId: stop.SANDOWN_PARK, replacementBus: true }, // Replacement bus (suburban)

  // Sandringham
  "vic:rail:SHM": { stopId: stop.SANDRINGHAM }, // Parent (suburban)
  "14271": { stopId: stop.SANDRINGHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26274": { stopId: stop.SANDRINGHAM, replacementBus: true }, // Replacement bus (suburban)

  // Seaford
  "vic:rail:SEA": { stopId: stop.SEAFORD }, // Parent (suburban)
  "11224": { stopId: stop.SEAFORD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11225": { stopId: stop.SEAFORD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Seaholme
  "vic:rail:SHE": { stopId: stop.SEAHOLME }, // Parent (suburban)
  "13743": { stopId: stop.SEAHOLME, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26276": { stopId: stop.SEAHOLME, replacementBus: true }, // Replacement bus (suburban)

  // Seddon
  "vic:rail:SEN": { stopId: stop.SEDDON }, // Parent (suburban)
  "15349": { stopId: stop.SEDDON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15350": { stopId: stop.SEDDON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Seymour
  "vic:rail:SER": { stopId: stop.SEYMOUR }, // Parent (regional)
  "20342": { stopId: stop.SEYMOUR }, // Platform ? (regional)

  // Shepparton
  "vic:rail:SNH": { stopId: stop.SHEPPARTON }, // Parent (regional)
  "20343": { stopId: stop.SHEPPARTON }, // Platform ? (regional)

  // Sherwood Park
  "vic:rail:SDP": { stopId: stop.SHERWOOD_PARK }, // Parent (regional)
  "22257": { stopId: stop.SHERWOOD_PARK }, // Platform ? (regional)

  // Showgrounds
  "vic:rail:SGS": { stopId: stop.SHOWGROUNDS }, // Parent (suburban)
  "15526": { stopId: stop.SHOWGROUNDS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Somerville
  "vic:rail:SVE": { stopId: stop.SOMERVILLE }, // Parent (suburban)
  "5082": { stopId: stop.SOMERVILLE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // South Geelong
  "vic:rail:SOG": { stopId: stop.SOUTH_GEELONG }, // Parent (regional)
  "20344": { stopId: stop.SOUTH_GEELONG }, // Platform ? (regional)

  // South Kensington
  "vic:rail:SKN": { stopId: stop.SOUTH_KENSINGTON }, // Parent (suburban)
  "15522": { stopId: stop.SOUTH_KENSINGTON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15523": { stopId: stop.SOUTH_KENSINGTON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // South Morang
  "vic:rail:SMG": { stopId: stop.SOUTH_MORANG }, // Parent (suburban)
  "26522": { stopId: stop.SOUTH_MORANG, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26523": { stopId: stop.SOUTH_MORANG, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26280": { stopId: stop.SOUTH_MORANG, replacementBus: true }, // Replacement bus (suburban)

  // South Yarra
  "vic:rail:SYR": { stopId: stop.SOUTH_YARRA }, // Parent (suburban)
  "14293": { stopId: stop.SOUTH_YARRA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14294": { stopId: stop.SOUTH_YARRA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "14295": { stopId: stop.SOUTH_YARRA, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "14296": { stopId: stop.SOUTH_YARRA, positionId: position.PLATFORM_4 }, // Platform 4 (suburban)
  "14297": { stopId: stop.SOUTH_YARRA, positionId: position.PLATFORM_5 }, // Platform 5 (suburban)
  "14298": { stopId: stop.SOUTH_YARRA, positionId: position.PLATFORM_6 }, // Platform 6 (suburban)
  "26281": { stopId: stop.SOUTH_YARRA, replacementBus: true }, // Replacement bus (suburban)

  // Southern Cross
  "vic:rail:SSS": { stopId: stop.SOUTHERN_CROSS }, // Parent (suburban and regional)
  "22187": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_8 }, // Platform 8 (suburban)
  "22188": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_9 }, // Platform 9 (suburban)
  "22189": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_10 }, // Platform 10 (suburban)
  "22190": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_11 }, // Platform 11 (suburban)
  "22191": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_12 }, // Platform 12 (suburban)
  "22192": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_13 }, // Platform 13 (suburban)
  "22193": { stopId: stop.SOUTHERN_CROSS, positionId: position.PLATFORM_14 }, // Platform 14 (suburban)
  "20043": { stopId: stop.SOUTHERN_CROSS }, // Platform ? (regional)

  // Southland
  "vic:rail:SOU": { stopId: stop.SOUTHLAND }, // Parent (suburban)
  "26527": { stopId: stop.SOUTHLAND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26528": { stopId: stop.SOUTHLAND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Spotswood
  "vic:rail:SPT": { stopId: stop.SPOTSWOOD }, // Parent (suburban)
  "15345": { stopId: stop.SPOTSWOOD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15346": { stopId: stop.SPOTSWOOD, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Springhurst
  "1620": { stopId: stop.SPRINGHURST }, // Parent (regional)
  "22490": { stopId: stop.SPRINGHURST }, // Platform ? (regional)

  // Springvale
  "vic:rail:SPG": { stopId: stop.SPRINGVALE }, // Parent (suburban)
  "13714": { stopId: stop.SPRINGVALE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13715": { stopId: stop.SPRINGVALE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26285": { stopId: stop.SPRINGVALE, replacementBus: true }, // Replacement bus (suburban)

  // St Albans
  "vic:rail:SAB": { stopId: stop.ST_ALBANS }, // Parent (suburban)
  "15361": { stopId: stop.ST_ALBANS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15360": { stopId: stop.ST_ALBANS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "22243": { stopId: stop.ST_ALBANS }, // Platform ? (suburban)
  "26286": { stopId: stop.ST_ALBANS, replacementBus: true }, // Replacement bus (suburban)

  // Stony Point
  "vic:rail:STY": { stopId: stop.STONY_POINT }, // Parent (suburban)
  "88": { stopId: stop.STONY_POINT, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Stratford
  "vic:rail:STD": { stopId: stop.STRATFORD }, // Parent (regional)
  "20346": { stopId: stop.STRATFORD }, // Platform ? (regional)

  // Strathmore
  "vic:rail:SME": { stopId: stop.STRATHMORE }, // Parent (suburban)
  "15539": { stopId: stop.STRATHMORE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15540": { stopId: stop.STRATHMORE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Sunbury
  "vic:rail:SUY": { stopId: stop.SUNBURY }, // Parent (suburban and regional)
  "26529": { stopId: stop.SUNBURY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "15352": { stopId: stop.SUNBURY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "19998": { stopId: stop.SUNBURY }, // Platform ? (suburban and regional)
  "26289": { stopId: stop.SUNBURY, replacementBus: true }, // Replacement bus (suburban and regional)

  // Sunshine
  "vic:rail:SUN": { stopId: stop.SUNSHINE }, // Parent (suburban and regional)
  "26530": { stopId: stop.SUNSHINE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "26531": { stopId: stop.SUNSHINE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "26532": { stopId: stop.SUNSHINE, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "26533": { stopId: stop.SUNSHINE, positionId: position.PLATFORM_4 }, // Platform 4 (suburban and regional)
  "22241": { stopId: stop.SUNSHINE }, // Platform ? (suburban and regional)
  "26290": { stopId: stop.SUNSHINE, replacementBus: true }, // Replacement bus (suburban and regional)

  // Swan Hill
  "vic:rail:SWL": { stopId: stop.SWAN_HILL }, // Parent (regional)
  "20347": { stopId: stop.SWAN_HILL }, // Platform ? (regional)

  // Syndal
  "vic:rail:SYN": { stopId: stop.SYNDAL }, // Parent (suburban)
  "12160": { stopId: stop.SYNDAL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12161": { stopId: stop.SYNDAL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26292": { stopId: stop.SYNDAL, replacementBus: true }, // Replacement bus (suburban)

  // Talbot
  "vic:rail:TAT": { stopId: stop.TALBOT }, // Parent (regional)
  "47482": { stopId: stop.TALBOT }, // Platform ? (regional)

  // Tallarook
  "vic:rail:TOK": { stopId: stop.TALLAROOK }, // Parent (regional)
  "20348": { stopId: stop.TALLAROOK }, // Platform ? (regional)

  // Tarneit
  "vic:rail:TNT": { stopId: stop.TARNEIT }, // Parent (regional)
  "47648": { stopId: stop.TARNEIT }, // Platform ? (regional)

  // Tecoma
  "vic:rail:TCM": { stopId: stop.TECOMA }, // Parent (suburban)
  "11121": { stopId: stop.TECOMA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Terang
  "vic:rail:TER": { stopId: stop.TERANG }, // Parent (regional)
  "20349": { stopId: stop.TERANG }, // Platform ? (regional)

  // Thomastown
  "vic:rail:TSN": { stopId: stop.THOMASTOWN }, // Parent (suburban)
  "15370": { stopId: stop.THOMASTOWN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26534": { stopId: stop.THOMASTOWN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26294": { stopId: stop.THOMASTOWN, replacementBus: true }, // Replacement bus (suburban)

  // Thornbury
  "vic:rail:TBY": { stopId: stop.THORNBURY }, // Parent (suburban)
  "15383": { stopId: stop.THORNBURY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15384": { stopId: stop.THORNBURY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26295": { stopId: stop.THORNBURY, replacementBus: true }, // Replacement bus (suburban)

  // Toorak
  "vic:rail:TOR": { stopId: stop.TOORAK }, // Parent (suburban)
  "14263": { stopId: stop.TOORAK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14264": { stopId: stop.TOORAK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Tooronga
  "vic:rail:TGA": { stopId: stop.TOORONGA }, // Parent (suburban)
  "12267": { stopId: stop.TOORONGA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12268": { stopId: stop.TOORONGA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Tottenham
  "vic:rail:TOT": { stopId: stop.TOTTENHAM }, // Parent (suburban)
  "15512": { stopId: stop.TOTTENHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15513": { stopId: stop.TOTTENHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Trafalgar
  "vic:rail:TAR": { stopId: stop.TRAFALGAR }, // Parent (regional)
  "20350": { stopId: stop.TRAFALGAR }, // Platform ? (regional)

  // Traralgon
  "vic:rail:TRN": { stopId: stop.TRARALGON }, // Parent (regional)
  "20351": { stopId: stop.TRARALGON }, // Platform ? (regional)

  // Tyabb
  "vic:rail:TAB": { stopId: stop.TYABB }, // Parent (suburban)
  "4318": { stopId: stop.TYABB, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Tynong
  "vic:rail:TYN": { stopId: stop.TYNONG }, // Parent (regional)
  "20352": { stopId: stop.TYNONG }, // Platform ? (regional)

  // Upfield
  "vic:rail:UFD": { stopId: stop.UPFIELD }, // Parent (suburban)
  "14299": { stopId: stop.UPFIELD, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)

  // Upper Ferntree Gully
  "vic:rail:UFG": { stopId: stop.UPPER_FERNTREE_GULLY }, // Parent (suburban)
  "11245": { stopId: stop.UPPER_FERNTREE_GULLY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11246": { stopId: stop.UPPER_FERNTREE_GULLY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Upwey
  "vic:rail:UPW": { stopId: stop.UPWEY }, // Parent (suburban)
  "11122": { stopId: stop.UPWEY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11123": { stopId: stop.UPWEY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Victoria Park
  "vic:rail:VPK": { stopId: stop.VICTORIA_PARK }, // Parent (suburban)
  "14332": { stopId: stop.VICTORIA_PARK, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14333": { stopId: stop.VICTORIA_PARK, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26303": { stopId: stop.VICTORIA_PARK, replacementBus: true }, // Replacement bus (suburban)

  // Violet Town
  "vic:rail:VTN": { stopId: stop.VIOLET_TOWN }, // Parent (regional)
  "20353": { stopId: stop.VIOLET_TOWN }, // Platform ? (regional)

  // Wallan
  "vic:rail:WAN": { stopId: stop.WALLAN }, // Parent (regional)
  "17204": { stopId: stop.WALLAN }, // Platform ? (regional)

  // Wandong
  "vic:rail:WDG": { stopId: stop.WANDONG }, // Parent (regional)
  "20355": { stopId: stop.WANDONG }, // Platform ? (regional)

  // Wangaratta
  "vic:rail:WRT": { stopId: stop.WANGARATTA }, // Parent (regional)
  "20356": { stopId: stop.WANGARATTA }, // Platform ? (regional)

  // Warragul
  "vic:rail:WGL": { stopId: stop.WARRAGUL }, // Parent (regional)
  "20357": { stopId: stop.WARRAGUL }, // Platform ? (regional)

  // Warrnambool
  "vic:rail:WBL": { stopId: stop.WARRNAMBOOL }, // Parent (regional)
  "20358": { stopId: stop.WARRNAMBOOL }, // Platform ? (regional)

  // Watergardens
  "vic:rail:WGS": { stopId: stop.WATERGARDENS }, // Parent (suburban and regional)
  "15355": { stopId: stop.WATERGARDENS, positionId: position.PLATFORM_1 }, // Platform 1 (suburban and regional)
  "15356": { stopId: stop.WATERGARDENS, positionId: position.PLATFORM_2 }, // Platform 2 (suburban and regional)
  "15357": { stopId: stop.WATERGARDENS, positionId: position.PLATFORM_3 }, // Platform 3 (suburban and regional)
  "22244": { stopId: stop.WATERGARDENS }, // Platform ? (suburban and regional)
  "26304": { stopId: stop.WATERGARDENS, replacementBus: true }, // Replacement bus (suburban and regional)

  // Watsonia
  "vic:rail:WAT": { stopId: stop.WATSONIA }, // Parent (suburban)
  "15327": { stopId: stop.WATSONIA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15328": { stopId: stop.WATSONIA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26305": { stopId: stop.WATSONIA, replacementBus: true }, // Replacement bus (suburban)

  // Wattle Glen
  "vic:rail:WTT": { stopId: stop.WATTLE_GLEN }, // Parent (suburban)
  "15336": { stopId: stop.WATTLE_GLEN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26306": { stopId: stop.WATTLE_GLEN, replacementBus: true }, // Replacement bus (suburban)

  // Waurn Ponds
  "vic:rail:WPP": { stopId: stop.WAURN_PONDS }, // Parent (regional)
  "47641": { stopId: stop.WAURN_PONDS }, // Platform ? (regional)

  // Wendouree
  "vic:rail:WED": { stopId: stop.WENDOUREE }, // Parent (regional)
  "43469": { stopId: stop.WENDOUREE }, // Platform ? (regional)

  // Werribee
  "vic:rail:WER": { stopId: stop.WERRIBEE }, // Parent (suburban)
  "13731": { stopId: stop.WERRIBEE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13732": { stopId: stop.WERRIBEE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "13733": { stopId: stop.WERRIBEE, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "22246": { stopId: stop.WERRIBEE }, // Platform ? (suburban)
  "26307": { stopId: stop.WERRIBEE, replacementBus: true }, // Replacement bus (suburban)

  // West Footscray
  "vic:rail:WFY": { stopId: stop.WEST_FOOTSCRAY }, // Parent (suburban)
  "15514": { stopId: stop.WEST_FOOTSCRAY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15515": { stopId: stop.WEST_FOOTSCRAY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26538": { stopId: stop.WEST_FOOTSCRAY, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26308": { stopId: stop.WEST_FOOTSCRAY, replacementBus: true }, // Replacement bus (suburban)

  // West Richmond
  "vic:rail:WRM": { stopId: stop.WEST_RICHMOND }, // Parent (suburban)
  "14338": { stopId: stop.WEST_RICHMOND, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14339": { stopId: stop.WEST_RICHMOND, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26309": { stopId: stop.WEST_RICHMOND, replacementBus: true }, // Replacement bus (suburban)

  // Westall
  "vic:rail:WTL": { stopId: stop.WESTALL }, // Parent (suburban)
  "13716": { stopId: stop.WESTALL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13717": { stopId: stop.WESTALL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26539": { stopId: stop.WESTALL, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)
  "26310": { stopId: stop.WESTALL, replacementBus: true }, // Replacement bus (suburban)

  // Westgarth
  "vic:rail:WTG": { stopId: stop.WESTGARTH }, // Parent (suburban)
  "13744": { stopId: stop.WESTGARTH, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13745": { stopId: stop.WESTGARTH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26311": { stopId: stop.WESTGARTH, replacementBus: true }, // Replacement bus (suburban)

  // Westona
  "vic:rail:WTO": { stopId: stop.WESTONA }, // Parent (suburban)
  "13740": { stopId: stop.WESTONA, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "13741": { stopId: stop.WESTONA, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26312": { stopId: stop.WESTONA, replacementBus: true }, // Replacement bus (suburban)

  // Williams Landing
  "vic:rail:WLD": { stopId: stop.WILLIAMS_LANDING }, // Parent (suburban)
  "26540": { stopId: stop.WILLIAMS_LANDING, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26541": { stopId: stop.WILLIAMS_LANDING, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26313": { stopId: stop.WILLIAMS_LANDING, replacementBus: true }, // Replacement bus (suburban)

  // Williamstown
  "vic:rail:WIL": { stopId: stop.WILLIAMSTOWN }, // Parent (suburban)
  "15338": { stopId: stop.WILLIAMSTOWN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26315": { stopId: stop.WILLIAMSTOWN, replacementBus: true }, // Replacement bus (suburban)

  // Williamstown Beach
  "vic:rail:WBH": { stopId: stop.WILLIAMSTOWN_BEACH }, // Parent (suburban)
  "15339": { stopId: stop.WILLIAMSTOWN_BEACH, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15340": { stopId: stop.WILLIAMSTOWN_BEACH, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Willison
  "vic:rail:WSN": { stopId: stop.WILLISON }, // Parent (suburban)
  "11203": { stopId: stop.WILLISON, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "11204": { stopId: stop.WILLISON, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26316": { stopId: stop.WILLISON, replacementBus: true }, // Replacement bus (suburban)

  // Winchelsea
  "vic:rail:WIA": { stopId: stop.WINCHELSEA }, // Parent (regional)
  "20359": { stopId: stop.WINCHELSEA }, // Platform ? (regional)

  // Windsor
  "vic:rail:WIN": { stopId: stop.WINDSOR }, // Parent (suburban)
  "14289": { stopId: stop.WINDSOR, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "14290": { stopId: stop.WINDSOR, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26317": { stopId: stop.WINDSOR, replacementBus: true }, // Replacement bus (suburban)

  // Wodonga
  "vic:rail:WOD": { stopId: stop.WODONGA }, // Parent (regional)
  "20360": { stopId: stop.WODONGA }, // Platform ? (regional)

  // Woodend
  "vic:rail:WNO": { stopId: stop.WOODEND }, // Parent (regional)
  "20361": { stopId: stop.WOODEND }, // Platform ? (regional)

  // Wyndham Vale
  "vic:rail:WVL": { stopId: stop.WYNDHAM_VALE }, // Parent (regional)
  "47647": { stopId: stop.WYNDHAM_VALE }, // Platform ? (regional)

  // Yarragon
  "vic:rail:YON": { stopId: stop.YARRAGON }, // Parent (regional)
  "20362": { stopId: stop.YARRAGON }, // Platform ? (regional)

  // Yarraman
  "vic:rail:YMN": { stopId: stop.YARRAMAN }, // Parent (suburban)
  "12190": { stopId: stop.YARRAMAN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "12191": { stopId: stop.YARRAMAN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26318": { stopId: stop.YARRAMAN, replacementBus: true }, // Replacement bus (suburban)

  // Yarraville
  "vic:rail:YVE": { stopId: stop.YARRAVILLE }, // Parent (suburban)
  "15347": { stopId: stop.YARRAVILLE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "15348": { stopId: stop.YARRAVILLE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26319": { stopId: stop.YARRAVILLE, replacementBus: true }, // Replacement bus (suburban)

  // Huntly
  "vic:rail:HUY": { stopId: stop.HUNTLY }, // Parent (regional)
  "49296": { stopId: stop.HUNTLY }, // Platform ? (regional)

  // Raywood
  "vic:rail:RAY": { stopId: stop.RAYWOOD }, // Parent (regional)
  "49295": { stopId: stop.RAYWOOD }, // Platform ? (regional)

  // Union
  "vic:rail:UNN": { stopId: stop.UNION }, // Parent (suburban)
  "26535": { stopId: stop.UNION, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26536": { stopId: stop.UNION, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26537": { stopId: stop.UNION, positionId: position.PLATFORM_3 }, // Platform 3 (suburban)

  // East Pakenham
  "vic:rail:EPH": { stopId: stop.EAST_PAKENHAM }, // Parent (suburban)
  "26506": { stopId: stop.EAST_PAKENHAM, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26507": { stopId: stop.EAST_PAKENHAM, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
  "26158": { stopId: stop.EAST_PAKENHAM, replacementBus: true }, // Replacement bus (suburban)

  // Anzac
  "vic:rail:AZC": { stopId: stop.ANZAC }, // Parent (suburban)
  "26556": { stopId: stop.ANZAC, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26557": { stopId: stop.ANZAC, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Town Hall
  "vic:rail:THL": { stopId: stop.TOWN_HALL }, // Parent (suburban)
  "26554": { stopId: stop.TOWN_HALL, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26555": { stopId: stop.TOWN_HALL, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // State Library
  "vic:rail:STL": { stopId: stop.STATE_LIBRARY }, // Parent (suburban)
  "26552": { stopId: stop.STATE_LIBRARY, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26553": { stopId: stop.STATE_LIBRARY, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Parkville
  "vic:rail:PKV": { stopId: stop.PARKVILLE }, // Parent (suburban)
  "26550": { stopId: stop.PARKVILLE, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26551": { stopId: stop.PARKVILLE, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)

  // Arden
  "vic:rail:ARN": { stopId: stop.ARDEN }, // Parent (suburban)
  "26548": { stopId: stop.ARDEN, positionId: position.PLATFORM_1 }, // Platform 1 (suburban)
  "26549": { stopId: stop.ARDEN, positionId: position.PLATFORM_2 }, // Platform 2 (suburban)
};
